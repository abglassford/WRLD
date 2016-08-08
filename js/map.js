$(document).on('ready', function() {
  console.log('map ready!');
  })

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 18
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      getGeoLocation(infoWindow, map)();
      setInterval(getGeoLocation(infoWindow, map), 1000);
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
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
        window.gPos = pos
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
        console.log(`position`, pos);
        console.log(`gather`, gather);
        finder(pos, gather)


      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    }
  }

var gather = {
  lat: 39.7334925,
  lng: -104.9925111,
  found: false,
  achievement: 'locked',
  achMessage: `You've discovered Gather!`
}
  function finder (position, place) {
    if(place.lat - position.lat <= 0.0001 && place.lng - position.lng <= 0.0001){

  }




    // (position.lng <= place.lng + 0.0001)){
    // alert(place.achMessage)
    // place.found === true
    // place.achievement === 'unlocked'
  }


  // function achievement (place.found) {
  //   // if(place.found){
  //   //   $('#achievmentList').append('specific achievment div/data')
  //   // }
  // }
