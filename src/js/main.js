$(document).on('ready', function() {
  console.log('main ready!');
})
//this all looks great. good work -JH
function initMap() {
  var myPos = {lat: 39.7336014, lng: -104.9923434}
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPos,
    zoom: 18,
    styles: [
            {
              stylers: [
                { hue: '#F6E2A3' },
              ]
            },{
              featureType: 'all',
              stylers: [
                { saturation: -60 }
              ]
            },{
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                { hue: '#F6E2A3' },
                { saturation: 20 },
                { lightness: -70 },
                { visibility: 'simplified' }
              ]
            },{
              featureType: 'road',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            },{
              featureType: 'poi',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            }
          ]
  });
  infoWindow = new google.maps.InfoWindow({map: map});
  if (navigator.geolocation) {
    getGeoLocation(infoWindow, map)();
    setInterval(getGeoLocation(infoWindow, map), 2000);
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
function getGeoLocation (infoWindow, map) {
  return function () {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      getNearbyNodes(pos, callback)
      achUnlock(pos, newObjArr)
      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Location');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
}
function getNearbyNodes (position, callbackFn) {
  return new Promise(function(resolve, reject) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: position,
      radius: 100
    }, callbackFn);
  })
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
function achUnlock (position, place) {
  for (var i = 0; i < place.length; i++) {
    if((averageDist(position, place[i]) < 0.0001) && (!foundPlaces.includes(place[i].name))) {
      achModal(place[i])
      foundPlaces.push(place[i].name)
      appendAchievement(place[i])
    }
  }
}
function callback(results, status) {
  $('.nearby').html('')
  makePlaceObjArr(results)
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
