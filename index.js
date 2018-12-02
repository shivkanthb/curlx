const util = require('util');
const exec = util.promisify(require('child_process').exec);
const program = require('commander');
const querystring = require('querystring');
const readInput = require('./helpers/read').read;

async function curlCommand(curlInput) {
  try {
    const { stdout, stderr } = await exec('curl ' + curlInput);
    console.log(stdout);
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
  // curlCommand(curlInput);
}

main();
