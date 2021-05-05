const { Comment, Player } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

// GET ALL COMMENTS
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Player,
                attributes: ['username']

            }
        ]

    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log('There was an error!' + err);
            res.status(500).json(err);
        });
});

// CREATE A NEW COMMENT
router.post('/', (req, res) => {
    // !!!!!!!!!!!!!!!! the user needs to be logged in before they're allowed to comment, add withAuth after log-ins are created !!!!!!!!!!!!!!!!!
    // if(req.session){
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        player_id: req.session.player_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log('There was an error! ' + err);
            res.status(400).json(err);
        });

    // }
})

// DELETE A COMMENT

router.delete('/:id', (req, res) => {

    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(400).json({ message: "There isn't a comment associated with this ID."})
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log('There was an error! ' + err)
        res.status(500).json(err);
    });
});

module.exports = router;