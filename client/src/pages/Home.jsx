import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaMapMarkedAlt, FaStar, FaUsers } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import BusinessCard from '../components/BusinessCard';
import { SkeletonGrid } from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import { getCategories } from '../services/categoryService';
import { getBusinesses } from '../services/businessService';
import './Home.css';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [categoriesData, businessesData] = await Promise.all([
        getCategories(),
        getBusinesses(),
      ]);
      setCategories(categoriesData);
      // "Featured" = top 6 businesses by average rating
      const sorted = [...businessesData].sort((a, b) => b.average_rating - a.average_rating);
      setFeatured(sorted.slice(0, 6));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <span className="section-eyebrow">Ethiopian Business Reviews</span>
          <h1 className="hero__title">
            Discover businesses.
            <br />
            Share your experience.
          </h1>
          <SearchBar />

          <div className="hero__stats">
            <div className="hero__stat">
              <FaMapMarkedAlt />
              <span>{featured.length > 0 ? '14+' : '—'} Businesses</span>
            </div>
            <div className="hero__stat">
              <FaStar />
              <span>Verified Ratings</span>
            </div>
            <div className="hero__stat">
              <FaUsers />
              <span>Real Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {error && <ErrorMessage message={error} onRetry={loadData} />}

      {!error && (
        <>
          {/* Categories */}
          <section className="section">
            <div className="container">
              <div className="section-heading">
                <div>
                  <span className="section-eyebrow">Browse</span>
                  <h2>Categories</h2>
                </div>
              </div>
              {loading ? (
                <SkeletonGrid count={5} variant="category" gridClassName="grid-categories" />
              ) : (
                <div className="grid grid-categories">
                  {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Featured Businesses */}
          <section className="section section--muted">
            <div className="container">
              <div className="section-heading">
                <div>
                  <span className="section-eyebrow">Top Rated</span>
                  <h2>Featured Businesses</h2>
                </div>
                <Link to="/search" className="section-heading__link">
                  View all <FaArrowRight />
                </Link>
              </div>
              {loading ? (
                <SkeletonGrid count={6} variant="business" gridClassName="grid-businesses" />
              ) : (
                <div className="grid grid-businesses">
                  {featured.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
