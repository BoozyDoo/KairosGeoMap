/*COntrol Variable*/
var umbAllGood = false;

/* Comments from the importio Website
 * 
 * Configure the library */
importio.init(
{
  "auth": {
    "userGuid": "59970f0a-6c83-4bf9-8ccd-9675835dc222",
    "apiKey": "RXC8O28Afmf0CS/FJkMSqBn3Ms39bGqPFac/rMfrnNsdKYS2a+U2RnZ2XX5x2d1L5q7rVkWvrEQk0GHQCLOZHg=="
  },
  "host": "import.io"
},
umbAllGood = true);

/* Data and done callbacks */
 function dataCallBackUmbrella(data) 
{
	console.log("Umbrella Data received", data);
	displayUmbrellas(data);
};

function doneCallBackUmbrella(data) 
{
  console.log("Umbrella Done, all data:", data);
  umbAllGood = false;
};


/* Do the query (when the function is called) */     
function doUmbrellaQuery() 
{
	console.log("doUmbrellaQuery");
	if(umbAllGood = true)
	{
		// Query for tile debenhams
		importio.query({
		    "connectorGuids": [
		      "77225153-aa58-41ff-b9b4-5ae4efa6c5f5"
		    ],
		    "input": {
		      "producttype": "umbrellas"
		    }
		  }, { "data": dataCallBackUmbrella, "done": doneCallBackUmbrella});
	}

};

/* Loop through Data from ImportIO and insert it into a html layout
 * Insert layout in to an array and then display this array
 * on screen. 
 */
function displayUmbrellas(data)
{
	console.log("displayUmbrellas");
	var html ='';
	var htmlArray = [];
	for (var i = 0; i < data.length; i++) 
	{
		var html = '<div id="headingCity">'+ data[i].data.description + '</div>'+
		    		'<img src='+ data[i].data.icon +'  alt=" " /> <br />'+
		    		'<div id="headingSub">'+ data[i].data.make + ' </div>'+
		    		'<div id="headingSub">' + data[i].data.price + '</div><br />'+
		    		'<hr>';
		    		htmlArray.push(html);
	}
	var umbrellasElement = document.getElementById('umbrellasContent');
		    		umbrellasElement.innerHTML = htmlArray;
}


/* on Button Press Return to Main Screen */
function umbrellaStopButtonPress() 
{	
	umbAllGood = false;
	document.location.href = 'index.html';
};
