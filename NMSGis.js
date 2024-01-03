
// Defining map 
var View = new ol.View({
    center: [79.35098195354135, 12.464704466152156],
    zoom: 17,
    projection: 'EPSG:4326'
});
var Osm = new ol.layer.Tile({
    title: 'osm_basemap',
    visible: false,
    source: new ol.source.OSM()
});

var map = new ol.Map({
    target: 'umsmap',
    view: View,
    layers: [Osm],
    keyboardEventTarget: document,

});
var no_map = new ol.layer.Tile({
    title: "No_Basemap",
    visible: false,
    source: new ol.source.XYZ()
})
map.addLayer(no_map);
// defining defferent map views
var google = new ol.layer.Tile({
    title: 'google',
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
    })
});
map.addLayer(google);//StreetMap With Labels

// stamen map 
var stamen = new ol.layer.Tile({
    title: "stamen",
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
        //layer: 'watercolor'
    })
});
map.addLayer(stamen);//Water Color Stamen Map

var terrain = new ol.layer.Tile({
    title: "terrain",
    visible: false,
    source: new ol.source.XYZ({
        utl: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png',
        //layer: 'terrain'
    })
});
map.addLayer(terrain);//Terrain Stamen map

var SatelliteWithOutLabel = new ol.layer.Tile({
    title: 'satellite',
    visible: true,
    source: new ol.source.XYZ({
        url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}' // Satellite map without labels

    })
});
map.addLayer(SatelliteWithOutLabel);


var SatelliteLabel = new ol.layer.Tile({
    title: 'satelliteWithLabel',
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}' //satellite map with labels
    })
});
map.addLayer(SatelliteLabel);

// layer swithcer functionality of layers
function sidebarfunc() {
    var x = document.getElementById("bar");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};
var baselayer = new ol.layer.Group({
    layers: [Osm,
        google,
        stamen,
        terrain,
        SatelliteLabel,
        SatelliteWithOutLabel,
        no_map
    ]
});

map.addLayer(baselayer);

var Extent = document.createElement('k')
Extent.setAttribute('class', 'fa fa-home');
var zoomToExtent = new ol.control.ZoomToExtent({
    label: Extent,
    extent: [79.33286575188787, 12.45710960469384, 79.37298759583267, 12.46930065835938]
});

map.addControl(zoomToExtent);


// layer swither logic for base layer
var baselayerElements = document.querySelectorAll('.bar > input[type=radio]');
for (let baselayerElement of baselayerElements) {
    baselayerElement.addEventListener('change', function () {
        let baselayerelementValue = this.value
        baselayer.getLayers().forEach(function (element, index, array) {
            let baselayername = element.get('title');
            element.setVisible(baselayername === baselayerelementValue)
        })
    })
};


var url = 'https://gis.eficaa.com:8443/geoserver/GIS_Hes/wms';

var substationSource = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'GIS_Hes:substation_c', 'TILED': true },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var substationLayer = new ol.layer.Image({
    title: 'substation_c',
    source: substationSource,
    visible: true,
    zIndex: 2,

})


map.addLayer(substationLayer)
// DEFINING substation end

//dtr start
var dtrSource = new ol.source.ImageWMS({
    url: 'https://gis.eficaa.com:8443/geoserver/NMS/wms',
    params: { 'LAYERS': 'NMS:NMS_Network', 'TILED': true },
    serverType: 'geoserver',

})
var dtrLayer = new ol.layer.Image({
    title: 'NMS_Network',
    source: dtrSource,
    visible: true,
    zIndex: 2,
})

map.addLayer(dtrLayer)
// DEFINING dtr DETAILS end



//defining only ht PowerLine start

var htLineSource = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'GIS_Hes:HT_LINES_C', 'TILED': true },
    serverType: 'geoserver',


})
var htLineLayer = new ol.layer.Image({
    title: 'HT_LINES_C',
    source: htLineSource,
    visible: true,

})


map.addLayer(htLineLayer)

// DEFINING PowerLine only ht end
// defining Pole id start
var htPoleSource = new ol.source.ImageWMS({
    url: url,
    params: {
        'LAYERS': 'GIS_Hes:HT_POLE_C', 'TILED': true
    },
    serverType: 'geoserver',



})
var htPoleLayer = new ol.layer.Image({
    title: 'HT_POLE_C',
    source: htPoleSource,
    visible: true,
    zIndex: 2

})


map.addLayer(htPoleLayer)
//htpole
//lt line start
var ltLineSource = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'GIS_Hes:LT_LINES_C', 'TILED': true },
    serverType: 'geoserver',


})
var ltLineLayer = new ol.layer.Image({
    title: 'LT_LINES_C',
    source: ltLineSource,
    visible: true,

})


