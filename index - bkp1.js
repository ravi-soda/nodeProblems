var express = require('express');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _=require('lodash');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/customermanager';

// create the application
var app = express();

// Add middleware neccessary for RESTful API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  	res.header('Access-Control-Allow-Headers', 'Content-Type');
  	next();
});


var findStates = function(db, callback) {
   var cursor =db.collection('states').find().limit(2);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

// content routing
app.use('/hello', function(req, res, next){
	
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  findStates(db, function() {
		  db.close();
	  });
	});
		
	res.send('Hello World');
	next();
});

// connect to Mongo db
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function(){

	console.log('listening on port 3000...')
	app.listen(3000);

});