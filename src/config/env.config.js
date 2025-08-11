require("dotenv").config("../../env");

export default {
    PORT : process.env.PORT,
    JWTSecret: process.env.JWTSecret,
    Base_URL: process.env.Base_URL,
    sourceEmail: process.env.sourceEmail,
    adminUser: process.env.adminUser,
    adminEmail: process.env.adminEmail,
    adminPassword: process.env.adminPassword,
    // Database configuration - supports both local and Railway deployment
    db_name: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).pathname.slice(1) : process.env.db_name,
    db_password: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).password : process.env.db_password,
    db_host: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : process.env.db_host || 'localhost',
    db_port: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).port : process.env.db_port || '5432',
    db_user: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).username : process.env.db_user || 'postgres',
    // Use Railway's DATABASE_URL if available, otherwise use individual variables
    DATABASE_URL: process.env.DATABASE_URL
}