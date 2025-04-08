# Veloria SSR Deployment Guide

This guide explains how to deploy the Veloria application with Server-Side Rendering (SSR) to improve SEO and initial load performance.

## Local Development with SSR

To run the SSR server locally during development:

```bash
npm run dev:ssr
```

## Building for Production

Build both client and server bundles for SSR:

```bash
npm run build:ssr
```

This will create:

- `dist/client` - Static assets and client-side JavaScript
- `dist/server` - Server-side rendering bundle

## Deployment Options

### Option 1: Using the Automated Script

1. Upload your codebase to the server
2. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```
3. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

### Option 2: Using PM2 Directly

1. Upload your codebase to the server
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build for SSR:
   ```bash
   npm run build:ssr
   ```
4. Create a logs directory:
   ```bash
   mkdir -p logs
   ```
5. Start with PM2:
   ```bash
   pm2 start ecosystem.config.js --env production
   ```
6. Save the PM2 configuration:
   ```bash
   pm2 save
   ```

### Option 3: Using PM2 Deploy

If your project is managed in a Git repository:

1. Configure the `ecosystem.config.js` file with your server details
2. Run:
   ```bash
   pm2 deploy production setup
   pm2 deploy production
   ```

## Nginx Configuration

Copy the included `nginx.conf` file to your server:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/veloria
sudo ln -s /etc/nginx/sites-available/veloria /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## PM2 Useful Commands

- Start/restart the application:

  ```bash
  pm2 restart veloria-ssr
  ```

- View logs:

  ```bash
  pm2 logs veloria-ssr
  ```

- Monitor the application:

  ```bash
  pm2 monit
  ```

- Set up PM2 to start on server boot:
  ```bash
  pm2 startup
  pm2 save
  ```

## Troubleshooting

- Check server logs:

  ```bash
  pm2 logs veloria-ssr
  ```

- Verify Nginx configuration:

  ```bash
  sudo nginx -t
  ```

- If SSR is working but static assets aren't loading, check your Nginx paths for the assets directory

- Ensure file permissions are correct:
  ```bash
  sudo chown -R www-data:www-data /var/www/veloria
  ```
