var dtrGeojson, htlineGeojson, htpoleGeojson, substationGeojson, servicePointGeojson, servicelineGeojson, ltlineGeojson,ltpoleGeojson; //vector layer Geojson  declaration
var View, map;  // global variable declaration
var dtrUrl, htlineUrl, htpoleUrl, substationUrl, servicePointUrl, servicelineUrl, ltpoleUrl, ltlineUrl ; //defining url form ajax calling
var dtrLayer, htLineLayer, substationLayer, htPoleLayer, ltLineLayer, ltPoleLayer, serviceLineLayer, servicePointLayer;// Defineing vector layer declaration
var powerStatus; // Power Status

var modifyLayer // modify layer
var selectedFeatures; // select intraction
var selectInteraction;


var formatWFS, formatGML, transactWFS, s, str, node; // transcation request

var layerName //layerName feature layer extent global

var savelayerName // layer name for saving feature
var geometryName;// geometrey name - global

var attributeArray = []; // modfied feature attributes


var typeSelect; // draw geometry
var draw;
var drawLayer; // draw layer
var drawlayerName; // layer name for the draw feature
var drawfeatureselection;
var featureId;
var finalDrawn;

var wfsProperties;

var snap;
var stroke, fill // style of drawn and wfs feature


typeSelect = document.getElementById('type'); // draw interaction 
stroke = new ol.style.Stroke({ color: 'black', width: 2 }); //style declaration
fill = new ol.style.Fill({ color: 'red' });

var Mapextent = [73.7640325688336, 9.72144911529411, 86.17157321692459, 13.152105515687932] // draw extent

var wfsurl1 = 'https://gis.eficaa.com:8443/geoserver/GIS_Hes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GIS_Hes:';
var wfsurl2 = '&outputFormat=application/json&';

dtrUrl = wfsurl1 + 'DTR_C' + wfsurl2;
htlineUrl = wfsurl1 + 'HT_LINES_C' + wfsurl2;
htpoleUrl = wfsurl1 + 'HT_POLE_C' + wfsurl2;
substationUrl = wfsurl1 + 'substation_c' + wfsurl2;
servicePointUrl = wfsurl1 + 'SERVICE_POINTS_C' + wfsurl2;
servicelineUrl = wfsurl1 + 'SERVICE_LINES_C' + wfsurl2;
ltpoleUrl = wfsurl1 + 'LT_POLE_C' + wfsurl2
ltlineUrl = wfsurl1 + 'LT_LINES_C' + wfsurl2

// Defining map 
 View = new ol.View({
    center: [79.35098195354135, 12.464704466152156],
    zoom: 17,
    projection: 'EPSG:4326',
});
var Osm = new ol.layer.Tile({
    title: 'OSM Basemap',
    visible: false,
    source: new ol.source.OSM()
});
 map = new ol.Map({
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
//        url:'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
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


// layer swithcer functionality of layers
function sidebarfunc() {
    var x = document.getElementById("bar");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};

var Extent = document.createElement('k')
Extent.setAttribute('class', 'fa fa-home')

var zoomToExtent = new ol.control.ZoomToExtent({
    label: Extent,
    extent: [79.33286575188787, 12.45710960469384, 79.37298759583267, 12.46930065835938]

});

map.addControl(zoomToExtent);

// wms service from geoserver

//defining  substation start

substationLayer = new ol.layer.Vector({
    title: 'substation_c',
    source: new ol.source.Vector(),
    visible: true,
    zIndex: 2,
    style: function (feature) {
        var subName = feature.get('Substation');
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(3, 252, 103,0.2)"
            }),
            stroke: new ol.style.Stroke({
                color: '#000000',
                width: 2
            }),
            text: new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#000' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', width: 2
                }),
                text: subName
            }),

        })
    }

})

map.addLayer(substationLayer);

// DEFINING substation end

//dtr start

dtrLayer = new ol.layer.Vector({
    title: 'DTR_C',
    source: new ol.source.Vector(),
    visible: true,
    zIndex: 99,
    style: function (feature) {

        powerStatus = feature.get('POWER_STATUS');
        if (powerStatus === 'Power_On') {
            return new ol.style.Style({
                image: new ol.style.RegularShape({
                    radius: 8,
                    fill: new ol.style.Fill({
                        color: "#ff0000"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "#000000",
                        width: 2

                    }),
                    points: 3,
                    rotation: 0,

                }),
                fill: new ol.style.Fill({
                    color: "#00ff00"
                }),
                stroke: new ol.style.Stroke({
                    color: "#000000",
                    width: 2
                })
            })
        } else if (powerStatus === 'Power_Off') {
            return new ol.style.Style({
                image: new ol.style.RegularShape({
                    radius: 8,
                    fill: new ol.style.Fill({
                        color: "#00ff00"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "#000000",
                        width: 2

                    }),
                    points: 3,
                    rotation: 0

                }),
                fill: new ol.style.Fill({
                    color: "#0000ff"
                }),
                stroke: new ol.style.Stroke({
                    color: "#000000",
                    width: 2
                })
            })
        }

        powerStatus = " ";
    
    },

})

