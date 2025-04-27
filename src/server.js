import { config } from "./config/index.js"
import app from './app.js';
import { initDB } from "./database/index.js";
import logger from "./log/index.js";
import { initSequelize, syncDB } from "./database/sequielize.js";


await initDB();
await initSequelize();
await syncDB();

app.listen(config.port, () => {
    logger.info('Server listening')
});