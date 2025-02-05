const mysql = require('mysql2');

if (!mysql) {
  console.error('mysql tidak ditemukan!');
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const checkConnection = async () => {
  try {
    // Coba mendapatkan koneksi dari pool
    const connection = await pool.promise().getConnection();
    
    // Jika berhasil, cek koneksi
    console.log('Koneksi ke database berhasil!');
    
    // Setelah pengecekan, jangan lupa untuk melepaskan koneksi
    connection.release();
  } catch (err) {
    // Jika terjadi error, tampilkan pesan error
    console.error('Gagal terkoneksi ke database:', err);
  }
};

// Panggil fungsi untuk cek koneksi
checkConnection();

module.exports = pool.promise();