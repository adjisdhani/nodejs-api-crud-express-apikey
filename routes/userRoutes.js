const router           = express.Router();
const userController   = require('../controllers/userController');
const seederController = require('../controllers/seederController');
const cors 			   = require('cors');
const privateCors      = cors({
    origin: 'http://localhost:3000', // Ganti dengan domain backend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
});

router.post('/register', privateCors, userController.register);
router.get('/data-users', privateCors, userController.getAllUsers);
router.post('/generate-fake-user', privateCors, seederController.seedUsers);

module.exports = router;