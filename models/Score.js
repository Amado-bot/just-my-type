const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model{}

Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        wpm_score: {

        },
        accuracy_score: {

        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {

    }
)