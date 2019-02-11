const prompts = require('prompts');
const async = require("async");


module.exports = (args, db) => {

  let new_type = args._[1];

  if (args.collection && !new_type) {
    new_type = 'collection'
  } else if (args.request && !new_type) {
    new_type = 'request';
  }

  switch (new_type) {
    case 'request':
      console.log('New request flow');
      break

    case 'collection':
      console.log('New collection flow');
      let collection_name = "";
      if (args.name) {
        collection_name = args.name;
      }
      newCollection(collection_name, db);
      break

    default:
      console.log(`Invalid option. Please type cx help new'`);
  }
}

async function newCollection(collection_name, db) {

  async.waterfall([
    async () => {
      let response = await prompts({
        type: 'text',
        name: 'collection_name',
        message: 'Name of your new collection'
      });
      return response.collection_name;
    },
    async (new_collection) => {
      console.log('input collection name ' + new_collection);
      let input_collection = db.getCollection(new_collection);
      if (input_collection) {
        console.log('already exists');
        return true;
      } else {
        console.log('Brand new collection');
        db.addToCollection(new_collection)
        return false;
      }
    }
  ], (err, results) => {
    if (err) console.log(err);
    console.log(results);
  });

  // if (!collection_name) {
  //   let response = await prompts({
  //     type: 'text',
  //     name: 'collection_name',
  //     message: 'Name of your new collection'
  //   });

  //   console.log(response.collection_name);
  // }
}