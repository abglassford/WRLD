$(document).on('ready', function() {
  console.log('map ready!');
  })
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.7336014, lng: -104.9923434},
      zoom: 18
    });
    var infoWindow = new google.maps.InfoWindow({map: map});
    if (navigator.geolocation) {
      getGeoLocation(infoWindow, map)();
      setInterval(getGeoLocation(infoWindow, map), 2000);
    } else {
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
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
        nearbyNodes(pos, local)
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    }
  }
  function nearestNode (position, place) {
    var lat = Math.abs(position.lat - place.lat)
    var lng = Math.abs(position.lng - place.lng)
    var avgDist = (lat + lng) / 2
    console.log('avgDist', avgDist);
    if(avgDist < .0002){
      console.log(place.achMessage);
    }
  }
  function nearbyNodes (position, local) {
    var localNodes = local.filter(function (node) {
      if((Math.abs(node.lat - position.lat) < .0004) && (Math.abs(node.lng - position.lng) < .0004)){
        console.log(localNodes)
      }
    })
  }
