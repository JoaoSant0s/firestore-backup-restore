const jsonfile = require('jsonfile')
const fs = require('fs');

const settings = require('./settings');
const util = require('util');

function start (db, file, collection) {  
  const ref = db.collection(collection)
  const json = []

  console.log(`Getting ${collection}...`)

  ref
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        json.push(doc.data())
      })

      let path = util.format("%s/%s", settings.exportPath, file);

      console.log(`Writing ${path}...`);

      if (!fs.existsSync(settings.exportPath)) {
        fs.mkdirSync(settings.exportPath);
      }

      jsonfile.writeFile(path, json, {spaces: 2}, err => {
        if (err) {
          console.error(err)
        } else {
          console.log(`Collection ${collection} successfully written to ${path}.`)
        }
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })
}

module.exports = start
