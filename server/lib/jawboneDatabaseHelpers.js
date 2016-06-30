const Activity = require('../models/ActivityModel');
const utils = require('./utils');
const conversions = require('./conversions');

module.exports = {
  syncIterateThrough: (data, userid, type, insert, cb) => {
    const syncTasks = [];
    data.data.items.forEach((datum) => {
      syncTasks.push((cb) => {
        insert(datum, userid, type, cb);
      });
    });
    syncTasks.push((callback) => {
      callback();
    });
    const callback = () => console.log('Inserted', type, 'items into database');
    utils.syncMap(syncTasks, callback, []);
    cb();
  },

  insertIntoDatabase: (datum, userid, type, cb) => {
    Activity.where({ user_id: userid, date: datum.date })
      .fetch()
      .then((activity) => {
        let act = activity || null;
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
        // ******* SWITCH CASE?
        if (type === 'activities') {
          return newAct.set({
            calories: datum.details.calories,
            distance: conversions.kmsToMiles(datum.details.km),
            steps: datum.details.steps,
          }).save();
        } else if (type === 'sleep') {
          const sleep = conversions.secondsToMinutes((datum.details.duration - datum.details.awake));
          const typeOfSleep = {
            rem: conversions.secondsToMinutes(datum.details.rem),
            light: conversions.secondsToMinutes(datum.details.light),
            deep: conversions.secondsToMinutes(datum.details.deep),
          };
          return newAct.set({
            totalSleep: sleep,
            sleep: JSON.stringify(typeOfSleep),
          }).save();
        } else if (type === 'hr') {
          return newAct.set({
            restingHR: datum.resting_heartrate,
          }).save();
        } else if (type === 'weight') {
          const weight = conversions.kgsToLbs(datum.weight);
          return newAct.set({
            weight,
          }).save();
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
