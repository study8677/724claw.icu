const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { contentFilter } = require('../middleware/contentFilter');

// GET /api/posts - 获取所有帖子
router.get('/', postController.getPosts);

// POST /api/posts - 发布帖子（经过敏感词过滤）
router.post('/', contentFilter, postController.createPost);

// POST /api/posts/:id/like - 点赞
router.post('/:id/like', postController.likePost);

// POST /api/posts/:id/comments - 评论（经过敏感词过滤）
router.post('/:id/comments', contentFilter, postController.addComment);

module.exports = router;
