import React, { useState } from 'react';
import { createBook } from '../services/api'; // Import your API function

const BookForm = () => {
    const [bookData, setBookData] = useState({
        title: '',
        excerpt: '',
        userId: '',         // Replace with a default user ID or leave it empty
        ISBN: '',
        category: 'Technology',
        subcategory: '',
        releasedAt: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Adjust subcategory format to an array
        const formattedData = {
            ...bookData,
            subcategory: bookData.subcategory.split(',').map((item) => item.trim()),
        };

        try {
            const response = await createBook(formattedData);
            alert('Book created successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating book:', error);
            alert('Failed to create book');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Book</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Excerpt</label>
                    <textarea
                        name="excerpt"
                        value={bookData.excerpt}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Author ID</label>
                    <input
                        type="text"
                        name="userId"
                        value={bookData.userId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">ISBN</label>
                    <input
                        type="text"
                        name="ISBN"
                        value={bookData.ISBN}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={bookData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Subcategory (comma-separated)</label>
                    <input
                        type="text"
                        name="subcategory"
                        value={bookData.subcategory}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="e.g., Programming, MERN, Web Development"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Release Date</label>
                    <input
                        type="date"
                        name="releasedAt"
                        value={bookData.releasedAt}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BookForm;
