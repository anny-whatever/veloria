# Email Service Setup Guide

## Problem

You're seeing connection timeout errors because the email service isn't properly configured. The server is trying to connect to SMTP servers with placeholder credentials.

## Solution

Create a `.env` file in the `server` directory with proper SMTP credentials.

## Step-by-Step Setup

### 1. Create the .env file

Create a new file named `.env` in the `server` directory:

```bash
cd server
touch .env
```

### 2. Choose your email provider and configure

#### Option A: Gmail (Recommended for development)

```bash
# Add this to your .env file
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH_USER=your-email@gmail.com
SMTP_AUTH_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Veloria Team
TO_EMAIL=your-email@gmail.com
```

**Gmail Setup Steps:**

1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an "App Password":
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
   - Use this password (not your regular password) in `SMTP_AUTH_PASS`

#### Option B: Outlook/Hotmail

```bash
# Add this to your .env file
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH_USER=your-email@outlook.com
SMTP_AUTH_PASS=your-password
FROM_EMAIL=your-email@outlook.com
FROM_NAME=Veloria Team
TO_EMAIL=your-email@outlook.com
```

#### Option C: Zoho (Current configuration)

```bash
# Add this to your .env file
SMTP_HOST=smtp.zoho.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH_USER=your-email@yourdomain.com
SMTP_AUTH_PASS=your-password
FROM_EMAIL=your-email@yourdomain.com
FROM_NAME=Veloria Team
TO_EMAIL=your-email@yourdomain.com
```

### 3. Replace placeholder values

Replace the following in your `.env` file:

- `your-email@gmail.com` - Your actual email address
- `your-app-password` - Your email app password
- `your-password` - Your email password
- `Veloria Team` - Your business name
- `your-email@gmail.com` - Email where you want to receive notifications

### 4. Restart your server

```bash
npm run dev
# or
node server.js
```

### 5. Test the configuration

The server will now show one of these messages:

- ✅ "Email server is ready to send messages" (Success)
- ❌ "Email configuration error" (Check your credentials)

## Common Issues and Solutions

### Connection Timeout (ETIMEDOUT)

- **Cause**: Wrong SMTP host/port or network issues
- **Solution**:
  - Verify SMTP settings for your email provider
  - Check if your network/firewall blocks SMTP ports
  - Try different ports (25, 465, 587)

### Authentication Failed (EAUTH)

- **Cause**: Wrong username/password
- **Solution**:
  - For Gmail: Use App Password, not regular password
  - For other providers: Verify credentials
  - Check if 2FA is enabled (may require app passwords)

### Connection Failed (ECONNECTION)

- **Cause**: Incorrect host or port
- **Solution**: Double-check your email provider's SMTP settings

## Development Mode

If you don't want to set up email during development, the server will:

- Save all form submissions to the database
- Log submission details to the console
- Show warnings about email not being configured
- Continue working normally (forms will still work)

## Production Considerations

For production:

1. Use environment variables from your hosting provider
2. Consider using services like:
   - SendGrid
   - Mailgun
   - AWS SES
   - Postmark

## Testing

Once configured, test by:

1. Submitting a contact form on your website
2. Check server logs for success/error messages
3. Check your email inbox for notifications

## Need Help?

If you continue having issues:

1. Check the server logs for specific error messages
2. Verify your email provider's SMTP settings
3. Try a different email provider
4. Consider using a dedicated email service (SendGrid, etc.)
