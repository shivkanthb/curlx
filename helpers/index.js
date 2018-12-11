module.exports = {
  prettyPrint: function(output) {
    try {
      output = JSON.parse(output);
    } catch(err) {
      return output;
    }
    return JSON.stringify(output, null, 2);
  }
}
