import React, { useState } from 'react';
import { registerAuthor } from '../services/api'; // Import your API function
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AuthorForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      pincode: '',
    },
  });
  const navigate =useNavigate("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const fieldName = name.split('.')[1]; // For nested fields like "address.street"
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData)
    try {
      await registerAuthor(formData);
      alert('Registration successful!');
      navigate("/lib")
      setFormData({
        title: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        address: {
          street: '',
          city: '',
          pincode: '',
        },
      });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <select
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
            required
          />
        </div>

        {/* Address - Street */}
        <div>
          <label htmlFor="address.street" className="block text-sm font-medium">Street Address</label>
          <input
            type="text"
            id="address.street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
            required
          />
        </div>

        {/* Address - City */}
        <div>
          <label htmlFor="address.city" className="block text-sm font-medium">City</label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
            required
          />
        </div>

        {/* Address - Pincode */}
        <div>
          <label htmlFor="address.pincode" className="block text-sm font-medium">Pincode</label>
          <input
            type="text"
            id="address.pincode"
            name="address.pincode"
            value={formData.address.pincode}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
       <div className='flex justify-center'>
       <p className='pr-2'>Already a User</p> 
      <p className='text-[blue]'> <Link to ="/login">Login</Link></p>
       </div>
      </form>
    </div>
  );
};

export default AuthorForm;
