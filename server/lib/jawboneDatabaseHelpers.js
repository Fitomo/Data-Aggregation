const Activity = require('../models/ActivityModel');
const syncMap = require('./syncMap');

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
    syncMap(syncTasks, callback, []);
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
            distance: datum.details.km,
            steps: datum.details.steps,
          }).save();
        } else if (type === 'sleep') {
          const sleep = (datum.details.duration - datum.details.awake) / 60;
          newAct.set({
            totalSleep: sleep,
          }).save();
        } else if (type === 'hr') {
          newAct.set({
            restingHR: datum.resting_heartrate,
          }).save();
        } else if (type === 'weight') {
          const weight = datum.weight * 2.2046;
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
