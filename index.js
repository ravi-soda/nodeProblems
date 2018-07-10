const express = require("express");
const fs = require("fs");

var db= null;
var app = express();
var MongoClient = require("mongodb").MongoClient;

MongoClient.connect('mongodb://localhost:27017/customermanager', {useNewUrlParser: true}, function(err, database){
		if(err){
			console.log(err);
		}
			debugger;
			if(database){console.log("connected to mongo server");}

		db = database.db("customermanager");
		var colBlogs = db.collection("blogs");
		if(!colBlogs){
			db.createCollection("blogs", function(err, collection){
				var blog = {title: "1", description: "1"};
				collection.insert(blog);				
			});
		}
});


// service to list all blogs
app.get("/blogs", function(req, resp){
	db.collection("blogs").find().toArray(function(err, docs){
		if(err){console.log(err);}
		resp.json(docs);
	});
});

// service to list all blogs
app.get("/blogs/add", function(req, resp){
	var blog= {"title":"2", "description":"2"}
	db.collection("blogs").insert(blog);

	db.collection("blogs").find().toArray(function(err, docs){
		if(err){console.log(err);}
		resp.json(docs);
	});
});

// service to add new blog
app.post("/blogs/add", function(req, resp){
	db.collection("blogs").insert({'title':'new blog post', 'desc':'new blog post from ui'});

	db.collection("blogs").find().toArray(function(err, docs){
		if(err){console.log(err);}
		resp.json(docs);
	});
	//resp.json()
});

app.listen("3000", function(err){
	if(err){
		console.log(err);
	}
	console.log("server has started listening port: 3000");
})