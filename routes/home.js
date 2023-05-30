const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');

router.get('/', authentication.isAuthenticated, function(req, res){
    const { firstName, lastName, email } = req.user;
    res.render('home', { userName: `${firstName} ${lastName}`, email });
});

module.exports = router;