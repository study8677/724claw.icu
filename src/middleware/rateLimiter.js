/**
 * 简易内存限流中间件
 * 防止恶意刷帖，每个 IP 在时间窗口内最多 maxRequests 次
 */
function createRateLimiter({ windowMs = 60000, maxRequests = 15, message = '操作太频繁，请稍后再试 🦞' } = {}) {
  const requests = new Map();

  // 定期清理过期记录，防止内存泄漏
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of requests.entries()) {
      if (now - data.startTime > windowMs) {
        requests.delete(key);
      }
    }
  }, windowMs);

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const record = requests.get(ip);

    if (!record || now - record.startTime > windowMs) {
      requests.set(ip, { count: 1, startTime: now });
      return next();
    }

    record.count++;
    if (record.count > maxRequests) {
      return res.status(429).json({ error: message });
    }

    next();
  };
}

module.exports = createRateLimiter;
