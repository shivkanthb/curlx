const { output404,
  outpuNoRunChoiceError } = require('../output');

module.exports = (args, db) => {
  let request_id = args._[1];

  if (!request_id) {
    outpuNoRunChoiceError();
    return;
  }

  let req = null;
  if (request_id.indexOf(':') == -1) {
    req = db.getRequestFromHistory(request_id);
  } else {
    let collectionRequest = request_id.split(':');
    let collectionName = collectionRequest[0];
    let req_id = collectionRequest[1];
    req = db.getRequestFromCollection(collectionName, req_id);
  }

  if (req) {
    require('./curlx')(args, req.command, db);
  } else {
    output404();
  }
}
