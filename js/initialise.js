/* Listen For Signal that Device is ready */

function loadFunction()
{
	if (navigator.userAgent.match(/Android/)) 
	{
        document.addEventListener("deviceready", onDeviceReady, false);
	} 
	else 
	{
		console.log("loadFunction Hit");
		onDeviceReady();
	}
}

/* Once the device is ready Get Devices Current Position */
	/* Pass through a time out parameter of  30 seconds */
	/* Listen For the Search Button to be clicked */
function onDeviceReady()
{
	console.log("onDeviceReady Hit");
	
	console.log("launchPreLoader");
	
	document.getElementById("weatherSearchButton").addEventListener("click", handleSearch);
	document.getElementById("umbrellaButton").addEventListener("click", doUmbrellaQuery);
	document.getElementById("sunglassesButton").addEventListener("click", doSunglassesQuery);
	document.getElementById("city").addEventListener("focusin", searchFocus);
	var options = {enableHighAccuracy: false, timeout: 30000};
	navigator.geolocation.getCurrentPosition(startProcess, onPositionRecivedError, options);
}

/* If devices Location provides an error */
/* Throw an alert to console with the Errors Code and Message */		
function onPositionRecivedError(error) 
{
	console.log(
		'code: '    + error.code    + '\n' +
    	'message: ' + error.message + '\n');
}

/* Pass the devices location to rest of app */
function startProcess(location)
{
	console.log("startProcess Hit");
	console.log(location.coords.latitude + ' & ' + location.coords.longitude);
	getGeoLocationWeatherData(location);
}
