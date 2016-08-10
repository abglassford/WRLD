var mapStyle = [
        {
          stylers: [
            { hue: '#F6E2A3' },
          ]
        },{
          featureType: 'landscape',
          stylers: [
            { color: '#70573F' },
            { saturation: -20 },
            { lightness: 60 }
          ]
        },{
          featureType: 'all',
          stylers: [
            { saturation: -60 }
          ]
        },{
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            { hue: '#F6E2A3' },
            { saturation: -60 },
            { lightness: -60 },
            { visibility: 'simplified' }
          ]
        },{
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            { hue: '#F6E2A3' },
            { saturation: 10 },
            { lightness: -50 },
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
