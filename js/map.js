

var  osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


var map = L.map('map',{
    center: [-31.6466, -60.7117],
    zoom: 15, 
    minZoom: 13,
    maxZoom: 18,
    maxBounds: L.latLngBounds(-31.1466, -60.0117),
    layers: [Esri_WorldImagery, osm]
});


var estacionamientoAutosLayer = L.geoJson(estacionamiento_autos,{
    style: function(feature) {
        switch (feature.properties.Name) {
            case 'Prohibido Estacionar': return {color: "#ff0000"};
            case 'Estacionamiento vedado':   return {color: "#ffff00"};
            case 'Estacionamiento medido':   return {color: "#6276DA"};
        }
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h4>" + feature.properties.Name + "</h4><p>" +  feature.properties.description + "</p>") ;
     }
}).addTo(map);

var estacionamientoMotosLayer = L.geoJson(estacionamiento_motos,{
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 10,
          fillColor: "#ff0000",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h5>" + feature.properties.Name + "</h5><p>" +  feature.properties.description + "</p>") ;
     }

});

var markers = L.markerClusterGroup();
markers.addLayer(estacionamientoMotosLayer);

var parquimetrosLayer = L.geoJson(parquimetros,{
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#67396D",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h5>" + feature.properties.Name + "</h5><p>" +  feature.properties.description + "</p>") ;
     }

});




var baseMaps = {
    "Imagen": Esri_WorldImagery,
    "Mapa" : osm,   
}

var overLayMaps = {
    "Estacionamiento Medido": estacionamientoAutosLayer,
    "Estacionamientos de Motos" : markers,   
    "Parquímetros": parquimetrosLayer,
}

L.control.layers(baseMaps,overLayMaps).addTo(map);


