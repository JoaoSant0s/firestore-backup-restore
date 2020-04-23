// load modules
const db = require('./firebase/firestore');

const backup = require('./backup');
const restore = require('./restore');

// get cmd line arguments
const argv = require('minimist')(process.argv.slice(2))
const mode = argv._[0]
const collection = argv.c || argv.collection
const file = argv.f || argv.file || `${collection}.json`

// start backup / restore
switch (mode) {
  case 'b':
  case 'backup':
    backup(db, file, collection)
    break

  case 'r':
  case 'restore':
    console.log("blocked temporary");
    //restore(db, file, collection)
    break

  default:
    console.log('Use "backup" or "restore" option')
    break
}