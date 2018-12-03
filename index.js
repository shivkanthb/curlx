const util = require('util');
const exec = util.promisify(require('child_process').exec);
const program = require('commander');
const querystring = require('querystring');
const readInput = require('./helpers/read').read;
const Storage = require('./storage').Database;
const shortid = require('shortid')
const chalk = require('chalk');
const path = require('path');


let db = new Storage();


let fb_config = {
  host: 'https://graph.facebook.com',
  version: 'v3.2',
  sandbox_host: 'https://graph.shivkanth.sb.facebook.com'
}
let useHost = fb_config.host;

async function curlCommand(curlInput) {
  try {
    const { stdout, stderr } = await exec('curl ' + curlInput);
    console.log(chalk.bold(stdout));
    let cmd = {
      id: shortid.generate(),
      method: "GET",
      command: `curl ${curlInput}`,
      ts: new Date(Date.now()).toString()
    }
    db.addToHistory(cmd);
  } catch(err) {
    console.log(err.message);
  }
}

function findAndRemoveFlag(args, flag, flagValue) {
  if (args.indexOf(flag) > 0) {
    if (args.indexOf(flagValue)) {
      args.splice(args.indexOf(flag), 2);
    } else {
      args.splice(args.indexOf(flag), 1);
    }
  }
  return args;
}

function formatHeaders(headers) {
  try {
    headers = JSON.parse(headers);
  } catch(err) {
    console.log(err);
  }
  let keys = Object.keys(headers);
  let headerString = keys.reduce((accumulator, key) => {
    return accumulator + ' -H ' + JSON.stringify(`${key}:${headers[key]}`);
  },'');
  return headerString;
}

function formatQuerystring(qs) {
  try {
    qs = JSON.parse(qs);
  } catch(err) {
    console.log(err);
  }
  return '?' + querystring.stringify(qs)
}

function formulateRequestURL(args, qs) {
  return args.map((element) => {
    if (element.startsWith('/')) {
      return path.join(useHost, fb_config.version, element + qs);
    }
    return element;
  });
}


function main() {
  let args = process.argv.slice(2);
  // console.log(args);
  let curlInput = args;

  switch(curlInput[0]) {
    case 'collections': {
      let collections = db.getCollections();
      collections.forEach(function(collection) {
        let coll = db.data.collections[collection];
        console.log(`${collection}: ${coll}`);
      });
      process.exit(0);
    }
    case 'history': {
      let history = db.getHistory();
      console.table(history);
      process.exit(0);
    }
    default: {
      // console.log('No specific command executed');
    }
  }

  try {
    program
      .version('0.0.1')
      .allowUnknownOption()
      .option('--qs <querystring>', 'query string values')
      .option('--headers <headers>', 'headers')
      .option('--sb', 'use sandbox')
      .parse(process.argv);
  } catch(err) {
    console.log(err);
  }

  if (program.sb) {
    useHost = fb_config.sandbox_host;
    curlInput = findAndRemoveFlag(curlInput, '--sb', null);
  }

  if (program.qs) {
    curlInput = findAndRemoveFlag(curlInput, '--qs', program.qs);
    data = readInput(program.qs);
    let qs = formatQuerystring(data);
    curlInput = formulateRequestURL(curlInput, qs);

  }

  if (program.headers) {
    curlInput = findAndRemoveFlag(curlInput, '--headers', program.headers);
    data = readInput(program.headers);
    let headerString = formatHeaders(data);
    curlInput.push(headerString);
  }

  curlInput = curlInput.join(' ');

  console.log(chalk.green(curlInput));
  console.log();
  curlCommand(curlInput);
}

main();
