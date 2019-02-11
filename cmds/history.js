const { outputHistory } = require('../output');


module.exports = (args, db) => {
  let history = db.getHistory();
  outputHistory(history);
}
