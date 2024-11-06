const Author = require('../models/authorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { title, name, phone, email, password, address } = req.body;

    if (!title || !name || !phone || !email || !password) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    const existingUser = await Author.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Author({
      title,
      name,
      phone,
      email,
      password,
      address
    });

    await user.save();
    res.status(201).json({ status: true, message: "User registered successfully", data: user });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Email and Password are required" });
    }

    const user = await Author.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ status: false, message: "Invalid credentials" });
    // }

    const token = jwt.sign({ userId: user._id }, 'book-management', { expiresIn: '1h' });
    res.status(200).json({ status: true, message: "Login successful", data: { token } });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
