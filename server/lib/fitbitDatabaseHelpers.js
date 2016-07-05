const formatDate = (date) => date.split('-').join('');
const Activity = require('../models/ActivityModel');
const utils = require('./utils');
const conversions = require('./conversions');

module.exports = {
  syncIterateThrough: (data, userid, type, array, insert, cb) => {
    // Handling different error messages from Fitbit
    if (data[array]) {
      const syncTasks = [];
      // Put each database insertion instance into a queue
      data[array].forEach((datum) => {
        syncTasks.push(() => {
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
    let formattedDate = '';
    // Weight comes back in different format than other things
    // If statement below checks for weight data
    if (!datum.dateTime) {
      formattedDate = formatDate(datum.date);
    } else {
      formattedDate = formatDate(datum.dateTime);
    }
    Activity.where({ user_id: userid, date: formattedDate })
      .fetch()
      .then((activity) => {
        let act = activity || null;
        // If there is no such activity data point, create one
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
        // Add different attributes to the row based on what type of request had been sent
        switch (type) {
        case 'distance':
          return newAct.set({
            distance: datum.value,
          }).save();
        case 'steps':
          return newAct.set({
            steps: datum.value,
          }).save();
        case 'calories':
          return newAct.set({
            calories: datum.value,
          }).save();
        case 'sleep':
          return newAct.set({
            totalSleep: conversions.minutesToHours(datum.value),
          }).save();
        case 'hr':
          return newAct.set({
            restingHR: datum.value.restingHR,
            heartRateZones: JSON.stringify(datum.value.heartRateZones),
          }).save();
        case 'weight':
          return newAct.set({
            weight: datum.weight,
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
