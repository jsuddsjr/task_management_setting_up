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
router.use('/auth',  require('./auth'));

router.get('/logout', (req, res) => {
    req.logOut(null, (err) => {
        if (err) {
            if (err instanceof Error) throw err;
            throw new Error(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
