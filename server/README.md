# Veloria Server

A simple Node.js server for handling form submissions with SQLite database and Zoho email integration.

## Features

- 📧 **Email Integration**: Zoho email support with SMTP configuration
- 🗄️ **SQLite Database**: Lightweight database for storing form submissions
- 🔒 **Security**: Rate limiting, input validation, and sanitization
- 🚀 **API Endpoints**: RESTful API for different form types
- 📝 **Form Types**: Contact, Book Call, and Get Started forms
- 📊 **Admin Panel**: Basic admin endpoints to view submissions

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_PATH=./database.sqlite

# Zoho Email Configuration
SMTP_HOST=smtp.zoho.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH_USER=your-email@yourdomain.com
SMTP_AUTH_PASS=your-app-password

# Email Settings
FROM_EMAIL=your-email@yourdomain.com
FROM_NAME=Veloria Team
TO_EMAIL=your-email@yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### 3. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Base URL

- Development: `http://localhost:3001`
- Production: `https://your-domain.com`

### Available Endpoints

#### 1. Health Check

```
GET /api/health
```

#### 2. Contact Form

```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",      // optional
  "company": "Company Name",   // optional
  "subject": "Inquiry",        // optional
  "message": "Hello there!"
}
```

#### 3. Book Call Form

```
POST /api/book-call
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",        // optional
  "company": "Company Name",     // optional
  "preferred_date": "2024-01-15", // optional
  "preferred_time": "14:00",      // optional
  "message": "I'd like to discuss..." // optional
}
```

#### 4. Get Started Form

```
POST /api/get-started
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",           // optional
  "company": "Company Name",        // optional
  "service_type": "Web Development", // optional
  "budget_range": "$10k-$50k",      // optional
  "project_description": "I need...", // optional
  "timeline": "3-6 months"          // optional
}
```

#### 5. Admin - View Submissions

```
GET /api/admin/submissions
GET /api/admin/submissions/contact_submissions
GET /api/admin/submissions/book_call_submissions
GET /api/admin/submissions/get_started_submissions
```

## Database Schema

### Contact Submissions

- `id` - Primary key
- `name` - Contact name
- `email` - Email address
- `phone` - Phone number (optional)
- `company` - Company name (optional)
- `subject` - Message subject (optional)
- `message` - Message content
- `created_at` - Timestamp
- `ip_address` - Client IP
- `user_agent` - Browser info

### Book Call Submissions

- `id` - Primary key
- `name` - Contact name
- `email` - Email address
- `phone` - Phone number (optional)
- `company` - Company name (optional)
- `preferred_date` - Preferred call date (optional)
- `preferred_time` - Preferred call time (optional)
- `message` - Additional message (optional)
- `created_at` - Timestamp
- `ip_address` - Client IP
- `user_agent` - Browser info

### Get Started Submissions

- `id` - Primary key
- `name` - Contact name
- `email` - Email address
- `phone` - Phone number (optional)
- `company` - Company name (optional)
- `service_type` - Type of service needed (optional)
- `budget_range` - Budget range (optional)
- `project_description` - Project details (optional)
- `timeline` - Project timeline (optional)
- `created_at` - Timestamp
- `ip_address` - Client IP
- `user_agent` - Browser info

## Email Configuration

### Zoho Email Setup

1. **Create App Password** (recommended over using your main password):

   - Go to Zoho Mail Settings
   - Navigate to Security → App Passwords
   - Generate a new app password
   - Use this password in your `.env` file

2. **SMTP Settings**:
   - Host: `smtp.zoho.in`
   - Port: `587` (with STARTTLS) or `465` (with SSL)
   - Authentication: Required

### Email Templates

The server sends two types of emails:

1. **Notification Email** - Sent to your configured email when a form is submitted
2. **Confirmation Email** - Sent to the user confirming their submission

## Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Validates required fields and formats
- **Input Sanitization**: Cleans and limits input data
- **CORS Protection**: Configurable cross-origin requests
- **Helmet.js**: Security headers
- **SQL Injection Prevention**: Parameterized queries

## Development

### File Structure

```
server/
├── package.json          # Dependencies and scripts
├── server.js            # Main server file
├── config.js            # Configuration management
├── database.js          # SQLite database setup
├── emailService.js      # Email functionality
├── routes.js            # API routes
├── database.sqlite      # SQLite database file (auto-created)
└── README.md           # This file
```

### Adding New Form Types

1. Add database table in `database.js`
2. Add email template in `emailService.js`
3. Add route in `routes.js`
4. Update validation as needed

## Error Handling

The server includes comprehensive error handling:

- **Validation Errors**: 400 Bad Request
- **Rate Limit Exceeded**: 429 Too Many Requests
- **Server Errors**: 500 Internal Server Error
- **Not Found**: 404 Not Found
- **CORS Errors**: 403 Forbidden

## Production Deployment

1. **Environment Variables**: Set all required environment variables
2. **CORS Configuration**: Update allowed origins in `server.js`
3. **SSL/TLS**: Use HTTPS in production
4. **Process Manager**: Use PM2 or similar for process management
5. **Database Backup**: Regular SQLite database backups
6. **Monitoring**: Set up logging and monitoring

### PM2 Example

```bash
npm install -g pm2
pm2 start server.js --name veloria-server
pm2 save
pm2 startup
```

## Testing

### Manual Testing

```bash
# Health check
curl http://localhost:3001/api/health

# Contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

### Using Postman

Import the following endpoints into Postman for testing:

- POST `/api/contact`
- POST `/api/book-call`
- POST `/api/get-started`
- GET `/api/health`
- GET `/api/admin/submissions`

## Troubleshooting

### Common Issues

1. **Email Not Sending**:

   - Check Zoho credentials
   - Verify SMTP settings
   - Check firewall/network settings

2. **Database Errors**:

   - Ensure write permissions for database file
   - Check disk space

3. **CORS Issues**:
   - Update allowed origins in `server.js`
   - Check request headers

### Logs

The server logs all requests and errors to the console. In production, consider using a logging service like Winston or similar.

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please create an issue in the repository or contact the development team.
