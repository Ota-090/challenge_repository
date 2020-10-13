// API_KEY
const API_KEY = "pk.eyJ1IjoiYXJ0cGVya2l0bnkiLCJhIjoiY2pvbHhicWppMDd6ODNyczgwajgxOTh1eiJ9.Tp-0nrsAJdOY0SPSfyuzqg";

function getColor(d) {
  if(d > 5 ){
    var color = '#7a0177'
  }else if(d > 4 && d <= 5){
    var color = '#c51b8a'
  }else if(d > 3 && d <= 4){
    var color = '#f768a1' 
  }else if(d > 2 && d <= 3){
    var color = '#fbb4b9'
  }else if(d > 1 && d <= 2){
    var color = '#feebe2'
  }else{
    var color = '#f7f7f7'
  }
  return color
}

// start from here
d3.json("static/data/earthquake.geojson", function (data) {
  var quakes  = data.features
  // console.log(quakes)

  createFeatures(quakes);
});


function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.title + "</h3><hr><p>ID: " + feature.id + "</p>"+"<p>"+"Magnitude:"+feature.properties.mag+"</p>");
  }

  var earthquakes = L.geoJson(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.mag * 5,
        fillColor: getColor(feature.properties.mag),
        color: "#f7f7f7",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.6
      });
    },
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}


function createMap(earthquakes) {

  var streetmap =
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: API_KEY
    });

  var baseMaps = {
    "Street Map": streetmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [43.277159,-106.05],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);

  var legend = L.control({
    position: "bottomleft"
  });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend");
    grades = [0, 1, 2, 3, 4, 5];
    labels = [];

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(myMap);

}