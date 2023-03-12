const {MongoClient} = require('mongodb');

const URL = "mongodb://0.0.0.0:27017/pracdb";

let dbConnected;
const dbName = "pracdb";
const colName = "users";

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

        const client = new MongoClient(URL, { useUnifiedTopology: true });
        var collect;

        client
            .connect()
            .then(
                client =>
                client
                    .db(dbName)
                    .listCollections()
                    .toArray() 
            )
            .then(cols => {
                collect = cols;
                var i = 0;
                collect.forEach(element => {
                    if(element.name == colName){
                          i+=1;  
                    }
                });
                if(i == 0){
                    dbConnected.createCollection(colName, (err, res)=>{});
                    console.log("collection created!");
                }
                else{
                    console.log("collection alredy exists!");
                }
                

            
            })
            .finally(() => client.close());
        
        
    },
    getDb: () => dbConnected,
}