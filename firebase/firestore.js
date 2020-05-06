const app = require('./app');
const firestore = app.firestore();

firestore.settings({
    timestampsInSnapshots: true
});
module.exports = app.firestore();