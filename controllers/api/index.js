const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');
const playerRoutes = require('./player-routes')


router.use('/players', playerRoutes)

router.use('/comments', commentRoutes);

router.use('/posts', postRoutes);

module.exports = router;