const router = require('express').Router();

const { Player, Score } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Score.findAll({
        attributes: [
            'id',
            'wpm_score',
            'accuracy_score',
            'player_id'
        ],
        
    })
    .then(dbScoreData => res.json(dbScoreData))
        .catch(err => {
            console.log('There was an error! Score routes. ' + err);
        });
});

router.get('/:id', withAuth, (req, res) => {
    Score.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'wpm_score',
            'accuracy_score',
            'player_id'
        ],
        // vote stuff eventually
        include: [
            {
                model: Player,
                attributes: ['username']
            }
        ]
    })
        .then(dbScoreData => {
            if (!dbScoreData) {
                res.status(404).json({ message: 'There is no score with this ID.' })
                return;
            }
            res.json(dbScoreData);
        })
        .catch(err => {
            console.log('There was an error!' + err);
            res.status(500).json(err);
        })
})

// CREATE A NEW SCORE
router.post('/', withAuth, (req, res) => {
    Score.create({
        wpm_score: req.body.wpm_score,
        accuracy_score: req.body.accuracy_score,
        player_id: req.session.player_id
    })
        .then(dbScoreData => res.json(dbScoreData))
        .catch(err => {
            console.log('There was an error! ' + err)
            res.status(500).json
        })
})

// UPDATE an existing POST
router.put('/:id', withAuth, (req, res) => {
    Score.update({
        wpm_score: req.body.wpm_score,
        accuracy_score: req.body.accuracy_score,
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbScoreData => {
            if (!dbScoreData) {
                res.status(404).json({ message: 'No post score with this ID.' });
                return;
            }
            res.json(dbScoreData);
        })
        .catch(err => {
            console.log('There was an error!' + err);
            res.status(500).json(err);
        })
})

// DELETE request for localhost:3001/api/posts/:id
// DESTROY an existing POST
router.delete('/:id', withAuth, (req, res) => {
    Score.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbScoreData => {
            if (!dbScoreData) {
                res.status(400).json({ message: 'No score found with this ID.' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log('There was an error!' + err);
            res.status(500).json(err);
        })


});

// router.post('/', (req, res) => {
//     console.log('score route');
//     res.end();
// });

module.exports = router;