const request = require('request');

const sendRequest = (url, auth, res, userid, helper, cb) => {
  const options = {
    url,
    method: 'GET',
    json: true,
    headers: {
      Authorization: auth,
      Accept: 'application/json',
    },
  };

  request(options, (err, response, body) => {
    if (err) {
      console.error('Error:', err);
    } else {
      helper(body, userid, cb);
      res.send();
    }
  });
};

const syncMap = (tasks, callback) => {
  if (tasks.length === 1) {
    tasks[0](() => callback());
  } else {
    tasks[0](() => {
      syncMap(tasks.slice(1), callback);
    });
  }
};

module.exports = { sendRequest, syncMap };
