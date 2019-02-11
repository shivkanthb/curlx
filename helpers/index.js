const querystring = require('querystring');
const path = require('path');

module.exports = {
  prettyPrint: function(output) {
    try {
      output = JSON.parse(output);
    } catch(err) {
      return output;
    }
    return JSON.stringify(output, null, 2);
  },

  findAndRemoveFlag: function(args, flag, flagValue) {
    if (args.indexOf(flag) > 0) {
      if (args.indexOf(flagValue)) {
        args.splice(args.indexOf(flag), 2);
      } else {
        args.splice(args.indexOf(flag), 1);
      }
    }
    return args;
  },

  formatQuerystring: function(qs) {
    try {
      qs = JSON.parse(qs);
    } catch(err) {
      console.log(err);
    }
    return '?' + querystring.stringify(qs)
  },

  formulateRequestURL: function(args, qs, host, version) {
    return args.map((element) => {
      if (element.startsWith('/')) {
        return path.join(host, version, element + qs);
      }
      return element + qs;
    });
  },

  formatHeaders: function(headers) {
    try {
      headers = JSON.parse(headers);
    } catch(err) {
      console.log(err);
    }
    let keys = Object.keys(headers);
    let headerString = keys.reduce((accumulator, key) => {
      return accumulator + ' -H ' + JSON.stringify(`${key}:${headers[key]}`);
    },'');
    return headerString;
  }
}
