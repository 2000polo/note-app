import ratelimit from '../config/upstash.js';

const rateLimitter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit('my-rate-limit');
        if (!success)
            return res.status(429).json({ error: "Too many requests" });
        next();
    } catch (error) {
        console.log("rate limitter error", error);
        next(error);
    }
};

export default rateLimitter;