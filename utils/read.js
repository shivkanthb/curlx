const fs = require('fs');

module.exports = {
  readInput: function(input) {
    let data;
    if (fs.existsSync(input)) {
      try {
        data = fs.readFileSync(input, 'utf-8');
        if (!input.endsWith('.json')) {
          data = JSON.parse(data);
        }
      } catch(err) {
        if (err.code == 'EISDIR') {
          console.error('Input path is a directory. Enter valid file path.')
          process.exit(0);
        } else {
          console.error('Error parsing input data');
        }
      }
    } else {
      try {
        data = JSON.parse(input);
      } catch(err) {
        console.error('Error parsing input data');
      }
    }
    return data;
  },

  readResponse: function(response) {
    let lines = response.split('\r');
    let firstLine = lines[0];
    let statusCode = firstLine.split(' ')[1];
    let responseHeaders, body;
    for (let i=0; i<lines.length; i++) {
      if (/\s/g.test(lines[i])) {
        responseHeaders = lines.slice(0, i).join('');
        body = lines.slice(i, lines.length).join('');
      }
    }
    return {
      statusCode,
      responseHeaders,
      body
    }
  }
}
