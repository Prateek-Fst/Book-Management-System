const jwt = require('jsonwebtoken');
const Author = require('../models/authorModel');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'book-management');
    const user = await Author.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ status: false, message: 'Authentication failed' });
    }

    req.userId = user._id;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Authentication failed' });
  }
};
