const { output404 } = require('../output');

module.exports = (args, db) => {
  let request_id = args._[1];
  let req = db.getRequestFromHistory(request_id);
  if (req) {
    require('./curlx')(args, req.command, db);
  } else {
    output404();
  }
}
