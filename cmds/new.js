const { outputCollectionExists } = require('./../output');
const { wrapArguments } = require('./../helpers');
const shortid = require('shortid')
const { parseCurlCommand } = require('../helpers/parse-curl');
const {
  askCollectionName,
  askRequestInfo,
  askAddNewRequest
} = require('../prompts');


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
      newRequest(db);
      break;
    case 'collection':
      console.log('New collection flow');
      newCollection(db);
      break;
    default:
      console.log(`Invalid option. Please type cx help new'`);
  }
}

async function newRequest(db) {
  let collectionName = await askCollectionName();
  // check if user provided collection first exists
  if (!db.getCollection(collectionName)) {
    console.log('This collection does not exist');
    return;
  }
  addNewRequestToCollection(db, collectionName);
}

async function newCollection(db) {
  let collectionName = await askCollectionName();
  let proceed = true;
  if (db.getCollection(collectionName)) {
    outputCollectionExists();
  } else {
    // adding new collection if doesn't exist
    db.addCollection(collectionName);
  }
  proceed = await askAddNewRequest(collectionName);
  if (!proceed) {
    return;
  }
  addNewRequestToCollection(db, collectionName);
}

async function addNewRequestToCollection(db, collectionName) {
  let requestDetailsObj = await askRequestInfo(collectionName);
  if (requestDetailsObj.cx_result) {
    let shortID = shortid.generate();
    let _args = requestDetailsObj.cx_result.split(/\s+/);
    let cmd_string = wrapArguments(_args);
    let exec_str = 'curl -i ' + cmd_string.join(' ');
    let curlObject = parseCurlCommand(exec_str);
    let cmd = {
      id: shortID,
      name: requestDetailsObj.cx_result_name,
      method: curlObject.method,
      command: exec_str,
      url: curlObject.url,
    }
    console.log(cmd);
    // Saving the new request
    db.addRequestToCollection(collectionName, cmd);
  }
} 

