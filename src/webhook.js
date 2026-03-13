const crypto = require('crypto');
const { execSync } = require('child_process');

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';

/**
 * GitHub Webhook 自动部署端点
 * 收到 push 事件后自动 git pull + pm2 reload
 */
module.exports = (req, res) => {
  // 验证 GitHub 签名（如果设置了 secret）
  if (WEBHOOK_SECRET) {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) {
      return res.status(401).json({ error: 'Missing signature' });
    }
    const body = JSON.stringify(req.body);
    const expected = 'sha256=' + crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
  }

  // 只处理 push 事件
  const event = req.headers['x-github-event'];
  if (event !== 'push') {
    return res.json({ message: `Ignored event: ${event}` });
  }

  console.log(`🦞 [${new Date().toISOString()}] 收到 GitHub push 事件，开始自动部署...`);

  try {
    // 异步执行部署，不阻塞响应
    res.json({ message: 'Deploy triggered' });

    // 部署命令
    const projectDir = process.cwd();
    const commands = [
      `cd ${projectDir} && git pull origin main`,
      `cd ${projectDir} && npm install --production`,
      'pm2 reload 724claw',
    ];

    for (const cmd of commands) {
      console.log(`🔧 执行: ${cmd}`);
      const output = execSync(cmd, { encoding: 'utf-8', timeout: 30000 });
      console.log(output);
    }

    console.log('✅ 自动部署完成！');
  } catch (e) {
    console.error('❌ 自动部署失败:', e.message);
  }
};
