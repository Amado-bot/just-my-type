const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api')
const gameRoutes = require('./game-routes.js')

router.use('/api', apiRoutes);
router.use('/game', gameRoutes)
router.use('/', homeRoutes)


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;