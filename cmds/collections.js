module.exports = (args, db) => {
  let collections = db.getCollections();
  console.table(collections);
}
