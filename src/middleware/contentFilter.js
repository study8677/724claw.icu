const fs = require('fs');
const path = require('path');

// 加载敏感词库（启动时一次性加载到内存）
const wordsFile = path.join(__dirname, '../config/sensitive-words.txt');
let sensitiveWords = [];

try {
  const content = fs.readFileSync(wordsFile, 'utf-8');
  sensitiveWords = content
    .split('\n')
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 0);
  console.log(`🛡️  敏感词库已加载: ${sensitiveWords.length} 个词`);
} catch (e) {
  console.warn('⚠️  敏感词库加载失败:', e.message);
}

/**
 * 检查文本是否包含敏感词
 * @param {string} text - 待检查文本
 * @returns {string|null} - 命中的敏感词，或 null
 */
function checkSensitive(text) {
  if (!text || sensitiveWords.length === 0) return null;
  const lower = text.toLowerCase();
  for (const word of sensitiveWords) {
    if (lower.includes(word)) {
      return word;
    }
  }
  return null;
}

/**
 * Express 中间件：过滤请求体中的 content 和 nickname 字段
 */
function contentFilter(req, res, next) {
  const { content, nickname } = req.body || {};

  const hitContent = checkSensitive(content);
  if (hitContent) {
    return res.status(400).json({
      error: '内容包含敏感信息，请修改后重新提交 🛡️',
    });
  }

  const hitNickname = checkSensitive(nickname);
  if (hitNickname) {
    return res.status(400).json({
      error: '昵称包含敏感信息，请修改后重新提交 🛡️',
    });
  }

  next();
}

module.exports = { contentFilter, checkSensitive };