map.addLayer(dtrLayer);
//// DEFINING dtr DETAILS end


////defining only ht PowerLine start

htLineLayer = new ol.layer.Vector({
    title: 'HT_LINES_C',
    source: new ol.source.Vector(),
    visible: true,
    style: function (feature) {
        powerStatus = feature.get('POWER_STATUS');
        if (powerStatus === 'Power_On') {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#ff0000",
                    width: 2
                })

            })
        }
        else if (powerStatus === 'Power_Off' || 'Predicted') {

            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#0000ff",
                    width: 2
                })

            })
        }
        powerStatus = '';
    },

})


map.addLayer(htLineLayer);

//// DEFINING PowerLine only ht end
//// defining Pole id start

htPoleLayer = new ol.layer.Vector({
    title: 'HT_POLE_C',
    source: new ol.source.Vector(),
    visible: true,
    zIndex: 2,
    style: new ol.style.Style({
        image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
                color: "#ffb31a"
            }),
            stroke: new ol.style.Stroke({
                color: "#ff0000",
                width: 2

            }),
            radius: 9 / Math.SQRT2,
            points: 4,
            angle: 1,
            scale: [0.7, 0.7],
        })
    }),

})


map.addLayer(htPoleLayer);
////htpole
////lt line start

ltLineLayer = new ol.layer.Vector({
    title: 'LT_LINES_C',
    source: new ol.source.Vector(),
    visible: true,
    style: function (feature) {
        powerStatus = feature.get('POWER_STATUS');
        if (powerStatus === 'Power_On') {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#51FF7C",
                    width: 3
                })

            })
        }
        else if (powerStatus === 'Power_Off' || 'Predicted') {

            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#FF9899",
                    width: 3
                })

            })
        }
        powerStatus = '';
    },

})


map.addLayer(ltLineLayer);
////lt line end

////lt pole start

ltPoleLayer = new ol.layer.Vector({
    title: 'LT_POLE_C',
    source: new ol.source.Vector(),
    visible: true,
    zIndex: 2,
    style: new ol.style.Style({
        image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
                color: "#cc0099"
            }),
            stroke: new ol.style.Stroke({
                color: "#73e600",
                width: 2

            }),
            radius: 9 / Math.SQRT2,
            points: 4,
            angle: 1,
            scale: [0.7, 0.7],
        })
    }),

})
////lt pole end

map.addLayer(ltPoleLayer);
//// service line source start

serviceLineLayer = new ol.layer.Vector({
    title: 'SERVICE_LINES_C',
    source: new ol.source.Vector(),
    visible: true,
    zIndex: 1,
    style: function (feature) {
        powerStatus = feature.get('POWER_STATUS');
        if (powerStatus === 'Power_On') {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#0A0AC9",
                    width: 2
                })
            })
        } else if (powerStatus === 'Power_Off' || 'Predicted') {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#33ffff",
                    width: 2
                })
            })
        }

    },
    // minZoom:10,
    // maxZoom:20
})

map.addLayer(serviceLineLayer);

////service line source end

//// service point source start

servicePointLayer = new ol.layer.Vector({
    title: 'SERVICE_POINTS_C',
    source: new ol.source.Vector(),
    visible: true,
    zIndex: 100,
    style: function (feature) {
        powerStatus = feature.get('POWER_STATUS')
        if (powerStatus === 'Power_On') {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 3,
                    stroke: new ol.style.Stroke({
                        width: 1,
                        color: '#000000'
                    }),
                    fill: new ol.style.Fill({
                        color: '#fcf403'
                    })
                }),
                stroke: new ol.style.Stroke({
                    width: 1,
                    color: '#000000'
                }),
                fill: new ol.style.Fill({
                    color: '#fcf403'
                })

            })


        } else if (powerStatus === 'Power_Off' || "Predicted") {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 3,
                    stroke: new ol.style.Stroke({
                        width: 1,
                        color: '#000000'
                    }),
                    fill: new ol.style.Fill({
                        color: '#ff00ff'
                    })
                })

            })

        }

    },

    // minZoom:10,
    // maxZoom:20
})

map.addLayer(servicePointLayer);

