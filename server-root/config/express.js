const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const cookieSecret = process.env.COOKIESECRET;
const config = require('./config');
const apiRouter = require('../router');
const { errorHandler } = require('../utils')

module.exports = (app) => {
    // Create link to Angular build directory
    const distDir = __basedir + "/dist/extrusion-helper/";
    app.use(express.static(distDir));

    app.use(express.json());

    app.use(cookieParser(cookieSecret));

    app.use(session({
        secret: cookieSecret,
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: true,
            sameSite: true,
            httpOnly: true,
        }
    }));

    app.use(express.static(path.resolve(__basedir, 'static')));

    app.use(cors({
        origin: config.origin,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type",
        credentials: true
    }));

    app.use('/api', apiRouter);

    app.get('/*', (_req, res) => { res.sendFile(path.join(distDir, 'index.html')); });

    app.use(errorHandler);
};
