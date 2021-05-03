const router = require('express').Router();
const { like } = require('sequelize/types/lib/operators');
const { Player } = require('../../models');

// GET /api/players
router.get('/', (req, res) => {
    Player.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbPlayerData => res.json(dbPlayerData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/players/1
router.get('/:id', (req, res) => {
    Player.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Score,
                attributes: []
            },
            {
                model: Comment,
                attributes: [],
                include: {
                    model: Score,
                    attributes: ['title']
                }
            },
            {
                model: Score,
                attributes: ['title'],
                through: Like,
                as: 'liked_posts'
            }
        ]
    })
    .then(dbPlayerData => {
        if (!dbPlayerData) {
            res.status(404).json({ message: 'No player found with this id' });
            return;
        }
        res.json(dbPlayerData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// POST /api/players
router.post('/', (req, res) => {
    Player.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbPlayerData => res.json(dbPlayerData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {});

router.post('/logout', (req, res) => {});

// PUT /api/players/1
router.put('/:id', (req, res) => {
    Player.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbPlayerData => {
        if (!dbPlayerData[0]) {
            res.status(404).json({ message: 'No player found with this id' });
            return;
        }
        res.json(dbPlayerData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// DELETE /api/players/1
router.delete('/:id', (req, res) => {
    Player.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPlayerData => {
        if (!dbPlayerData) {
            res.status(404).json({ message: 'No player found with this id'});
            return;
        }
        res.json(dbPlayerData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;