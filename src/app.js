// =+Modules+=
const fs = require('fs');
const path = require('path');
const util = require('util'); // Provides timestamp
const express = require('express');
const { accounts, users, writeJSON } = require('./data');

// =+Configuration+=
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // used to set css/js scripts directory
app.use(express.urlencoded({ extended: true })); // https://expressjs.com/en/api.html#express.urlencoded


// =+Routes+=
app.get('/', (req, res) =>{ res.render('index', {title: 'Account Summary', accounts}); });

app.get('/savings', (req, res) => { res.render('account', { account: accounts.savings }); });

app.get('/checking', (req, res) => { res.render('account', { account: accounts.checking }); });

app.get('/credit', (req, res) => { res.render('account', { account: accounts.credit }); });

app.get('/profile', (req, res) =>{ res.render('profile', { user: users[0] }); });

app.get('/transfer', (req, res) => { res.render('transfer'); });

app.get('/payment', (req, res) => { res.render('payment', { account: accounts.credit }); });

app.post('/transfer', (req, res) => {

    var fa = req.body.from;
    var ta = req.body.to;

    accounts[fa].balance = parseInt(accounts[fa].balance - req.body.amount, 10);
    accounts[ta].balance = parseInt(accounts[ta].balance + req.body.amount, 10);

    var accountsJSON = JSON.stringify(accounts, null, 4);
    writeJSON();
    res.render('transfer', { message: 'Transfer Completed' });
});

app.post('/payment', (req, res) => {
    accounts.credit.balance = parseInt(accounts.credit.balance - req.body.amount, 10);
    accounts.credit.available = parseInt(accounts.credit.available + req.body.amount, 10);

    writeJSON();
    res.render('payment', { message: 'Payment Successful!', account: accounts.credit });
});


app.listen(3000, () => util.log('Project running on port 3000...'));
