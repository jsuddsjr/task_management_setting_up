const express = require('express');
const passport = require('../middlewares/passport.js');

const router = express.Router();

/** @type {import('passport').AuthenticateOptions} */
const authenticateOptions = {
    failureRedirect: '/',
    successRedirect: '/home',
};

/* GET Login Index page. */
router.get('/', function(_req, res) {
    res.render('login', {title: 'Log in'});
});

/* POST Validate the user login */
router.post('/validate', passport.authenticate('local', authenticateOptions));

module.exports = router;