map.addLayer(ltLineLayer)
//lt line end

//lt pole start
var ltPoleSource = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'GIS_Hes:LT_POLE_C', 'TILED': true },
    serverType: 'geoserver',


})
var ltPoleLayer = new ol.layer.Image({
    title: 'LT_POLE_C',
    source: ltPoleSource,
    visible: true,
    zIndex: 2

})
//lt pole end

map.addLayer(ltPoleLayer)
// service line source start
var serviceLineSource = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'GIS_Hes:SERVICE_LINES_C', 'TILED': true },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var serviceLineLayer = new ol.layer.Image({
    title: 'SERVICE_LINES_C',
    source: serviceLineSource,
    visible: true,
    zIndex: 1
    // minZoom:10,
    // maxZoom:20
})


map.addLayer(serviceLineLayer)

//service line source end


// service point source start
var servicePointSource = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'GIS_Hes:SERVICE_POINTS_C', 'TILED': true },
    serverType: 'geoserver',



})
var servicePointLayer = new ol.layer.Image({
    title: 'SERVICE_POINTS_C',
    source: servicePointSource,
    visible: true,
    zIndex: 1
    // minZoom:10,
    // maxZoom:20
})


map.addLayer(servicePointLayer)
//service point source end

var servicelayergrp = new ol.layer.Group({
    layers: [
        substationLayer,
        dtrLayer,
        htLineLayer,
        htPoleLayer,
        ltLineLayer,
        ltPoleLayer,
        servicePointLayer,
        serviceLineLayer
    ]
});
map.addLayer(servicelayergrp);

// layer switcher login for servicelayer grp
var serviceElements = document.querySelectorAll('.bar > input[type=checkbox]');
for (let serviceElement of serviceElements) {
    serviceElement.addEventListener('change', function () {
        let servicelayerelementValue = this.value;
        let servicelayerdetail;

        servicelayergrp.getLayers().forEach(function (element, index, array) {
            if (servicelayerelementValue === element.get('title')) {
                servicelayerdetail = element;
            }


        })

        this.checked ? servicelayerdetail.setVisible(true) : servicelayerdetail.setVisible(false)
    })

};
//auto refresh functinality 
window.setInterval(function () {
    //start refreshing each 1 seconds

    function setTIME() {
        dtrLayer.getSource().updateParams({ "time": Date.now() });
        substationLayer.getSource().updateParams({ "time": Date.now() });
        htLineLayer.getSource().updateParams({ "time": Date.now() });
        htPoleLayer.getSource().updateParams({ "time": Date.now() });
        ltLineLayer.getSource().updateParams({ "time": Date.now() });
        ltPoleLayer.getSource().updateParams({ "time": Date.now() });
        serviceLineLayer.getSource().updateParams({ "time": Date.now() });
        servicePointLayer.getSource().updateParams({ "time": Date.now() });


    }
    setTIME()
}, 1000)
//auto refresh functinality

// adding feature on popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});
map.addOverlay(overlay);
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};


