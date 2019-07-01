const { outputResponse,
  outputResponseHeaders } = require('../output');
const { execCurl } = require('../utils/execute-curl.js');


module.exports = async (args, exec_str, db) => {
  let cx_response = await execCurl(exec_str);
  outputResponseHeaders(cx_response.responseHeaders);
  outputResponse(cx_response.responseBody);
  if (cx_response.logData) {
    db.addToHistory(cx_response.logData);
  }
}
