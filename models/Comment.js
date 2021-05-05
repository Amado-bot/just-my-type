const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {

}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // there needs to be at least one character before someone can post a comment
            len: [1]
        }
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'player',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

        // does this need to reference a "Profile" model since we want to comment on profiles?
        // references: {
        // model: 'profile',
        // key: 'id',
        //}
    }
},
    {
        sequelize,
        underscored: true,
        modelName: 'comment',
        freezeTableName: true
    }
);