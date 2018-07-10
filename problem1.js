var express = require("express");
var fs = require("fs")

var app = express();
var fileName = "index - bkp1.js";

app.get("/:fileName", function(req, resp){

	console.log("inside search string function");
	console.log(req.params);
	var searchStr = req.query.searchStr;

	// if file name is null
	if(!req.params.fileName){
		resp.status(200).send({'response': 'INVALID_INPUT|FileName is invalid.'});
		resp.end();
	}

	fs.readFile(req.params.fileName, function(err, data){
		if(err){
			resp.status(200).send({'response': 'API error|'+err.toString()});
			resp.end();
			//throw err;
		} else {
			var fileContent = data.toString();
			var fromIndex = 0;
			var index = 0;
			var noOfOccu = 0;

			index = fileContent.indexOf(searchStr, fromIndex);
			console.log('index; '+index);
			console.log('index; '+(index != -1));

			while(index != -1){
				noOfOccu++;
				fromIndex = index+searchStr.length;

				console.log('index: '+index+', fromIndex: '+fromIndex);
				if(fromIndex>= fileContent.length){break;}

				index = fileContent.indexOf(searchStr, fromIndex);
				

			}

			resp.writeHead(200, {'Content-Type': 'text'});
			resp.write("No of occurences of '"+searchStr+", is "+noOfOccu);
			resp.end();
		}
	});

});


// actual sol
app.get("/:fileName/:element", function(req, resp){

	console.log(req.params)

	// if file name is null
	if(!req.params.fileName){
		resp.status(200).send({'response': 'INVALID_INPUT|FileName is invalid.'});
		resp.end();
	}


	/*fs.exists(req.params.fileName, function(exists){
		console.log("is file exists: "+exists);
		if(!exists){
			console.log("file not exists error");
			resp.status(200).send({'response': 'INVALID_INPUT|File with fileName :'+req.params.fileName+' is not found.'});
			resp.end();
		}
	});*/


	fs.readFile(req.params.fileName, function(err, data){
		if(err){
			resp.status(200).send({'response': 'API error|'+err.toString()});
			resp.end();
			//throw err;
		} else {

			var fileContent = data.toString();
			var lines = fileContent.split("\n");

			var wordCount = 0;
			var words = [];
			var responseText = '';
			// iterate through each line and split the line by 
			// space and increment the word count according to the words in the line
			for(var index =0; index< lines.length; index++){
				words = lines[index].split(" ");
				if(words){
					wordCount += words.length;
				}
			}

			console.log("wordCount: "+wordCount);
			console.log("lines: "+lines.length);

			if(req.params.element == "line"){
				responseText = "LineCount: "+lines.length;	
			} else if (req.params.element == "word"){
				responseText = "WordCount: "+wordCount;	
			}

			resp.writeHead(200, {'Content-Type': 'text'});
			resp.write(responseText);
			resp.end();
		}

	});

});


/*app.get("/", function(req, resp){
	//resp.send("Hello World");

	fs.exists(fileName, function(exists){
		if(exists){
			fs.stat(fileName, function(error, stat){

				if(error){
					return console.log(err);
				}

				console.log(stat);
				// open file
				fs.open(fileName, "r", function(err, fd){
					if(err){ 
						console.log(err);
					}
					console.log(fd);

					fs.readFile(fileName, function(err, data){

						var fileContent = data.toString();
						var lines = fileContent.split("\n");

						var wordCount = 0;
						var words = [];
						// iterate through each line and split the line by 
						// space and increment the word count according to the words in the line
						for(var index =0; index< lines.length; index++){
							words = lines[index].split(" ");
							if(words){
								wordCount += words.length;
							}
						}

						console.log("wordCount: "+wordCount);
						console.log("lines: "+lines.length);
						resp.writeHead(200, {'Content-Type': 'text'});
    					resp.write(data);
    					resp.end();
					});

				});

			});
		} else {
			resp.send("File Not Found.");
		}
	});

});
*/
app.listen(3000, function(){
	console.log("servers is started and listening on port 3000.");
})