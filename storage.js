const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const os = require('os');
const path = require('path');
const fs = require('fs');
const model = require('./model');
let dbdir = os.homedir() + '/cxdb';
let dbPath = path.join(os.homedir(), 'gx.json');
let dbHistoryPath = path.join(dbdir, 'history.json');
let dbCollectionPath = path.join(dbdir, 'collection.json');
let adapter, db;


function createDbFolderIfNotExist() {
  if (!fs.existsSync(dbdir)) {
    fs.mkdirSync(dbdir)
  }
}

function createDbIfNotExist(dbPath) {
  if (!fs.existsSync(dbPath)) {
    try {
      fs.appendFileSync(dbPath, '');
    } catch (err) {
      console.log(err);
    }
  }
}


class Database {

  constructor() {
    createDbFolderIfNotExist();
    createDbIfNotExist(dbHistoryPath);
    createDbIfNotExist(dbCollectionPath);
    this.collections = [];
    this.data = [];
    this.hist = [];
    this.historyCount = 10;
    // adapter = new FileSync(dbPath);

    db = {
      _dbs: {
        history: low(new FileSync(dbHistoryPath)),
        collections: low(new FileSync(dbCollectionPath))
      },
      get(which) {
        return this._dbs[which].get(which)
      },
      on(which) {
        return this._dbs[which]
      }
    }
    // db = low(adapter);
    db._dbs.history.defaults({ history:[] })
      .write()
    db._dbs.collections.defaults({ collections: {} })
      .write()
  }

  getCollection(collectionName) {
    return db.get('collections')
      .value()[collectionName]
  }

  addToCollection(collectionName) {
    return db.on('collections').set(`collections.${collectionName}`, {})
      .write()
  }

  getRequestFromHistory(id) {
    return db.get('history')
      .find({ id: id})
      .value()
  }

  getCollections() {
    // try {
    //   let data = fs.readFileSync(dbPath, 'utf-8');
    //   this.data = JSON.parse(data);
    //   this.collections = this.data.collections;
    //   return Object.keys(this.collections);
    // } catch (err) {
    //   console.log(err);
    // }
    return db.get('collections')
      .value()
  }

  getHistory() {
    return db.get('history')
      .reverse()
      .value()
  }

  addToHistory(cmd) {
    let count = db.get('history')
      .size()
      .value()
    if (count == this.historyCount) {
      // remove the top most element
      let firstElement = db.get('history')
        .value()[0]
      db.get('history')
        .remove(firstElement)
        .write()
    }
    db.get('history')
      .push(cmd)
      .write()
  }

  clearHistory() {
    db.get('history')
      .remove()
      .write()
  }

}


module.exports = {
  Database
}
