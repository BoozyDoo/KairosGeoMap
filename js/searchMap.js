function onSearchSuccess(searchSuccess) 
{
	console.log("Search Map Success");
	console.log(searchSuccess);
	 var searchMapcanvas = document.createElement('div');
	 searchMapcanvas.id = 'searchMapcontainer';
	 searchMapcanvas.style.height = '425px';
	 searchMapcanvas.style.width = '288px';
  
  document.getElementById("searchMapArticle").appendChild(searchMapcanvas);

  var searchCoords = new google.maps.LatLng(searchSuccess[1], searchSuccess[0]);
  
  var options = {
    zoom: 12,
    center: searchCoords,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl:false,
    draggable: false,
    disableDoubleClickZoom: true,
    navigationControlOptions: {
    	style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("searchMapcontainer"), options);
  
  map.panBy(0,-100);

  var marker = new google.maps.Marker({
      position: searchCoords,
      map: map,
      clickable : false,
      title:"You are here!"
  });
  
  var contentString = '<div id="headingCity"><img src="images/weatherIcons/' + searchSuccess[15] + '.png" alt=" " />'  +' </div>'+
	 			'<div id="headingCity">'+ searchSuccess[7] + '</div>'+
	    		'<div id="headingSub">' + searchSuccess[10] + ' : ' + searchSuccess[9] + '</div>' +
	    		'<div id="headingSub">Current Temp: ' + searchSuccess[14].toFixed(2) + '°C' + '</div>' +
	    		'<div id="headingSub">Max Temp: ' + searchSuccess[12].toFixed(2) + '°C' + '</div>' +
	    		'<div id="headingSub">Min Temp: ' + searchSuccess[13].toFixed(2) + '°C' + '</div>' +
	    		'<div id="headingSub">Wind Speed: ' + searchSuccess[2] + ' m/s ' + '</div>' +
	    		'<div id="headingSub">Wind Direction: ' + searchSuccess[3] + '°' + '</div>' + 
	    		'<div id="headingSub"><img src="images/weatherIcons/sunrise16x16.png"/> Sunrise : ' + searchSuccess[4] + '</div>' + 
	    		'<div id="headingSub"><img src="images/weatherIcons/sunset16x16.png"/> Sun Set : ' + searchSuccess[5] + '</div>';
    
 	var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300
  });
    infowindow.open(map,marker);
}
