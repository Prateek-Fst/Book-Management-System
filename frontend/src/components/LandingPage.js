import React from "react";
import { Link } from "react-router-dom"; // For navigation between pages

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Header Section */}
      <header className="bg-blue-600 py-6">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold">Library Management System</h1>
          <p className="mt-2 text-lg">A seamless way to manage books, users, and transactions</p>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto flex flex-col items-center justify-center py-12 px-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Welcome to Our Library Management System
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Search Section */}
            <div className="text-center bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-4">Create a Book</h3>
              <p className="text-gray-600 mb-4">Start Creating your creations.</p>
              <Link
                to="/createbook"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Start creating
              </Link>
            </div>

            {/* Borrow/Return Section */}
            <div className="text-center bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-4">View Books</h3>
              <p className="text-gray-600 mb-4">View the Books.</p>
              <Link
                to="/viewbooks"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Manage Borrowings
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Library Management System</p>
          <p className="mt-2">Built with React and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