function serviceLayerRefresh() {
    //substation Layer
    $.ajax({
        url: substationUrl,
        method: "GET",
        type: 'json',
        success: function (data) {
            substationGeojson = new ol.format.GeoJSON().readFeatures(data); // assiging geojson data to the variable
            substationGeojson.forEach(function (feature) {
                feature.setProperties({
                    layerName: 'substation_c',
                    geometryName: 'Substation_Map_Data'
                })
            })
            substationLayer.getSource().refresh();
            substationLayer.getSource().addFeatures(substationGeojson);

        }
    })

    //dtr layer
    $.ajax({
        url: dtrUrl,
        method: "GET",
        type: 'json',
        success: function (data) {
            dtrGeojson = new ol.format.GeoJSON().readFeatures(data); // assiging geojson data to the variable
            dtrGeojson.forEach(function (feature) {
                feature.setProperties({
                    layerName: 'DTR_C',
                    geometryName:'DTR_MAP'
                })
            })
            dtrLayer.getSource().refresh();
            dtrLayer.getSource().addFeatures(dtrGeojson);
            
        }
    })
    // ht lines 
    $.ajax({
        url: htlineUrl,
        method: "GET",
        type: 'json',
        success: function (data) {
            htlineGeojson = new ol.format.GeoJSON().readFeatures(data); // assiging geojson data to the variable
            htlineGeojson.forEach(function (feature) {
                feature.setProperties({
                    layerName: 'HT_LINES_C',
                    geometryName: 'HT_LINES_MAP'
                })
            })
            htLineLayer.getSource().refresh();
            htLineLayer.getSource().addFeatures(htlineGeojson);

        }
    })
    //ht poles
    $.ajax({
        url: htpoleUrl,
        method: "GET",
        type: 'json',
        success: function (data) {
            htpoleGeojson = new ol.format.GeoJSON().readFeatures(data); // assiging geojson data to the variable
            htpoleGeojson.forEach(function (feature) {
                feature.setProperties({
                    layerName: 'HT_POLE_C',
                    geometryName: 'HT_POLE_MAP'
                })
            })
            htPoleLayer.getSource().refresh();
            htPoleLayer.getSource().addFeatures(htpoleGeojson);

        }
    })
    //lt lines
    $.ajax({
        url: ltlineUrl,
        method: "GET",
        type: 'json',
        success: function (data) {
            ltlineGeojson = new ol.format.GeoJSON().readFeatures(data); // assiging geojson data to the variable
            ltlineGeojson.forEach(function (feature) {
                feature.setProperties({
                    layerName: 'LT_LINES_C',
                    geometryName: 'LT_LINES_MAP'
                })
            })
            ltLineLayer.getSource().refresh();
            ltLineLayer.getSource().addFeatures(ltlineGeojson);

        }
    })

    // lt poles 
    $.ajax({
        url: ltpoleUrl,
        method: "GET",
        type: 'json',
        success: function (data) {
            ltpoleGeojson = new ol.format.GeoJSON().readFeatures(data); // assiging geojson data to the variable
            ltpoleGeojson.forEach(function (feature) {
                feature.setProperties({
                    layerName: 'LT_POLE_C',
                    geometryName: 'LT_POLE_MAP'
                })
            })
            ltPoleLayer.getSource().refresh();
            ltPoleLayer.getSource().addFeatures(ltpoleGeojson);

        }
    })
    //consumerMeters
    $.ajax({
        url: servicePointUrl,
        method: "GET",
        type: 'json',
        success: function (data) {
            servicePointGeojson = new ol.format.GeoJSON().readFeatures(data); // assiging geojson data to the variable
            servicePointGeojson.forEach(function (feature) {
                feature.setProperties({
                    layerName: 'SERVICE_POINTS_C',
                    geometryName: 'SERVICE_POINTS_MAP'
                })
            })
            servicePointLayer.getSource().refresh();
            servicePointLayer.getSource().addFeatures(servicePointGeojson);

        }
    });
    //servicelines 
    $.ajax({
        url: servicelineUrl,
        method: "GET",
        type: 'json',
        success: function (data) {
            servicelineGeojson = new ol.format.GeoJSON().readFeatures(data); // assiging geojson data to the variable
            servicelineGeojson.forEach(function (feature) {
                feature.setProperties({
                    layerName: 'SERVICE_LINES_C',
                    geometryName: 'SERVICE_LINES_MAP'
                })
            })
            serviceLineLayer.getSource().refresh();
            serviceLineLayer.getSource().addFeatures(servicelineGeojson);

        }
    })
}

serviceLayerRefresh();
//setInterval(function () {
//    serviceLayerRefresh() // this will run after every 15 seconds
//}, 15000);

// layer switcher functionality of services

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
// layer switcher login for servicelayer grp start

var serviceElements = document.querySelectorAll('.bar > input[type=checkbox]')
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

}
// layer switcher login for servicelayer grp start

// adding feature on popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    zIndex: 999,
    positioning: 'center-center',
    autoPanAnimation: {
        // duration: 250
        duration: 150

    }
});
map.addOverlay(overlay)
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
    selectedFeatures.clear();
};

// dynamic legend 

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


//auto refresh functionality

//select functionality
var select = new ol.style.Style({
    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [255, 255, 255, 0.1]
        }),
        radius: 8,
        stroke: new ol.style.Stroke({
            color: 'rgb(0,0,255)',
            width: 1
        }),
    }),
    fill: new ol.style.Fill({
        color: [0, 0, 0, 0.2]
    }),
    stroke: new ol.style.Stroke({
        color: [255, 255, 255],
        width: 3
    })
});

