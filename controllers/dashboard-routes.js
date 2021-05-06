const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            // get the ID from the [player] session
            player_id: req.session.player_id
        },
        attributes: [
            'id',
            'title',
            'body',
            'created_at'
        ],
        include: [
            {
                model: Player,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: Player,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'body',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'There is no post with this ID.' });
                return
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', {
                post,
                loggedIn: true
            })
        })

})

module.exports = router;