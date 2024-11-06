const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');

// Add a review to a book
exports.addReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const bookId = req.params.bookId;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ status: false, message: "Rating must be between 1 and 5" });
    }

    const book = await Book.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).json({ status: false, message: "Book not found" });
    }

    const newReview = new Review({
      bookId,
      reviewedBy: req.body.reviewedBy || "Guest",
      reviewedAt: new Date(),
      rating,
      review,
    });

    await newReview.save();

    book.reviews += 1;
    await book.save();

    res.status(201).json({ status: true, message: "Review added", data: newReview });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;

    const book = await Book.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).json({ status: false, message: "Book not found" });
    }

    const reviewDoc = await Review.findOne({ _id: reviewId, bookId });
    if (!reviewDoc) {
      return res.status(404).json({ status: false, message: "Review not found" });
    }

    reviewDoc.rating = rating || reviewDoc.rating;
    reviewDoc.review = review || reviewDoc.review;

    await reviewDoc.save();

    res.status(200).json({ status: true, message: "Review updated", data: reviewDoc });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;

    const book = await Book.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).json({ status: false, message: "Book not found" });
    }

    const reviewDoc = await Review.findOne({ _id: reviewId, bookId });
    if (!reviewDoc) {
      return res.status(404).json({ status: false, message: "Review not found" });
    }

    reviewDoc.isDeleted = true;
    reviewDoc.deletedAt = Date.now();

    await reviewDoc.save();
    book.reviews -= 1;
    await book.save();

    res.status(200).json({ status: true, message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
