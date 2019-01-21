// =+Modules+=
const fs = require('fs');
const path = require('path');
const util = require('util'); // Provides timestamp
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');


// =+Configuration+=
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // used to set css/js scripts directory
app.use(express.urlencoded({ extended: true })); // https://expressjs.com/en/api.html#express.urlencoded


// =+Routes+=
app.get('/', (req, res) =>{ res.render('index', {title: 'Account Summary', accounts}); });
app.get('/profile', (req, res) =>{ res.render('profile', { user: users[0] }); });
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.listen(3000, () => util.log('Project running on port 3000...'));
