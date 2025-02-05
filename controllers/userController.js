const User = require('../models/userModel');
const bcrypt  = require('bcrypt');

const userController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
      // Cek apakah email sudah digunakan
      const existingUser = await User.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      // Hash password sebelum disimpan ke database
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await User.create(name, email, hashedPassword);
      
      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;