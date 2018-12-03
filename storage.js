const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const os = require('os');
const path = require('path');
const fs = require('fs');
const model = require('./model');
let dbPath = path.join(os.homedir(), 'gx.json');


let adapter, db;

function createDbIfNotExist() {
  if (fs.existsSync(dbPath)) {
    console.log('DB exists');
  } else {
    try {
      fs.appendFileSync(dbPath, '');
    } catch(err) {
      console.log(err);
    }
  }
}

class Database {

  constructor() {
    createDbIfNotExist();
    this.collections = [];
    this.data = [];
    this.hist = [];
    adapter = new FileSync(dbPath);
    db = low(adapter);
    db.defaults({ history: [], collections: [] })
      .write()
  }

  getCollection(collectionName) {

  }

  addToCollection(collectionName) {

  }

  getCollections() {
    try {
      let data = fs.readFileSync(dbPath, 'utf-8');
      this.data = JSON.parse(data);
      this.collections = this.data.collections;
      return Object.keys(this.collections);
    } catch(err) {
      console.log(err);
    }
  }

  getHistory() {
     return db.get('history')
      .value()
  }

  addToHistory(cmd) {
    db.get('history')
      .push(cmd)
      .write()
  }

}


module.exports = {
  Database
}
