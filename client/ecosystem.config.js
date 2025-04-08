module.exports = {
  apps: [
    {
      name: "veloria-ssr",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3001,
      },
      time: true,
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
  deploy: {
    production: {
      user: "deploy",
      host: "veloria.in",
      ref: "origin/main",
      repo: "git@github.com:yourusername/veloria.git",
      path: "/var/www/veloria",
      "post-deploy":
        "cd client && npm install && npm run build:ssr && mkdir -p logs && pm2 reload ecosystem.config.js --env production",
    },
  },
};
