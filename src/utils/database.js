import { Sequelize, DataTypes } from 'sequelize';
import { Env } from "../config";

// Use Railway's DATABASE_URL if available, otherwise construct connection string
const getDatabaseUrl = () => {
    if (Env.DATABASE_URL) {
        return Env.DATABASE_URL;
    }
    
    // Fallback for local development
    return `postgres://${Env.db_user}:${Env.db_password}@${Env.db_host}:${Env.db_port}/${Env.db_name}`;
};

export const sequelize = new Sequelize(getDatabaseUrl(), {
    logging: false,
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    }
});

// Test database connection
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};
