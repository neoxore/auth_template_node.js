import { Sequelize } from "sequelize";
import { config } from "../config/index.js";
import logger from "../log/index.js";

const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: 'postgres',
        logging: msg => logger.debug(msg),
    }
);

export const initSequelize = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connected to Sequelize success')
    } catch (err) {
        logger.error('Failed to connect to Sequelize', err.message);
        process.exit(1);
    }
};

export default sequelize;


export const syncDB = async () => {
    try {
        await sequelize.sync({alter: true});
        logger.info('Migration done');
    } catch (err) {
        logger.error('Failed to miration', err.message);
        process.exit(1);
    }
};