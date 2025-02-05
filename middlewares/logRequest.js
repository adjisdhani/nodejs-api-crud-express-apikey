const db = require('../config/db');

const logRequest = async (req, res, next) => {
    const apiKey = req.header('x-api-key') || 'Unknown';
    const ip = req.ip || req.connection.remoteAddress;
    const endpoint = req.originalUrl;
    const method = req.method;

    // Simpan response status di variabel agar bisa dicatat
    const originalSend = res.send;
    res.send = function (body) {
        const statusCode = res.statusCode;

        // Simpan log ke database
        db.query("INSERT INTO api_logs (api_key, ip_address, endpoint, method, status_code) VALUES (?, ?, ?, ?, ?)", 
            [apiKey, ip, endpoint, method, statusCode],
            (err) => {
                if (err) console.error("Gagal menyimpan log:", err);
            }
        );

        originalSend.apply(res, arguments);
    };

    next();
};

module.exports = logRequest;