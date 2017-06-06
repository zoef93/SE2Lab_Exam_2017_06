    //express lib
var express = require('express');
//general lib
var app = express();
//inspect
var util = require('util');
//Cross-Origin Resource Sharing (CORS), used for enabling pre-flight option
cors = require('cors');

//e-commerce warehouse manager
var shopManager = require('./shopManager.js');

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));//set to true since we want to parse nested objects in the JSON we receive
app.use(bodyParser.json());// JSON

//set up the server
app.set('port', (process.env.PORT || 5000));
//enable pre-flight authorization
app.options('*', cors());

/**
 * @brief returns a static welcome page.
 * @return a static page.
 */
app.get('/', function(request, response) {
	var headers = {};
	//answer
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end("Welcome dear customer");
});

/**
 * @brief returns the content of warehouse
 * @return a static page.
 */
app.get('/showWarehouse', function(request, response) 
{
	var headers = {};
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end(JSON.stringify(shopManager.getWarehouse()));
});

/**
 * @brief search for an item
 * @return search an item using id, if it does not exists it returns 404
 */
app.post('/search', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var itemID;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
        //read items
        
        //ItemId
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
			 itemID = parseFloat(request.body.ID);
		else 
			itemID = null;
        
		//search for items
		var item = shopManager.searchItem(itemID);
		//if exists
		if (item != null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(item));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}
	
	}
	else
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}
    

});

/**
 * @brief sell item
 * @return the sold item, identified by ID, decrese by 1
 */
app.post('/sellItem', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var itemID;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
        //ItemId
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
			 itemID = parseFloat(request.body.ID);
		else 
			itemID = null; 
	
	}
	else
	{
		itemID = null;
	}
    
	var itemSold;
	
    if (itemID!=null)
	{
		//aceptable input
		//delete sell an item
		itemSold = shopManager.sellItem(itemID);
		if (itemSold!= null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(itemSold));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}

	}
    else    
		{
        	//unaceptable input
        	response.writeHead(406, headers);
			response.end(JSON.stringify("1"));
		}   

});

/**
 * @brief restok an item
 * @return the item restoked
 */
app.post('/restockItem', function(request, response) 
{	
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var itemID;
	var itemQuantity;

	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID &&
			 typeof request.body.quantity !== 'undefined' && request.body.quantity 
		   )
            {
			 itemID = parseFloat(request.body.ID);
			 itemQuantity = parseFloat(request.body.quantity);
            }
		else 
			itemID = "undefined";
	}
	else
	{
		itemID = "body undefined";
	}
    
    if (itemID!="undefined" && itemID!="body undefined")
	{
		//aceptable input
		//create the item
		var item =  
            {
                ID: itemID,
                quantity: itemQuantity
            };
        
        var result=shopManager.restockItem(item)
		
		//if insertion works correctly
		if (result)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(result));
		}
		else
		{
			response.writeHead(400, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});