const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try{
  await cleanDB('User', 'users');

  await User.create(userSeeds);

  console.log('all done!');
    }catch(err){
        console.error('Error while seeding db', err);
    } finally{
  process.exit(0);
}
});