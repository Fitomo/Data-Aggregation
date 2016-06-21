const fitbitHelpers = require('../lib/fitbitDatabaseHelpers');

const getFitbitData = (req, res) => {
  // const fitbitId = req.query.fitbit_id;
  // const accessToken = req.query.accessToken;
  const fitbitId = '4Q7CZY';
  // date needs to be in yyyy-MM-dd format
  const date = '2016-06-20';
  // const auth = 'Bearer', accessToken;
  const auth = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjY0OTE3NTgsInNjb3BlcyI6InJ3ZWkgcnBybyByaHIgcnNsZSByc2V0IHJhY3QiLCJzdWIiOiI0UTdDWlkiLCJhdWQiOiIyMjdWM00iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE0NjY0ODgxNTh9.ABPxhPsUv0zv9tzLzmhNTcOQ7xre360M1M4OVK0ad5I';
  const activitiesReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/date/' + date + '.json';
  const sleepReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/sleep/date/' + date + '.json';
  const hrReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/heart/date/' + date + '/1d.json';

  fitbitHelpers.sendRequest(activitiesReqUrl, auth, res, fitbitHelpers.insertActivities);
  fitbitHelpers.sendRequest(sleepReqUrl, auth, res, fitbitHelpers.insertSleep);
  fitbitHelpers.sendRequest(hrReqUrl, auth, res, fitbitHelpers.insertHR);
};

module.exports = getFitbitData;
