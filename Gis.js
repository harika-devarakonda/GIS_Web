
var View = new ol.View({
    center: [79.35098195354135, 12.464704466152156],
    zoom: 17,
    projection: 'EPSG:4326'
});
var Osm = new ol.layer.Tile({
    title: 'OSM Basemap',
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
    title: "No Basemap",
    visible: false,
    source: new ol.source.XYZ()
})
map.addLayer(no_map);
// defining defferent map views
var google = new ol.layer.Tile({
    title: 'Street Map',
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
    })
});
map.addLayer(google);//StreetMap With Labels

//// stamen map 
//var stamen = new ol.layer.Tile({
//    title: "Stamen Map",
//    visible: false,
//    source: new ol.source.XYZ({
//        url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
//    })
//});
//map.addLayer(stamen);//Water Color Stamen Map

//var terrain = new ol.layer.Tile({
//    title: "Terrain Map",
//    visible: false,
//    source: new ol.source.XYZ({
//        layer: 'terrain',
//        url: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png'
//    })
//});
//map.addLayer(terrain);//Terrain Stamen map

var SatelliteWithOutLabel = new ol.layer.Tile({
    title: 'Satellite Map(No Label)',
    visible: true,
    source: new ol.source.XYZ({
        url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}' // Satellite map without labels

    })
});
map.addLayer(SatelliteWithOutLabel);


