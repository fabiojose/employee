var PouchDB = require("pouchdb");

if(!global.db){
  var dbAdapter = process.env.DB_ADAPTER || "leveldb";
  console.log("> db adapter:", dbAdapter);

  if(dbAdapter === "memory") {
    PouchDB.plugin(require("pouchdb-adapter-memory"));
  }

  // Opens or creates the database
  global.db = new PouchDB("employeedb", {
    adapter: dbAdapter
  });
}

function del(ids) {
  return global.db.allDocs({
    include_docs : true,
    keys: ids
  })
  .then((docs) => {
    let toDelete =
      docs.rows
        .filter((row) => row.doc)
        .map((row) => row.doc)
        .map((doc) => {
          doc["_deleted"] = true;
          return doc;
        });

    return global.db.bulkDocs(toDelete);
  });
}

module.exports = {
  db: global.db,
  del
};
