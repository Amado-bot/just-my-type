const router = require('express').Router();
const { Post, Player, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log('====================', req.session.loggedIn)
    res.render('game', {
        loggedIn: req.session.loggedIn
    })
})

module.exports = router;