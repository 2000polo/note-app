import jwt from 'jsonwebtoken';

const getJwtSecret = () => process.env.JWT_SECRET || 'dev-jwt-secret';

export const generateToken = (userId) => {
    return jwt.sign({ userId }, getJwtSecret(), { expiresIn: '7d' });
};

export const getCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
});
