const {User} = require('../api/users/model');

module.exports = (req, res, next) => {
    if(!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({
            message: "Missing authorization header"
        });
    }

    const base64credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    User.findOne({ username: username }).then((user) => {
        if (user === null) {
            return res.status(401).json({error: "Can't find user"});
        }
        return user.authenticate(password, user.password).then((user) => {
            if(user === false) return res.status(403).json({error: 'Wrong password'});
            req.user = user;
            next();
        })
    });

};