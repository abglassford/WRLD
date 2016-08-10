$(document).on('ready', function() {
  console.log('map ready!');
  })
var map;
var infoWindow;
var placeObjArr = []
//initialize map
function initMap() {
  //myPos is hardcoded starting postition
  var myPos = {lat: 39.7336014, lng: -104.9923434}
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPos,
    zoom: 18,
  });
  infoWindow = new google.maps.InfoWindow({map: map});
  //if browser supports geolocation
  if (navigator.geolocation) {
    //call getGeoLocation
    getGeoLocation(infoWindow, map)();
    //call getGeoLocation every 5 seconds to update location
    setInterval(getGeoLocation(infoWindow, map), 5000);
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}




function getGeoLocation (infoWindow, map) {
  //return internal function
  return function () {
    navigator.geolocation.getCurrentPosition(function(position) {
      //pos is my current position
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      getNearbyNodes(pos)
      //set position of the map to my posittion
      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Location');
      //set center of map to my position
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
}


function getNearbyNodes (position) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: position,
    radius: 100
  }, callback);
}


function callback(results, status) {
  $('.nearby').html('')
  placeObjArr = results
  if (status === google.maps.places.PlacesServiceStatus.OK) {

    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
      $('.nearby').append(`<li>${results[i].name}</li>`)
    }
  }
}



function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}




function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}



function averageDist (position, place) {
  var avgLatDist = Math.abs(position.lat - place.geometry.location.lat())
  var avgLngDist = Math.abs(position.lng - place.geometry.location.lng())
  var avgDist = (avgLatDist + avgLngDist) / 2
  return avgDist
}



function achUnlock (position, place) {
  for (var i = 0; i < place.length; i++) {
    if(averageDist(position, place[i]) < 0.0002 && place.found === false){
      achModal(place[i])
      place.found = true
      appendAchievement(place)
    }
  }
}



function achModal (place) {
  $('.modal-content').text(`You've discovered ${place.name}`)
  $('.modal').modal('show')
  setTimeout(function () {
    $('.modal').modal('hide');
  }, 3000)
}



function appendAchievement (place) {
  $('.achievements').append(`<li>${place.achievement}</li>`)
}



function makePlaceObjArr (place) {
    placeObjArr.push(
      {
      name: place.name,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      found: false
    })
}
