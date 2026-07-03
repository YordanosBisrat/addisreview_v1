import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          አዲስ<span className="navbar__logo-accent">Review</span>
        </Link>

        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <FaSearch className="navbar__search-icon" />
          <input
            type="search"
            placeholder="Search businesses or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search businesses"
          />
        </form>

        <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/search" onClick={() => setMenuOpen(false)}>All Businesses</NavLink>
        </nav>

        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <form className="navbar__search navbar__search--mobile" onSubmit={handleSearchSubmit}>
          <FaSearch className="navbar__search-icon" />
          <input
            type="search"
            placeholder="Search businesses or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search businesses"
          />
        </form>
      )}
    </header>
  );
}
