var mapStyle = [
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
