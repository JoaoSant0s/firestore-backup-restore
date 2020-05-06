const admin = require('firebase-admin');
try {
    require('../../../serviceAccountKey');
} catch (error) {
    console.error("Use the json serviceAccountKey in the root of the project. Change the name of the file to use this name.");
    
}
const serviceAccount = require('../../../serviceAccountKey');

module.exports = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});