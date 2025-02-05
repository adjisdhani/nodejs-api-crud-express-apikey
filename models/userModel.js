const User = {
  create: async (name, email, password) => {
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result[0].insertId;
  },
  getByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  getAllUsers: async () => { 
    const [rows] = await db.query('SELECT id, name, email FROM users');
    return rows;
  }
};

module.exports = User;