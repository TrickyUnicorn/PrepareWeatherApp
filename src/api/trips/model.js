const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(Mongoose);

const TripSchema = new Schema({
    trip_id: {
        type: Number,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    weather: {
        location: {type: String},
        forecast: {type: Object}
    }
});

TripSchema.plugin(AutoIncrement, {inc_field: 'trip_id'});

module.exports = {
    TripSchema,
    Trip: Mongoose.model('Trip', TripSchema)
};