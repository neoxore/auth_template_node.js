import { loginUser, logoutUser, refreshUser, registerUser } from "../auth/auth.service.js";
import logger from "../log/index.js";


export const registerHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser({email, password});
        logger.info(`New user created: ${user.id}`)
        res.status(201).json(user);
    } catch (err) {
        logger.warn(`Failed to create new user: ${err.message}`)
        res.status(400).json({error: err.message})
    }
};


export const loginHandler = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await loginUser({email, password});
        res.status(200).json(user);
    } catch (err) {
        logger.warn(`Failed to login: ${err.message}`);
        res.status(400).json({error: err.message})
    }
};

export const refreshHandler = async (req, res) => {
    try {
        const { userID } = req.user;
        const { token } = req;
        const newTokens = await refreshUser(userID, token);
        res.status(200).json(newTokens);
    } catch (err) {
        res.status(401).json({error: err.message});
    }
};

export const logoutHandler = async (req, res) => {
    try {
        const { userID } = req.user;
        const user = await logoutUser(userID)
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: "Failed to logout" })
    }
};
