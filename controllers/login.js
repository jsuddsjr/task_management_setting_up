const passport = require('passport');
const Local = require('passport-local').Strategy;
const LinkedIn = require('passport-linkedin-oauth2').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models');
const { Op } = require('sequelize');

require('dotenv').config();

passport.use(new LinkedIn({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: process.env.LINKEDIN_REDIRECT,
    scope: ['r_emailaddress', 'r_liteprofile'],
},
/** @type {import('passport-linkedin-oauth2').VerifyFunction} */
async (accessToken, refreshToken, profile, done) => {
    try {
        const model = await db.User.findOne({
            where: { email: [Op.in, profile.emails.map(o => o.value) ] }
        });

        if (!model) {
            return done('Email not registered.', false);
        }

        const user = model.get();
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        const result = await model.save({
            fields: ['accessToken', 'refreshToken']}
        );
        if (!result) {
            return done('Failed to save tokens in session.', false);
        }

        done(null, user);
    } catch(err) {
        done(err, false);
    }
}));

passport.use(new Local({
    usernameField: 'email',
    passwordField: 'password'
},
/** @type {import('passport-local').VerifyFunction} */
async function(username, password, cb) {
    try {
        const model = await db.User.findOne({
            where: { email: username }
        });

        if (!model) {
            return cb('User unknown.', false);
        }

        // TODO: If the password hasn't been set yet, we update it here.
        const user = model.get();
        if (user.password === null) {
            user.password = await bcrypt.hash(password, 10);
            user.save({fields: ['password']});
        }
        else {
            const res = await bcrypt.compare(password, user.password);
            if (res === false)
                return cb('Password invalid.', false);
        }

        return cb(null, user);
    } catch(error) {
        if (error) { return cb(error); }
    }
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.email);
});

passport.deserializeUser(async function(username, cb) {
    const user = await db.User.findOne({
        where: {
            email: username
        },
        raw: true   // Does not return the model.
    });
    if (user) {
        cb(null, user);
    } else {
        cb('User not found.', null);
    }
});

module.exports = passport;