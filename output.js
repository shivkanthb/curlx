const Table = require('cli-table2');
const { prettyPrint } = require('./helpers');


const outputResponse = (data) => {
  console.log(prettyPrint(data));
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

module.exports = {
  outputResponse,
  outputHistory
}
