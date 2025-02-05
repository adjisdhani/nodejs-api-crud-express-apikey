const router                  = express.Router();
const bookController          = require('../controllers/bookController');
const validateApiKey          = require('../middlewares/authMiddleware');
const { validateInputParam }  = require('../middlewares/validateInput');
const cors 					  = require('cors');
const publicCors 			  = cors();

router.get('/', publicCors, validateApiKey, bookController.getAllBooks);
router.get('/:id', publicCors, validateInputParam, validateApiKey, bookController.getBookById);
router.post('/', publicCors, validateApiKey, bookController.createBook);
router.put('/:id', publicCors, validateInputParam, validateApiKey, bookController.updateBook);
router.delete('/:id', publicCors, validateInputParam, validateApiKey, bookController.deleteBook);

module.exports = router;