const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Player, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
});


router.get('/', (req, res) => {
    Post.findAll({
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
            // pass post object onto the homepage
            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log(dbPostData[0])

            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// find a single post

// router.get('/post/:id', (req, res) => {
//   Post.findOne({
//       where: {
//           id: req.params.id
//       },
//       attributes: [
//           'id',
//           'post_url',
//           'title',
//           'body',
//           'created_at'

//       ],
//       include: [
//           {
//               model: Comment,
//               attributes: ['id', 'comment_text', 'post_id', 'player_id', 'created_at'],
//               include: {
//                   model: Player,
//                   attributes: ['username']
//               }
//           },
//           {
//               model: Player,
//               attributes: ['username']
//           }
//       ]
//   })
//       .then(dbPostData => {
//           if (!dbPostData) {
//               res.status(404).json({ message: 'There is no post with this ID!' });
//               return;
//           }

//           // serialize the data
//           const post = dbPostData.get({ plain: true });

//           // pass data to template
//           res.render('show-post', {
//               post,
//               loggedIn: req.session.loggedIn
//           });
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//       });
// });

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;