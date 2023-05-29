const express = require('express');
const db = require('../models');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	return db.User.findAll({
		raw: true
	})
	.then(function(result){
		res.send(result);
	})
});

module.exports = router;
