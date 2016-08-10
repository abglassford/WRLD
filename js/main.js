$(document).on('ready', function() {
  console.log('main ready!');
})
//this all looks great. good work -JH
function initMap() {
  var myPos = {lat: 39.7336014, lng: -104.9923434}
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPos,
    zoom: 18,
    styles: mapStyle
  });
  infoWindow = new google.maps.InfoWindow({map: map});
  if (navigator.geolocation) {
    getGeoLocation(infoWindow, map);
    setInterval(getGeoLocation(infoWindow, map), 2000);
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
function getGeoLocation (infoWindow, map) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    getNearbyNodes(pos, addPlaces);
    infoWindow.setPosition(pos);
    infoWindow.setContent('Your Location');
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
}
function getNearbyNodes (position, callback) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: position,
    radius: 100
  }, callback(position));
}
function makePlaceObjArr (place) {
  var newObjArr = []
  for (var i = 0; i < place.length; i++) {
    newObjArr.push(
      {
      name: place[i].name,
      lat: place[i].geometry.location.lat(),
      lng: place[i].geometry.location.lng(),
    })
  }

  return newObjArr;
}
function achUnlock (position, place) {
  for (var i = 0; i < place.length; i++) {
    if((averageDist(position, place[i]) < 0.0001) && (!foundPlaces.includes(place[i].name))) {
      achModal(place[i])
      foundPlaces.push(place[i].name)
      appendAchievement(place[i])
    }
  }
}
function addPlaces (position) {
  return function (results, status) {
    $('.nearby').html('')
    var locations = makePlaceObjArr(results)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      achUnlock(position, locations);

      for (let i= 0; i < locations.length; i++){
        if (!foundPlaces.includes(locations[i].name)) {
          $('.nearby').append(`<li>${locations[i].name}</li>`)
        }
      }
    }
  }
}
