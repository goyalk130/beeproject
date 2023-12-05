// controllers/postController.js
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const postController = {
  createPost: async (req, res) => {
    try {
      const { title, content, author, tags } = req.body;
      const post = new Post({ title, content, author, tags });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const { skip, pageSize } = req.pagination;
      const posts = await Post.find().skip(skip).limit(pageSize);
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  

  getPostById: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, content, tags } = req.body;

      const post = await Post.findByIdAndUpdate(
        postId,
        { title, content, tags },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findByIdAndDelete(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addCommentToPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const { content, author } = req.body;

      const comment = new Comment({ content, author });
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      post.comments.push(comment);
      await post.save();

      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getCommentsForPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const { skip, pageSize } = req.pagination;

      const post = await Post.findById(postId).select('comments').populate({
        path: 'comments',
        options: { skip, limit: pageSize },
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(post.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateCommentInPost: async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const { content } = req.body;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const comment = post.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      comment.content = content;
      await post.save();

      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteCommentInPost: async (req, res) => {
    try {
      const { postId, commentId } = req.params;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const comment = post.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      comment.remove();
      await post.save();

      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = postController;

