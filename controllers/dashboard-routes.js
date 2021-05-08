const router = require('express').Router();
const { Post, Player, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    
            res.render('dashboard', {
                loggedIn: req.session.loggedIn
            })
       
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