var selectdtr = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: [255, 0,0 , 0.2]
        }),
        stroke: new ol.style.Stroke({
            color: [255, 255, 255],
            width: 2
        }),
        radius: 12,
        points: 3,
        rotation: Math.PI / 1.85,
        angle: 2.5,
        fill: new ol.style.Fill({
            color: [0, 0, 0, 0.2]
        }),
        stroke: new ol.style.Stroke({
            color: [255, 255, 255],
            width: 3
        })
    })
});

var poleS = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: [0, 0, 0, 0.2]
        }),
        stroke: new ol.style.Stroke({
            color: [255, 255, 255],
            width: 2
        }),
        points: 4,
        radius: 10,
        angle: Math.PI / 4,
    }),
    fill: fill,
    stroke: stroke,
});

selectInteraction = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [dtrLayer, htLineLayer,htPoleLayer,ltLineLayer,
        ltPoleLayer,
        servicePointLayer,
        serviceLineLayer,
        substationLayer],
    style: function (feature) {
        if (feature.get('layerName') == "DTR_C") {
            feature.setStyle(selectdtr);
        }
        else if (feature.get('layerName') == "HT_POLE_C" || feature.get('layerName') == "LT_POLE_C") {
            feature.setStyle(poleS);
        }
        else {
            feature.setStyle(select);
        }

    }
});
map.addInteraction(selectInteraction);



modifyLayer = new ol.interaction.Modify({
    features: selectInteraction.getFeatures(),
});

drawLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON()
    })
})
map.addLayer(drawLayer);

drawfeatureselection = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [drawLayer]
});
map.addInteraction(drawfeatureselection);

selectInteraction.on('select', function (evt) {

    selectedFeatures = selectInteraction.getFeatures();
    overlay.setPosition(undefined)
    content.innerHTML = "";
    displayOperations();
});

function displayOperations() {
    selectedFeatures.forEach(function (feature) {
        savelayerName = feature.get('layerName');
        geometryName = feature.get('geometryName');
        var featureGeomtery = feature.getGeometry();
        var featureExtent = featureGeomtery.getExtent();
        var centroid = ol.extent.getCenter(featureExtent);
 
        map.getView().setCenter(centroid);
        map.getView().setZoom(18);

        content.innerHTML = '<div id="special">'
            + '<h4>' + 'Select Functionality' + '</h4>'
            + '<table>'
            + '<tr>'
            + '<th>' + 'Parameter' + '</th>'
            + '<th>' + 'Parameter' + '</th>'
            + '<th>' + 'Parameter' + '</th>'
            + '</tr>' 

            +'<tr>'
            + '<td rowspan="2">' + '<button onclick="GetLayerInfo()" id="getlayer_info">Feature Info</button>' + '</td>'
   
            + '<td> ' + '<button onclick="ModifyGeometry()" id="modify_Geometry">Modify Geometry</button>' + '</td>'

            + '<td rowspan="2">' + '<button onclick="deleteFeature()" id="delete_feature">Delete Feature</button>' + '</td>'
            +'</tr>'
            + '<td>' + '<button onclick="ModifyAttribute()" id="modify_Attribute">Modify Attribute</button>' + '</td>'
     

            +'</table>'
        +'</div>'


        overlay.setPosition(centroid)
        
    })
}
//saving feature into database 
formatWFS = new ol.format.WFS({
    version: "1.0.0",
});

function crudoperations() {
    formatGML = new ol.format.GML({
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG::4326',
        featureType: savelayerName, // Use the actual featureType name(layer name)
        featureNS: 'GIS_Hes', // Use the correct namespace URI
        geometryName: geometryName,
    });
}
transactWFS = function (p, f) {

    switch (p) {
        case 'insert':
            f.set(geometryName, finalDrawn.getGeometry())
            node = formatWFS.writeTransaction([f], null, null, formatGML);
            break;
        case 'update':
            f.geometryName_ = geometryName;
            node = formatWFS.writeTransaction(null, [f], null, formatGML);
            break;
        case 'delete':
            node = formatWFS.writeTransaction(null, null, [f], formatGML);
            break;

    }
    s = new XMLSerializer();
    str = s.serializeToString(node);
    $.ajax('https://gis.eficaa.com:8443/geoserver/wfs', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: str,
    }).done()
}

