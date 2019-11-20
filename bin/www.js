const app = require('../');
const syncDb = require('./sync-db');

syncDb().then(() => {
  console.log('Sync database!');

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
});
