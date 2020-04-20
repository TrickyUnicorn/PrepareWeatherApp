const {User} = require('../api/users/model');

module.exports = (req, res, next) => {
    const id = req.params.id;
    let tokenid = req.user.user_id;

    try {
        User.findOne({ user_id: tokenid }).then((tokenUser) => {
            if (tokenUser === null) {
                return res.status(410).json({error: 'User does not exists'});
            }

            User.findOne({user_id: id}).then((databaseUser) => {
                if(databaseUser === null) {
                    return res.status(410).json({error: 'User does not exists'});
                }
                else if(tokenUser.user_id === databaseUser.user_id) {
                    next();
                }
                else {
                    return res.status(401).json({error: 'Unauthorized'});
                }
            });
        });

    } catch (e) {
        return next(e);
    }
};