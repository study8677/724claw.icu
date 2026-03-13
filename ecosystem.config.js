module.exports = {
  apps: [{
    name: '724claw',
    script: 'server.js',
    instances: 1,           // SQLite 单进程即可
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    // 日志配置
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    merge_logs: true,
    // 自动重启配置
    max_memory_restart: '200M',
    watch: false,
    // 崩溃重启策略
    max_restarts: 10,
    restart_delay: 3000,
    autorestart: true,
  }],
};
