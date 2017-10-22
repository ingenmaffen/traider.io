var mongoHandler = require("./db.client.js");
var collectionName = "products";

var db;


exports.getById = function (id, callback) {
    if (callback === null || typeof (callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    // Open the connection to the server
    mongoclient.connect('mongodb://localhost:27017/traider', (err, database) => {
        if (err) return console.log(err)
        var dbName = mongoHandler.dbName();
        db = database;
        var mongoId;
        try {
            mongoId = mongoHandler.makeObjectID(id);
        } catch (e) {
            return callback(e);
        }
        console.log("id:" + mongoId);
        db.collection(collectionName).findOne({
            "_id": mongoId
        }, function(err, result) {
            //mongoclient.close();
            if (err) {
                callback(err);
                return;
            } else {
                // Close the connection
                return callback(null, result);
            }
        });
    });
};

exports.getAll = function (callback) {
    if (callback === null || typeof (callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.connect('mongodb://localhost:27017/traider', (err, database) => {
        if (err) return console.log(err)
        var dbName = mongoHandler.dbName();
        db = database;
        console.log(dbName + "." + collectionName);

        db.collection(collectionName).find({}, function(err, result) {
            if (err) {
                if (err) return console.log(err)
            } else {
                result.toArray(function(err, resultArray) {
                    // Close the connection
                    if (err) return console.log(err)

                    console.log("Got data: " + resultArray.length + " records.");
                    return callback(resultArray);

                });
            }
        });
    });
};


exports.insert = function (data, callback) {
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.connect('mongodb://localhost:27017/traider', (err, database) => {
        if (err) return console.log(err)
        var dbName = mongoHandler.dbName();
        db = database;
        console.log(dbName + "." + collectionName);

        db.collection(collectionName).insert(data, function (err, result) {
            if (err) {

                if (err) return console.log(err)
            } else if (callback === null && typeof (callback) !== "function") {
                if (err) return console.log(err)
                return callback(result);
            }
        });
    })
};