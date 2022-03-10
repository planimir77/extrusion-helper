const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 4200,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: ['http://localhost:4200']
    },
    production: {
        port: process.env.PORT || 4200,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: ['https://extrusion-helper.herokuapp.com/']
    },
};

module.exports = config[env];
