// load modules
const db = require('./firebase/firestore');

const backup = require('./backup');
const select = require('./select');
const restore = require('./restore');

// get cmd line arguments
const argv = require('minimist')(process.argv.slice(2));

const mode = argv._[0]
const collection = argv.c || argv.collection
const timeStart = argv.s || argv.timeStart
const timeEnd = argv.e || argv.timeEnd || null
const ids = argv.i || argv.idArrays
const file = argv.f || argv.file || `${collection}.json`
const help = argv.h || argv.help

function start() {
  if (help) {
    executeHelp();
  } else {
    executeMode();
  }
}

function executeHelp() {
  console.log("* `backup` or `b` - Backup mode");
  console.log("* `restore` or `r` - Restore mode");
  console.log("* `select` or `s` - Select mode");
  console.log("* `--collection` or `-c` - Name of collection to backup / restore");
  console.log("* `--file` or `-f` - Name of the file to save / read json data. If no file name provided default is collection name.");
  console.log("* `--timeStart` or `-s` - Used in the select mode to filter the document in this sessions with create time greater than value");
  console.log("* `--timeEnd` or `-e` - Used in the select mode to filter the document in this sessions with create time minor than value");
  console.log("* `--idArrays` or `-i` - Used in the select mode to filter the document in this sessions with documents ids;");
}

function executeMode() {
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

    case 's':
    case 'select':
      if (ids) {
        console.log(`Select with ids: ${ids}`);
        select.selectByIds(db, file, collection, ids)
      } else if (timeStart) {
        console.log(`Select with time: ${timeStart} and ${timeEnd}`);
        select.selectByTime(db, file, collection, timeStart, timeEnd)
      } else {
        console.log('Use params: --timeStart, --timeEnd or --ids');
      }
      break

    default:
      console.log('Use "backup", "restore" or select option')
      break
  }
}

start();

var firestoreconsult = {
  backup: backup,
  restore: restore,
  selectByIds: select.selectByIds,
  selectByTime: select.selectByTime
}

module.exports = firestoreconsult