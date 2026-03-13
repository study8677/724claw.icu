const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 初始化数据文件
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('读取数据失败:', e);
  }
  return { posts: [], nextId: 1 };
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// 获取所有吐槽
app.get('/api/posts', (req, res) => {
  const data = loadData();
  // 按时间倒序
  const posts = data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(posts);
});

// 发布吐槽
app.post('/api/posts', (req, res) => {
  const { nickname, content, mood } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: '吐槽内容不能为空！' });
  }
  const data = loadData();
  const post = {
    id: data.nextId++,
    nickname: (nickname && nickname.trim()) || '匿名小龙虾',
    content: content.trim(),
    mood: mood || '🦞',
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  };
  data.posts.push(post);
  saveData(data);
  res.json(post);
});

// 点赞
app.post('/api/posts/:id/like', (req, res) => {
  const data = loadData();
  const post = data.posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: '找不到这条吐槽' });
  post.likes++;
  saveData(data);
  res.json({ likes: post.likes });
});

// 评论
app.post('/api/posts/:id/comments', (req, res) => {
  const { nickname, content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: '评论不能为空！' });
  }
  const data = loadData();
  const post = data.posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: '找不到这条吐槽' });
  const comment = {
    nickname: (nickname && nickname.trim()) || '匿名小龙虾',
    content: content.trim(),
    createdAt: new Date().toISOString()
  };
  post.comments.push(comment);
  saveData(data);
  res.json(comment);
});

app.listen(PORT, () => {
  console.log(`🦞 小龙虾吐槽墙已启动: http://localhost:${PORT}`);
});
