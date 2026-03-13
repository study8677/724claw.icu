const db = require('../config/database');

exports.incrementVisitors = (req, res, next) => {
  try {
    // 增加访客数
    db.prepare(`
      UPDATE app_stats 
      SET value = value + 1 
      WHERE key = 'visitors_count'
    `).run();
    
    // 获取最新访客数
    const row = db.prepare(`SELECT value FROM app_stats WHERE key = 'visitors_count'`).get();
    
    res.json({ count: row ? row.value : 1000 });
  } catch (error) {
    next(error);
  }
};
