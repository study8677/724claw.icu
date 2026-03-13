const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🦞 小龙虾吐槽墙已启动: http://localhost:${PORT}`);
  console.log(`📊 环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  数据库: SQLite (WAL 模式)`);
});
