const expect = require('chai').expect;
const request = require('request');
const environment = require('dotenv');

// Load environment variables
if (process.env.NODE_ENV === 'development') {
  environment.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  environment.config({ path: './env/production.env' });
}

const Activity = require('../server/models/ActivityModel');
const fitbitDatabaseHelpers = require('../server/lib/fitbitDatabaseHelpers');
const jawboneDatabaseHelpers = require('../server/lib/jawboneDatabaseHelpers');

describe('Database insertion and retrieval:', function() {
  it('Inserts and retrieves Fitbit data correctly', function(done) {
    const datum = {
      date: '2016-07-04',
      value: 10,
    };
    const cb = (length) => {
      Activity.where({ user_id: 2000 })
      .fetchAll()
      .then((result) => {
        expect(result.length).to.equal(length);
        done();
      });
    };
    fitbitDatabaseHelpers.insertIntoDatabase(datum, 1000, 'distance', () => cb(1));
  });

  it('Inserts and retrieves Jawbone data correctly', function(done) {
    const datum1 = {
      date: '20160704',
      details: {
        calories: 1500,
        km: 15,
        steps: 10000,
      },
    };
    const cb = (length) => {
      Activity.where({ user_id: 2000 })
      .fetchAll()
      .then((result) => {
        expect(result.length).to.equal(length);
        done();
      });
    };
    jawboneDatabaseHelpers.insertIntoDatabase(datum1, 2000, 'activities', () => cb(1));
  });
});
