var map; //DON'T DELETE
var infoWindow; //DON'T DELETE
var newObjArr = []
var foundPlaces = []

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
  var avgLngDist = Math.abs(position.lng - place.lng)
  var avgDist = (avgLatDist + avgLngDist) / 2
  return avgDist
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
