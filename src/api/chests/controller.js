const {Chest} = require('./model');
const {sign} = require('../../services/jwt');

const getEquipments = async (req, res, next) => {
    try {

        await Chest.find({}, (err, chests) => {
            let returnData = {};

            chests.forEach((chest) => {
               returnData['chest' + chest.chest_id] = {
                   chest_id: chest.chest_id,
                   name: chest.name,
                   description: chest.description,
                   heat: chest.heat
               }
            });
            res.status(200).json(returnData);
        });

    } catch(e) {
        return next(e);
    }
};

const getEquipment = async (req, res, next) => {
    try {
        Chest.findOne({ chest_id: req.params.id }).then((chest) => {
            if (chest === null) {
                return res.status(404).json({error: 'No chest found'});
            }
            return res.status(200).json({
                chest: {
                    chest_id: chest.chest_id,
                    name: chest.name,
                    description: chest.description,
                    heat: chest.heat
                }
            });
        });
    } catch(e) {
        return next(e);
    }
};

const createEquipment = async (req, res, next) => {
    try {
        const chest = await Chest.create({
            name: req.body.name,
            description: req.body.description,
            heat: req.body.heat
        });

        return res.status(201).json({
            chest: {
                chest_id: chest.chest_id,
                name: chest.name,
                description: chest.description,
                heat: chest.heat
            }
        })

    } catch(e) {
        return next(e);
    }
};

const updateEquipment = async (req, res, next) => {
    try {
        const chest = await Chest.findOne({chest_id: req.params.id});
        if(chest){
            chest.name = req.body.name;
            chest.description = req.body.description;
            chest.heat = req.body.heat;

            await chest.save();
            return res.status(200).json({message: "Updated"});
        }
        return res.status(404).json({error: "Chest not found"});

    } catch (e) {
        next(e)
    }
};

const deleteEquipment = async (req, res, next) => {
    try {
        const chest = await Chest.findOne({chest_id: req.params.id});
        if(chest){
            await chest.remove();
            return res.status(202).json({message: "Deleted"});
        }
        return res.status(404).json({error: "Chest not found"});

    } catch (e) {
        next(e)
    }
};

module.exports = {
    getEquipments,
    getEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment
};