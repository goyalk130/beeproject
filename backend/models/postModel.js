// models/postModel.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 1000 },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  content: { type: String, required: true, maxlength: 5000 },
  author: { type: String, required: true },
  tags: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 50 characters'] },
  comments: [commentSchema],
});

function arrayLimit(val) {
  return val.length <= 50;
}

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
