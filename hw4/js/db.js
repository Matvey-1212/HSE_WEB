const {MongoClient} = require('mongodb');

const URL = "mongodb://0.0.0.0:27017/webdb";

let dbConnected;

module.exports = {
    connectTodb: (cb) => {
        MongoClient
            .connect(URL)
            .then((client) => {
                console.log('Connected to MongoDB');
                dbConnected = client.db();
                return cb();
            })
            .catch((err) => {
                return cb(err);
            })
    },
    getDb: () => dbConnected,
}