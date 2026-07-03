import { useState } from 'react';
import StarRating from './StarRating';
import { submitReview } from '../services/reviewService';
import { useToast } from '../hooks/useToast';
import './ReviewForm.css';

const INITIAL_STATE = { authorName: '', rating: 0, comment: '' };

export default function ReviewForm({ businessId, onReviewSubmitted }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  function validate() {
    const next = {};
    if (!form.authorName.trim()) next.authorName = 'Please enter your name.';
    if (!form.rating) next.rating = 'Please select a rating.';
    if (!form.comment.trim()) next.comment = 'Please share a comment.';
    else if (form.comment.trim().length > 1000) next.comment = 'Comment is too long.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const review = await submitReview(businessId, form);
      onReviewSubmitted(review);
      setForm(INITIAL_STATE);
      setErrors({});
      showToast('Your review was posted. Thank you!', 'success');
    } catch (err) {
      showToast(err.message || 'Could not submit your review.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="review-form card" onSubmit={handleSubmit} noValidate>
      <h3>Write a review</h3>

      <div className="review-form__field">
        <label htmlFor="authorName">Name</label>
        <input
          id="authorName"
          type="text"
          value={form.authorName}
          onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
          placeholder="Your name"
          maxLength={80}
        />
        {errors.authorName && <span className="review-form__error">{errors.authorName}</span>}
      </div>

      <div className="review-form__field">
        <label>Rating</label>
        <StarRating
          value={form.rating}
          interactive
          onChange={(rating) => setForm((f) => ({ ...f, rating }))}
          size={26}
        />
        {errors.rating && <span className="review-form__error">{errors.rating}</span>}
      </div>

      <div className="review-form__field">
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          rows={4}
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          placeholder="Share details about your experience..."
          maxLength={1000}
        />
        {errors.comment && <span className="review-form__error">{errors.comment}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Posting...' : 'Submit Review'}
      </button>
    </form>
  );
}
