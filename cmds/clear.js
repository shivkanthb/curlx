const { outputClearHistory } = require('../output');


module.exports = (args, db) => {
  if (args.history) {
    db.clearHistory();
    outputClearHistory();
  }
}
