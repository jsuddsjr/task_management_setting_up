const express = require('express');
const db = require('../models');
const router = express.Router();

/* GET users listing. */
router.get('/', async function(_req, res) {
    const result = await db.User.findAll({
        raw: true
    });
    res.send(result);
});

module.exports = router;
