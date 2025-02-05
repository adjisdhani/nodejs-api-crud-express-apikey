const faker = require('@faker-js/faker').faker;
const bcrypt = require('bcrypt');

const seederController = {
  seedUsers: async (req, res) => {
    let { count } = req.body;

    // Pastikan count adalah angka & minimal 1
    count = parseInt(count);
    if (isNaN(count) || count <= 0) {
      return res.status(400).json({ message: 'Count must be a positive number' });
    }

    try {
      for (let i = 0; i < count; i++) {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const password = await bcrypt.hash('password123', 10);

        await db.query(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, password]
        );
      }

      res.json({ message: `${count} fake users inserted successfully!` });
    } catch (error) {
      console.error('❌ Seeding Error:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
};

module.exports = seederController;