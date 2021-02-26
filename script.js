var map = L.map('map').setView([36.7,-119.4], 4);

 L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);


$.getJSON("https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2021-02-12%2000:00:00&endtime=2021-02-19%2023:59:59&maxlatitude=50&minlatitude=24.6&maxlongitude=-110.039&minlongitude=-125&minmagnitude=2.5&orderby=time" 
,function(data){
  var EarthIcon = L.icon({
    iconUrl: 'https://static.thenounproject.com/png/4232-200.png',
    iconSize: [50,40]
  }); 
  L.geoJson(data  ,{
  pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: EarthIcon});
    }, 
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h1>Magnitude: '+feature.properties.mag+'</h1><p>Location: '+feature.properties.place+'</p>');
  }
  }  ).addTo(map);

});

 
$.getJSON("https://opendata.arcgis.com/datasets/4bb7809eac534689b36b2d347ac96220_1.geojson"
,function(data){
    // add GeoJSON layer to the map once the file is loaded

 L.geoJson(data ,{ onEachFeature: function (feature, layer) {
    layer.bindPopup('<h1>Fault Line: '+feature.properties.FLT_ZN_NAM+'</h1><p>Slip Rate: '+feature.properties.SLIPRATE+'</p>');
   }
  }  ).addTo(map);
});

         

