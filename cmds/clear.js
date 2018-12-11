module.exports = (args, db) => {

  if (args.history) {
    db.clearHistory();
    console.log('History cleared')
  }

}
