const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const bookController = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authMiddleware');
const reviewController = require('../controllers/reviewController');

// Register a new user
router.post('/register', authorController.registerUser);

// Login user
router.post('/login', authorController.loginUser);

// Create a new book
router.post('/books', authenticate, bookController.createBook);

// Get all books
router.get('/books', bookController.getBooks);

// Get a single book by its ID
router.get('/books/:bookId', bookController.getBookById);

// Update a book by ID
router.put('/books/:bookId', authenticate, bookController.updateBook);

// Delete a book by ID
router.delete('/books/:bookId', authenticate, bookController.deleteBook);

// Add a review to a book
router.post('/books/:bookId/reviews', authenticate, reviewController.addReview);

// Update a review for a book
router.put('/books/:bookId/reviews/:reviewId', authenticate, reviewController.updateReview);

// Delete a review for a book
router.delete('/books/:bookId/reviews/:reviewId', authenticate, reviewController.deleteReview);

module.exports = router;
