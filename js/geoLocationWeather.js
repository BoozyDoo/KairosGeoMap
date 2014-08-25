/* Pass the devices location to the Open Weather API */
/* Using a partial URL and parameters from the location data */
/* Passed From the Initialise.js onDeviceReady function */
/* On Success pass data to new function */
function getGeoLocationWeatherData(location)
{
	console.log("getGeoLocationWeatherData Hit");
	console.log(location);
	var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&callback=?';
	$.getJSON(url, displayLocationWeather);
	
}
    		
/* Use data received from onDeviceSuccess function */
function displayLocationWeather(data)
{
	/* The following If Statements are used to check the  */
	/* Icon type and then set the image variable to the */
	/* Correct image name */
	var image = 'placeHolder';
	if(data.weather[0].icon == '01d')
	{
		image =	 '01d';
	}
	if(data.weather[0].icon == '01n')
	{
		image =	 '01n';
	}
	if(data.weather[0].icon == '02d')
	{
		image =	 '02d';
	}
	if(data.weather[0].icon == '02n')
	{
		image =	 '02n';
	}
	if(data.weather[0].icon == '03d')
	{
		image =	 '03d';
	}
	if(data.weather[0].icon == '03n')
	{
		image =	 '03d';
	}
	if(data.weather[0].icon == '04d')
	{
		image =	 '04d';
	}
	if(data.weather[0].icon == '04n')
	{
		image =	 '04d';
	}  			
	if(data.weather[0].icon == '09d')
	{
		image =	 '09d';
	}
	if(data.weather[0].icon == '09n')
	{
		image =	 '09d';
	}
	if(data.weather[0].icon == '10d')
	{
		image =	 '10d';
	}
	if(data.weather[0].icon == '10n')
	{
		image =	 '10n';
	}
	if(data.weather[0].icon == '11d')
	{
		image =	 '11d';
	}
	if(data.weather[0].icon == '11n')
	{
		image =	 '11d';
	}
	if(data.weather[0].icon == '13d')
	{
		image =	 '13d';
	}
	if(data.weather[0].icon == '13n')
	{
		image =	 '13d';
	}
	if(data.weather[0].icon == '50d')
	{
		image =	 '50d';
	}
	if(data.weather[0].icon == '50n')
	{
		image =	 '50d';
	}
	
	/* Convert Timestamps to a readable format and correct local */
	var sunriseTimeStamp = new Date(data.sys.sunrise*1000);
	var sunriseTime = sunriseTimeStamp.toLocaleTimeString(); 
	var sunSetTimeStamp = new Date(data.sys.sunset*1000);
	var sunSetTime = sunSetTimeStamp.toLocaleTimeString(); 
	
	/* put data into array ready for transmission to PHP and mySQL  */
	/* to write data to the Kairos Database */
	var geoLocationWeatherData = [];
	geoLocationWeatherData.push(data.coord.lon);
	geoLocationWeatherData.push(data.coord.lat);
	geoLocationWeatherData.push(data.wind.speed);
	geoLocationWeatherData.push(data.wind.deg);
	geoLocationWeatherData.push(sunriseTime);
	geoLocationWeatherData.push(sunSetTime);
	geoLocationWeatherData.push(data.sys.country);
	geoLocationWeatherData.push(data.name);
	geoLocationWeatherData.push(data.weather[0].id);
	geoLocationWeatherData.push(data.weather[0].description);
	geoLocationWeatherData.push(data.weather[0].main);
	geoLocationWeatherData.push(data.main.humidity);
	geoLocationWeatherData.push((data.main.temp_max - 273.15));
	geoLocationWeatherData.push((data.main.temp_min - 273.15));
	geoLocationWeatherData.push((data.main.temp - 273.15));
	geoLocationWeatherData.push(image);
	console.log(geoLocationWeatherData);
	document.addEventListener("deviceready", onPositionSuccess(geoLocationWeatherData));
	
	/* Determine If the weather is clear or rainy */
	/* If weather is clear show Sunglasses Button */   		
	/* If weather is clear show Umbrella Button */   		
	var id = data.weather[0].id + "";
	if( id[0] === '2' || id[0] === '3' || id[0] === '5')
	{
		$( "#umbrellaButton").show();
		$( "#sunglassesButton").hide();
	}
	if(id[0] === '8')
	{
		$( "#umbrellaButton").hide();
		$( "#sunglassesButton").show();
	}
	/* Send data from the prevous array via ajax to the PHP backend */
	/* For Writing to the SQL DB */
	$.ajax({
		type: "POST",
		url: "http://ec2-54-77-158-182.eu-west-1.compute.amazonaws.com/geoLocSave.php",
		data: { lon: geoLocationWeatherData[0] , lat : geoLocationWeatherData[1],
			windspeed: geoLocationWeatherData[2], deg : geoLocationWeatherData[3],
			sunrise: geoLocationWeatherData[4], sunset : geoLocationWeatherData[5],
			country: geoLocationWeatherData[6], name : geoLocationWeatherData[7],
			weatherid: geoLocationWeatherData[8], desc : geoLocationWeatherData[9],
			main: geoLocationWeatherData[10], humidity : geoLocationWeatherData[11],
			tempmax: geoLocationWeatherData[12], tempmin : geoLocationWeatherData[13],
			temp: geoLocationWeatherData[14]},
		success: function(data){
		console.log(data);
		console.log('Your comment was successfully added');
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(data);
			console.log(xhr.status);
			console.log(xhr.responseText);
			console.log(thrownError);
			console.log('There was an error adding your comment');
		}
	});

}
