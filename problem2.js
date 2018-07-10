var express = require("express");
var fs = require("fs")
//var mysql = require("mysql");
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");

// def server
var app = express();

var db = null // global variable to hold the connection

MongoClient.connect('mongodb://localhost:27017/customermanager', function(err,database) {
    if(err) { console.error(err) }
    db = database // once connected, assign the connection to the global variable

	var collection = db.collection('blogs');

	if(!collection){

		var blog1 = {title:'blog post 1', desc:'description for blog post 1'};
		var blog2 = {title:'blog post 2', desc:'description for blog post 2'};

		db.createCollection("blogs", function(err, collection){
			collection.insert(blog1);
			collection.insert(blog2);
		});
	}
});

// write service to get list of blogs
app.get("/blogs", function(req, resp){
	
	// query the database
	db.collection('blogs').find().toArray(function(err, docs){
		if(err){
			console.log(err);
		}

		resp.json(docs);	
	});

	/*resp.send()
	resp.write(blogs);
	resp.end();*/
});

// write service to add new blog post to blogs list
app.post("/blogs/add", function(req, resp){

	
	var blog = {title:'new blog', desc:'new blog description'}
	
	db.collection('blogs').insert(blog);
	db.collection('blogs').find().toArray(function(err, docs){
		if(err){
			console.log(err);
		}
		resp.json(docs);
	});

	//resp.json(blogs);
});


app.listen(3000, function(){
	console.log("Server has started listening on port 3000.")
});