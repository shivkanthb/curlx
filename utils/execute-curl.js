const { parseCurlCommand } = require('./parse-curl');
const { readResponse } = require('./read');
const shortid = require('shortid');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function execCurl(exec_str) {
  // let exec_str = 'curl -i ' + curlInput.join(' ');
  try {
    let curlxResponse = {};
    const { stdout, stderr } = await exec(exec_str);
    if (stderr.message) throw stderr;
    let response = readResponse(stdout);
    curlxResponse.responseHeaders = response.responseHeaders;
    curlxResponse.responseBody = JSON.parse(response.body);
    let curlObject = parseCurlCommand(exec_str);
    var timestamp = new Date().toLocaleString(undefined, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    let logData = {
      id: shortid.generate(),
      method: curlObject.method,
      command: exec_str,
      url: curlObject.url,
      status: response.statusCode,
      ts: timestamp
    }
    curlxResponse.logData = logData;
    return curlxResponse;
  } catch(err) {
    console.log(err.message);
    return null;
  }
}

module.exports = {
  execCurl
}