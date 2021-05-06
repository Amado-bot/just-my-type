const router = require('express').Router();

const { Post, Player, Score } = require('../../models');

router.get('/', (req, res) => {
    Score.findAll({
        attributes: [
            'id',
            'wpm_score',
            'accuracy_score',
            'player_id'
        ],
        
    })
})