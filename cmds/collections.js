const prompts = require('prompts');
const { outputCollectionRequests } = require('./../output');

module.exports = async (args, db) => {
  let collections = db.getCollections();
  let collection_keys = Object.keys(collections);

  let onCancel = () => {
    console.log('Okie Dokie');
    return true;
  }

  if (!collection_keys.length) {
    console.log('No collections created. Type `cx new collection` to create a new one');
    return;
  }

  let choice_map = collection_keys.map((collection) => {
    let num_requests = collections[collection].length ? collections[collection].length : 0;
    return {
      title: `${collection} (${num_requests} reqs)`,
      value: collection
    }
  })
  let response = await prompts({
    type: 'select',
    name: 'collection',
    message: 'Choose collection',
    choices: choice_map
  }, { 
    onCancel 
  });
  if (response.collection) {
    console.log('Requests for '+ response.collection);
    outputCollectionRequests(collections[response.collection]);
  }
}
