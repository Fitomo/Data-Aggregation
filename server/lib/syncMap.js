const syncMap = (tasks, callback) => {
  if (tasks.length === 1) {
    tasks[0](() => {
      return callback();
    });
  } else {
    tasks[0](() => {
      syncMap(tasks.slice(1), callback);
    });
  }
};

module.exports = syncMap;
