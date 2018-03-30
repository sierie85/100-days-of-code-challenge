// Database init and connection
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => { console.error('Error connecting to database', err);});

// Express init
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes/routes');
const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express Middlware
app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Own routes
app.use('/', routes);

// Start express server on 8000
app.listen(8000, () => { 'app started' });
