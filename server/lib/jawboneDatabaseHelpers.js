const Activity = require('../models/ActivityModel');
const utils = require('./utils');
const conversions = require('./conversions');

module.exports = {
  syncIterateThrough: (data, userid, type, insert, cb) => {
    if (Array.isArray(data.data.items)) {
      const syncTasks = [];
      // Put each database insertion instance into a queue
      data.data.items.forEach((datum) => {
        syncTasks.push((cb) => {
          insert(datum, userid, type, cb);
        });
      });
      syncTasks.push((callback) => {
        callback();
      });
      const callback = () => console.log('Inserted', type, 'items into database');
      // Insert each item into the database in sequence
      utils.syncMap(syncTasks, callback, []);
      cb();
    } else {
      cb();
    }
  },

  insertIntoDatabase: (datum, userid, type, cb) => {
    Activity.where({ user_id: userid, date: datum.date })
      .fetch()
      .then((activity) => {
        let act = activity || null;
        // If there is no such activity data point, create one
        if (!act) {
          act = new Activity({
            user_id: userid,
            date: Number(datum.date),
            device: 'Jawbone',
          });
        }
        return act;
      })
      .then((newAct) => {
        // Add different attributes to the row based on what type of request had been sent
        switch (type) {
        case 'activities':
          return newAct.set({
            calories: datum.details.calories,
            distance: conversions.kmsToMiles(datum.details.km),
            steps: datum.details.steps,
          }).save();
        case 'sleep':
          const sleep = conversions.secondsToHours((datum.details.duration - datum.details.awake));
          const typeOfSleep = {
            rem: conversions.secondsToHours(datum.details.rem),
            light: conversions.secondsToHours(datum.details.light),
            deep: conversions.secondsToHours(datum.details.deep),
          };
          return newAct.set({
            totalSleep: sleep,
            sleep: JSON.stringify(typeOfSleep),
          }).save();
        case 'hr':
          return newAct.set({
            restingHR: datum.resting_heartrate,
          }).save();
        case 'weight':
          const weight = conversions.kgsToLbs(datum.weight);
          return newAct.set({
            weight,
          }).save();
        default:
          return newAct;
        }
      })
      .then(() => {
        cb();
      })
      .catch((err) => {
        console.error('Error in inserting', type, err);
      });
  },
};
