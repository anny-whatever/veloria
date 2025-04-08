module.exports = {
  apps: [
    {
      name: "veloria-ssr",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "300M",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
