const router = require('express').Router();
const commentRoutes = require('./comment-routes');

const playerRoutes = require('./player-routes')

router.use('/players', playerRoutes)

router.use('/comments', commentRoutes);

module.exports = router;