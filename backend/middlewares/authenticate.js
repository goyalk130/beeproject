// middlewares/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate =async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  console.log(token)
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret_key');
    console.log(decoded)
    const user = await User.findOne({ _id:decoded.userId });
    if(!user){
      throw new Error
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
