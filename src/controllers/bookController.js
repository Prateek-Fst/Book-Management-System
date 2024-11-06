const Book = require('../models/bookModel');
const Author = require('../models/authorModel');
const Review = require("../models/reviewModel")

// Create a book
exports.createBook = async (req, res) => {
  try {
    const { title, excerpt, ISBN, category, subcategory, releasedAt } = req.body;
    const userId = req.userId;

    if (!title || !excerpt || !ISBN || !category || !subcategory || !releasedAt) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    const user = await Author.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const newBook = new Book({
      title,
      excerpt,
      userId,
      ISBN,
      category,
      subcategory,
      releasedAt
    });

    await newBook.save();
    res.status(201).json({ status: true, message: "Book created successfully", data: newBook });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const filter = req.query;
    const books = await Book.find({ isDeleted: false, ...filter }).sort({ title: 1 });

    if (books.length === 0) {
      return res.status(404).json({ status: false, message: "No books found" });
    }

    res.status(200).json({ status: true, message: "Books list", data: books });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.bookId, isDeleted: false });

    if (!book) {
      return res.status(404).json({ status: false, message: "Book not found" });
    }

    const reviews = await Review.find({ bookId: book._id, isDeleted: false });

    res.status(200).json({
      status: true,
      message: 'Book details',
      data: { ...book.toObject(), reviewsData: reviews }
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { title, excerpt, ISBN, releasedAt } = req.body;
    const bookId = req.params.bookId;

    const book = await Book.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).json({ status: false, message: "Book not found" });
    }

    if (book.userId.toString() != req.userId) {
      return res.status(403).json({ status: false, message: "Not authorized to update this book" });
    }

    book.title = title || book.title;
    book.excerpt = excerpt || book.excerpt;
    book.ISBN = ISBN || book.ISBN;
    book.releasedAt = releasedAt || book.releasedAt;

    await book.save();
    res.status(200).json({ status: true, message: "Book updated successfully", data: book });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
  
      const book = await Book.findOne({ _id: bookId });
      if (!book) {
        return res.status(404).json({ status: false, message: "Book not found" });
      }
  
      if (book.isDeleted) {
        return res.status(400).json({ status: false, message: "Book has already been deleted" });
      }
  
      if (book.userId.toString() != req.userId) {
        return res.status(403).json({ status: false, message: "Not authorized to delete this book" });
      }
  
      book.isDeleted = true;
      book.deletedAt = Date.now();
  
      await book.save();
      res.status(200).json({ status: true, message: "Book deleted successfully" });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  };
  