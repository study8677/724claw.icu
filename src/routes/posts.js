const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /api/posts - 获取所有帖子
router.get('/', postController.getPosts);

// POST /api/posts - 发布帖子
router.post('/', postController.createPost);

// POST /api/posts/:id/like - 点赞
router.post('/:id/like', postController.likePost);

// POST /api/posts/:id/comments - 评论
router.post('/:id/comments', postController.addComment);

module.exports = router;
