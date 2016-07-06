const file = require('../generatedUserData.json');
const environment = require('dotenv');

const Activity = require('../models/ActivityModel');

const insertGeneratedUsers = (file, userid) => {
  for (let key in file) {
    const data = { user_id: userid };
    data.device = file[key].deviceType;
    file[key].activitiesLog.forEach((activity) => {
      data.date = activity.date;
      data.distance = activity.distance;
      data.steps = activity.steps;
      data.calories = activity.calories;
      data.totalSleep = activity.totalSleep;
      data.restingHR = activity.restingHR;
      data.weight = activity.weight;
      data.heartRateZones = JSON.stringify(activity.heartRateZones) || null;
      data.sleep = JSON.stringify(activity.sleep) || null;
      new Activity(data).save();
    });
  }
};

insertGeneratedUsers(file, 1);
