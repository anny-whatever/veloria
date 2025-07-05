# Zoho SMTP Authentication Troubleshooting Guide

## 🚨 Error: 535 Authentication Failed

This error means Zoho is rejecting your login credentials. Here are the most common causes and solutions:

## 🔧 Solution 1: Enable SMTP Access (Most Common)

### Step 1: Login to Zoho Mail

1. Go to [https://mail.zoho.in](https://mail.zoho.in)
2. Login with your `admin@veloria.in` account

### Step 2: Enable SMTP Access

1. Go to **Settings** → **Security** → **App Passwords**
2. Or go to **Settings** → **Mail** → **POP/IMAP Access**
3. **Enable SMTP Access** for your account

### Step 3: Generate App Password (Recommended)

1. Go to **Settings** → **Security** → **App Passwords**
2. Click **Generate New Password**
3. Name it "Veloria API" or similar
4. Copy the generated password
5. Use this password instead of your regular password

## 🔧 Solution 2: Check Account Settings

### Verify Your Domain Setup

1. Make sure `veloria.in` is properly configured in your Zoho account
2. Check if the domain is verified and active
3. Ensure SMTP is enabled for your domain

### Check Account Status

1. Verify your account is not suspended
2. Check if there are any security restrictions
3. Ensure you have proper access rights

## 🔧 Solution 3: Use App Password

If you have 2FA enabled or for better security:

1. **Generate App Password:**

   - Login to Zoho Mail
   - Go to Security Settings
   - Generate a new App Password
   - Use this password in your .env file

2. **Update your .env file:**
   ```env
   SMTP_AUTH_PASS=your_app_password_here
   ```

## 🔧 Solution 4: Alternative Authentication Methods

### Method 1: OAuth2 (Advanced)

If basic authentication doesn't work, you might need OAuth2:

```javascript
// In emailService.js, you could use OAuth2
const transporter = nodemailer.createTransporter({
  service: "Zoho",
  auth: {
    type: "OAuth2",
    user: "admin@veloria.in",
    clientId: "your_client_id",
    clientSecret: "your_client_secret",
    refreshToken: "your_refresh_token",
  },
});
```

### Method 2: Different SMTP Settings

Try these alternative settings:

```env
# Option A: Different port
SMTP_PORT=465
SMTP_SECURE=true

# Option B: Different host (if using custom domain)
SMTP_HOST=smtp.zoho.com
```

## 🔧 Solution 5: Test with Different Credentials

### Create a Test Script

```bash
cd server
node test-email.js
```

### Manual Test Steps

1. Try logging into Zoho Mail web interface with the same credentials
2. If web login fails, reset your password
3. If web login works but SMTP fails, it's an SMTP access issue

## 🔧 Solution 6: Domain-Specific Issues

If you're using a custom domain (`veloria.in`):

1. **Check DNS Settings:**

   - Verify MX records are correct
   - Check CNAME records for mail

2. **Zoho Console Settings:**
   - Login to Zoho Admin Console
   - Check domain verification status
   - Ensure SMTP is enabled for your domain

## 🔧 Solution 7: Account Verification

### Verify Account Status

1. Check if your Zoho account needs verification
2. Look for any pending email verifications
3. Ensure your domain is fully set up

### Check Billing/Plan Status

1. Verify your Zoho plan supports SMTP
2. Check if there are any account limitations

## 🔧 Quick Fix Steps (Try in Order)

1. **Generate App Password** (Most likely solution)
2. **Enable SMTP Access** in Zoho settings
3. **Try port 465 with SSL**
4. **Contact Zoho Support** if none work

## 🔧 Updated .env Template

After getting your app password:

```env
PORT=5000
NODE_ENV=development
DB_PATH=./database.sqlite
SMTP_HOST=smtp.zoho.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH_USER=admin@veloria.in
SMTP_AUTH_PASS=your_app_password_here  # Use app password, not regular password
FROM_EMAIL=admin@veloria.in
FROM_NAME=Veloria Team
TO_EMAIL=fragsteryt@gmail.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 🆘 If All Else Fails

### Alternative Email Providers

Consider switching to:

- **Gmail SMTP** (smtp.gmail.com:587)
- **Outlook SMTP** (smtp-mail.outlook.com:587)
- **SendGrid** (smtp.sendgrid.net:587)

### Contact Support

- Zoho Support: Contact them about SMTP access
- Check Zoho Mail documentation for your specific plan

## 🔄 Next Steps

1. **Try generating an app password first** (most common fix)
2. **Test with the test script**: `node test-email.js`
3. **Check the server logs** when starting your server
4. **Verify web login** works with the same credentials
