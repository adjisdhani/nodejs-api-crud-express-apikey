const cors = require('cors');
const publicCors = cors();

const router = express.Router();
const apiKeyController = require('../controllers/apiKeyController');
const { validateGenerateKey } = require('../middlewares/validateInput');

router.post('/generate-key', publicCors, validateGenerateKey, apiKeyController.generateKey);

module.exports = router;