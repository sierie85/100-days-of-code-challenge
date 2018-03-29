const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes/routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(8000, () => { 'app started' });
