const formatDate = (date) => date.split('-').join('');
const Activity = require('../models/ActivityModel');
const utils = require('./utils');

module.exports = {
  syncIterateThrough: (data, userid, type, array, insert, cb) => {
    console.log('data', data[array]);
    const syncTasks = [];
    data[array].forEach((datum) => {
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
    const formattedDate = formatDate(datum.dateTime);
    Activity.where({ user_id: userid, date: formattedDate })
      .fetch()
      .then((activity) => {
        let act = activity || null;
        if (!act) {
          act = new Activity({
            user_id: userid,
            date: formattedDate,
            device: 'Fitbit',
          });
        }
        return act;
      })
      .then((newAct) => {
        if (type === 'distance') {
          newAct.set({
            distance: datum.value,
          }).save();
        } else if (type === 'steps') {
          newAct.set({
            steps: datum.value,
          }).save();
        } else if (type === 'calories') {
          newAct.set({
            calories: datum.value,
          }).save();
        } else if (type === 'sleep') {
          newAct.set({
            totalSleep: datum.value,
          }).save();
        } else if (type === 'hr') {
          newAct.set({
            restingHR: datum.value.restingHR,
            heartRateZones: JSON.stringify(datum.value.heartRateZones),
          }).save();
        } else if (type === 'weight') {
          newAct.set({
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
