const ApiKey = require('../models/apiKeyModel');

const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ message: 'API key is missing' });
  }

  const keyData = await ApiKey.validate(apiKey);
  if (!keyData) {
    return res.status(403).json({ message: 'Invalid API key, please generate key again' });
  }

  req.userId = keyData.user_id;
  next();
};

module.exports = validateApiKey;