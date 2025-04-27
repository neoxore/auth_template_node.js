import jwt from "jsonwebtoken";
import { config } from "../config/index.js";


export const accessMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({error: 'Missing headers'});
        };

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, config.jwt.access_key);

        req.user = {
            userID: payload.userID
        };
        req.token = token;

        next();

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({error: 'Access token expired'});
        }
        return res.status(401).json({error: 'Invalid access token'});
    }
};


export const refreshMiddleware = (req, res, next) => {
    try {
        const authHeaders = req.headers['authorization'];
        if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
            res.status(401).json({error: 'Missing headers'});
        };

        const token = authHeaders.split(' ')[1];
        const payload = jwt.verify(token, config.jwt.refresh_key);

        req.user = {
            userID: payload.userID
        };
        req.token = token;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Refresh token expired' });
        }
        return res.status(401).json({ error: 'Invalid refresh token' });
    }
};