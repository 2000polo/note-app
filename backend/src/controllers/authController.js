import User from '../models/User.js';
import { generateToken, getCookieOptions } from '../utils/generateToken.js';

const sendAuthResponse = (res, user, statusCode, message) => {
    const token = generateToken(user._id);
    res.cookie('token', token, getCookieOptions());

    res.status(statusCode).json({
        success: true,
        message,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already registered' });
        }

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
        });

        sendAuthResponse(res, user, 201, 'Registered successfully');
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        sendAuthResponse(res, user, 200, 'Logged in successfully');
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Not authorized, please login' });
        }

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
