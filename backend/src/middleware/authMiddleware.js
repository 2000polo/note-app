import jwt from 'jsonwebtoken';

const getJwtSecret = () => process.env.JWT_SECRET || 'dev-jwt-secret';

const protect = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, please login' });
        }

        const decoded = jwt.verify(token, getJwtSecret());

        if (!decoded.userId) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
};

export default protect;
