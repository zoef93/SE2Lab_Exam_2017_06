//test of the APIs

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

//library for JSON requests
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);


// Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});
 
// Test for /searchItem
describe("Test /search", function() {
	//set the data
	var data = {
			ID: 1
		};
	
	//legal request
	it("to returns status code 200", function(done) {
	  client.post(base_url + "search/", data, function(err, res, body) {
		expect(body).toEqual(
			{
                ID: 1,
                price: 11,
                quantity: 20,
                boxSize: "S",
                place: [2,3]
	       }
		);

		done();
	  });
	});

	//item non existing
	data1 = {ID: "10" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "search/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	

});


//Test for /sellItem
describe("Test /sellItem", function() {	
	//legal request
	var data = {
			ID: 1
    };
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "sellItem/", data, function(err, res, body) {
		expect(body).toEqual(
        {
                ID: 1,
                price: 11,
                quantity: 19,
                boxSize: "S",
                place: [2,3]
        }
		);
		done();
	  });
	});
	

	//item non existing ID
	var data1 = {
			ID: 10
    };
	it("to return status code 404", function(done) {
	  client.post(base_url + "sellItem/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1" };
	it("to return status code 406", function(done) {
	  client.post(base_url + "sellItem/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});

//Test for /send
describe("Test /sendItem", function() {	
	//legal request
	var data = {
			ID: 1,
            placeH: 2,
            placeW: 3
    };
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "sendItem/", data, function(err, res, body) {
		expect(body).toEqual(
        {
            typeShipment: "economic"
        }
		);
		done();
	  });
	});
	

	//item non existing ID
	var data1 = {
            ID: 10,
            placeH: 2,
            placeW: 3
    };
	it("to return status code 400", function(done) {
	  client.post(base_url + "sendItem/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(400);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1" };
	it("to return status code 406", function(done) {
	  client.post(base_url + "restockItem/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});


//my code
//Test for /restockItem
describe("Test /restockItem", function() {	
	//legal request
	var data = {
			ID: 1,
            quantity: 3 
    };
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "restockItem/", data, function(err, res, body) {
		expect(body).toEqual(
        {
            ID: 1,
            quantity: 23
        }
		);
		done();
	  });
	});
	

	//item non existing ID
	var data1 = {
            ID: 10,
            quantity: 3
    };
	it("to return status code 400", function(done) {
	  client.post(base_url + "restockItem/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(400);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1"};
	it("to return status code 406", function(done) {
	  client.post(base_url + "restockItem/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});

//Test for /showWarehouse
describe("Test /showWarehouse", function() {	

    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(body).toEqual(
                    {
                        warehouse = [
                            {
                                ID: 1,
                                price: 11,
                                quantity: 20,
                                boxSize: "S",
                                place: [2,3]
                            },
                            {
                                ID: 2,
                                price: 1100,
                                quantity: 1,
                                boxSize: "m",
                                place: [10,0]
                            },
                            {
                                ID: 3,
                                price: 13,
                                quantity: 50,
                                boxSize: "S",
                                place: [4,7]
                            },
                            {
                                ID: 4,
                                price: 320,
                                quantity: 4,
                                boxSize: "L",
                                place: [10,3]
                            },
                            {
                                ID: 5,
                                price: 25,
                                quantity: 73,
                                boxSize: "L",
                                place: [7,1]
                            },
                        ];
                    });
                
            expect(response.statusCode).toBe(200);        
            done();
            
    }); 
	
});});