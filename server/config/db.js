const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.APP_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
      activity.integer('date'); // in form of yyyyMMdd
      activity.decimal('distance'); // in miles
      activity.integer('steps');
      activity.decimal('calories');
      activity.decimal('totalSleep');
      activity.decimal('restingHR');
      activity.decimal('weight'); // in lbs
      activity.string('heartRateZones', 1000);
      activity.string('sleep', 1000); // in hours
      activity.timestamps();
    }).then((table) => {
      console.log('Created Table activities:', table);
    });
  }
});

module.exports = db;
