import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, config.jwt.access_key, {
        expiresIn: config.jwt.access_expire
    })

    const refreshToken = jwt.sign(payload, config.jwt.refresh_key, {
        expiresIn: config.jwt.refresh_expire
    })

    return { accessToken, refreshToken }
};

