const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {


// add upvote functionality here

}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },

        player_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'player',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'post'
    }
);

module.exports = Post;