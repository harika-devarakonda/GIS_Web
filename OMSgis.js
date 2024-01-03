$(document).ready(function () {

    GetOMSMap();
});



// defining Map
var View = new ol.View({

    center: [78.45842664661535, 17.42483235307844],
    zoom: 18,
    projection: 'EPSG:4326'
})
var Osm = new ol.layer.Tile({
    title: 'osm_basemap',
    visible: false,
    source: new ol.source.OSM()
})

var map = new ol.Map({
    target: 'umsmap',
    view: View,
    layers: [Osm],
    keyboardEventTarget: document,

})
// defining defferent map views
var google = new ol.layer.Tile({
    title: 'google',
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
        //   url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
    })
})
map.addLayer(google)

// stamen map 
var stamen = new ol.layer.Tile({
    title: "stamen",
    visible: false,
    source: new ol.source.Stamen({
        layer: 'watercolor'
    })
})
map.addLayer(stamen)

var terrain = new ol.layer.Tile({
    title: "terrain",
    visible: false,
    source: new ol.source.Stamen({
        layer: 'terrain'
    })
})
map.addLayer(terrain)
var key = 'NgDuSzwhlUcPa9Nvw38L'
var Retina = new ol.layer.Tile({
    title: 'Retina',
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}@2x.png?key=' + key
    })
})
map.addLayer(Retina)

var Dark = new ol.layer.Tile({
    title: 'Dark',
    visible: false,
    // crossOrigin:false,
    source: new ol.source.TileJSON({
        url: 'https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/tiles.json?key=NgDuSzwhlUcPa9Nvw38L'
    }),

})
map.addLayer(Dark)

var Satellite = new ol.layer.Tile({
    title: 'satellite',
    visible: true,
    source: new ol.source.XYZ({

        url: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
    })
})
map.addLayer(Satellite)



// layer swithcer functionality of layers
function Sidebarfunc() {
    var x = document.getElementById("bar");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
var baselayer = new ol.layer.Group({
    layers: [Osm,
        google,
        stamen,
        terrain,
        Satellite,
        Retina,
        Dark,

    ]
})

map.addLayer(baselayer)
// DEFINING METER DETAILS start
var url = 'https://gis.eficaa.com:8443/geoserver/OMS-Live/wms';



var Et_Service_Detail = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'OMS-Live:OMS_meter_Point', 'TILED': true },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var wmsLayer = new ol.layer.Image({
    title: 'OMS_meter_Point',
    source: Et_Service_Detail,
    visible: true,

    // minZoom:10,
    // maxZoom:20
})

map.addLayer(wmsLayer)
// DEFINING METER DETAILS end

//defining DTR meter start

var DTR_Details = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'OMS-Live:OMS_DTR_Details', 'TILED': true },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var DTRLayer = new ol.layer.Image({
    title: 'OMS_DTR_Details',
    source: DTR_Details,
    visible: true,
    zIndex: 2,
    // minZoom:10,
    // maxZoom:20
})


map.addLayer(DTRLayer)

// DEFINING METER DETAILS end

//defining only lt PowerLine start

// var PowerLineSource = new ol.source.ImageWMS({
//     url: url,
//     params: { 'LAYERS':'OMS-Live:OMS_PowerLines', 'TILED': true },
//     serverType: 'geoserver',
//     // crossOrigin: true,


// })
// var PowerLineLayer = new ol.layer.Image({
//     title: 'OMS_PowerLines',
//     source: PowerLineSource,
//     visible: true,
//     // minZoom:10,
//     // maxZoom:20
// })


// map.addLayer(PowerLineLayer)

