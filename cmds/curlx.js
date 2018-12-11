const { readInput }= require('../helpers/read');
const chalk = require('chalk');
const querystring = require('querystring');
const path = require('path');
const fb_config = require('../fb_config');
const { findAndRemoveFlag,
  formatQuerystring,
  formatHeaders,
  formulateRequestURL,
  prettyPrint } = require('../helpers');
const shortid = require('shortid')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

let useHost = fb_config.host;

async function curlCommand(curlInput) {
  let CMD = 'curl ' + curlInput;
  console.log(chalk.blue(CMD));
  try {
    const { stdout, stderr } = await exec(CMD);
    console.log(prettyPrint(stdout));
    let cmd = {
      id: shortid.generate(),
      method: "GET",
      command: `curl ${curlInput}`,
      ts: new Date(Date.now()).toString()
    }
  } catch(err) {
    console.log(err.message);
  }
}

module.exports = (args, curlInput) => {
  console.log(args);

  if (args.sb) {
    useHost = fb_config.sandbox_host;
    curlInput = findAndRemoveFlag(curlInput, '--sb', null);
  }

  if (args.qs) {
    curlInput = findAndRemoveFlag(curlInput, '--qs', args.qs);
    data = readInput(args.qs);
    let qs = formatQuerystring(data);
    curlInput = formulateRequestURL(curlInput, qs, useHost, fb_config.version);
  }

  if (args.headers) {
    curlInput = findAndRemoveFlag(curlInput, '--headers', args.headers);
    data = readInput(args.headers);
    let headerString = formatHeaders(data);
    curlInput.push(headerString);
  }

  curlInput = curlInput.join(' ');

  curlCommand(curlInput);

}
