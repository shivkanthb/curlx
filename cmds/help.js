const menus = {
  main: `
    cx <command> <options>

    run .............. run request associated with <id>
    history .............. history of requests previously run
    collections .............. view all stored request collections
    new .............. add a new requestion or collection
    version ............ show package version
    help ............... show help menu for a command

    If no command => it runs the standard curl command incl all flags

    Additional options:
    --sb .............. uses sandbox host
    --qs .............. pass querystring values as a file  path or json string
    --headers .............. pass headers as a file path or json string
    `,

  new: `
    cx new <options>

    --collection ..... create a new collection
    --request ..... create a new request to save in existing collection
    `,

}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
