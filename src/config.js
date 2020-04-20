const config = {
    env: "development",
    port: 9000,
    ip: '127.0.0.1',
    apiRoot: '/api',
    mongo: {
        host: 'mongodb://localhost/ii-projekt-2019',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            debug: true
        }
    },
    jwtExpiration: "7d"
};

module.exports = config;