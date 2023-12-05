// routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');
const authenticate = require('../middlewares/authenticate');
const paginate = require('../middlewares/paginationMiddleware');

const router = express.Router();

router.use(authenticate);

router.post('/', postController.createPost);
router.get('/', paginate, postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);
router.post('/:postId/comments', postController.addCommentToPost);
router.get('/:postId/comments', paginate, postController.getCommentsForPost);
router.put('/:postId/comments/:commentId', postController.updateCommentInPost);
router.delete('/:postId/comments/:commentId', postController.deleteCommentInPost);

module.exports = router;
