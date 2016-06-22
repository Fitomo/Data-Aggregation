const jawboneRequestHelpers = require('../lib/jawboneRequestHelpers');
const syncMap = require('../lib/syncMap');

const getJawboneData = (req, res) => {
  // const userid = req.query.user_id
  // const accessToken = req.query.accessToken;
  // const startDate = req.query.startDate;
  // const endDate = req.query.endDate;
  // const auth = 'Bearer', accessToken;

  // date needs to be in yyyyMMdd format
  const date = '20160620';
  const userid = 1;
  const auth = 'Bearer u1r_4oEFjcHQQJPKxwCvVWS9Lrh8eW8PF-nYA3N-5RJm-gXqwHF2LXClRH9BEwm_cqtj6bMtuuJMWLqfgbkSwFECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP';
  const weightReqUrl = 'https://jawbone.com/nudge/api/v.1.1/users/@me/body_events';
  const activitiesReqUrl = 'https://jawbone.com/nudge/api/v.1.1/users/@me/moves?';
  const sleepReqUrl = 'https://jawbone.com/nudge/api/v.1.1/users/@me/sleeps?';
  const hrReqUrl = 'https://jawbone.com/nudge/api/v.1.1/users/@me/heartrates';

  const sendWeight = (cb) => jawboneRequestHelpers.sendRequest(weightReqUrl, auth, res, date, userid, jawboneRequestHelpers.insertWeight, cb);
  const sendActivities = (cb) => jawboneRequestHelpers.sendRequest(activitiesReqUrl, auth, res, date, userid, jawboneRequestHelpers.insertActivities, cb);
  const sendSleep = (cb) => jawboneRequestHelpers.sendRequest(sleepReqUrl, auth, res, date, userid, jawboneRequestHelpers.insertSleep, cb);
  const sendHR = (cb) => jawboneRequestHelpers.sendRequest(hrReqUrl, auth, res, date, userid, jawboneRequestHelpers.insertHR, cb);

  const syncTasks = [sendWeight, sendActivities, sendSleep, sendHR];
  const callback = () => console.log('Inserted all items into database');
  syncTasks.push((cb) => {
    setTimeout(() => {
      cb();
    }, 1000);
  });
  syncMap(syncTasks, callback, []);
};

module.exports = getJawboneData;
