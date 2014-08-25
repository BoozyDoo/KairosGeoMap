 			/* Once the searchButton is clicked */
 			/* Take the City Name from the search bar */
 			/* pass it into the URL and then send this */
 			function handleSearch(city)
    		{
    			console.log("handleSearch");
    			var searchCity = document.getElementById("city").value;
    			var cityUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+ searchCity + '&callback=?';
    			$.getJSON(cityUrl, displayCityWeather, cityError);
    		}
    		
    		/* If Search provides an error */
			/* Throw an alert to console with the Errors Code and Message */	
    		function cityError(error) 
			{
        		console.log(
        			'code: '    + error.code    + '\n' +
                	'message: ' + error.message + '\n');
    		}
    		
    		/* Use data received from handleSearch function */
    		function displayCityWeather(data)
    		{
    			
    			/* The following If Statements are used to check the  */
				/* Icon type and then set the image variable to the */
				/* Correct image name */
				console.log("displayCityWeather");
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
	    		var citySearchWeatherData = [];
	    		citySearchWeatherData.push(data.coord.lon);
	    		citySearchWeatherData.push(data.coord.lat);
	    		citySearchWeatherData.push(data.wind.speed);
	    		citySearchWeatherData.push(data.wind.deg);
	    		citySearchWeatherData.push(sunriseTime);
	    		citySearchWeatherData.push(sunSetTime);
	    		citySearchWeatherData.push(data.sys.country);
	    		citySearchWeatherData.push(data.name);
	    		citySearchWeatherData.push(data.weather[0].id);
	    		citySearchWeatherData.push(data.weather[0].description);
	    		citySearchWeatherData.push(data.weather[0].main);
	    		citySearchWeatherData.push(data.main.humidity);
	    		citySearchWeatherData.push((data.main.temp_max - 273.15));
	    		citySearchWeatherData.push((data.main.temp_min - 273.15));
	    		citySearchWeatherData.push((data.main.temp - 273.15));
	    		citySearchWeatherData.push(image);
	    		onSearchSuccess(citySearchWeatherData);
	    		
	    		/* Send data from the prevous array via ajax to the PHP backend */
	    		/* For Writing to the SQL DB */
	    		$.ajax({
	    			type: "POST",
	    			url: "http://ec2-54-77-158-182.eu-west-1.compute.amazonaws.com/citySearchSave.php",
	    			data: { lon: citySearchWeatherData[0] , lat : citySearchWeatherData[1],
	    				windspeed: citySearchWeatherData[2], deg : citySearchWeatherData[3],
	    				sunrise: citySearchWeatherData[4], sunset : citySearchWeatherData[5],
	    				country: citySearchWeatherData[6], name : citySearchWeatherData[7],
	    				weatherid: citySearchWeatherData[8], desc : citySearchWeatherData[9],
	    				main: citySearchWeatherData[10], humidity : citySearchWeatherData[11],
	    				tempmax: citySearchWeatherData[12], tempmin : citySearchWeatherData[13],
	    				temp: citySearchWeatherData[14]},
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
    		
    		$('.citySearchBar').keypress(function(event){
		    if ( event.which == 13 ) return false;
		    //or...
		    if ( event.which == 13 ) event.preventDefault();
			});
	    	
    	/* When search bar is click in remove old data from screen */
    	function searchFocus()
    	{
    		console.log("searchFocus");
    		$('.searchMapArticle').empty();
    	}