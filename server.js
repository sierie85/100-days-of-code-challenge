// Database init and connection
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: '.env' });
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => { console.error('Error connecting to database', err);});

// require packages
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes/routes');
// Express init
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
