import { config } from "../config/index.js";
import pkg from 'pg';
import logger from "../log/index.js";


const { Pool } = pkg;

const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    name: config.db.name,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

export const initDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        logger.info('Connected to Postgres')
    } catch (err) {
        logger.error('Failed to connect to Postgres', err.message)
        process.exit(1);
    }
};