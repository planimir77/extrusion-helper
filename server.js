global.__basedir = __dirname;

require('dotenv').config();

const dbConnector = require('./server-root/config/db');
const config = require('./server-root/config/config');

dbConnector()
  .then(() => {
    const app = require('express')();

    require('./server-root/config/express')(app);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(err => console.error(err));