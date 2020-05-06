const jsonfile = require('jsonfile')
const fs = require('fs');

const settings = require('../../settings.json');
const util = require('util');

const selectByIds = "selectedByIds_"
const selectByTime = "selectedByTime_"

class Select {
    constructor() {}

    selectByTime(db, file, collection, startTime, endTime) {
        const ref = db.collection(collection)
        const json = []

        console.log(`Getting ${collection}...`)

        ref
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    let date = Date.parse(doc.createTime);
                    if (endTime) {
                        if (startTime <= date && date <= endTime) {
                            console.log(doc.id);
                            json.push(doc.data())
                        }
                    } else {
                        if (startTime <= date) {
                            console.log(doc.id);
                            json.push(doc.data())
                        }
                    }

                })

                let path = util.format("%s/%s", settings.exportPath, selectByTime + file);

                this.writeJson(collection, path, json);

            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
    }

    selectByIds(db, file, collection, ids) {
        const ref = db.collection(collection)
        const json = []

        console.log(`Getting ${collection}...`)

        ref
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    let id = doc.id;
                    if (ids.indexOf(id) > -1) {
                        json.push(doc.data())
                    }
                })

                let path = util.format("%s/%s", settings.exportPath, selectByIds + file);

                this.writeJson(collection, path, json);
            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
    }


    writeJson(collection, path, json) {
        console.log(`Writing ${path}...`);

        if (!fs.existsSync(settings.exportPath)) {
            fs.mkdirSync(settings.exportPath);
        }

        jsonfile.writeFile(path, json, {
            spaces: 2
        }, err => {
            if (err) {
                console.error(err)
            } else {
                console.log(`Select ${collection} successfully written to ${path}.`)
            }
        })
    }
}

module.exports = new Select();