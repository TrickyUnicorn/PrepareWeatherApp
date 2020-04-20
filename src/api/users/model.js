const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(Mongoose);

const UserSchema = new Schema({
    user_id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.methods = {
    authenticate (password) {
        return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
    },
};


UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = {
    UserSchema,
    User: Mongoose.model('User', UserSchema)
};