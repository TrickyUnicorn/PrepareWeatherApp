const { Router } = require('express');
const token = require('../../middlewares/token');
const verifyUser = require('../../middlewares/verifyUser');
const router = Router();

const {
    getEquipments,
    getEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment

} = require('./controller');

router.get('/', getEquipments);
router.get('/:id', getEquipment);
router.post('/', createEquipment);
router.put('/:id', token, verifyUser, updateEquipment);
router.delete('/:id', token, verifyUser, deleteEquipment);

module.exports = router;