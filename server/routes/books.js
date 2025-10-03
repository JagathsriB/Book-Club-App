// server/routes/books.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Book = require('../models/Book');

// --- Multer Configuration (no changes here) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage: storage });

// --- GET and POST routes (no changes here) ---
router.get('/all', async (req, res) => {
    try {
        const books = await Book.find()
            .populate('user', 'username') // Fetches the username from the User model
            .sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) { res.status(500).send('Server Error'); }
});

router.post('/', [auth, upload.single('coverImage')], async (req, res) => {
  const { title, author, rating, comment } = req.body; // <-- Add 'comment' here
  // ... (file check remains the same)
  const coverImageUrl = `/uploads/${req.file.filename}`;
  try {
    const newBook = new Book({
      title,
      author,
      rating,
      comment, // <-- Add 'comment' here
      coverImageUrl,
      user: req.user.id,
    });
    const book = await newBook.save();
    res.json(book);
  } catch (err) { /* ... */ }
});

// --- NEW: DELETE a book ---
// @route   DELETE api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    // Ensure user owns the book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await book.deleteOne(); // Use deleteOne() on the document
    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- NEW: UPDATE a book ---
// @route   PUT api/books/:id
// @desc    Update a book
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, author, rating, comment } = req.body; // <-- Add 'comment' here
  try {
    let book = await Book.findById(req.params.id);
    // ... (book not found and ownership checks remain the same)

    // Update fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.rating = rating || book.rating;
    book.comment = comment !== undefined ? comment : book.comment; // <-- Add this line

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) { /* ... */ }
});

module.exports = router;