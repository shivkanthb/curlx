const prompts = require('prompts');

let onCancel = () => {
  console.log('See you next time ✌️');
  return true;
}

const askCollectionName = async () => {
  let response = await prompts({
    type: 'text',
    name: 'collection_name',
    message: `Name of your new collection`
  });
  return response.collection_name;
}

async function askRequestInfo(collectionName) {
  let questions = [{
    type: 'text',
    name: 'cx_result',
    message: 'Enter complete request (without cx or curl in front). Eg: -X GET https://httpbin.org/get'
  },
  {
    type: prev => (prev.length > 0) ? 'text' : null,
    name: 'cx_result_name',
    initial: `${collectionName} - request${Math.floor(Math.random()*(999-100+1)+100)}`,
    message: 'Give a name for your request'
  }];
  let response = await prompts(questions, { onCancel });
  return response;
}

async function askAddNewRequest(collectionName) {
  let prompt_text = `Would you like to add a new request to ${collectionName}`;
  let response = await prompts({
    type: 'confirm',
    name: 'create_request',
    message: prompt_text
  });
  return response.create_request;
}

module.exports = {
  askCollectionName,
  askRequestInfo,
  askAddNewRequest
}