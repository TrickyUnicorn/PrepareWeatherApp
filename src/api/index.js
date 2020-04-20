const {Router} = require('express');
const chests = require('./chests');
const users = require('./users');
const trips = require('./trips');

const router = Router();

router.use('/chests', chests);
router.use('/users', users);
router.use('/trips', trips);

module.exports = router;