var SatelliteLabel = new ol.layer.Tile({
    title: 'Satellite Map (Label)',
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
    layers: [
        no_map,
        Osm,
        SatelliteWithOutLabel,
        google,
        //stamen,
        //terrain,
        SatelliteLabel,
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

//defining  substation start

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
    url: url,
    params: { 'LAYERS': 'GIS_Hes:DTR_C', 'TILED': true },
    serverType: 'geoserver',

})
var dtrLayer = new ol.layer.Image({
    title: 'DTR_C',
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
//legend function on print 
function legndonPrint() {
    var no_layers = servicelayergrp.getLayers().getArray().length;
    var legendContainer = document.getElementById("legendonPrint");

    legendContainer.innerHTML = '';

    var text = document.createElement("h3");
    text.textContent = "Service Layer Legend";
    legendContainer.appendChild(text);
    legendContainer.appendChild(document.createElement("br"));
    function loadImage(layerContainer, legendImage,label) {
        legendImage.onload = function () {
            layerContainer.appendChild(label);
            layerContainer.appendChild(document.createElement("br"));
            layerContainer.appendChild(legendImage);
            layerContainer.appendChild(document.createElement("br"));
            legendContainer.appendChild(layerContainer);
        };
        legendImage.onerror = function () {
            console.error("Error loading image for layer:", layerName);
        };
    }

    for (var j = 0; j < no_layers; j++) {
        var layer = servicelayergrp.getLayers().getArray()[j];
        layerName = layer.get('title');
        if (layer.getVisible() == true) {
            var layerContainer = document.createElement("div");
            // Create a container div for each layer

            // Create an image for the legend
            var legendImage = document.createElement('img');
            legendImage.setAttribute('src', 'https://gis.eficaa.com:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layerName);
            // Create a checkbox for the layer
            var label = document.createElement("label");
            label.textContent = layerName;
            label.setAttribute('class', "legendtext")
            loadImage(layerContainer, legendImage, label);
        }
    }
    
}


$('#print').click(function () {
    setTimeout(function () {
    window.print()
    },1000)
    legndonPrint();
    //window.print();


});

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
map.addOverlay(overlay)
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
        radio.checked = baselayer_layer.get('title') === 'Satellite Map(No Label)'; // Check the default base layer
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
        layerContainer.appendChild(label);
        layerContainer.appendChild(document.createElement("br"));
        layerContainer.appendChild(legendImage);
        layerContainer.appendChild(document.createElement("br"));
        layerContainer.appendChild(document.createElement("br"));

        legendContainer.appendChild(layerContainer);

        checkbox.addEventListener("change", handleInputChange);
    }
}

legend();
//MAP Onclick  DTR Functionality

map.on('click', function (e) {
    overlay.setPosition(undefined);
    var view = map.getView();
    var viewResolution = /** @type {number} */ map.getView().getResolution();
    var url = dtrLayer.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        'FEATURE_COUNT': 10,
    });
    if (url) {
        console.log(url)
        $.getJSON(url, function (data) {
            console.log(data)
            var features = data.features; // Get the features array directly from the data
            var prop = features[0].properties;

            //var dtrInfo = [];
            //for (let i = 0; i < features.length; i++) {
            //    var deviceType = features[i].properties['DESCRIPTION'];
            //    console.log(deviceType)
            //    if (deviceType === 'THREE PHASE LTCT TMU') {
            //        dtrInfo.push(features[i].properties);

            //        // Store properties for TMU devices in dtrInfo array
            //    }
            //}
            content.innerHTML =
                '<div id="DtrOmsPopup">'
                + '<h4>' + 'Instantaneous Values Data' + '</h4>'
                + '<table>'
                + '<tr>'
                + '<th>' + 'Parameter' + '</th>'
                + '<th>' + 'Values of Meter ' + '</th>'

            + '<tr>'
            + '<td>' + 'Section Name' + '</td>'
            + '<td>' + (prop["SECTION_NA"] ?? "---") + '</td>'
            + '</tr>'
            
            + '<tr>'
            + '<tr>'
            + '<td>' + 'Substation Name' + '</td>'
            + '<td>' + (prop["SUBSTATION"] ?? "---") + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>' + 'Feeder Name' + '</td>'
            + '<td>' + (prop["FEEDER_NA"] ?? "---") + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>' + 'Feeder DTR CODE' + '</td>'
            + '<td>' + (prop["DTR_CODE"] ?? "---") + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>' + 'LOCATION' + '</td>'
            + '<td>' + (prop["LOCATION"] ?? "---") + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>' + 'POWER_STATUS' + '</td>'
            + '<td>' + (prop["POWER_STATUS"] ?? "---") + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>' + 'Latitude' + '</td>'
            + '<td>' + (prop["X"] ?? "---") + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>' + 'Longitude' + '</td>'
            + '<td>' + (prop["Y"] ?? "---") + '</td>'
            + '</tr>'
                + '</table>'
                + '</div>'


            //api call connection not using
            //content.innerHTML =
            //    '<div id="special">'
            //    + '<h4>' + 'Instantaneous Values Data' + '</h4>'
            //    + '   <table>'
            //    + '<tr id=tablecontent>'
            //    + '<th>' + 'Parameter' + '</th>'
            //    + '<th>' + 'Values of Meter ' + '</th>'
            //    + '<th>' + 'Parameter' + '</th>'
            //    + '<th>' + 'Values of Meter ' + '</th>'
            //    + '<tr>'
            //    + '<td>' + "Serial Number" + '</td>'
            //    + '<td>' + (dtrInfo[0]["SERIAL_NUMBER"] ?? "---") + '</td>'
            //    + '<td>' + 'Frequency' + '</td>'
            //    + '<td>' + (dtrInfo[0]["Frequency"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'Description' + '</td>'
            //    + '<td>' + (dtrInfo[0]["DESCRIPTION"] ?? "---") + '</td>'
            //    + '<td>' + 'L1signed Power Factor Rphase' + '</td>'
            //    + '<td>' + (dtrInfo[0]["L1SignedPowerFactorRPhase"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'Rtc' + '</td>'
            //    + '<td>' + (dtrInfo[0]["RTC"] ?? "---") + '</td>'
            //    + '<td>' + 'L2signed Power Factor Yphase' + '</td>'
            //    + '<td>' + (dtrInfo[0]["L2SignedPowerFactorYPhase"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'Location' + '</td>'
            //    + '<td>' + (dtrInfo[0]["LOCATION"] ?? "---") + '</td>'
            //    + '<td>' + 'L3signed Power Factor Bphase' + '</td>'
            //    + '<td>' + (dtrInfo[0]["L3SignedPowerFactorBPhase"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'Current Rphase' + '</td>'
            //    + '<td>' + (dtrInfo[0]["CurrentRphase"] ?? "---") + '</td>'
            //    + '<td>' + 'Cumulative Energy kVah Import' + '</td>'
            //    + '<td>' + (dtrInfo[0]["CumulativeEnergykVAhimport"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'Current Yphase' + '</td>'
            //    + '<td>' + (dtrInfo[0]["CurrentYphase"] ?? "---") + '</td>'
            //    + '<td>' + 'Cumulative Energy kWh import' + '</td>'
            //    + '<td>' + (dtrInfo[0]["CumulativeEnergykWhimport"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'Current Bphase' + '</td>'
            //    + '<td>' + (dtrInfo[0]["CurrentBphase"] ?? "---") + '</td>'
            //    + '<td>' + 'Block Energy VAh Import ' + '</td>'
            //    + '<td>' + (dtrInfo[0]["BlockEnergyVAhImport"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'L1voltageVrn' + '</td>'
            //    + '<td>' + (dtrInfo[0]["L1VoltageVRN"] ?? "---") + '</td>'
            //    + '<td>' + 'Block Energy Wh Import' + '</td>'
            //    + '<td>' + (dtrInfo[0]["BlockEnergyWhImport"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'L2voltageVyn' + '</td>'
            //    + '<td>' + (dtrInfo[0]["L2VoltageVYN"] ?? "---") + '</td>'
            //    + '<td>' + 'MD kVA' + '</td>'
            //    + '<td>' + (dtrInfo[0]["MDkVA"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '<tr>'
            //    + '<td>' + 'L3voltageVbn' + '</td>'
            //    + '<td>' + (dtrInfo[0]["L3VoltageVBN"] ?? "---") + '</td>'
            //    + '<td>' + 'MD kW' + '</td>'
            //    + '<td>' + (dtrInfo[0]["Frequency"] ?? "---") + '</td>'
            //    + '</tr>'
            //    + '</table>'
            //    + '</div>'

            //temp not using till this point 
            overlay.setPosition(e.coordinate);

        })
    }
})


