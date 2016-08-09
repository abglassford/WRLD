(function () {
  console.log('local ready!');
}());

var local = [{
    name: 'Gather',
    lat: 39.733675,
    lng: -104.992669,
    found: false,
    achievement: 'locked',
    achMessage: `Level up at Galvanize!`
  },
  {
    name: 'Metropolist',
    lat: 39.733606,
    lng: -104.991972,
    found: false,
    achievement: 'locked',
    achMessage:`Grab some coffee at Metropolis!`
  },
  {
    name: 'The Station HAir Studio',
    lat: 39.734148,
    lng: -104.992739,
    found: false,
    achievement: `locked`,
    achMessage: `New Location Found!`
  },
  {
    name: 'Skin In the City',
    lat: 39.734025,
    lng: -104.992747,
    found: false,
    achievement: `locked`,
    achMessage: `New Location Found!`
  }
]

var nearest = []
