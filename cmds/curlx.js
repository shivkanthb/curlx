const { readInput, readResponse }= require('../helpers/read');
const chalk = require('chalk');
const querystring = require('querystring');
const path = require('path');
const fb_config = require('../fb_config');
const { findAndRemoveFlag,
  formatQuerystring,
  formatHeaders,
  formulateRequestURL } = require('../helpers');
const shortid = require('shortid')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { outputResponse } = require('../output');
const { parseCurlCommand } = require('../helpers/parse-curl');
let useHost = fb_config.host;


async function curlCommand(curlInput) {
  let exec_str = 'curl -i ' + curlInput.join(' ');
  // console.log(chalk.blue(exec_str));
  try {
    const { stdout, stderr } = await exec(exec_str);
    
    let response = readResponse(stdout);
    outputResponse(response.responseHeaders);
    outputResponse(response.body);
    let curlObject = parseCurlCommand(exec_str);
    // console.log(curlObject);
    let cmd = {
      id: shortid.generate(),
      method: curlObject.method,
      command: exec_str,
      url: curlObject.url,
      status: response.statusCode,
      ts: new Date(Date.now()).toString()
    }
    return cmd;
  } catch(err) {
    console.log(err.message);
    return null;
  }
}


module.exports = async (args, curlInput, db) => {

  
  if (args.sb) {
    useHost = fb_config.sandbox_host;
    curlInput = findAndRemoveFlag(curlInput, '--sb', null);
  }

  if (args.qs) {
    console.log('here mane')
    curlInput = findAndRemoveFlag(curlInput, '--qs', args.qs);
    data = readInput(args.qs);
    console.log(data);
    let qs = formatQuerystring(data);
    curlInput = formulateRequestURL(curlInput, qs, useHost, fb_config.version);
    console.log('The curl iout')
    console.log(curlInput)
  }

  if (args.headers) {
    curlInput = findAndRemoveFlag(curlInput, '--headers', args.headers);
    data = readInput(args.headers);
    let headerString = formatHeaders(data);
    curlInput.push(headerString);
  }

  let exec_cmd = await curlCommand(curlInput);
  if (exec_cmd) {
    db.addToHistory(exec_cmd);
  }

}
