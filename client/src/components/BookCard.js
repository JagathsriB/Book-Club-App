// src/components/BookCard.js
import React from 'react';

const StarRating = ({ rating }) => {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? '★' : '☆';
  }
  return <span className="text-warning">{stars}</span>;
};

// We add a 'layout' prop, with 'vertical' as the default value
const BookCard = ({ book, onEdit, onDelete, showActions = false, layout = 'vertical' }) => {
  const serverUrl = 'http://localhost:5000';

   // --- HORIZONTAL LAYOUT ---
  if (layout === 'horizontal') {
    return (
      <div className="card shadow-sm mb-3">
        <div className="row g-0">
          <div className="col-md-3 d-flex justify-content-center align-items-center p-2">
            {/* MODIFIED: The style prop now sets a fixed size for the image */}
            <img 
              src={`${serverUrl}${book.coverImageUrl}`} 
              className="img-fluid rounded" 
              alt={book.title} 
              style={{ 
                width: '130px', 
                height: '180px', 
                objectFit: 'cover' 
              }} 
            />
          </div>
          
          <div className="col-md-9 d-flex flex-column">
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text text-muted">{book.author}</p>
              {book.comment && <p className="card-text fst-italic border-start border-3 ps-2 my-2">"{book.comment}"</p>}
              {book.user && <p className="card-text small text-muted">Reviewed by: {book.user.username}</p>}
              <div className="mt-2"><StarRating rating={book.rating} /></div>
            </div>
            {showActions && (
              <div className="card-footer bg-white border-0 mt-auto d-flex justify-content-end gap-2">
                <button onClick={() => onEdit(book)} className="btn btn-outline-secondary btn-sm">Edit</button>
                <button onClick={() => onDelete(book._id)} className="btn btn-outline-danger btn-sm">Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- VERTICAL (DEFAULT) LAYOUT ---
  return (
    <div className="card h-100 shadow-sm">
      <img src={`${serverUrl}${book.coverImageUrl}`} className="card-img-top" alt={book.title} style={{ height: '350px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text text-muted">{book.author}</p>
        {book.comment && <p className="card-text fst-italic border-start border-3 ps-2 my-3">"{book.comment}"</p>}
        {book.user && <p className="card-text small text-muted">Reviewed by: {book.user.username}</p>}
        <div className="mt-auto"><StarRating rating={book.rating} /></div>
      </div>
      {showActions && (
        <div className="card-footer d-flex justify-content-end gap-2">
          <button onClick={() => onEdit(book)} className="btn btn-outline-secondary btn-sm">Edit</button>
          <button onClick={() => onDelete(book._id)} className="btn btn-outline-danger btn-sm">Delete</button>
        </div>
      )}
    </div>
  );
};

export default BookCard;