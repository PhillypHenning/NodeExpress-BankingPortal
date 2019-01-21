const express = require('express');

const router = express.Router();
const { accounts } = require('../data');



router.get('/account/savings', (req, res) => { res.render('account', { account: accounts.savings }); });

router.get('/account/checking', (req, res) => { res.render('account', { account: accounts.checking }); });

router.get('/account/credit', (req, res) => { res.render('account', { account: accounts.credit }); });

module.exports = router;