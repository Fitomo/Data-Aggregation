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

db.knex.schema.hasTable('activities').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('activities', (activity) => {
      activity.increments('id').primary();
      activity.integer('user_id');
      activity.string('device', 255);
      activity.string('date', 255); // in form of yyyyMMdd
      activity.decimal('distance'); // in miles
      activity.integer('steps');
      activity.decimal('calories');
      activity.decimal('totalSleep');
      activity.decimal('restingHR');
      activity.decimal('weight'); // in lbs
      activity.string('heartRateZones', 1000);
      activity.string('sleep', 1000); // in minutes
      activity.timestamps();
    }).then((table) => {
      console.log('Created Table activities:', table);
    });
  }
});

module.exports = db;
