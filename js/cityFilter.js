    		function split(val) 
    		{
    			/* Split itemts up and return as an array */
        		return val.split(/,\s*/);
    		}

    		function extractLast(term) 
    		{
    			/* Return the last Item of the array*/
        		return split(term).pop();
    		}

    		function extractFirst(term) 
    		{
    			/* Return Item at position one in the array*/
        		return split(term)[0];
    		}
    		
    		function extractSecond(term) 
    		{
    			// Determining for Home COuntries to use UK inseat of country codes
    			// like SC or EN which didnt work with the Weather API
    			if(split(term)[2] == "United Kingdom")
    			{
    				return split(term)[2];
    			};
    			
    			if(split(term)[2] != "United Kingdom")
    			{
    				return split(term)[1];
    			};
        		
    		}
    		
    		// Hacked Function from Autocomplete API
    		// providers that sends the name being typed in to the City Search Bar
    		// to the API and returns possible matches
    		$(function ()
    		{
        		var $citiesField = jQuery("#city");

        		$citiesField.autocomplete(
        		{
	            	source: function (request, response) 
	            	{
		                $.getJSON(
		                    "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + extractLast(request.term), 
		                    function (data) 
	        				{
	        					response(data);
	        				});
		            },
		            // Minimum length of string before sending request
		            minLength: 3,
		            
		            // what to do once that Name has been selected by the user. 
	            	select: function (event, ui) 
	            	{
	                	var selectedObj = ui.item;
	                	placeName = selectedObj.value;
	                	if (typeof placeName == "undefined") placeName = $citiesField.val();
	
	                	if (placeName) 
	                	{
	                    	var terms = split($citiesField.val());
	                    	// remove the current input
	                    	terms.pop();
	                    	// add the selected item (city only)
	                    	terms.push(extractFirst(placeName));
	                    	// add placeholder to get the comma-and-space at the end
	                    	//terms.push("");
	                    	terms.push(extractSecond(placeName));
	                    	$citiesField.val(terms.join(","));
	                	}
	
	                return false;
	            	},
	            	focus: function() 
	            	{
	                	// prevent value inserted on focus
	                	return false;
	            	},
        		});

        		$citiesField.autocomplete("option", "delay", 100);
    	});