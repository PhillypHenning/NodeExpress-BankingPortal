const { accounts, writeJSON } = require('../data');
const express = require('express');
const router = express.Router();


router.get('/transfer', (req, res) => { res.render('transfer'); });

router.get('/payment', (req, res) => { res.render('payment', { account: accounts.credit }); });

router.post('/transfer', (req, res) => {

    var fa = req.body.from;
    var ta = req.body.to;

    accounts[fa].balance = parseInt(accounts[fa].balance - req.body.amount, 10);
    accounts[ta].balance = parseInt(accounts[ta].balance + req.body.amount, 10);

    writeJSON();
    res.render('transfer', { message: 'Transfer Completed' });
});

router.post('/payment', (req, res) => {
    accounts.credit.balance = parseInt(accounts.credit.balance - req.body.amount, 10);
    accounts.credit.available = parseInt(accounts.credit.available + req.body.amount, 10);

    writeJSON();
    res.render('payment', { message: 'Payment Successful!', account: accounts.credit });
});

module.exports = router;
