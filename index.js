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
      backupExport(file, collection)
      break

    case 'r':
    case 'restore':
      restoreExport(file, collection)
      break

    case 's':
    case 'select':
      if (ids) {
        console.log(`Select with ids: ${ids}`);
        selectByIdsExport(file, collection, ids)
      } else if (timeStart) {
        console.log(`Select with time: ${timeStart} and ${timeEnd}`);
        selectByTimeExport(file, collection, timeStart, timeEnd)
      } else {
        console.log('Use params: --timeStart, --timeEnd or --ids');
      }
      break

    default:
      console.log('Use "backup", "restore" or select option')
      break
  }
}

function backupExport(file, collection) {
  backup(db, file, collection)
}

function restoreExport(file, collection) {
  restore(db, file, collection)
}

function selectByIdsExport(file, collection, ids) {
  select.selectByIds(db, file, collection, ids)
}

function selectByTimeExport(file, collection, timeStart, timeEnd) {
    select.selectByTime(db, file, collection, timeStart, timeEnd)
}

start();

var firestoreconsult = {
  backup: backupExport,
  restore: restoreExport,
  selectByIds: selectByIdsExport,
  selectByTime: selectByTimeExport
}

module.exports = firestoreconsult