//draw intearctions
function enableGeometryfunction() {
    document.getElementById("selectgeom").style.display = "none";
    document.getElementById("dropdowngeom").style.display = "block";
    var geomType = typeSelect.value;
    var selectedOption = typeSelect.options[typeSelect.selectedIndex];

    drawlayerName = selectedOption.getAttribute('data-layer-name');
    layerName = drawlayerName;
    var traceLayer;
    if (layerName === "HT_LINES_C") {
        traceLayer= htLineLayer.getSource();
    } else if (layerName === "LT_LINES_C") {
        traceLayer= htLineLayer.getSource();
    }
    else if (layerName === "SERVICE_LINES_C") {
        traceLayer= serviceLineLayer.getSource();
    } else {
        traceLayer=""
    }
    geometryName = selectedOption.getAttribute('layer-geometry');
    var wfsExenturl = wfsurl1 + drawlayerName + wfsurl2;
    drawLayer.getSource().setUrl(wfsExenturl);
    var sourceMod = drawLayer.getSource();
    draw = new ol.interaction.Draw({
        source: sourceMod,
        type: geomType,
        trace: true,
        traceSource: traceLayer,
  

    });

    map.addInteraction(draw);
    draw.on('drawstart', function (event) {
        // Get the drawing feature and its geometry
        var outoffeature = event.feature;
        const outoffeaturegeometry = outoffeature.getGeometry();

        if (ol.extent.containsExtent(Mapextent, outoffeaturegeometry.getExtent())) {
            map.addInteraction(draw)

        }
        else {
            draw.abortDrawing(); // Cancel the drawing operation
            map.removeInteraction(draw)
            typeSelect.selectedIndex = 0;
            alert('Feature is outside the valid extent. Drawing canceled.');
        }


    })
    draw.on('drawend', function (e) {

        map.removeInteraction(draw);

        var wfsstyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: "#00ff00"
                }),
                stroke: new ol.style.Stroke({
                    color: "#000000",
                    width: 2
                })
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0,255,0,0.1)',

            }),
            stroke: new ol.style.Stroke({
                color: "#000000",
                width: 2
            })
        });
        var dtrS = new ol.style.Style({
            image: new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 3,
                radius: 10,
                // rotation:1.7,
                rotation: Math.PI / 1.85,
                angle: 2.5,
            }),
            fill: fill,
            stroke: stroke,
        });
        var poleS = new ol.style.Style({
            image: new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: 5,
                angle: Math.PI / 4,
            }),
            fill: fill,
            stroke: stroke,
        });

        if (geomType === 'Point') {
            if (drawlayerName === "DTR_C") {

                drawLayer.setStyle(dtrS);

            }
            else if (drawlayerName === "SERVICE_POINTS_C") {
                //service Points
                drawLayer.setStyle(new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: "yellow"
                        }),
                        stroke: new ol.style.Stroke({
                            color: "#000000",
                            width: 1
                        }),
                        radius: 5
                    })
                }));
            }

            else if (drawlayerName === "HT_POLE_C") {
                // ht pole and lt pole
                drawLayer.setStyle(poleS);

            }
            else if (drawlayerName === "LT_POLE_C") {
                // ht pole and lt pole

                drawLayer.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        fill: new ol.style.Fill({
                            color: 'green',
                        }),
                        stroke: stroke,
                        points: 4,
                        radius: 5,
                        angle: Math.PI / 4,  //
                    })
                }));



            }
        } else if (geomType === 'LineString') {

            if (drawlayerName === "ET_HT_LINE_C") {
                snap = new ol.interaction.Snap({
                    source: htLineLayer.getSource()
                });
                map.addInteraction(snap);
                console.log('snap is working');
                console.log(snap)
                snap.on('snap', function () {
                    console.log('im changed')
                    var snappedFeatures = snap.getFeatures();
                    if (snappedFeatures && snappedFeatures.getLength() > 0) {
                        var nearestLineFeature = snappedFeatures.item(0);
                        var nearestLineProperties = nearestLineFeature.getProperties();
                        console.log('Nearest Line Feature Properties:', nearestLineProperties);
                    }
                });

                // ht line and lt line
                drawLayer.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "red",
                        width: 3
                    })
                }));
        

            }
            else if (drawlayerName === "LT_LINES_C") {
                snap = new ol.interaction.Snap({
                    source: ltLineLayer.getSource()
                });
                map.addInteraction(snap);

                drawLayer.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "blue",
                        width: 3
                    })
                }));

            }
            else if (drawlayerName === "SERVICE_LINES_C") {
                snap = new ol.interaction.Snap({
                    source: serviceLineLayer.getSource()
                });
                map.addInteraction(snap);
                drawLayer.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "yellow",
                        width: 3
                    })
                }));

            }
        }
        else if (geomType === 'Polygon') {
            if (drawlayerName === "substation_c") {
                // polygon substation
                drawLayer.setStyle(wfsstyle);

            }

        }
    })
    document.getElementById("AddAtrributes").style.display = "block";
   
}
typeSelect.onchange = function () {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    layerName = "";
    geometryName = " ";
    geomType = null;
    drawLayer.getSource().refresh();
    

};


