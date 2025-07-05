# Email Configuration Options for Zoho SMTP

## Official Zoho SMTP Settings

- **Outgoing Server Name**: smtp.zoho.in
- **Port**: 465 with SSL or 587 with TLS
- **Require Authentication**: Yes

## Current Configuration (587 with TLS) ✅ WORKING

```env
SMTP_HOST=smtp.zoho.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH_USER=admin@veloria.in
SMTP_AUTH_PASS=!Anny1603
FROM_EMAIL=admin@veloria.in
FROM_NAME=Veloria Team
TO_EMAIL=fragsteryt@gmail.com
```

## Alternative Configuration (465 with SSL)

If you prefer SSL instead of TLS:

```env
SMTP_HOST=smtp.zoho.in
SMTP_PORT=465
SMTP_SECURE=true
SMTP_AUTH_USER=admin@veloria.in
SMTP_AUTH_PASS=!Anny1603
FROM_EMAIL=admin@veloria.in
FROM_NAME=Veloria Team
TO_EMAIL=fragsteryt@gmail.com
```

## Troubleshooting

### Common Issues:

1. **Connection Timeout**: Check if your firewall or network is blocking the SMTP port
2. **Authentication Failed**: Verify your email credentials
3. **Connection Closed**: Usually indicates port/security mismatch

### Port Information:

- **Port 587**: Use with `SMTP_SECURE=false` (STARTTLS)
- **Port 465**: Use with `SMTP_SECURE=true` (SSL/TLS)

### Security Notes:

- Make sure "Less Secure Apps" is enabled in your Zoho account if using basic authentication
- Consider using App Passwords instead of your main password
- For production, use environment variables and never commit credentials to version control

### Testing Email Configuration:

1. Restart your server after changing email settings
2. Check server logs for connection verification messages
3. Test with a contact form submission
4. Monitor for any error messages in the console

### Zoho-Specific Requirements:

- Ensure your Zoho account has SMTP access enabled
- Verify that your domain is properly configured with Zoho
- Check if two-factor authentication affects SMTP access
