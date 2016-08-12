$(document).on('ready', function() {
  console.log('main ready!');
})

function initMap() {
  let myPos = {lat: 39.8334884, lng: -105.0000078}
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPos,
    zoom: 17,
    styles: mapStyle
  });
  infoWindow = new google.maps.InfoWindow({map: map});
  let customMarker = {
    url: './iconpack/icons/postal-code.svg',
    scaledSize: new google.maps.Size(40, 40)
  }
  myMarker = new google.maps.Marker({
    map: map,
    icon: customMarker
  });
  if (navigator.geolocation) {
    getGeoLocation(myMarker, map)();
    setInterval(getGeoLocation(myMarker, map), 1000);
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
    latSimulation += .0001
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
    if((averageDist(position, place[i]) < 0.0001) && (!discoveredPlaces.includes(place[i].name))) {
      discModal(place[i])
      addTypes(place[i].types)
      discoveredPlaces.push(place[i].name)
      appendDiscovered(place[i])
    }
  }
}

function addPlaces (position) {
  return function (results, status) {
    $('.undiscovered').html('')
    allPlaces = makePlaceObjArr(results)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      discover(position, allPlaces);
      for (let i= 0; i < allPlaces.length; i++){
        if (!discoveredPlaces.includes(allPlaces[i].name)) {
          $('.undiscovered').append(`<li class='undiscList col-md-12 col-xs-12'><img class='icon'  src='./iconpack/icons/${allPlaces[i].types[0]}.svg'>${allPlaces[i].name}</li>`)
        }
      }
    }
  }
}
function addTypes (placeType) {
  console.log(placeType);
  for(var key in typesLibrary){
    console.log(key);
    placeType.forEach(function(value){
      console.log(typeof(value));
      if(key !== value){
      typesLibrary[value] = 1
      console.log(typesLibrary[value]);
    } else if (key === value){
      typesLibrary[value]++
    }
    console.log(typesLibrary);
  })
  }



  // console.log(placeType);
  // placeType.forEach(function (data) {
  //   if(!typesLibrary.includes(data)){
  //     typesLibrary.push(data)
  //   }
  // })
  // console.log(typesLibrary);
}
// function removeMarker (position) {
//
// }