//substation on click
map.on('click', function (e) {
    overlay.setPosition(undefined)
    var view = map.getView();
    var viewResolution = /** @type {number} */ map.getView().getResolution();
    url = substationLayer.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        'FEATURE_COUNT': 10,
    });
    if (url) {
        $.getJSON(url, function (data) {
            console.log(data)
            var Wms_Array = data
            var feature = Wms_Array.features[0];
            var prop = feature.properties;

            overlay.setPosition(e.coordinate)
            content.innerHTML = '<div id="DtrOmsPopup">'
                + '<h6>' + 'Outage Information' + '</h6>'
                + '<table>'
                + '<tr>'
                + '<th>' + 'Parameter' + '</th>'
                + '<th>' + 'Values of Meter ' + '</th>'
                + '</tr>'

                + '<tr>'
                + '<td>' + 'Region Name' + '</td>'
                + '<td>' + (prop['REGION_NAME'] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Circle Name' + '</td>'
                + '<td>' + (prop["CIRCLE_NAME"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<tr>'
                + '<td>' + 'Section Name' + '</td>'
                + '<td>' + (prop["SECTION_NAME"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<tr>'
                + '<td>' + 'Division Name' + '</td>'
                + '<td>' + (prop["DIVISION_NAME"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<tr>'
                + '<td>' + 'Substation Name' + '</td>'
                + '<td>' + (prop["Substation"] ?? "---") + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>' + 'Feeder Name' + '</td>'
                + '<td>' + (prop["Feeder_Name"] ?? "---") + '</td>'
                + '</tr>'
                + '</table>'
                + '</div>';

            overlay.setPosition(e.coordinate)

        }


        )
    }
});