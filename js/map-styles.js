var mapStyle = [
        {
          stylers: [
            { hue: '#F6E2A3' },
          ]
        },{
          featureType: 'transit.station.bus',
          stylers: [
            { visibility: 'off' }
          ]
        },{
          featureType: 'landscape',
          stylers: [
            { color: '#F6E2A3' },
            { saturation: -60 },
            { lightness: -10 }
          ]
        },{
          featureType: 'all',
          stylers: [
            { saturation: 0 }
          ]
        },{
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            { hue: '#F6E2A3' },
            { saturation: -90 },
            { lightness: -60 },
            { visibility: 'simplified' }
          ]
        },{
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            { hue: '#F6E2A3' },
            { saturation: 20 },
            { lightness: -60 },
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
        }, {
            featureType: "transit.station.bus",
            stylers: [
              { visibility: "off" }
            ]
          }
      ]
