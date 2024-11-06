import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route params
import { getBookById } from '../services/api'; // Your API function

const BookDetail = () => {
  const { bookId } = useParams(); // Get bookId from the URL params
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getBookById(bookId); // Fetch book data by bookId
        setBook(response.data);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]); // Refetch if bookId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">{book.title}</h2>
      <p className="text-xl text-gray-700 mb-2">Author: {book.author}</p>
      <p className="text-lg text-gray-600 mb-2">Published: {book.publishedDate}</p>
      <p className="text-lg text-gray-800 mb-2">{book.description}</p>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Book Details</h3>
        <ul className="list-inside">
          <li>ISBN: {book.isbn}</li>
          <li>Genre: {book.genre}</li>
          <li>Price: ${book.price}</li>
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
