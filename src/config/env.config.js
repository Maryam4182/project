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
    db_name: process.env.db_name,
    db_password: process.env.db_password,
    db_host: process.env.db_host,
    db_port: process.env.db_port,
    db_user: process.env.db_user,
}