# Railway Deployment Checklist

## ✅ Pre-Deployment Changes Made

- [x] Updated database configuration to use Railway's `DATABASE_URL`
- [x] Added SSL support for production database connections
- [x] Updated package.json scripts for production deployment
- [x] Added health check endpoint (`/health`)
- [x] Added database connection testing on startup
- [x] Created deployment documentation

## 🔧 Railway Setup Required

### 1. Add PostgreSQL Database
- Go to Railway dashboard
- Click "New Project" → "Deploy from GitHub repo"
- After connecting your repo, click "New" → "Database" → "Add PostgreSQL"

### 2. Set Environment Variables
In Railway dashboard, go to your project → Variables tab and add:

**Required:**
- `NODE_ENV` = `production`
- `JWTSecret` = `your_secure_jwt_secret_here`
- `Base_URL` = `https://your-app-name.railway.app` (replace with your actual URL)

**Optional:**
- `sourceEmail` = `your_email@example.com`
- `adminUser` = `admin`
- `adminEmail` = `admin@example.com`
- `adminPassword` = `secure_admin_password`

### 3. Deploy
- Railway will automatically detect the `start` script
- The deployment will use the `DATABASE_URL` provided by Railway
- Check the logs for database connection success

## 🧪 Testing Deployment

1. **Health Check**: Visit `https://your-app-name.railway.app/health`
2. **Database Connection**: Check Railway logs for "Database connection has been established successfully"
3. **API Endpoints**: Test your API endpoints

## 🐛 Troubleshooting

If you still get connection errors:

1. **Check Railway Logs**: Look for database connection errors
2. **Verify DATABASE_URL**: Ensure Railway has provided the `DATABASE_URL` variable
3. **Check SSL**: The app now supports SSL connections required by Railway
4. **Environment Variables**: Ensure all required variables are set in Railway dashboard

## 📝 Local Development

For local development, create a `.env` file with:

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

Run with: `npm run dev` 