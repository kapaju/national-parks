// Create map using Leaflet.js-functions
function createMap() {

  let myMap = L.map('map-id').setView([65.5, 26.8], 5);


  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 15,
      minZoom: 5
  }).addTo(myMap);



  function onEachFeature(feature, layer) {
    layer.bindPopup(
      '<h2>' + feature.properties.nimi + '</h2>' + '<p>Perustettu: ' + feature.properties.perustamisvuosi
      + '<br>' + 'Koko (km²): ' + feature.properties.koko + '</p><p> Vuonna 2019 kävijöitä ' 
      + feature.properties.kavijat.toLocaleString('fi-FI') +'.</p>'
    );
  }

  let markerStyle = {
    color: "#330033",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
  };
    
  fetch("/data/parkdata.geojson")
    .then(response => {
      return response.json();
    })
    .then(data => {
      L.geoJSON(data, {
        style: function (feature) {
          if (feature.properties.kavijat >= 100000){
            return {'fillColor': '#ff6200', 'radius': 20};
          }
          else if (feature.properties.kavijat > 50000) {
            return {'fillColor': '#ff8833', 'radius': 18};
          }
          else if (feature.properties.kavijat > 25000) {
            return {'fillColor':'#ffa85d', 'radius': 14};
          } 
          else {
            return {'fillColor': '#ffc489', 'radius': 10};
          }
        },
        pointToLayer: function (feature, latlgn) {
          return L.circleMarker(latlgn, markerStyle);
        },
        onEachFeature: onEachFeature
      }).addTo(myMap)  
    });


}

createMap();