const Player = require('./Player');
const Post = require('./Post');
const Comment = require('./Comment');
const Score = require('./Score')


Post.belongsTo(Player)
Player.hasMany(Post)
Post.hasMany(Comment)
Comment.belongsTo(Player)
Comment.belongsTo(Post)
Player.hasMany(Comment)
Player.hasMany(Score)
Score.belongsTo(Player)

module.exports = { Player, Post, Comment, Score };

