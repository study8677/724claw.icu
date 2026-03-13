const db = require('../config/database');

// 预编译查询语句（性能优化）
const stmts = {
  getAllPosts: db.prepare(`
    SELECT id, nickname, content, mood, likes, created_at as createdAt
    FROM posts ORDER BY created_at DESC
  `),

  getPostById: db.prepare(`
    SELECT id, nickname, content, mood, likes, created_at as createdAt
    FROM posts WHERE id = ?
  `),

  getCommentsByPostId: db.prepare(`
    SELECT id, nickname, content, created_at as createdAt
    FROM comments WHERE post_id = ? ORDER BY created_at ASC
  `),

  createPost: db.prepare(`
    INSERT INTO posts (nickname, content, mood)
    VALUES (?, ?, ?)
  `),

  likePost: db.prepare(`
    UPDATE posts SET likes = likes + 1 WHERE id = ?
  `),

  getLikes: db.prepare(`
    SELECT likes FROM posts WHERE id = ?
  `),

  createComment: db.prepare(`
    INSERT INTO comments (post_id, nickname, content)
    VALUES (?, ?, ?)
  `),

  getComment: db.prepare(`
    SELECT id, nickname, content, created_at as createdAt
    FROM comments WHERE id = ?
  `),
};

class Post {
  /**
   * 获取所有帖子（含评论）
   */
  static getAll() {
    const posts = stmts.getAllPosts.all();
    return posts.map(post => ({
      ...post,
      comments: stmts.getCommentsByPostId.all(post.id),
    }));
  }

  /**
   * 创建帖子
   */
  static create({ nickname, content, mood }) {
    const result = stmts.createPost.run(
      nickname || '匿名小龙虾',
      content,
      mood || '🦞'
    );
    const post = stmts.getPostById.get(result.lastInsertRowid);
    return { ...post, comments: [] };
  }

  /**
   * 点赞
   */
  static like(id) {
    const result = stmts.likePost.run(id);
    if (result.changes === 0) return null;
    return stmts.getLikes.get(id);
  }

  /**
   * 添加评论
   */
  static addComment(postId, { nickname, content }) {
    // 先检查 post 是否存在
    const post = stmts.getPostById.get(postId);
    if (!post) return null;

    const result = stmts.createComment.run(
      postId,
      nickname || '匿名小龙虾',
      content
    );
    return stmts.getComment.get(result.lastInsertRowid);
  }
}

module.exports = Post;
