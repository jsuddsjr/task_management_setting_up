const express = require('express');
const authentication = require('../middlewares/authentication');
const router = express.Router();

/* GET home page. */
router.get('/', authentication.isAuthenticated, function(_req, res) {
    res.redirect('/home');
});

router.use('/users', require('./users'));
router.use('/login', require('./login'));
router.use('/home',  require('./home'));

router.get('/logoff', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;
