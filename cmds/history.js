module.exports = (args, db) => {
  let history = db.getHistory();
  console.table(history);
}
