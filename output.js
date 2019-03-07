const Table = require('cli-table2');
const { prettyPrint } = require('./helpers');
const chalk = require('chalk');

const outputResponse = (data) => {
  console.log(chalk.bold(prettyPrint(data)));
}

const outputResponseHeaders = (data) => {
  console.log(chalk.italic(data));
}

const outputHistory = (data) => {
  var table = new Table({
    head: ['id', 'method', 'url', 'status', 'timestamp'],
    colWidths: [12, 8, 30, 8, 20],
    wordWrap: true
  });
  data.forEach(row => {
    table.push([row.id, row.method, row.url, row.status, row.ts]);
  });
  console.log(table.toString());
}

const outputCollectionRequests = (data) => {
  var table = new Table({
    head: ['id', 'name', 'method', 'url'],
    colWidths: [12, 20, 8, 30],
    wordWrap: true
  });
  data.forEach(row => {
    table.push([row.id, row.name, row.method, row.url]);
  });
  console.log(table.toString());
}

const output404 = () => {
  console.log(chalk.red(`Run id not found. Please check if the reference id is present in history (cx history)`));
}

const outputCollectionExists = () => {
  console.log('This collection already exists');
}

const outputCollectionNotExists = () => {
  console.log(chalk.red('This collection does not exist'));
}

const outputDefaultNewChoice = () => {
  console.log('No option provided. Type', chalk.bold('cx help new') );
}

const outputEmptyArgsError = () => {
  console.log(chalk.red('No arguments provided'));
}

const outpuNoRunChoiceError = () => {
  console.log(chalk.red('No run id provided.'), 'Type', chalk.bold('cx help run') );
}

module.exports = {
  outputResponse,
  outputHistory,
  output404,
  outputResponseHeaders,
  outputCollectionExists,
  outputCollectionNotExists,
  outputCollectionRequests,
  outputDefaultNewChoice,
  outputEmptyArgsError,
  outpuNoRunChoiceError
}
