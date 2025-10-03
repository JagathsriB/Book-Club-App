import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicBooks } from '../features/books/bookSlice';
import BookCard from '../components/BookCard';

const CommunityReviews = () => {
  const dispatch = useDispatch();
  const { publicItems: books, publicStatus, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchPublicBooks());
  }, [dispatch]);

  let content;
  if (publicStatus === 'loading') {
    content = <p>Loading community reviews...</p>;
  } else if (publicStatus === 'succeeded') {
    content = books.length === 0 ? (
      <p>No community reviews yet. Be the first to add one!</p>
    ) : (
      // Using a vertical list layout for the horizontal cards
      <div>
        {books.map((book) => (
          <BookCard 
            key={book._id} 
            book={book} 
            layout="horizontal" 
          />
        ))}
      </div>
    );
  } else if (publicStatus === 'failed') {
    content = <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Community Reviews</h2>
      <p className="text-muted">See what everyone in the club is reading.</p>
      {content}
    </div>
  );
};

export default CommunityReviews;