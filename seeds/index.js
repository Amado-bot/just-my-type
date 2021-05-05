const seedPlayers = require('./player-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('----- Database Synced -----');
    await seedPlayers();
    console.log('----- Players Seeded -----');

    process.exit(0);
};

seedAll();