//adding attributes
function AddAtrributes() {

    map.removeInteraction(draw);
    map.removeInteraction(modifyLayer);

    selectedFeatures = drawfeatureselection.getFeatures();

    if (selectedFeatures.getLength() === 0) {
        alert("Please select a feature to add attributes...");
        return;
    }
    else {
        selectedFeatures.forEach(function (addedFeature) {
            map.removeInteraction(draw);

            savelayerName = layerName;
            featureId = addedFeature.getId();

            wfsProperties = addedFeature.getProperties();
            console.log(wfsProperties);
            var wfsurl = wfsurl1 + savelayerName + wfsurl2;

            fetch(wfsurl)
                .then(response => response.json())
                .then(data => {
                    // Handle the response data here
                    var wfsdata = data.features;
                    wfsdata.forEach(function (feature) {
                        wfsProperties = feature.properties;

                    });
                    var drawnGeomtery = addedFeature.getGeometry();// geometry of the features will be saved here

                    var extent = drawnGeomtery.getExtent();
                    var centroid = ol.extent.getCenter(extent);

                    content1 = 'Feature Properties<br>';
                    for (const key in wfsProperties) {
                        if (savelayerName === "DTR_C") {


                            if (key === "DTR_CODE" || key === "LOCATION" || key === "SUBSTATION" || key === "SECTION_NA" || key === "FEEDER_NA" || key === "POWER_STATUS") {

                                const value = wfsProperties[key];

                                content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                                attributeArray.push(key);

                            }
                        }
                        else if (savelayerName === "HT_LINES_C") {
                            if (key == "SUBSTATION" || key == "DTR_ID" || key == "SECTION_NA" || key == "FEEDER_NA" || key == "POWER_STATUS") {
                                const value = wfsProperties[key];

                                content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                                attributeArray.push(key);
                            }
                        }
                        else if (savelayerName == "HT_POLE_C") {
                            if (key == "POLECODE" || key == "DTR_ID" || key == "SUBSTATION" || key == "SECTION_NA" || key == "FEEDER_NA") {
                                const value = wfsProperties[key];

                                content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                                attributeArray.push(key);
                            }
                        }
                        else if (savelayerName == "LT_LINES_C") {
                            if (key == "SUBSTATION" || key == "DTR_ID" || key == "SECTION_NA" || key == "FEEDER_NA" || key == "POWER_STATUS") {
                                const value = wfsProperties[key];

                                content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                                attributeArray.push(key);
                            }
                        }
                        else if (savelayerName == "LT_POLE_C") {
                            if (key === "SUBSTATION" || key === "DTR_ID" || key == "SECTION_NA" || key == "FEEDER_NA") {
                                const value = wfsProperties[key];

                                content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                                attributeArray.push(key);
                            }
                        }
                        else if (savelayerName == "SERVICE_POINTS_C") {
                            if (key == "DTR_ID" || key == "POWER_STATUS") {
                                const value = wfsProperties[key];

                                content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                                attributeArray.push(key);
                            }
                        }
                        else if (savelayerName == "SERVICE_LINES_C") {
                            if (key == "DTR_ID" || key == "FROM_POLES" || key == "POWER_STATUS" || key == "TO_POLES") {
                                const value = wfsProperties[key];

                                content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                                attributeArray.push(key);
                            }
                        }
                        else if (savelayerName === "substation_c") {
                            if (key === "Substation" || key === "Section_id" || key === "POWER_STATUS") {
                                const value = wfsProperties[key];

                                content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                                attributeArray.push(key);
                            }
                        }

                    }

                    content1 += ' <button onclick="save_Attribute()" id = "save_attribute">Save Attributes</button>';
                    content1 += ' <br><button onclick="Delete_attribute()" id = "cancel_created">Delete Feature</button>';
                    //  alert(feature.getId());
                    content.innerHTML = content1;
                    overlay.setPosition(centroid);
                    document.getElementById("AddAtrributes").style.display = "none";
                    map.removeInteraction(draw);

                })
        

                })

        }
}


//saving drawn feature
function save_Attribute() {
    overlay.setPosition(undefined);
    document.getElementById("dropdowngeom").style.display = "none";
    document.getElementById("selectgeom").style.display = "block";


    selectedFeatures = drawfeatureselection.getFeatures();
    if (selectedFeatures.getLength() === 0) {
        alert("Please select a feature to save...");
        return;
    }
    else {
        selectedFeatures.forEach(function (feature) {
            var FeaturetobeSave = feature;
            attributeArray.forEach(function (key) {
                userInputValue = document.getElementById(key).value;
                FeaturetobeSave.set(key, userInputValue);
                FeaturetobeSave.setId(featureId);

            });

            finalDrawn = FeaturetobeSave;

            crudoperations();

            transactWFS('insert', finalDrawn);


            alert('Feature saved successfully');

            overlay.setPosition(undefined)

            serviceLayerRefresh();
            layerName = null;
            geometryName = null;
            finalDrawn = null;
            attributeArray = []
            selectedFeatures.clear();
            typeSelect.selectedIndex = 0;
            map.removeInteraction(draw);
            savelayerName = "";
            drawLayer.getSource().clear();
            servicelayergrp.getLayers().forEach(function (element) {
                element.getSource().refresh();

            });
        
        });

    }

}


