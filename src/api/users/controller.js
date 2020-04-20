const {User} = require('./model');
const bcrypt = require('bcryptjs');
const {sign} = require('../../services/jwt');


const registerUser = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        return res.status(201).json({
            user: {
                user_id: user.user_id,
                username: user.username
            },
            token: sign(user)
        });
    } catch (e) {
        if(e.name === 'MongoError' && e.code === 11000) {
            return res.status(409).json({
                message: 'Email already registered'
            });
        }
        next(e);
    }
};


const loginUser = async (req, res, next) => {
    const user = req.user;
    const token = sign(user);

    return res.json({
        user: {
            user_id: user.user_id,
            username: user.username
        },
        token: token
    });
};

module.exports = {
    registerUser,
    loginUser
};