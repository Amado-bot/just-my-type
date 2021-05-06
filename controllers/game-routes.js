const router = require('express').Router();
const { Post, Player, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    res.render('game')
})

module.exports = router;