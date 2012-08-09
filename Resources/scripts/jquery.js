var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var you;
var me;

$(document).ready(function(){
	
	/*** Geolocation ***/
	window.onload = function(){
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
	}
});

function handleGetCurrentPosition(location){
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    you = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
	me = new google.maps.LatLng(10.304954791488173, 123.89343649148941);
	// initialize map
	initialize();
	calcRoute();
}

function onError(){
	alert("Your browser doesn't support Geolocation.");
}

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: you
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var request = {
      origin: you,
      destination: me,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}