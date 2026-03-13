/**
 * 统一错误处理中间件
 */
function errorHandler(err, req, res, _next) {
  console.error(`❌ [${new Date().toISOString()}] ${req.method} ${req.path}:`, err.message);

  // SQLite 约束错误
  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(400).json({ error: '数据约束错误' });
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? '服务器内部错误'
      : err.message,
  });
}

module.exports = errorHandler;
