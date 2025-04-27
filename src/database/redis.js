import pkg from 'redis';
import logger from '../log/index.js';

const { createClient } = pkg;
const redis = createClient();

redis.on('error', (err) => logger.error(`Failed to connect to redis ${err.message}`));
redis.on('connect', () => logger.info('Redis connected'));

await redis.connect();

export default redis;


