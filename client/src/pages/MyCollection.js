import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, deleteBook, updateBook } from '../features/books/bookSlice';
import BookCard from '../components/BookCard';
import { Modal, Button, Form } from 'react-bootstrap';

const MyCollection = () => {
  const dispatch = useDispatch();
  const { items: books, status, error } = useSelector((state) => state.books);

  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(id));
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateBook({ 
      id: currentBook._id, 
      title: currentBook.title, 
      author: currentBook.author, 
      rating: currentBook.rating,
      comment: currentBook.comment
    }));
    setShowModal(false);
  };

  const handleModalChange = (e) => {
    setCurrentBook({ ...currentBook, [e.target.name]: e.target.value });
  };

  let content;
  if (status === 'loading') {
    content = <p>Loading your collection...</p>;
  } else if (status === 'succeeded') {
    content = books.length === 0 ? (
      <p>Your collection is empty. Add a book review to get started!</p>
    ) : (
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
  {books.map((book) => (
    <div className="col" key={book._id}>
      <BookCard
        book={book}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
        layout="vertical" // <-- Use the default vertical card
      />
    </div>
     ))}
</div>
    );
  } else if (status === 'failed') {
    content = <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-4">My Book Collection</h2>
      {content}

      {/* Edit Book Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={currentBook?.title || ''} onChange={handleModalChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={currentBook?.author || ''} onChange={handleModalChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select name="rating" value={currentBook?.rating || ''} onChange={handleModalChange}>
                {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} {'★'.repeat(v)}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review Comment</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="comment" 
                value={currentBook?.comment || ''} 
                onChange={handleModalChange} 
              />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyCollection;