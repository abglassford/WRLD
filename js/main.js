$(document).on('ready', function() {
  console.log('map ready!');
  })
  var map;
  var infoWindow;
  var nearbyNode = []
  function initMap() {
    var myPos = {lat: 39.7336014, lng: -104.9923434}

    map = new google.maps.Map(document.getElementById('map'), {
      center: myPos,
      zoom: 18,
    });

    infoWindow = new google.maps.InfoWindow({map: map});
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: myPos,
      radius: 150,
      type: ['point_of_interest']
    }, callback);

    if (navigator.geolocation) {
      getGeoLocation(infoWindow, map)();
      setInterval(getGeoLocation(infoWindow, map), 1000);
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        $('.nearby').append(`<li>${results[i].name}</li>`)
      }
    }
  }
  function createMarker(place) {
    var placeLoc = place.geometry.location;
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
  function getGeoLocation (infoWindow, map) {
    return function () {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('You Location');
        map.setCenter(pos);
        achUnlock(pos, local[0])
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    }
  }
  function nearbyNodes (nearby) {
    for (var i = 0; i < nearby.length; i++) {
      $('.nearby').append(`<li>${place[i].name}</li>`)
    }
  }
  function averageDist (position, place) {
    var avgLatDist = Math.abs(position.lat - place.lat)
    var avgLngDist = Math.abs(position.lng - place.lng)
    var avgDist = (avgLatDist + avgLngDist) / 2
    return avgDist
  }
  function achUnlock (position, place) {
    if(averageDist(position, place) < 0.0002 && place.found === false){
      achModal(place)
      place.found = true
      appendAchievement(place)
    }
  }
  function achModal (place) {
    $('.modal-content').text(`Achievement Unlocked: ${place.achievement}`)
    $('.modal').modal('show')
    setTimeout(function () {
      $('.modal').modal('hide');
    }, 3000)
  }
  function appendAchievement (place) {
    $('.achievements').append(`<li>${place.achievement}</li>`)
  }
