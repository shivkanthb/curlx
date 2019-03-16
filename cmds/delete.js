const { outputCollectionNotExists } = require('../output').default;


module.exports = (args, db) => {
  let request_id = args._[1];

  if (!request_id) {
    console.log('No id provided');
    return;
  }

  if (request_id.indexOf(':') == -1) {
    try {
      if (!db.getRequestFromHistory(request_id)) {
        console.log(`${request_id} is not present in History.\nIf you are trying to delete from a collection, include in the format \`collection_name:request_id\` `);
        return;
      }
      db.removeRequestFromHistory(request_id);
      console.log(`Removed ${request_id} from history`);
    } catch (e) {
      console.log(e.message);
    }
  } else {
    let collectionRequest = request_id.split(':');
    let collectionName = collectionRequest[0];

    if (!db.getCollection(collectionName)) {
      return outputCollectionNotExists();
    }
    let req_id = collectionRequest[1];
    try {
      db.removeRequestFromCollection(collectionName, req_id);
      console.log(`Removed ${request_id} from collection ${collectionName}`);
    } catch (e) {
      console.log(e.message);
    }
  }
}