const prompts = require('prompts');

let onCancel = prompt => {
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
    message: 'Enter complete request (without cx or curl in front). Eg- -X GET https://httpbin.org/get'
  },
  {
    type: prev => (prev.length > 0) ? 'text' : null,
    name: 'cx_result_name',
    initial: `${collectionName} - request `,
    message: 'Give a name for your request'
  }];
  let response = await prompts(questions, { onCancel });
  return response;
  
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