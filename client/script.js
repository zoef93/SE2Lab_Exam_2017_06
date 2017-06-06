$(document).ready(function()
{	
	//var baseAddress = "https://polar-coast-16373.herokuapp.com"
	var baseAddress = "http://127.0.0.1:5000"; 
	//post + Json
	$("#btn1").click(function(){
		$.post(baseAddress + "/search",
		{
			ID: 1
		},
		function(data, status){
			alert(" Status: " + status);
            console.log(data);
		},
		"json");
	});
	
	$("#btn2").click(function(){
		$.post(baseAddress + "/sellItem",
		{
			ID: 1
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n box size: " + data.boxSize +
				  "\n quantity: " + data.quantity +
                  "\n price: " + data.price +
                  "\n place: " + data.place +
				  "\n Status: " + status);
		},
		"json");
	});   
    
	$("#btn3").click(function(){
		$.post(baseAddress + "/restockItem",
		{
                ID: 4,
                quantity: 2
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n box size: " + data.boxSize +
				  "\n quantity: " + data.quantity +
                  "\n price: " + data.price +
                  "\n place: " + data.place +
				  "\n Status: " + status);
		},
		"json");
	});
	
	$("#btn4").click(function(){
		$.post(baseAddress + "/sendItem",
		{
			ID: 1,
			placeH: 0,
            placeW: 0
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
		
	$("#btn5").click(function(){
		$.post(baseAddress + "/sendItem",
		{
			ID: 1,
			placeH: 10,
            placeW: 10
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
	
	$("#btn6").click(function(){
		$.post(baseAddress + "/sendItem",
		{
			ID: 2,
			placeH: 10,
            placeW: 10
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
});