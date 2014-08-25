function onPositionSuccess(success) {
	console.log("Geo Map Success");
	console.log(success);
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcontainer';
  mapcanvas.style.height = '425px';
  mapcanvas.style.width = '288px';
  
  document.getElementById("geoMapArticle").appendChild(mapcanvas);

  var coords = new google.maps.LatLng(success[1], success[0]);
  
  var options = {
    zoom: 14,
    center: coords,
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
  var map = new google.maps.Map(document.getElementById("mapcontainer"), options);
  
  map.panBy(0,-140);

  var marker = new google.maps.Marker({
      position: coords,
      map: map,
      clickable : false,
      title:"You are here!"
  });
  
  var contentString = '<div id="headingCity"><img src="images/weatherIcons/' + success[15] + '.png" alt=" " />'  +' </div>'+
	 			'<div id="headingCity">'+ success[7] + '</div>'+
	    		'<div id="headingSub">' + success[10] + ' : ' + success[9] + '</div>' +
	    		'<div id="headingSub">Current Temp: ' + success[14].toFixed(2) + '°C' + '</div>' +
	    		'<div id="headingSub">Max Temp: ' + success[12].toFixed(2) + '°C' + '</div>' +
	    		'<div id="headingSub">Min Temp: ' + success[13].toFixed(2) + '°C' + '</div>' +
	    		'<div id="headingSub">Wind Speed: ' + success[2] + ' m/s ' + '</div>' +
	    		'<div id="headingSub">Wind Direction: ' + success[3] + '°' + '</div>' + 
	    		'<div id="headingSub"><img src="images/weatherIcons/sunrise16x16.png"/> Sunrise : ' + success[4] + '</div>' + 
	    		'<div id="headingSub"><img src="images/weatherIcons/sunset16x16.png"/> Sun Set : ' + success[5] + '</div>';
    
 	var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300
  });
    infowindow.open(map,marker);
}
