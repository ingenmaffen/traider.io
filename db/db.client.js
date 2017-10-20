
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient,
    Server = require('mongodb').Server,
    BSON = mongo.BSONPure,
    ObjectId = require('mongodb').ObjectID;


exports.getDbClient = function() {
    return MongoClient;
};

exports.dbName = function() {
    return "traider";
};

exports.makeObjectID = function(id) {
    return ObjectID(id);
};