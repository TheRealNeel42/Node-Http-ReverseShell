const express = require('express')
const readline = require('readline')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 8080


class CmdObject {
	constructor(command){
		this.command = command;
	}
}

//----------Set up Readline --------------//
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})



//----------Main input function saves input to file then returns file --------------//
var input = (function(){
//write user input to file
	var writeData = function(){
		var userInput;
		rl.question('>>>', (userInput) => {		
				
			var cmd = new CmdObject(userInput)
			var cmdJson = JSON.stringify(cmd)
			fs.writeFileSync("./tmp/test", cmdJson, function(err) {
				if (err) {
					return console.log(err)
				}
			})
		});
    }

    // getData returns JSON string if it exists, false if it doesnt. 
    var getData = function(){
    	//Every command must only be run once.  Therefore the process will be reading the file and passing it to the client, then erasing its contents. 
    	//First read file and save to object 
    	var content = fs.readFileSync("./tmp/test", "utf8")
    	if (content.length > 0)
    	{
    		var jsonContent = JSON.parse(content)
    		//now clear out file
    		fs.writeFileSync("./tmp/test", '')
       		return jsonContent
    	}
    	else 
    	{
    		return false
    	}
    }
    return {write:writeData, get:getData}
})();



//----Main API bits---//

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// GET will handle passing data to agent
app.get('/', (request, response) => {
	// during get request 2 things are done JSON is read from file then sent to agent 
	var jsonObject = input.get()
	response.json(jsonObject)
	
})

// POST will handle sending the results of the commands back to the user and updateing interface
//CURL: curl -d '{"data":"DataGoesHere"}' -H "Content-Type: application/json" -X POST 127.0.0.1:8080
app.post('/', (request, response) => {

	// DATA RETURNED IN {data: data} format
	var data = request.body.data;
	// Display data to user
	console.log(data)
	//send response 
	input.write()
	response.send("Recieved")

})

///////////////////////////////////////////////////////////
app.listen(port, (err) => {
	if (err) {
		return console.log('Error: ', err)		
	}

	console.log('Server listening on ' + port)
})