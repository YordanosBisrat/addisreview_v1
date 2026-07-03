require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const db = require('./config/db');
const seed = require('./database/seed');
const businessRoutes = require('./routes/businesses');
const categoryRoutes = require('./routes/categories');
const searchRoutes = require('./routes/search');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------------------------------------------------------
// Middleware
// ------------------------------------------------------------------
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger (kept lightweight - no extra dependency needed)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// ------------------------------------------------------------------
// Health check
// ------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'አዲስReview API is running' });
});

// ------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------
app.use('/api/businesses', businessRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/search', searchRoutes);

// ------------------------------------------------------------------
// 404 + centralized error handling (must be registered last)
// ------------------------------------------------------------------
app.use(notFoundHandler);
app.use(errorHandler);

// ------------------------------------------------------------------
// Bootstrap: initialize the (WASM) database connection, seed it
// automatically the very first time so the app works immediately
// after `npm install` with no extra manual step, then start listening.
// ------------------------------------------------------------------
async function start() {
  const dbPath = path.resolve(__dirname, 'database', 'belke.db');
  const isFirstRun = !fs.existsSync(dbPath);

  await db.init();

  if (isFirstRun) {
    console.log('No database found - seeding a fresh one...');
    await seed();
  }

  app.listen(PORT, () => {
    console.log(`🚀 አዲስReview server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
