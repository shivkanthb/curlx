const prompts = require('prompts');
const async = require("async");
const { outputCollectionExists } = require('./../output');
const { wrapArguments } = require('./../helpers');
const shortid = require('shortid')
const { parseCurlCommand } = require('../helpers/parse-curl');


module.exports = (args, db) => {

  let new_type = args._[1];

  if (args.collection && !new_type) {
    new_type = 'collection'
  } else if (args.request && !new_type) {
    new_type = 'request';
  }

  switch (new_type) {
    case 'request':
      let collectionName;
      if (args.collection) {
        console.log(`Collection name: ${args.collection}`);
        collectionName = args.collection;
        if (!db.getCollection(collectionName)) {
          console.log('This collection does not exist');
          return;
        }
      } else {
        // choose collection from list
        console.log('Enter the collection name');
      }
      console.log('New request flow');
      newRequest(collectionName, db);
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

let onCancel = prompt => {
  console.log('Never stop prompting!');
  return true;
}

async function newRequest(collectionName, db) {
  // check if user provided collection first exists
  if (!db.getCollection(collectionName)) {
    console.log('This collection does not exist');
    return;
  }
  let cmd = await addNewRequest(collectionName);
  console.log(cmd);
}

async function addNewRequest(collectionName) {
  // Here goes the waterfall
  let shortID = shortid.generate();
  let questions = [{
    type: 'text',
    name: 'cx_result',
    message: 'Enter complete request (without cx or curl in front). Eg- -X GET https://httpbin.org/get'
  },
  {
    type: prev => (prev.length > 0) ? 'text' : null,
    name: 'cx_result_name',
    initial: shortID,
    message: 'Give a name for your request'
  }];
  let response = await prompts(questions, { onCancel });
  if (response.cx_result) {
    let _args = response.cx_result.split(/\s+/);
    let cmd_string = wrapArguments(_args);
    let exec_str = 'curl -i ' + cmd_string.join(' ');
    let curlObject = parseCurlCommand(exec_str);
    let cmd = {
      id: shortID,
      name: response.cx_result_name,
      method: curlObject.method,
      command: exec_str,
      url: curlObject.url,
    }
    return cmd;
  }
}

async function newCollection(collection_name, db) {
  let collectionName;
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
        outputCollectionExists();
        return {
          collection_name: new_collection,
          isCollectionPresent: true
        }
      } else {
        console.log('Brand new collection');
        db.addCollection(new_collection)
        return {
          collection_name: new_collection,
          isCollectionPresent: false
        }
      }
    },
    async ({ isCollectionPresent, collection_name }) => {
      collectionName = collection_name;
      let prompt_text = `Would you like to add a new request to ${collection_name}`;
      let response = await prompts({
        type: 'confirm',
        name: 'create_request',
        message: prompt_text
      });
      if (response.create_request) {
        return true;
      }
      return false;
    },
    async (create_request) => {
      if (create_request) {
        let shortID = shortid.generate();
        let questions = [{
          type: 'text',
          name: 'cx_result',
          message: 'Enter complete request (without cx or curl in front). Eg- -X GET https://httpbin.org/get'
        },
        {
          type: prev => (prev.length > 0) ? 'text' : null,
          name: 'cx_result_name',
          initial: shortID,
          message: 'Give a name for your request'
        }];
        let response = await prompts(questions, { onCancel });
        if (response.cx_result) {
          let _args = response.cx_result.split(/\s+/);
          let cmd_string = wrapArguments(_args);
          let exec_str = 'curl -i ' + cmd_string.join(' ');
          let curlObject = parseCurlCommand(exec_str);
          let cmd = {
            id: shortID,
            name: response.cx_result_name,
            method: curlObject.method,
            command: exec_str,
            url: curlObject.url,
          }
          return cmd;
        }
      } else {
        return null;
      }
    }
  ], (err, results) => {
    if (err) console.log(err);
    if (results) {
      console.log(results);
      console.log(`To be added to ${collectionName}`);
      console.log(db.addRequestToCollection(collectionName, results));
    }
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