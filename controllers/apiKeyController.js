const ApiKey = require('../models/apiKeyModel');
const User = require('../models/userModel');

const apiKeyController = {
  generateKey: async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
      const user = await User.getByEmail(email);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const exect = await ApiKey.generate(user.id);

      res.json(exect);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = apiKeyController;