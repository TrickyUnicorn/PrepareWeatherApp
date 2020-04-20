const { Router } = require('express');
const token = require('../../middlewares/token');
const verifyUser = require('../../middlewares/verifyUser');
const router = Router();

const {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
} = require('./controller');

router.get('/', getTrips);
router.get('/:id', getTrip);
router.post('/', token, createTrip);
router.put('/:id', token, verifyUser, updateTrip);
router.delete('/:id', token, verifyUser, deleteTrip);

module.exports = router;