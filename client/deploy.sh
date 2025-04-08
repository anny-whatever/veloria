#!/bin/bash

# Stop execution if any command fails
set -e

echo "Starting Veloria SSR deployment..."

# Change to client directory if not already there
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build for SSR
echo "Building for SSR..."
npm run build:ssr

# Create logs directory if it doesn't exist
echo "Setting up log directory..."
mkdir -p logs

# Use PM2 to start/restart the application
echo "Deploying with PM2..."
if pm2 list | grep -q "veloria-ssr"; then
  echo "Reloading existing PM2 process..."
  pm2 reload ecosystem.config.js --env production
else
  echo "Starting new PM2 process..."
  pm2 start ecosystem.config.js --env production
fi

# Save PM2 configuration to persist across reboots
pm2 save

echo "Deployment completed successfully!"
echo "Your SSR application is now running."
echo "Make sure your Nginx configuration is properly set up." 