// dynamic legend functionality
function legend() {
    var baselayer_no = baselayer.getLayers().getArray().length;
    var no_layers = servicelayergrp.getLayers().getArray().length;
    var selectedBaseLayer = "";
    var legendContainer = document.getElementById("bar");

    var text = document.createElement("h3");
    text.textContent = "Service Layer";
    legendContainer.appendChild(text);

    // Create a function to handle both radio and checkbox change events
    function handleInputChange(event) {
        var input = event.target;
        layerName = input.getAttribute("data-layer-name");

        if (input.type === "radio") {

            if (selectedBaseLayer) {
                selectedBaseLayer.setVisible(false);
            }

            var selectedLayer = baselayer.getLayers().getArray().find(function (layer) {
                return layer.get('title') === layerName;
            });

            if (selectedLayer) {
                selectedLayer.setVisible(true);
                selectedBaseLayer = selectedLayer;
            }
        } else if (input.type === "checkbox") {

            var layer = servicelayergrp.getLayers().getArray().find(function (layer) {
                return layer.get('title') === layerName;
            });

            if (layer) {
                if (input.checked) {
                    layer.setVisible(true); // Show the layer when the checkbox is checked
                } else {
                    layer.setVisible(false); // Hide the layer when the checkbox is unchecked
                }
            }
        }
    }

    for (var i = 0; i < baselayer_no; i++) {
        var baselayer_layer = baselayer.getLayers().getArray()[i];
        var base_layerName = baselayer_layer.get('title');
        var layerContainer = document.createElement("div");



        var radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "radio_" + i;
        radio.name = "baselayer";
        radio.checked = baselayer_layer.get('title') === 'osm_basemap'; // Check the default base layer
        radio.setAttribute("data-layer-name", base_layerName);

        // Create a label for the radio button
        var baselayer_label = document.createElement("label");
        baselayer_label.setAttribute("for", "radio_" + i);
        baselayer_label.textContent = base_layerName;



        // Append the radio button and label to the layer container
        layerContainer.appendChild(radio);
        layerContainer.appendChild(baselayer_label);

        // Append the layer container to the legend container
        legendContainer.appendChild(layerContainer);

        // Add an event listener to handle both radio and checkbox changes
        radio.addEventListener("change", handleInputChange);
        layerContainer.appendChild(text)

    }


    for (var j = 0; j < no_layers; j++) {
        var layer = servicelayergrp.getLayers().getArray()[j];
        layerName = layer.get('title');

        var layerContainer = document.createElement("div");
        // Create a container div for each layer

        // Create an image for the legend
        var legendImage = new Image();
        legendImage.src = "https://gis.eficaa.com:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + layerName + "&legend_options=fontColor:0x00FFFF;fontSize:14;bgColor:0x021c1b";
        // Create a checkbox for the layer
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox_" + j;
        checkbox.checked = true; // You can set the initial state as checked or unchecked here
        checkbox.setAttribute("data-layer-name", layerName);

        var label = document.createElement("label");
        label.setAttribute("for", "checkbox_" + j);
        label.textContent = layerName;

        layerContainer.appendChild(checkbox);
        layerContainer.appendChild(legendImage);
        layerContainer.appendChild(label);

        legendContainer.appendChild(layerContainer);

        checkbox.addEventListener("change", handleInputChange);
    }
}

legend();



