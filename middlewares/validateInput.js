const Joi       = require('joi');
const validator = require('validator');

// Middleware untuk validasi dan sanitasi input
const validateGenerateKey = (req, res, next) => {
  // Schema validasi dengan Joi
  const schema = Joi.object({
    email: Joi.string().email().required()
  });

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid or missing JSON body' });
  }

  // Pastikan email ada dalam body
  if (!req.body.email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Sanitasi email menggunakan validator
  const sanitizedEmail = validator.escape(validator.normalizeEmail(validator.trim(req.body.email)));

  if (!validator.isEmail(sanitizedEmail)) {
     return res.status(400).json({ success: false, message: 'Email is not valid' });
  }

  // Validasi menggunakan Joi
  const { error, value } = schema.validate({
    email: sanitizedEmail
  });

  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  // Jika validasi berhasil, lanjutkan dengan data yang sudah divalidasi
  req.body = value; // Simpan data yang sudah divalidasi di request body
  next(); // Panggil middleware berikutnya
};

// Middleware untuk validasi dan sanitasi input
const validateInputParam = (req, res, next) => {
  // Schema validasi untuk id (parameter URL)
  const idSchema = Joi.object({
    id: Joi.number().integer().required().messages({
      'number.base': 'ID harus berupa angka',
      'number.integer': 'ID harus berupa angka bulat',
      'any.required': 'ID wajib diisi'
    })
  });

  // Ambil id dari parameter URL
  let { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: 'ID is required' });
  }

  // Sanitasi id dengan validator.escape() untuk mencegah XSS
  id = validator.escape(id);  // Escape karakter-karakter berbahaya

  // Ubah id menjadi angka untuk validasi dengan Joi
  id = parseInt(id, 10);

  if (id < 0) {
     return res.status(400).json({ success: false, message: 'ID is must positif number' });
  }

  // Validasi id dengan Joi
  const { error } = idSchema.validate({ id });

  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  // Jika validasi berhasil, lanjutkan ke middleware berikutnya
  next();
};


module.exports = {
  validateGenerateKey,
  validateInputParam
};