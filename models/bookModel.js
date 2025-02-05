const Book = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM books');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const result = await db.query('INSERT INTO books SET ?', data);
    return result;
  },
  update: async (id, data) => {
    const result = await db.query('UPDATE books SET ? WHERE id = ?', [data, id]);
    return result;
  },
  delete: async (id) => {
    const result = await db.query('DELETE FROM books WHERE id = ?', [id]);
    return result;
  },
};

module.exports = Book;