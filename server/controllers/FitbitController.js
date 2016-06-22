// NEED ABILITY TO LOOP THROUGH DATE RANGE

const fitbitRequestHelpers = require('../lib/fitbitRequestHelpers');

const getFitbitData = (req, res) => {
  // const fitbitId = req.query.fitbit_id;
  // const accessToken = req.query.accessToken;
  // const startDate = req.query.startDate;
  // const endDate = req.query.endDate;
  // const auth = 'Bearer', accessToken;
  const fitbitId = '4PM7XM';
  // date needs to be in yyyy-MM-dd format
  const date = '2016-06-21';
  const startDate = '2016-06-18';
  const endDate = '2016-06-21';
  const auth = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjY1NTkyMDUsInNjb3BlcyI6InJ3ZWkgcnBybyByaHIgcnNsZSByc2V0IHJhY3QiLCJzdWIiOiI0UE03WE0iLCJhdWQiOiIyMjdWM00iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE0NjY1NTU2MDV9.fnvxGyTG2Id2ySXDeikYif3zcN39jJz3a5YeY9vsIWY';
  const distanceReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/distance/date/' + startDate + '/' + endDate + '.json';
  const stepsReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/steps/date/' + startDate + '/' + endDate + '.json';
  const caloriesReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/tracker/calories/date/' + startDate + '/' + endDate + '.json';
  const sleepReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/sleep/date/' + date + '.json';
  const hrReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/heart/date/' + date + '/1d.json';
  const weightReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/body/log/weight/date/' + startDate + '/' + endDate + '.json';

  fitbitRequestHelpers.sendRequest(distanceReqUrl, auth, res, fitbitRequestHelpers.insertDistance);
  fitbitRequestHelpers.sendRequest(stepsReqUrl, auth, res, fitbitRequestHelpers.insertSteps);
  fitbitRequestHelpers.sendRequest(caloriesReqUrl, auth, res, fitbitRequestHelpers.insertCalories);
  fitbitRequestHelpers.sendRequest(sleepReqUrl, auth, res, fitbitRequestHelpers.insertSleep);
  fitbitRequestHelpers.sendRequest(hrReqUrl, auth, res, fitbitRequestHelpers.insertHR);
  fitbitRequestHelpers.sendRequest(weightReqUrl, auth, res, fitbitRequestHelpers.insertWeight);
};

module.exports = getFitbitData;
