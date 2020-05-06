try {
    require('../../settings.json');
} catch (error) {
 console.error("Create a 'settings.json' file following the 'settings-mode.json' in module root.");
}

const db = require('./firebase/firestore');

const backup = require('./backup');
const select = require('./select');
const restore = require('./restore');

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

var firestoreconsult = {
  backup: backupExport,
  restore: restoreExport,
  selectByIds: selectByIdsExport,
  selectByTime: selectByTimeExport
}

module.exports = firestoreconsult