const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
const dbName = "expodb";
const collectionName = "expositions";

var database;
var collection;

async function checkConnection(){
    if(database == undefined || collection == undefined){
        await mongoClient.connect();
        database = mongoClient.db(dbName);
        collection = database.collection(collectionName);
    }
}

async function insert(newExposition){
    await checkConnection();
    const result = await collection.insertOne(newExposition);
    console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
}

async function findAll(){
    await checkConnection();
    var data = await collection.find().toArray();
    console.log(data);
    return data;
}

module.exports = {
    insert,
    findAll
};