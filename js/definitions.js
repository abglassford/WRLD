var map//DON'T DELETE
var infoWindow; //DON'T DELETE
var discoveredPlaces = []
var allPlaces = []
var achLibrary = []
var typesLibrary = []
var latSimulation = 39.7336014
var lngSimulation = -104.9923434



var typeList = ['amusement_park', 'aquarium', 'art_gallery', 'library', 'bakery', 'bar', 'lodging', 'book_store', 'bowling_alley', 'cafe', 'movie_theater', 'museum', 'night_club', 'casino', 'cemetery', 'church', 'city_hall', 'restaurant', 'embassy', 'shopping_mall', 'stadium', 'university', 'zoo', 'park']


function createMarker(place) {
  let customMarker = {
    url: `./iconpack/icons/${place.types[0]}.svg`,
    scaledSize: new google.maps.Size(30, 30)
  }
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: customMarker
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
function discModal (place) {
  $('.modal-content').text(`You've discovered ${place.name}`)
  $('.modal').modal('show')
  setTimeout(function () {
    $('.modal').modal('hide');
  }, 3000)
}
function appendDiscovered (place) {
  $('.discovered').append(`<li class='discList col-md-12 col-xs-12'>${place.name}<img class='icon' src=./iconpack/icons/${place.types}.svg></li>`)
}
