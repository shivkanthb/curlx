const { outputResponse,
  outputResponseHeaders } = require('../output');
const { execCurl } = require('../utils/execute-curl.js');


module.exports = async (args, exec_str, db) => {
  let cx_response = await execCurl(exec_str);
  if (!cx_response) {
    outputResponse(`Error while executing ${exec_str}`);
    return;
  }
  outputResponseHeaders(cx_response.responseHeaders);
  outputResponse(cx_response.responseBody);
  if (cx_response.logData) {
    db.addToHistory(cx_response.logData);
  }
}