// DEFINING PowerLine only lt end
// defining Pole id start
var PoleSource = new ol.source.ImageWMS({
    url: url,
    params: { 'LAYERS': 'OMS-Live:OMS_Pole_Details', 'TILED': true },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var PoleLayer = new ol.layer.Image({
    title: 'OMS_Pole_Details',
    source: PoleSource,
    visible: true,
    zIndex: 2
    // minZoom:10,
    // maxZoom:20
})


map.addLayer(PoleLayer)




// definign pole id end
// defining DTR TO POLE start
// var DTRLineSource = new ol.source.ImageWMS({
//     url: url,
//     params: { 'LAYERS':'OMS-Live:OMS_DTR_LINE', 'TILED': true },
//     serverType: 'geoserver',
//     // crossOrigin: true,


// })
// var DTRLineLayer = new ol.layer.Image({
//     title: 'OMS_DTR_LINE',
//     source: DTRLineSource,
//     visible: true,
//     // zIndex:1
//     // minZoom:10,
//     // maxZoom:20
// })


// map.addLayer(DTRLineLayer)
// dtr+lt line source start
var OMS_Line_Source = new ol.source.ImageWMS({
    // url: 'https://172.16.15.25:8443/geoserver/wms',
    url: url,
    params: { 'LAYERS': 'OMS_Power_Lines', 'TILED': true },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var OMS_PowerLines = new ol.layer.Image({
    title: 'OMS_Power_Lines',
    source: OMS_Line_Source,
    visible: true,
    zIndex: 1
    // minZoom:10,
    // maxZoom:20
})


map.addLayer(OMS_PowerLines)
// dtr+lt line source end
// ht_line details start
var OMS_HT_Line_Source = new ol.source.ImageWMS({
    // url: 'https://172.16.15.25:8443/geoserver/wms',
    url: url,
    params: { 'LAYERS': 'OMS-Live:OMS_Ht_Power_Lines', 'TILED': true },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var OMS_HT_PowerLines = new ol.layer.Image({
    title: 'OMS_Ht_Power_Lines',
    source: OMS_HT_Line_Source,
    visible: true,
    zIndex: 1
    // minZoom:10,
    // maxZoom:20
})


map.addLayer(OMS_HT_PowerLines)
// HT_Line details end

// FEEDER Start
// var OMS_Feeder_Source = new ol.source.ImageWMS({
//     // url: 'https://172.16.15.25:8443/geoserver/wms',
//     url:url,
//     params: { 'LAYERS':'OMS-Live:OMS_Feeder_Source', 'TILED': true },
//     serverType: 'geoserver',
//     // crossOrigin: true,


// })
// var OMS_Feeder_Layer = new ol.layer.Image({
//     title: 'OMS_Feeder_Source',
//     source: OMS_Feeder_Source,
//     visible: true,
//     zIndex:1
//     // minZoom:10,
//     // maxZoom:20
// })


// map.addLayer(OMS_Feeder_Layer)
// feederEND
// substation detials start
var Substation_Source = new ol.source.ImageWMS({
    // url: 'https://172.16.15.25:8443/geoserver/wms',
    url: url,
    params: { 'LAYERS': 'OMS-Live:OMS_Substation_Layer', 'TILED': true },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var Substation_Layer = new ol.layer.Image({
    title: 'OMS_Substation_Layer',
    source: Substation_Source,
    visible: true,
    zIndex: 1
    // minZoom:10,
    // maxZoom:20
})


map.addLayer(Substation_Layer)
// substation details end

// definign DTR TO POLE line end


// auto refresh functionality
window.setInterval(function () {
    //start refreshing each 1 seconds

    function setTIME() {
        //            
        wmsLayer.getSource().updateParams({ "time": Date.now() });
        // PowerLineLayer.getSource().updateParams({ "time": Date.now() });
        DTRLayer.getSource().updateParams({ "time": Date.now() });
        PoleLayer.getSource().updateParams({ "time": Date.now() });
        // DTRLineLayer.getSource().updateParams({ "time": Date.now() });
        OMS_PowerLines.getSource().updateParams({ "time": Date.now() });
        OMS_HT_PowerLines.getSource().updateParams({ "time": Date.now() })
        Substation_Layer.getSource().updateParams({ "time": Date.now() })
        // OMS_Feeder_Layer.getSource().updateParams({"time":Date.now()})

    }
    setTIME()
}, 1000)


// 
// layer swither logic for base layer
var baselayerElements = document.querySelectorAll('.bar > input[type=radio]')
for (let baselayerElement of baselayerElements) {
    baselayerElement.addEventListener('change', function () {
        let baselayerelementValue = this.value
        baselayer.getLayers().forEach(function (element, index, array) {
            let baselayername = element.get('title');
            element.setVisible(baselayername === baselayerelementValue)
        })
    })
}


// layer switcher functionality of services
var servicelayergrp = new ol.layer.Group({
    layers: [
        wmsLayer,
        DTRLayer,
        // PowerLineLayer,
        PoleLayer,
        // DTRLineLayer
        OMS_PowerLines,
        OMS_HT_PowerLines,
        Substation_Layer,
        //  OMS_Feeder_Layer
    ]
});
map.addLayer(servicelayergrp)
// layer switcher login for servicelayer grp
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
map.addOverlay(overlay)
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
var api_url = 'https://localhost:7166/api/v1/LiveOutageMap' //local url


// substation 
map.on('click', function (e) {
    overlay.setPosition(undefined)
    var view = map.getView();
    var viewResolution = /** @type {number} */ map.getView().getResolution();
    url = Substation_Layer.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        'FEATURE_COUNT': 10,
    });

    if (url) {
        $.getJSON(url, function (data) {
            var Wms_Array = data
            var feature = Wms_Array.features[0];
            var prop = feature.properties;
            var selection_wms = prop['SUBSTATION_NAME']
            var userJSON;


            // setInterval(function(){

            var xhr = new XMLHttpRequest();
            //     // open request

            xhr.open('GET', api_url, true);

            xhr.onload = function () {
                userJSON = JSON.parse(this.responseText)
               
                for (i = 0; i < userJSON.length; i++) {
                    var APIDeviceSno = userJSON[i]["substationName"];
                    if (userJSON[i]["substationName"] != '') {

                        if (APIDeviceSno === selection_wms) {
                            overlay.setPosition(e.coordinate)
                            content.innerHTML = '<div id="content">'
                                + '<h4>' + 'Outage Information' + '</h4>'
                                + '<table>'
                                + '<tr>'
                                + '<th>' + 'Parameter' + '</th>'
                                + '<th>' + 'Values of Meter ' + '</th>'
                                + '</tr>'

                                + '<tr>'
                                + '<td>' + 'Region Name' + '</td>'
                                + '<td>' + userJSON[i]["regionName"] + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Circle Name' + '</td>'
                                + '<td>' + userJSON[i]["circleName"] + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Section Name' + '</td>'
                                + '<td>' + userJSON[i]["sectionName"] + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Division Name' + '</td>'
                                + '<td>' + userJSON[i]["divisionName"] + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Substation Name' + '</td>'
                                + '<td>' + userJSON[i]["substationName"] + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Feeder Name' + '</td>'
                                + '<td>' + userJSON[i]["feederName"] + '</td>'
                                + '</tr>'
                                + '</table>'

                                + '</div>';

                            overlay.setPosition(e.coordinate)

                        }
                    }

                }
            }
            xhr.send()

        }
        )
        // ,1000})
    }

})

// dtrs
map.on('click', function (e) {
    overlay.setPosition(undefined)
    var view = map.getView();
    var viewResolution = /** @type {number} */ map.getView().getResolution();
    url = DTRLayer.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
            'FEATURE_COUNT': 10,

    });

    if (url) {
        $.getJSON(url, function (data) {
            var Wms_Array = [];
            Wms_Array.push(data); //pushed entire data into an array
            var feature = Wms_Array[0].features; //pushed features into an array
            var prop = [];
            var deviceType = [];
            var dtrInfo = [];
            for (let i = 0; feature.length > i; i++) {
                prop.push(Wms_Array[0].features[i].properties);
                deviceType.push(prop[i]['DEVICE_TYPE']);//which stores device type
                deviceType.forEach(value => {
                    if (value === 'TMU') {
                        dtrInfo.push(Wms_Array[0].features[i].properties) // which stores dtrtmu meter information only
                    }
                })

            }
            var selection_wms = dtrInfo[0]['DEVICE_SERIAL_NO'];

            // setInterval(function(){


            var xhr = new XMLHttpRequest();
            //     // open request

            xhr.open('GET', api_url, true);


            //     // 
            //     // // onload funciton
            xhr.onload = function () {
                userJSON = JSON.parse(this.responseText)
               
                for (i = 0; i < userJSON.length; i++) {
                    var APIDeviceSno = userJSON[i]["deviceSerialNo"];
                    var POWER_STATUS = prop['POWER_STATUS']
                    if (POWER_STATUS == 'PREDICTED') {
                        POWER_STATUS = 'Power Off'
                    } else {
                        POWER_STATUS = 'Power On'
                    }
                    
                    
                    if (userJSON[i]["deviceSerialNo"] != '') {
 
                        if (APIDeviceSno === selection_wms) {
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
                            + '<td>' + (dtrInfo[0]['DEVICE_TYPE'] ?? "---") + '</td>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Device Name' + '</td>'
                            + '<td>' + (dtrInfo[0]['DEVICE_NAME'] ?? "---") + '</td>'
                                + '<tr>'
                                + '<td>' + 'Region Name' + '</td>'
                            + '<td>' + (userJSON[i]["regionName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Circle Name' + '</td>'
                            + '<td>' + (userJSON[i]["circleName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Section Name' + '</td>'
                            + '<td>' + (userJSON[i]["sectionName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Division Name' + '</td>'
                            + '<td>' + (userJSON[i]["divisionName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Substation Name' + '</td>'
                            + '<td>' + (userJSON[i]["substationName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Feeder Name' + '</td>'
                            + '<td>' + (userJSON[i]["feederName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Device Serial No' + '</td>'
                            + '<td>' + (userJSON[i]["deviceSerialNo"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Transformer Sno' + '</td>'
                            + '<td>' + (userJSON[i]["transformerSno"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Latitude' + '</td>'
                            + '<td>' + (dtrInfo[0]['LATITUDE'] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Latitude' + '</td>'
                            +'<td>' + (dtrInfo[0]['LONGITUDE'] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Location' + '</td>' +
            '<td>' + (dtrInfo[0]['LOCATION'] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'

                                + '<td >' + 'Power Status' + '</td>'
                                + '<td> ' + POWER_STATUS + '</td > '
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Power Outage Start Time' + '</td >'
                                + '<td>' + (userJSON[i]["powerIntStart"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr >'
                                + '<td>' + 'Power Outage End Time' + '</td>'
            + '<td> ' + (userJSON[i]["powerIntEnd"] ?? "---") + '</td > '
                                + '</tr>'
                                + '</table>'
                            +'</div>'

                            overlay.setPosition(e.coordinate)

                        }



                        // return

                    }

                }
            }
            xhr.send()

        }
        )
        // ,1000})
    }

})


// service point
map.on('click', function (e) {
    overlay.setPosition(undefined)
    var view = map.getView();


    var viewResolution = /** @type {number} */ map.getView().getResolution();
    url = wmsLayer.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        'FEATURE_COUNT': 10,
    });
    // console.log(url)
    if (url) {
        $.getJSON(url, function (data) {
            var Wms_Array = data
            var feature = Wms_Array.features[0];
            var prop = feature.properties;
            var selection_wms = prop['DEVICE_SERIAL_NO']
            var userJSON;


            // setInterval(function(){


            var xhr = new XMLHttpRequest();
            //     // open request

            xhr.open('GET', api_url, true);


            //     // 
            //     // // onload funciton
            xhr.onload = function () {
                userJSON = JSON.parse(this.responseText)
                //    console.log(userJSON.length)
                for (i = 0; i < userJSON.length; i++) {
                    var APIDeviceSno = userJSON[i]["deviceSerialNo"];
                    var POWER_STATUS = prop['POWER_STATUS']
                    if (POWER_STATUS == 'PREDICTED') {
                        POWER_STATUS = 'Power Off'
                    } else {
                        POWER_STATUS = 'Power On'
                    }
                    var power_off_start = userJSON[i]["powerIntStart"]
                    var power_off_end = userJSON[i]["powerIntEnd"]

                    if (power_off_start == null) {
                        power_off_start = "---"
                    } else {
                        power_off_start = userJSON[i]["powerIntStart"]
                    }
                    if (power_off_end == null) {
                        power_off_end = "---"
                    } else {
                        power_off_end = userJSON[i]["powerIntEnd"]
                    }
                    //   console.log(userJSON[i]["deviceSerialNo"])
                    if (userJSON[i]["deviceSerialNo"] != '') {

                        if (APIDeviceSno === selection_wms) {
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
                                + '<td>' + (prop['DEVICE_TYPE'] ?? "---") + '</td>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Device Name' + '</td>'
                                + '<td>' + (prop['DEVICE_NAME'] ?? "---") + '</td>'
                                + '<tr>'
                                + '<td>' + 'Region Name' + '</td>'
                                + '<td>' + (userJSON[i]["regionName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Circle Name' + '</td>'
                                + '<td>' + (userJSON[i]["circleName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Section Name' + '</td>'
                                + '<td>' + (userJSON[i]["sectionName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Division Name' + '</td>'
                                + '<td>' + (userJSON[i]["divisionName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<tr>'
                                + '<td>' + 'Feeder Name' + '</td>'
                                + '<td>' + (userJSON[i]["feederName"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Device Serial No' + '</td>'
                                + '<td>' + (userJSON[i]["deviceSerialNo"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Transformer Sno' + '</td>'
                                + '<td>' + (userJSON[i]["transformerSno"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Latitude' + '</td>'
                                + '<td>' + (prop['LATITUDE'] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Latitude' + '</td>'
                                + '<td>' + (prop['LONGITUDE'] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Location' + '</td>' +
                                '<td>' + (prop['LOCATION'] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr>'

                                + '<td >' + 'Power Status' + '</td>'
                                + '<td> ' + POWER_STATUS + '</td > '
                                + '</tr>'
                                + '<tr>'
                                + '<td>' + 'Power Outage Start Time' + '</td >'
                                + '<td>' + (userJSON[i]["powerIntStart"] ?? "---") + '</td>'
                                + '</tr>'
                                + '<tr >'
                                + '<td>' + 'Power Outage End Time' + '</td>'
                                + '<td> ' + (userJSON[i]["powerIntEnd"] ?? "---") + '</td > '
                                + '</tr>'
                                + '</table>'
                                + '</div>'

                            overlay.setPosition(e.coordinate)

                        }
                       
                    }

                }
            }
            xhr.send()

        }
        )
        // ,1000})
    }

})

// lt line and ht line
map.on('click', function (e) {
    overlay.setPosition(undefined)
    var view = map.getView();
    var viewResolution = /** @type {number} */ map.getView().getResolution();
    url = OMS_HT_PowerLines.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        'FEATURE_COUNT': 10,
    });

    if (url) {
        $.getJSON(url, function (data) {
            var Wms_Array = data
            var feature = Wms_Array.features[0];
            var prop = feature.properties;
            var selection_wms = prop['SUBSTATION_ID']
            var userJSON;

            overlay.setPosition(e.coordinate)
            content.innerHTML = 'HT Line'
            // setInterval(function(){


        }
        )
        // ,1000})
    }

})


// Power lines lt
map.on('click', function (e) {

    overlay.setPosition(undefined)
    var view = map.getView();


    var viewResolution = /** @type {number} */ map.getView().getResolution();
    url = OMS_PowerLines.getSource().getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        'FEATURE_COUNT': 10,
    });
    // console.log(url)
    if (url) {
        $.getJSON(url, function (data) {
            var Wms_Array = data
            var feature = Wms_Array.features[0];
            var prop = feature.properties;
            var selection_wms = prop['SUBSTATION_ID']
            var userJSON;
            overlay.setPosition(e.coordinate)
            content.innerHTML = 'LT LINE'
        })
    }
})    
var omspopup = [];
function GetOMSMap() {
    $.ajax({
        type: "GET",
        url: "/OutageGIS/GetOutageGis",
        success: function (Result) {
            omspopup.push(Result);
            console.log(omspopup)
        }
        

    })
   
  }
console.log(omspopup);