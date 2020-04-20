const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(Mongoose);

const ChestSchema = new Schema({
    chest_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    heat: {
        type: String,
        required: true,
        enum: ['very cold', 'cold', 'neutral', 'warm', 'very warm'],
        default: 'very cold'
    }
});

ChestSchema.plugin(AutoIncrement, {inc_field: 'chest_id'});

module.exports = {
    ChestSchema,
    Chest: Mongoose.model('Chest', ChestSchema)
};