const Post = require('../models/Post');

exports.getPosts = (req, res) => {
  const posts = Post.getAll();
  res.json(posts);
};

exports.createPost = (req, res) => {
  const { nickname, content, mood } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: '吐槽内容不能为空！' });
  }

  if (content.trim().length > 500) {
    return res.status(400).json({ error: '吐槽内容不能超过500字！' });
  }

  const post = Post.create({
    nickname: nickname ? nickname.trim() : '',
    content: content.trim(),
    mood,
  });

  res.status(201).json(post);
};

exports.likePost = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: '无效的帖子 ID' });
  }

  const result = Post.like(id);
  if (!result) {
    return res.status(404).json({ error: '找不到这条吐槽' });
  }

  res.json(result);
};

exports.addComment = (req, res) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId)) {
    return res.status(400).json({ error: '无效的帖子 ID' });
  }

  const { nickname, content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: '评论不能为空！' });
  }

  if (content.trim().length > 200) {
    return res.status(400).json({ error: '评论不能超过200字！' });
  }

  const comment = Post.addComment(postId, {
    nickname: nickname ? nickname.trim() : '',
    content: content.trim(),
  });

  if (!comment) {
    return res.status(404).json({ error: '找不到这条吐槽' });
  }

  res.status(201).json(comment);
};
