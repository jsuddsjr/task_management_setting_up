const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('../models')

const router = express.Router();

/* GET Login Index page. */
router.get('/', function(req, res) {
    res.render('index');
});

/* POST Validate the user login */
router.post('/validate', passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/home');
    });


passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, cb) {
    db.User.findOne({
        where: {
            email: username
        },
        raw : true
    }).then(function(user){
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
    }).catch(function(error){
        if (error) { return cb(null, error); }
    });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.email);
});

passport.deserializeUser(function(username, cb) {
    db.User.findOne({
        where: {
            email: username
        },
        raw : true
    }).then(function(user) {
        cb(null, user.id);
    });
});

module.exports = router;