var map//DON'T DELETE
var infoWindow; //DON'T DELETE
var points = 0
var discoveredPlaces = []
var allPlaces = []
var achLibrary = []
var typesLibrary = {}
var latSimulation = 39.7336886
var lngSimulation = -104.99295690000001


var typeList = ['amusement_park', 'aquarium', 'art_gallery', 'library', 'bakery', 'bar', 'lodging', 'book_store', 'bowling_alley', 'cafe', 'movie_theater', 'museum', 'night_club', 'casino', 'cemetery', 'city_hall', 'restaurant', 'embassy', 'shopping_mall', 'stadium', 'university', 'zoo', 'park']

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
  $('.popUp').text(`You've discovered ${place.name}`)
  $('.mainPop').modal('show')
  setTimeout(function () {
    $('.mainPop').modal('hide');
  }, 3000)
}

function appendDiscovered (place) {
  $('.discovered').append(`<li class='discList col-md-8 col-md-offset-2 col-xs-12'><img class='icon' src=./iconpack/icons/${place.types[0]}.svg>${place.name}</li>`)
}
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function fadeInAll () {
  $('#fade').fadeIn(800)
  $('.title').fadeIn(400)
  $('.map-background').fadeIn(400)
  $('.undiscoveredDiv').fadeIn(400)
  setTimeout(function () {
    $('.allAchievements').fadeIn(600)
    $('.allDiscovered').fadeIn(600)
    $('.allUndiscovered').fadeIn(600)
    }, 300)
  }
