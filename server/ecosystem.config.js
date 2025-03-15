module.exports = {
  apps: [
    {
      name: "veloria-api", // Change this to your app name
      script: "server.js", // Change this to your entry point file
      env: {
        NODE_ENV: "production",
        PORT: 5000, // Specify the port explicitly
      },
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "300M", // Restart if memory usage exceeds 300M
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
