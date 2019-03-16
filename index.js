const minimist = require('minimist');
const { sanitizeCurlArgs } = require('./helpers/parse-curl');
const { wrapArguments, 
  buildExecString } = require('./helpers');
const Storage = require('./storage').Database;
let db = new Storage();

module.exports = () => {
  const cmdArgs = sanitizeCurlArgs(process.argv.slice(2))
  const args = minimist(cmdArgs);
  
  let cmd_string = wrapArguments(cmdArgs);
  let cmd = args._[0] ? args._[0] : 'help';

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'run':
      require('./cmds/run')(args, db)
      break

    case 'version':
      require('./cmds/version')(args)
      break

    case 'help':
      require('./cmds/help')(args)
      break

    case 'history':
      require('./cmds/history')(args, db)
      break

    case 'collections':
      require('./cmds/collections')(args, db)
      break

    case 'clear':
      require('./cmds/clear')(args, db)
      break

    case 'new':
      require('./cmds/new')(args, db)
      break

    case 'delete':
      require('./cmds/delete')(args, db)
      break

    default:
      let exec_str = buildExecString(cmd_string);
      require('./cmds/curlx')(args, exec_str, db)
      break
  }
}
