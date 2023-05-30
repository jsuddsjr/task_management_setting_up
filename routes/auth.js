const express = require('express');
const passport = require('../middlewares/passport.js');

const router = express.Router();

/** @type {import('passport-linkedin-oauth2').AuthenticateOptions} */
const authenticateOptions = {
    failureRedirect: '/',
    successRedirect: '/home',
};


router.post('/linkedin', passport.authenticate('linkedin', authenticateOptions));
router.get('/linkedin/callback', passport.authenticate('linkedin', authenticateOptions));

module.exports = router;