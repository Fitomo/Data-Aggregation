const Activity = require('../models/ActivityModel');
const utils = require('./utils');

module.exports = {
  syncIterateThrough: (data, userid, type, insert, cb) => {
    const syncTasks = [];
    data.data.items.forEach((datum) => {
      syncTasks.push((cb) => {
        insert(datum, userid, type, cb);
      });
    });
    syncTasks.push((callback) => {
      setTimeout(() => {
        callback();
      }, 1500);
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
            date: datum.date,
            device: 'Jawbone',
          });
        }
        return act;
      })
      .then((newAct) => {
        if (type === 'activities') {
          newAct.set({
            calories: datum.details.calories,
            distance: datum.details.km * 0.621371,
            steps: datum.details.steps,
          }).save();
        } else if (type === 'sleep') {
          const sleep = (datum.details.duration - datum.details.awake) / 60;
          const typeOfSleep = {
            rem: datum.details.rem / 60,
            light: datum.details.light / 60,
            deep: datum.details.deep / 60,
          };
          newAct.set({
            totalSleep: sleep,
            sleep: JSON.stringify(typeOfSleep),
          }).save();
        } else if (type === 'hr') {
          newAct.set({
            restingHR: datum.resting_heartrate,
          }).save();
        } else if (type === 'weight') {
          const weight = datum.weight * 2.20462;
          newAct.set({
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
