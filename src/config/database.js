const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, '../../data');
const DB_PATH = path.join(DB_DIR, 'claw.db');
const DATA_JSON = path.join(__dirname, '../../data.json');

// 确保 data 目录存在
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

// 性能优化：开启 WAL 模式（并发读写更好）
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT DEFAULT '匿名小龙虾',
    content TEXT NOT NULL,
    mood TEXT DEFAULT '🦞',
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    nickname TEXT DEFAULT '匿名小龙虾',
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT (datetime('now')),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
  CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
`);

// 自动迁移：如果 data.json 存在且 posts 表为空，则执行数据迁移
function migrateFromJson() {
  const count = db.prepare('SELECT COUNT(*) as cnt FROM posts').get();
  if (count.cnt > 0) return; // 已有数据，跳过迁移

  if (!fs.existsSync(DATA_JSON)) return; // 没有 data.json，跳过

  try {
    const raw = fs.readFileSync(DATA_JSON, 'utf-8');
    const data = JSON.parse(raw);

    if (!data.posts || data.posts.length === 0) return;

    console.log(`🦞 发现 data.json，正在迁移 ${data.posts.length} 条帖子到 SQLite...`);

    const insertPost = db.prepare(`
      INSERT INTO posts (id, nickname, content, mood, likes, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertComment = db.prepare(`
      INSERT INTO comments (post_id, nickname, content, created_at)
      VALUES (?, ?, ?, ?)
    `);

    const migrate = db.transaction(() => {
      for (const post of data.posts) {
        insertPost.run(
          post.id,
          post.nickname || '匿名小龙虾',
          post.content,
          post.mood || '🦞',
          post.likes || 0,
          post.createdAt || new Date().toISOString()
        );

        if (post.comments && post.comments.length > 0) {
          for (const comment of post.comments) {
            insertComment.run(
              post.id,
              comment.nickname || '匿名小龙虾',
              comment.content,
              comment.createdAt || new Date().toISOString()
            );
          }
        }
      }
    });

    migrate();
    console.log(`✅ 数据迁移完成！已导入 ${data.posts.length} 条帖子`);

    // 重命名 data.json 为备份
    const backupPath = DATA_JSON + '.bak';
    fs.renameSync(DATA_JSON, backupPath);
    console.log(`📦 原 data.json 已备份为 data.json.bak`);
  } catch (e) {
    console.error('❌ 数据迁移失败:', e.message);
  }
}

migrateFromJson();

module.exports = db;
