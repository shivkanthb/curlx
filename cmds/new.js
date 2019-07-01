const { outputCollectionExists,
  outputCollectionNotExists,
  outputDefaultNewChoice } = require('./../output');
const { wrapArguments, 
  buildExecString } = require('./../utils');
const { sanitizeCurlArgs } = require('./../utils/parse-curl');
const shortid = require('shortid');
const { parseCurlCommand } = require('../utils/parse-curl');
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
      newRequest(db);
      break;
    case 'collection':
      newCollection(db);
      break;
    default:
      outputDefaultNewChoice();
  }
}

async function newRequest(db) {
  let collectionName = await askCollectionName();
  if (!db.getCollection(collectionName)) { // check if user provided collection first exists
    outputCollectionNotExists();
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
    if (collectionName) {
      db.addCollection(collectionName); // adding new collection if doesn't exist
    }
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
    if (_args[0].toLowerCase() === 'curl' || _args[0].toLowerCase() === 'cx') {
      _args = _args.slice(1);
    }
    let _cmdArgs = sanitizeCurlArgs(_args)
    let cmd_string = wrapArguments(_cmdArgs);
    let exec_str = buildExecString(cmd_string);
    let curlObject = parseCurlCommand(exec_str);
    let cmd = {
      id: shortID,
      name: requestDetailsObj.cx_result_name,
      method: curlObject.method,
      command: exec_str,
      url: curlObject.url,
    }
    db.addRequestToCollection(collectionName, cmd); // Saving the new request
  }
}

