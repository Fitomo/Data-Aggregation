const formatDate = (date) => date.split('-').join('');
const Activity = require('../models/ActivityModel');
const utils = require('./utils');

module.exports = {
  syncIterateThrough: (data, userid, type, array, insert, cb) => {
    const syncTasks = [];
    data[array].forEach((datum) => {
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
    const formattedDate = formatDate(datum.dateTime);
    Activity.where({ user_id: userid, date: formattedDate })
      .fetch()
      .then((activity) => {
        let act = activity || null;
        if (!act) {
          act = new Activity({
            user_id: userid,
            date: Number(formattedDate),
            device: 'Fitbit',
          });
        }
        return act;
      })
      .then((newAct) => {
        // ******* SWITCH CASE?
        if (type === 'distance') {
          return newAct.set({
            distance: datum.value,
          }).save();
        } else if (type === 'steps') {
          return newAct.set({
            steps: datum.value,
          }).save();
        } else if (type === 'calories') {
          return newAct.set({
            calories: datum.value,
          }).save();
        } else if (type === 'sleep') {
          return newAct.set({
            totalSleep: datum.value,
          }).save();
        } else if (type === 'hr') {
          return newAct.set({
            restingHR: datum.value.restingHR,
            heartRateZones: JSON.stringify(datum.value.heartRateZones),
          }).save();
        } else if (type === 'weight') {
          return newAct.set({
            weight: datum.value,
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
