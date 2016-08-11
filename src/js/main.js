$(document).on('ready', function() {
  console.log('main ready!');
})

function initMap() {
  var myPos = {lat: 39.7336014, lng: -104.9923434}
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPos,
    zoom: 18,
    styles: mapStyle
  });
  infoWindow = new google.maps.InfoWindow({map: map});
  var myMarker = {
      url: '../img/blackMarker.png',
      scaledSize: new google.maps.Size(27, 42),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0, 55)
  };
  myMarker = new google.maps.Marker({
    map: map,
    icon: myMarker
  });
  if (navigator.geolocation) {
    getGeoLocation(myMarker, map)();
    setInterval(getGeoLocation(myMarker, map), 2000);
  } else {
    handleLocationError(false, myMarker, map.getCenter());
  }
}
function getGeoLocation (myMarker, map) {
  return function () {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var tempPos = {
        lat: latSimulation,
        lng: lngSimulation
      }
      getNearbyNodes(tempPos, addPlaces);
      achivementFn(achievements)
      myMarker.setPosition(tempPos);
      map.setCenter(tempPos);
    }, function() {
      handleLocationError(true, myMarker, map.getCenter());
    });
    latSimulation += .000001
    lngSimulation += .0001
  }
}
function getNearbyNodes (position, callback) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: position,
    radius: 100,
    types: typeList
  }, callback(position));
}
function makePlaceObjArr (place) {
  if(!place){
    return []
  }
  var tempArr = []
  for (var i = 0; i < place.length; i++) {
    tempArr.push(
      {
      name: place[i].name,
      lat: place[i].geometry.location.lat(),
      lng: place[i].geometry.location.lng(),
      types: place[i].types
    })
  }
  return tempArr;
}
function discover (position, place) {
  for (var i = 0; i < place.length; i++) {
    if((averageDist(position, place[i]) < 0.00006) && (!discoveredPlaces.includes(place[i].name))) {
      discModal(place[i])
      discoveredPlaces.push(place[i].name)
      appendDiscovered(place[i])
    }
  }
}
function addPlaces (position) {
  return function (results, status) {
    $('.undiscovered').html('')
    var allPlaces = makePlaceObjArr(results)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      discover(position, allPlaces);
      for (let i= 0; i < allPlaces.length; i++){
        if (!discoveredPlaces.includes(allPlaces[i].name)) {
          $('.undiscovered').append(`<li>${allPlaces[i].name}</li>`)
        }
      }
    }
  }
}
