const { Player } = require('../models');

const playerData = [
  {
    username: 'hype_type',
    email: 'hype_type@typing.com',
    password: '12345678'
  },
  {
    username: 'madfingerz',
    email: 'madfingerz@typing.com',
    password: '12345678'
  },
  {
    username: 'islaykeyboards',
    email: 'islaykeyboards@typing.com',
    password: '12345678'
  },
  {
    username: 'cant_catch_these_hands',
    email: 'cant_catch_these_hands@typing.com',
    password: '12345678'
  },
  {
    username: 'typing4life',
    email: 'typing4life@typing.com',
    password: '12345678'
  },
];

const seedPlayers = () => Player.bulkCreate(playerData);

module.exports = seedPlayers;