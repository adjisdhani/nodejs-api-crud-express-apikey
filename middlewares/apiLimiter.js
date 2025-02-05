const rateLimit = require("express-rate-limit");

// Middleware untuk membatasi 100 request per 10 menit per API Key
const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 menit
    max: 100, // Maksimal 100 request
    keyGenerator: (req) => req.headers["x-api-key"], // Identifikasi berdasarkan API Key
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests, please try again later.",
        });
    },
});

module.exports = apiLimiter;