//layer info on popup

function GetLayerInfo() {
    overlay.setPosition(undefined);
    map.removeInteraction(modifyLayer);
    content.innerHTML = "";
    selectedFeatures = selectInteraction.getFeatures();

    if (selectedFeatures.getLength() === 0) {
        alert("Please select a feature to Modify...");
        return;
    }
    else {
        selectedFeatures.forEach(function (feature) {
            savelayerName = feature.get('layerName');

            var modcont;
            
            var featureProperties = feature.getProperties();

            delete featureProperties.layerName;
            delete featureProperties.geometryName
        
            var featureGeomtery = feature.getGeometry();
            var featureExtent = featureGeomtery.getExtent();
            var centroid = ol.extent.getCenter(featureExtent);

            modcont = '<div id="DtrOmsPopup">'
                + '<h6>' + 'Outage Information' + '</h6>'
                + '<table>'
            for (const key in featureProperties) {
                    if (key !== "geometry" && key !== "WKT") {

                        const value = featureProperties[key];
                        const displayValue = ((value !== '<Null>') && (value !== " ") && (value !== null) ? value : '---');

                        modcont += `<tr><th><label><strong>${key} :</strong></label></th><td><input type="text" disabled="disabled" id="${key}" placeholder="${displayValue}" value="${displayValue}" ></td></tr>`;

                    }
            }

            modcont += '</table>' +
                '</div>';
            content.innerHTML = modcont;
            overlay.setPosition(centroid);
            selectedFeatures.clear();

        })
    }
}

// modify geometry
function ModifyGeometry() {
    overlay.setPosition(undefined);
    confirm("Are you sure to modify the feature Geometry..?? ");
    if (selectedFeatures.getLength() === 0) {
        alert("Please select a feature to Save...");
        return;
    }
    else {
            map.addInteraction(modifyLayer);
        document.getElementById('SaveModifiedfeature').style.display = 'block';

    }
}

function saveModified_feature() {
    overlay.setPosition(undefined);
    if (selectedFeatures.getLength() === 0) {
        alert("Please select a feature to Save...");
        return;
    }
    else {
        selectedFeatures.forEach(function (feature) {
            featureId = feature.getId();
            geometryName = feature.get('geometryName');
            savelayerName = feature.get('layerName');
            crudoperations();

            var featureProperties = feature.getProperties();
            delete featureProperties.layerName;
            delete featureProperties.geometryName;


            clone = new ol.Feature(featureProperties);
            clone.setId(featureId);
            clone.setGeometryName(geometryName);

            transactWFS('update', clone);

            alert('Feature saved successfully');

            map.removeInteraction(modifyLayer);

            servicelayergrp.getLayers().forEach(function (element) {
                element.getSource().refresh();
                serviceLayerRefresh();
                document.getElementById("ModifyFeatues").style.display = 'none';
                document.getElementById('saveAttribute').style.display = 'none';
                document.getElementById('SaveModifiedfeature').style.display = 'block';

          
            })
      

        })
        savelayerName = null;
        geometryName = null;
        selectedFeatures = null;
    }
}
// modify geometry

