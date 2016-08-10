$(document).on('ready', function() {
  console.log('map ready!');
  })
var map;
var infoWindow;
var resultsArr = []
var newObjArr = []
var foundPlaces = []

function initMap() {
  var myPos = {lat: 39.7336014, lng: -104.9923434}
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPos,
    zoom: 18,
  });
  infoWindow = new google.maps.InfoWindow({map: map});
  if (navigator.geolocation) {
    getGeoLocation(infoWindow, map)();
    setInterval(getGeoLocation(infoWindow, map), 5000);
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


function getNearbyNodes (position) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: position,
    radius: 100
  }, callback);
}



function getGeoLocation (infoWindow, map) {
  return function () {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      getNearbyNodes(pos)
      makePlaceObjArr(resultsArr)
      achUnlock(pos, newObjArr)
      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Location');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
}



function callback(results, status) {
  $('.nearby').html('')
  resultsArr = results
  if (status === google.maps.places.PlacesServiceStatus.OK) {

    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
    for (let i= 0; i < newObjArr.length; i++){
      if (!foundPlaces.includes(newObjArr[i].name)) {
        $('.nearby').append(`<li>${newObjArr[i].name}</li>`)
      }

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
  var avgLatDist = Math.abs(place.lat - position.lat)
  console.log(avgLatDist);
  var avgLngDist = Math.abs(position.lng - place.lng)
  console.log(avgLngDist);
  var avgDist = (avgLatDist + avgLngDist) / 2
  return avgDist
}



function achUnlock (position, place) {

  for (var i = 0; i < place.length; i++) {
    console.log(place[i].name, averageDist(position, place[i]));
    if((averageDist(position, place[i]) < 0.000001) && (!foundPlaces.includes(place[i].name))) {
      achModal(place[i])
      foundPlaces.push(place[i].name)
      appendAchievement(place[i])
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
  $('.achievements').append(`<li>${place.name}</li>`)
}



function makePlaceObjArr (place) {
  newObjArr = []
  for (var i = 0; i < place.length; i++) {
    newObjArr.push(
      {
      name: place[i].name,
      lat: place[i].geometry.location.lat(),
      lng: place[i].geometry.location.lng(),
    })
  }
}
