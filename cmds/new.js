module.exports = (args, db) => {

  let new_type = args._[1];

  switch(new_type) {
    case 'request':
      console.log('New request flow');
      break

    case 'collection':
      console.log('New collection flow');
      break
    
    default:
      console.log(`Invalid option. Please type cx help new'`);
  }

}