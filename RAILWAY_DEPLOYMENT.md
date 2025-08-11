# Railway Deployment Guide

## Environment Variables Required

When deploying to Railway, you need to set the following environment variables:

### Required Variables
- `DATABASE_URL` - Railway automatically provides this when you add a PostgreSQL database
- `PORT` - Railway automatically sets this
- `NODE_ENV` - Set to `production`

### Optional Variables (set these in Railway dashboard)
- `JWTSecret` - Your JWT secret key
- `Base_URL` - Your application's base URL
- `sourceEmail` - Email for sending notifications
- `adminUser` - Admin username
- `adminEmail` - Admin email
- `adminPassword` - Admin password

## Deployment Steps

1. **Connect your GitHub repository to Railway**
2. **Add a PostgreSQL database** in Railway dashboard
3. **Set environment variables** in Railway dashboard
4. **Deploy** - Railway will automatically use the `start` script

## Local Development

For local development, create a `.env` file in the root directory with:

```env
PORT=3000
NODE_ENV=development
JWTSecret=your_jwt_secret_here
Base_URL=http://localhost:3000
sourceEmail=your_email@example.com
adminUser=admin
adminEmail=admin@example.com
adminPassword=admin_password
db_name=your_database_name
db_password=your_database_password
db_host=localhost
db_port=5432
db_user=postgres
```

## Running Locally

```bash
npm run dev
```

## Database Connection

The application now automatically detects Railway's `DATABASE_URL` environment variable and uses it for database connections. For local development, it falls back to individual database parameters. 