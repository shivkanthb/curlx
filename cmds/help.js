const menus = {
  main: `
    cx <command> <options>

    run .................. run request associated with <id>
    history .............. history of requests previously run
    collections .......... view all stored request collections
    new .................. add a new requestion or collection
    delete ............... delete requests or collections
    version .............. show package version
    help ................. show help menu for a command

    If no command => it runs the standard curl command incl all flags
  `,

  new: `
    cx new <options>

    collection ..... create a new collection
    request ..... ...create a new request to save in existing collection
  `,
  
  run: `
    cx run <id | collection_name:id>

    id ................... runs request {id} present in history
    collection_name:id ... runs request {id} present inside {collection_name}
  `,

  delete: `
    cx delete <id | collection_name:id>

    id ................... runs request {id} present in history
    collection_name:id ... runs request {id} present inside {collection_name}

    cx delete <collection_name> --collection
    
    collection_name ...... name of the entire collection you want to delete
  `

}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
