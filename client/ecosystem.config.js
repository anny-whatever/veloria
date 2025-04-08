module.exports = {
  apps: [
    {
      name: "veloria-ssr",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "300M",
      log_date_format: "YYYY-MM-DD HH:mm Z",
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
