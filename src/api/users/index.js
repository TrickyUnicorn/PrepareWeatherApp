const { Router } = require('express');
const token = require('../../middlewares/token');
const router = Router();

const password = require('../../middlewares/password');

const {
    registerUser,
    loginUser
} = require('./controller');

router.post('/', registerUser);
router.post('/login', password, loginUser);

module.exports = router;