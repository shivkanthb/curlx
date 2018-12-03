const util = require('util');
const exec = util.promisify(require('child_process').exec);
const program = require('commander');
const querystring = require('querystring');
const readInput = require('./helpers/read').read;
const Storage = require('./storage').Database;

let db = new Storage();


async function curlCommand(curlInput) {
  try {
    const { stdout, stderr } = await exec('curl ' + curlInput);
    console.log(stdout);
    let cmd = {
      method: "GET",
      command: curlInput,
      ts: Date.now()
    }
    db.addToHistory(cmd);
  } catch(err) {
    console.log(err.message);
  }
}

function findAndRomoveFlag(args, flag, flagValue) {
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


function main() {
  let args = process.argv.slice(2);
  console.log(args);
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
      console.log(history);
      process.exit(0);
    }
    default: {
      console.log('No specific command executed');
    }
  }

  program
    .version('0.0.1')
    .option('--qs <querystring>', 'query string values')
    .option('--headers <headers>', 'headers')
    .parse(process.argv);

  if (program.qs) {
    console.log('query string exists');
    console.log(program.qs);
    curlInput = findAndRomoveFlag(args, '--qs', program.qs);
    data = readInput(program.qs);
    console.log(data);
    let qs = formatQuerystring(data);
    console.log(qs);
    curlInput = curlInput.join(' ') + qs;
  }

  if (program.headers) {
    console.log('headers exist');
    console.log(program.headers);
    curlInput = findAndRomoveFlag(args, '--headers', program.headers);
    let headerString = formatHeaders(program.headers);
    console.log(headerString);
  }

  console.log(curlInput);
  curlCommand(curlInput);
}

main();
