import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import BusinessCard from '../components/BusinessCard';
import { SkeletonGrid } from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { getBusinesses, searchBusinesses } from '../services/businessService';
import './ListPage.css';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Empty query -> browse everything; otherwise hit the search endpoint
      const data = query.trim() ? await searchBusinesses(query.trim()) : await getBusinesses();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, [loadData]);

  // Keep the input in sync if the URL changes externally (e.g. navbar search)
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  // Live search: debounce updates to the URL as the user types
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue.trim() !== query.trim()) {
        setSearchParams(inputValue.trim() ? { q: inputValue.trim() } : {});
      }
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="list-page">
      <div className="container">
        <Link to="/" className="list-page__back">
          <FaArrowLeft /> Back to Home
        </Link>

        <div className="section-heading">
          <div>
            <span className="section-eyebrow">{query ? 'Search Results' : 'All Businesses'}</span>
            <h1>{query ? `Results for "${query}"` : 'All Businesses'}</h1>
          </div>
        </div>

        <div className="list-page__search">
          <FaSearch />
          <input
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search businesses or categories..."
            aria-label="Search businesses"
          />
        </div>

        {loading && <SkeletonGrid count={6} variant="business" />}
        {error && <ErrorMessage message={error} onRetry={loadData} />}

        {!loading && !error && results.length === 0 && (
          <EmptyState
            icon={FaSearch}
            title="No results found"
            message={`We couldn't find any businesses matching "${query}". Try a different search term.`}
          />
        )}

        {!loading && !error && results.length > 0 && (
          <div className="grid grid-businesses">
            {results.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
