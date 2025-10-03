import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../features/books/bookSlice';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(3);
  const [coverImage, setCoverImage] = useState(null);
  const [comment, setComment] = useState(''); // State for the new comment field

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !coverImage) {
      alert('Please fill in all fields and upload a cover image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('rating', rating);
    formData.append('coverImage', coverImage);
    formData.append('comment', comment); // Append the comment to the form data

    dispatch(addBook(formData))
      .unwrap()
      .then(() => {
        alert('Book added successfully!');
        navigate('/my-collection');
      })
      .catch((error) => {
        console.error('Failed to add book:', error);
        alert(`Failed to add book: ${error}`);
      });
  };

  return (
    <div>
      <h2 className="mb-4">Add a New Book Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Book Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating (1-5)</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)} className="form-select">
            {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} {'★'.repeat(v)}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Cover Image</label>
          <input type="file" onChange={handleImageChange} className="form-control" accept="image/*" required />
        </div>
        
        {/* New field for the review comment */}
        <div className="mb-3">
          <label className="form-label">Review Comment (Optional)</label>
          <textarea
            className="form-control"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you think of the book?"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};

export default AddBookForm;