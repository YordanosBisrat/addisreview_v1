/**
 * Database connection module.
 *
 * We use sql.js (SQLite compiled to WebAssembly) instead of a native
 * binding like `better-sqlite3` or `sqlite3`. The reason is portability:
 * native SQLite drivers need to compile a C extension during `npm install`,
 * which can fail on machines without build tools, restricted networks, or
 * certain CI/sandboxed environments. sql.js has zero native dependencies -
 * it's pure JavaScript/WASM - so `npm install` always works the same way
 * everywhere.
 *
 * The tradeoff is that sql.js keeps the database in memory and we persist
 * it to disk manually after every write. For an app of this size that is
 * a perfectly reasonable tradeoff, and the module below exposes a small
 * API (`exec`, `prepare().run/get/all`) shaped like better-sqlite3's, so
 * the rest of the codebase (models, seed script) reads like normal
 * synchronous SQL calls instead of being littered with WASM plumbing.
 */

const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DB_PATH = process.env.DB_PATH
  ? path.resolve(__dirname, '..', process.env.DB_PATH)
  : path.resolve(__dirname, '..', 'database', 'belke.db');

let sqlDb = null;
let ready = false;

function persist() {
  const data = sqlDb.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

async function init() {
  if (ready) return;
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    sqlDb = new SQL.Database(fileBuffer);
  } else {
    sqlDb = new SQL.Database();
  }
  ready = true;
}

function assertReady() {
  if (!ready) {
    throw new Error('Database not initialized yet. Call db.init() before use.');
  }
}

/** Run raw SQL (schema creation, multi-statement scripts). Persists after. */
function exec(sql) {
  assertReady();
  sqlDb.exec(sql);
  persist();
}

/**
 * Mimics better-sqlite3's db.prepare(sql) chain, supporting the subset
 * of functionality this project needs: .run(...params), .get(...params),
 * .all(...params).
 */
// If the caller passed a single object (named parameters, e.g. { name: 'x' })
// pass it straight to sql.js's bind(); otherwise treat args as positional `?` values.
function toBindArg(args) {
  if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
    // sql.js expects named params keyed with their marker, e.g. "@name"
    const obj = args[0];
    const named = {};
    Object.keys(obj).forEach((key) => {
      named[`@${key}`] = obj[key];
    });
    return named;
  }
  return args;
}

function prepare(sql) {
  return {
    run(...params) {
      assertReady();
      const stmt = sqlDb.prepare(sql);
      stmt.bind(toBindArg(params));
      stmt.step();
      stmt.free();

      const idResult = sqlDb.exec('SELECT last_insert_rowid() AS id');
      const lastInsertRowid = idResult.length ? idResult[0].values[0][0] : undefined;

      persist();
      return { lastInsertRowid };
    },
    get(...params) {
      assertReady();
      const stmt = sqlDb.prepare(sql);
      stmt.bind(toBindArg(params));
      let row;
      if (stmt.step()) {
        row = stmt.getAsObject();
      }
      stmt.free();
      return row;
    },
    all(...params) {
      assertReady();
      const stmt = sqlDb.prepare(sql);
      stmt.bind(toBindArg(params));
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return rows;
    },
  };
}

module.exports = { init, exec, prepare, get isReady() { return ready; } };
