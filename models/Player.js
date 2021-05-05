const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Player extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Player.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newPlayerData) {
                newPlayerData.password = await bcrypt.hash(newPlayerData.password, 10);
                    return newPlayerData;
            },

            async beforeUpdate(updatedPlayerData) {
                updatedPlayerData.password = await bcrypt.hash(updatedPlayerData.password, 10);
                return updatedPlayerData;
            }
        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'player'
    }
);

module.exports = Player;