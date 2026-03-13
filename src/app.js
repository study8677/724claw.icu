const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const postRoutes = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');
const createRateLimiter = require('./middleware/rateLimiter');

const app = express();

// ==================== 安全与压缩中间件 ====================
app.use(helmet({
  contentSecurityPolicy: false, // 前端有内联 script/style
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // 限制请求体大小

// ==================== 静态文件 ====================
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
}));

// ==================== API 限流 ====================
const postLimiter = createRateLimiter({
  windowMs: 60 * 1000,  // 1 分钟
  maxRequests: 10,       // 最多 10 次写操作
  message: '操作太频繁，请稍后再试 🦞',
});

// ==================== API 路由 ====================
// 读操作不限流
app.get('/api/posts', require('./controllers/postController').getPosts);

// 写操作限流
app.post('/api/posts', postLimiter, require('./controllers/postController').createPost);
app.post('/api/posts/:id/like', postLimiter, require('./controllers/postController').likePost);
app.post('/api/posts/:id/comments', postLimiter, require('./controllers/postController').addComment);

// ==================== GitHub Webhook ====================
app.post('/webhook/deploy', require('./webhook'));

// ==================== 错误处理 ====================
app.use(errorHandler);

module.exports = app;
