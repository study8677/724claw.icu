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

// SQLite datetime('now') 存的是 UTC 但不带 Z 后缀，
// 前端 new Date() 会误解为本地时间，这里统一补上 Z
function fixTimestamp(obj) {
  if (obj && obj.createdAt && !obj.createdAt.endsWith('Z')) {
    obj.createdAt = obj.createdAt.replace(' ', 'T') + 'Z';
  }
  return obj;
}

class Post {
  /**
   * 获取所有帖子（含评论）
   */
  static getAll() {
    const posts = stmts.getAllPosts.all();
    return posts.map(post => {
      fixTimestamp(post);
      const comments = stmts.getCommentsByPostId.all(post.id).map(fixTimestamp);
      return { ...post, comments };
    });
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
    const post = fixTimestamp(stmts.getPostById.get(result.lastInsertRowid));
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
    return fixTimestamp(stmts.getComment.get(result.lastInsertRowid));
  }
}

module.exports = Post;
