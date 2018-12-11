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
        data = JSON.parse(data);
      } catch(err) {
        console.error('Error parsing input data');
      }
    }
    return data;
  }
}
