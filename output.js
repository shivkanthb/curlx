const Table = require('cli-table2');
const { prettyPrint } = require('./helpers');


const outputResponse = (data) => {
  console.log(prettyPrint(data));
}

const outputHistory = (data) => {
  var table = new Table({
    head: ['Id', 'Method', 'Request', 'Timestamp'],
    colWidths: [12, 8, 30, 20],
    wordWrap: true
  });
  data.forEach(row => {
    table.push([row.id, row.method, row.command, row.ts]);
  });
  console.log(table.toString());
}

module.exports = {
  outputResponse,
  outputHistory
}
