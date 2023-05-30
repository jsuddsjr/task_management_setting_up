const express = require('express');
const passport = require('../controllers/login.js');

const router = express.Router();

/** @type {import('passport').AuthenticateOptions} */
const authenticateOptions = {
    failureRedirect: '/',
    successRedirect: '/home',
};

/* GET Login Index page. */
router.get('/', function(_req, res) {
    res.render('login');
});

/* POST Validate the user login */
router.post('/validate', passport.authenticate('local', authenticateOptions));
router.post('/validate/linkedin', passport.authenticate('linkedin', authenticateOptions));

module.exports = router;