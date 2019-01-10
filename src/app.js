// =+Modules+=
const fs = require('fs');
const path = require('path');
const express = require('express');


// =+Configuration+=
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // used to set css/js scripts directory

const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), 'utf8');
const users = JSON.parse(userData);

// =+Routes+=
app.get('/', (req, res) =>{
    res.render('index', {title: 'Account Summary', accounts});
});

app.listen(3000, () => console.log('Project running on port 3000...'));