// api calll for inner html data for NMS   
//dtr on click
map.on('click', function (e) {
  
    overlay.setPosition(undefined)
    var view = map.getView();
    var viewResolution = /** @type {number} */ map.getView().getResolution();
    url = dtrLayer.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        'FEATURE_COUNT': 10,
    });
  
    if (url) {
        $.getJSON(url, function (data) {
     
            // setInterval(function(){
            var features = data.features; // Get the features array directly from the data
            var dtrInfo = [];
            for (let i = 0; i < features.length; i++) {
                var deviceType = features[i].properties['DEVICE_TYPE'];
                if (deviceType === 'TMU') {
                    dtrInfo.push(features[i].properties);

                    // Store properties for TMU devices in dtrInfo array
                }
            }

           
            overlay.setPosition(e.coordinate)
            content.innerHTML =
                '<div id="DtrOmsPopup">'
                + '<h5>' + 'Outage Information' + '</h5>'
                + '<table>'
                + '<tr>'
                + '<th>' + 'Parameter' + '</th>'
                + '<th>' + 'Values of Meter ' + '</th>'
            + '</tr>'
                + '<tr>'
                + '<td>' + 'Device Type' + '</td>'
            + '<td>' + (dtrInfo[0]["DEVICE_TYPE"] ?? "---") + '</td>'
                + '<tr>'
                + '<tr>'
                + '<td>' + 'Device Name' + '</td>'
            + '<td>' + (dtrInfo[0]["DEVICE_NAME"] ?? "---") + '</td>'
                + '<tr>'
                + '<td>' + 'Device Serial No' + '</td>'
            + '<td>' + (dtrInfo[0]["DEVICE_SERIAL_NO"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'DTR Sno' + '</td>'
                + '<td>' + (dtrInfo[0]["transformerSno"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Device Id' + '</td>'
            + '<td>' + (dtrInfo[0]["DEVICE_ID"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Feeder Name' + '</td>'
            + '<td>' + (dtrInfo[0]["FEEDER_NA"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Circle Name' + '</td>'
            + '<td>' + (dtrInfo[0]["CIRCLE_NAME"] ?? "---") + '</td>'
                + '</tr>'

                + '<tr>'
                + '<td>' + 'Division Name' + '</td>'
            + '<td>' + (dtrInfo[0]["DIVISION_NAME"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Section Name' + '</td>'
            + '<td>' + (dtrInfo[0]["SECTION_NA"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Section Name' + '</td>'
            + '<td>' + (dtrInfo[0]["REGION_NAME"] ?? "---") + '</td>'
                + '</tr>'

                + '<td>' + 'Substation Name' + '</td>'
            + '<td>' + (dtrInfo[0]["SUBSTATION"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Device Ip' + '</td>'
            + '<td>' + (dtrInfo[0]["DEVICE_IP"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Latitude' + '</td>'
            + '<td>' + (dtrInfo[0]["X"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Longitude' + '</td>'
            + '<td>' + (dtrInfo[0]["Y"] ?? "---") + '</td>'
                + '</tr>'

                + '<tr>'
                + '<td>' + 'Location' + '</td>' +
            '<td>' + (dtrInfo[0]['LOCATION'] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'

                + '<td >' + 'LandmarkStatus' + '</td>'
            + '<td> ' + (dtrInfo[0]['LANDMARK'] ?? "---") + '</td > '
                + '</tr>'
                + '<tr>'
            + '<td>' + 'Interruption Start Time' + '</td >'
            + '<td>' + ((dtrInfo[0]["CONNECTION_STATUS"] === 1 ? '---' : dtrInfo[0]["nw_start"]) + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>' + 'Interruption End Time' + '</td >'
                    + '<td>' + ((dtrInfo[0]["CONNECTION_STATUS"] === 1) ? '---' :dtrInfo[0]["nw_end"]))+ '</td>'
            + '</tr>'
                + '<tr >'
                + '<td>' + 'Network Status' + '</td>'
            + '<td> ' + ((dtrInfo[0]["CONNECTION_STATUS"] === 1) ? 'Connected' : 'Disconnected') + '</td > '
                + '</tr>'
                + '</table>'
                + '</div>'

            overlay.setPosition(e.coordinate)
            }
        

                        // return
                    
       )}
});

//service Point on click

map.on('click', function (e) {
    overlay.setPosition(undefined)
    var view = map.getView();

    var viewResolution = /** @type {number} */ map.getView().getResolution();
    url = servicePointLayer.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        'FEATURE_COUNT': 10,
    });
    console.log(url)
    if (url) {
        $.getJSON(url, function (data) {
            var Wms_Array = data
            var feature = Wms_Array.features[0];
            var prop = feature.properties;
            content.innerHTML =
                '<div id="DtrOmsPopup">'
                + '<h5>' + 'Outage Information' + '</h5>'
                + '<table>'
                + '<tr>'
                + '<th>' + 'Parameter' + '</th>'
                + '<th>' + 'Values of Meter ' + '</th>'
                + '</tr>'
                //+ '<tr>'
                //+ '<td>' + 'Device Type' + '</td>'
                //+ '<td>' + (prop['DEVICE_TYPE'] ?? "---") + '</td>'
                //+ '<tr>'
                //+ '<tr>'
                //+ '<td>' + 'Device Name' + '</td>'
                //+ '<td>' + (prop['DEVICE_NAME'] ?? "---") + '</td>'
                //+ '<tr>'
                //+ '<td>' + 'Region Name' + '</td>'
                //+ '<td>' + (prop["REGION_NAME"] ?? "---") + '</td>'
                //+ '</tr>'
                //+ '<tr>'
                //+ '<td>' + 'Circle Name' + '</td>'
                //+ '<td>' + (prop["CIRCLE_NAME"] ?? "---") + '</td>'
                //+ '</tr>'
                //+ '<tr>'
                //+ '<tr>'
                //+ '<td>' + 'Section Name' + '</td>'
                //+ '<td>' + (prop["SECTION_NAME"] ?? "---") + '</td>'
                //+ '</tr>'
                //+ '<tr>'
                //+ '<tr>'
                //+ '<td>' + 'Division Name' + '</td>'
                //+ '<td>' + (prop["DIVISION_NAME"] ?? "---") + '</td>'
                //+ '</tr>'
                //+ '<tr>'
                //+ '<tr>'
                //+ '<td>' + 'Feeder Name' + '</td>'
                //+ '<td>' + (prop["FEEDER_NAME"] ?? "---") + '</td>'
                //+ '</tr>'
                + '<tr>'
                + '<td>' + 'Device Serial No' + '</td>'
            + '<td>' + (prop["DTR_ID"] ?? "---") + '</td>'
                + '</tr>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Latitude' + '</td>'
            + '<td>' + (prop['X'] ?? "---") + '</td>'
                + '</tr>'>
                + '<tr>'+
                + '<td>' + 'Latitude' + '</td>'
            + '<td>' + (prop['Y'] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td >' + 'Power Status' + '</td>'
                + '<td> ' + prop['POWER_STATUS'] + '</td > '
                + '</tr>'
                + '</table>'
                + '</div>'

            overlay.setPosition(e.coordinate)




        })
    }
})