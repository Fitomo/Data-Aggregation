const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    database: 'fitomo_data_agg',
    user: 'root',
    password: '123',
    charset: 'utf8',
  },
});

const db = require('bookshelf')(knex);

db.knex.schema.hasTable('activity').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('activities', (activity) => {
      activity.increments('id').primary();
      activity.integer('activity_id');
      activity.string('fitbit_id', 255);
      activity.string('jawbone_id', 255);
      activity.string('date', 255);
      activity.integer('distance');
      activity.integer('steps');
      activity.integer('calories');
      activity.integer('totalSleep');
      activity.integer('restingHR');
      activity.integer('weight');
      activity.string('heartRateZones', 1000);
      activity.string('sleep', 1000);
      activity.timestamps();
    }).then((table) => {
      console.log('Created Table activities:', table);
    });
  }
});

module.exports = db;
