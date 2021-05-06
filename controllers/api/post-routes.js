const router = require('express').Router();

const { Post, Comment, Player } = require('../../models');

const withAuth = require('../../utils/auth');

// GET ALL POSTS
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'body',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                // include the Player model

                model: Player,
                attributes: ['username']
            },
            // add the comment model
            // {
            //     model: Comment,
            //     attributes: ['id', 'comment_text', 'post_id', 'player_id', 'created_at'],
            //     include: {
            //         model: Player,
            //         attributes: ['username']
            //     }
            // },
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log('There was an error! Post Routes. ' + err);
        });
});

// GET A POST BY ITS ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'body',
            'player_id',
            'created_at'
        ],
        // vote stuff eventually
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'player_id', 'created_at'],
                include: {
                    model: Player,
                    attributes: ['username']
                }
            },
            {
                model: Player,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'There is no post with this ID.' })
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log('There was an error!' + err);
            res.status(500).json(err);
        })
})

// CREATE A NEW POST
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        player_id: req.session.player_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log('There was an error! ' + err)
            res.status(500).json
        })
})

// UPDATE an existing POST
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        body: req.body.body
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this ID.' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log('There was an error!' + err);
            res.status(500).json(err);
        })
})

// DELETE request for localhost:3001/api/posts/:id
// DESTROY an existing POST
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(400).json({ message: 'No post found with this ID.' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log('There was an error!' + err);
            res.status(500).json(err);
        })


});

module.exports = router;

