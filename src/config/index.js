import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    jwt: {
        access_key: process.env.ACCESS_KEY,
        access_expire: process.env.ACCESS_EXPIRE,
        refresh_key: process.env.REFRESH_KEY,
        refresh_expire: process.env.REFRESH_EXPIRE
    }
};