import { generateTokens } from "../utils/token.js";
import bcrypt from 'bcrypt';
import AuthUser from "./auth.model.js";
import redis from "../database/redis.js";


export const registerUser = async ({email, password}) => {
    const existing = await AuthUser.findOne({ where: { email } });
    if (existing) {
        throw new Error('User with this email already exist');
    };

    const password_hash = await bcrypt.hash(password, 10);

    const user = await AuthUser.create({ email, password_hash });

    const { accessToken, refreshToken } = generateTokens({userID: user.id});

    await redis.set(`refresh:${user.id}`, refreshToken, {
        EX: 60 * 60 * 24 * 7
    })


    return {
        id: user.id,
        email: user.email,
        accessToken,
        refreshToken
    };
};

export const loginUser = async ({email, password}) => {
    const user = await AuthUser.findOne({ where: {email} });
    if (!user) {
        throw new Error('User with this email not founded');
    };

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials')
    };

    const { accessToken, refreshToken } = generateTokens({userID: user.id});

    await redis.set(`refresh:${user.id}`, refreshToken, {
        EX: 60 * 60 * 24 * 7
    })

    return {
        accessToken,
        refreshToken
    }
};

export const refreshUser = async (userID, oldToken) => {
    const key = `refresh:${userID}`;

    const savedToken = await redis.get(key);

    if (!savedToken || savedToken !== oldToken) {
        throw new Error('Invalid refresh token');
    }

    const { accessToken, refreshToken } = generateTokens({userID});
    
    await redis.set(`refresh:${userID}`, refreshToken, {
        EX: 60 * 60 * 24 * 7
    });

    await redis.del(key);

    return {accessToken, refreshToken}
};

export const logoutUser = async (userID) => {
    await redis.del(`refresh:${userID}`);
    return { message: 'Logged out successfully'}
};