//modify attributes
function ModifyAttribute() {
    confirm("Are you sure to modify the feature Attribute..?? ");
    overlay.setPosition(undefined);
    map.removeInteraction(modifyLayer);
    content.innerHTML = "";
    selectedFeatures = selectInteraction.getFeatures();

    if (selectedFeatures.getLength() === 0) {
        alert("Please select a feature to Modify...");
        return;
    }
    else {
        selectedFeatures.forEach(function (feature) {
            featureId = feature.getId();
            var ModifiedFeatures = feature;
            savelayerName = feature.get('layerName');
            geometryName = feature.get('geometryName');
       var modifiedGeomtery = ModifiedFeatures.getGeometry();
        var ModifiedCoordinates = modifiedGeomtery.getCoordinates();
        var modifiedExtent = modifiedGeomtery.getExtent();

        var centroid = ol.extent.getCenter(modifiedExtent);
            var FeatureProperties = ModifiedFeatures.getProperties();
            console.log(FeatureProperties);
            console.log(savelayerName);
            console.log(savelayerName == "substation_c")
        modcont = 'Feature Properties<br>';
        for (const key in FeatureProperties) {
            if (savelayerName == "DTR_C") {
                if (key === "DTR_CODE" || key === "LOCATION" || key === "SUBSTATION" || key === "SECTION_NA" || key === "FEEDER_NA" || key === "POWER_STATUS") {

                    const value = FeatureProperties[key];

                    //content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                    modcont += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${value}" value="${value}" ><br>`;
                        attributeArray.push(key);


                }
            }
            else if (savelayerName == "HT_LINES_C") {
                if (key === "SUBSTATION" || key === "DTR_ID" || key === "SECTION_NA" || key === "FEEDER_NA" || key === "POWER_STATUS") {
                    const value = FeatureProperties[key];
                    
                    //content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                    modcont += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${value}" value="${value}" ><br>`;
                        attributeArray.push(key);

                }
            }
            else if (savelayerName == "HT_POLE_C") {
                if (key === "POLECODE" || key === "DTR_ID" || key === "SUBSTATION" || key === "SECTION_NA" || key === "FEEDER_NA") {
                    const value = FeatureProperties[key];

                    //content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                    modcont += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${value}" value="${value}" ><br>`;
                        attributeArray.push(key);

                }
            }
            else if (savelayerName == "LT_LINES_C") {
                if (key === "SUBSTATION" || key === "DTR_ID" || key === "SECTION_NA" || key === "FEEDER_NA" || key === "POWER_STATUS") {
                    const value = FeatureProperties[key];

                    //content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                    modcont += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${value}" value="${value}" ><br>`;
                        attributeArray.push(key);

                }
            }
            else if (savelayerName == "LT_POLE_C") {
                if (key === "SUBSTATION" || key === "DTR_ID" || key === "SECTION_NA" || key === "FEEDER_NA") {
                    const value = FeatureProperties[key];

                    //content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                    modcont += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${value}" value="${value}" ><br>`;
                    attributeArray.push(key);

                }
            }
                else if (savelayerName == "SERVICE_POINTS_C") {
                    if (key === "DTR_ID" || key === "POWER_STATUS") {
                        const value = FeatureProperties[key];

                        //content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                        modcont += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${value}" value="${value}" ><br>`;
                        attributeArray.push(key);

                    }
                }
                else if (savelayerName == "SERVICE_LINES_C") {
                    if (key === "DTR_ID" || key === "FROM_POLES" || key === "POWER_STATUS" || key === "TO_POLES") {
                        const value = FeatureProperties[key];

                        //content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                        modcont += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${value}" value="${value}" ><br>`;
                        attributeArray.push(key);
                    }
                }
                else if (savelayerName == "substation_c") {
                    console.log(FeatureProperties[key])
                    if (key === "Substation" || key === "Section_id" || key === "POWER_STATUS") {
                        const value = FeatureProperties[key];

                        //content1 += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${key}" value="" ><br>`;
                        modcont += `<label><strong>${key} :</strong></label><input type="text" id="${key}" placeholder="${value}" value="${value}" ><br>`;
                        attributeArray.push(key);
                    }
                }
            }
        
            modcont += ' <button onclick="SaveModified_Attributes()" id = "saveAttribute">Save Attributes</button>';

        content.innerHTML += modcont;
        overlay.setPosition(centroid);

        selectedFeatures = null;
            modcont = null;

        })
        }
}

function SaveModified_Attributes() {
    overlay.setPosition(undefined);
    selectedFeatures = selectInteraction.getFeatures();
    if (selectedFeatures.getLength() === 0) {
        alert("Please select a feature to save...");
        return;
    }
    else {
        selectedFeatures.forEach(function (feature) {
           
            var featureProperties = feature.getProperties();
            var userInputValue = {};

            delete featureProperties.layerName;
            delete featureProperties.geometryName;


            var clone = new ol.Feature(featureProperties);

            attributeArray.forEach(function (key) {
                userInputValue = document.getElementById(key).value;
                clone.set(key, userInputValue);
                clone.setId(featureId);
                clone.geometryName_ = geometryName
            });
            crudoperations();
            transactWFS('update', clone);

            alert('Feature Attributes saved successfully');

            servicelayergrp.getLayers().forEach(function (element) {
                element.getSource().refresh();
                serviceLayerRefresh();
                document.getElementById("ModifyFeatues").style.display = 'none';
                document.getElementById('saveAttribute').style.display = 'none';
                document.getElementById('SaveModifiedfeature').style.display = 'none';
            })
            attributeArray = [];
            geometryName = null;
            savelayerName = null;
            selectedFeatures = null;
            
        })
    }
}
//modify attributes

//delete Feature
function deleteFeature() {

    if (selectedFeatures.getLength() === 0) {
        alert("Please select the layer to delete feature...");
        return;
    }
    else {
        selectedFeatures.forEach(function (feature) {
            confirm("Are you sure to delete the feature??")
            var featureProperties = feature.getProperties();
            delete featureProperties.boundedBy;
            clone = feature.clone();
            targetItem = feature.getId();
            clone.setId(feature.getId());

        });
        crudoperations();
        transactWFS('delete', clone);
        window.alert("Feature Deleted")
        overlay.setPosition(undefined)
        servicelayergrp.getLayers().forEach(function (element) {
            element.getSource().refresh();
            serviceLayerRefresh();

            
        })
        overlay.setPosition(undefined);
        selectedFeatures.clear();

    }
}
//delete Feature
