const minimist = require('minimist')
const Storage = require('./storage').Database;

let db = new Storage();

module.exports = () => {
  const args = minimist(process.argv.slice(2))

  let cmd = args._[0]

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'run':
      require('./cmds/run')(args)
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

    default:
      require('./cmds/curlx')(args, process.argv.slice(2), db)
      // console.error(`"${cmd}" is not a valid command!`)
      break
  }
}
