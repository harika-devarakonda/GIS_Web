// Defining map 
var View = new ol.View({
    center: [78.46097696036375, 17.435540346674706],
    zoom: 17,
    projection: 'EPSG:4326'
})
var Osm = new ol.layer.Tile({
    title: 'osm_basemap',
    visible: false,
    source: new ol.source.OSM()
})

var map = new ol.Map({
    target: 'map',
    view: View,
    layers: [Osm],
    keyboardEventTarget: document,

})
// defining defferent map views
var google = new ol.layer.Tile({
    title: 'Satellite',
    visible: false,
    source: new ol.source.XYZ({
        url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
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

        url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
    })
})
map.addLayer(Satellite)

// zOOM TO EXTENT START

var Extent = document.createElement('k')
Extent.setAttribute('class', 'fa fa-life-ring')
var zoomToExtent = new ol.control.ZoomToExtent({
    label: Extent,
    extent: [78.45568764418638, 17.43149557548025, 78.46626627654112, 17.439585117869164]
})

map.addControl(zoomToExtent)

// zOOM TO EXTENT END

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
// wms service from geoserver

// var url = 'http://10.10.55.7:8085/geoserver/tHES/wms'
var url = 'https://gis.eficaa.com:8443/geoserver/tHES/wms'


var Ht_Line_Source = new ol.source.ImageWMS({
    url: url,
    params: {
        'LAYERS': 'tHES:ST_HT_LINES', 'TILED': true,
    },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var Ht_Line_Layer = new ol.layer.Image({
    title: 'ST_HT_LINES',
    source: Ht_Line_Source,
    visible: true,
})

map.addLayer(Ht_Line_Layer)
var Ht_Pole_Source = new ol.source.ImageWMS({
    url: url,
    params: {
        'LAYERS': 'tHES:ST_HT_POLES', 'TILED': true,
    },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var Ht_Pole_Layer = new ol.layer.Image({
    title: 'ST_HT_POLES',
    source: Ht_Pole_Source,
    visible: true,
})

map.addLayer(Ht_Pole_Layer)
var Service_Line_Source = new ol.source.ImageWMS({
    url: url,
    params: {
        'LAYERS': 'tHES:ST_SERVICE_LINES', 'TILED': true,
    },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var Service_Line_Layer = new ol.layer.Image({
    title: 'ST_SERVICE_LINES',
    source: Service_Line_Source,
    visible: true,
})

map.addLayer(Service_Line_Layer)
var UG_Line_Source = new ol.source.ImageWMS({
    url: url,
    params: {
        'LAYERS': 'tHES:ST_UG_LINES', 'TILED': true,
    },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var UG_Line_Layer = new ol.layer.Image({
    title: 'ST_UG_LINES',
    source: UG_Line_Source,
    visible: true,
})

map.addLayer(UG_Line_Layer)

var Dtr_source = new ol.source.ImageWMS({
    url: url,
    params: {
        'LAYERS': 'tHES:ET_DTR_DETAILS', 'TILED': true,
    },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var Dtr_Layer = new ol.layer.Image({
    title: 'ET_DTR_DETAILS',
    source: Dtr_source,
    visible: true,
    zIndex: 15
})

map.addLayer(Dtr_Layer)
var ET_METER_DETAILS = new ol.source.ImageWMS({
    url: url,
    params: {
        'LAYERS': 'tHES:ET_METER_DETAILS', 'TILED': true,
    },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var ET_METER_DETAILS_Layer = new ol.layer.Image({
    title: 'ET_METER_DETAILS',
    source: ET_METER_DETAILS,
    visible: true,
})

map.addLayer(ET_METER_DETAILS_Layer)
var substation_source = new ol.source.ImageWMS({
    url: url,
    params: {
        'LAYERS': 'tHES:ET_SUBSTATION_DETAILS', 'TILED': true,
    },
    serverType: 'geoserver',
    // crossOrigin: true,


})
var substation_layer = new ol.layer.Image({
    title: 'ET_SUBSTATION_DETAILS',
    source: substation_source,
    visible: true,
})

map.addLayer(substation_layer)



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
        Ht_Line_Layer,
        Ht_Pole_Layer,
        Service_Line_Layer,
        UG_Line_Layer,
        Dtr_Layer,
        ET_METER_DETAILS_Layer,
        substation_layer
    ]
})
map.addLayer(servicelayergrp)
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
};
//start refreshing each 1 seconds
window.setInterval(function () {


    function setTIME() {
        //             // call your function here
        // var params = wmslayer.getSource().getParams();
        // params.t = new Date().getMilliseconds();
        Ht_Line_Layer.getSource().updateParams({ "time": Date.now() });
        Ht_Pole_Layer.getSource().updateParams({ "time": Date.now() });
        Service_Line_Layer.getSource().updateParams({ "time": Date.now() });
        UG_Line_Layer.getSource().updateParams({ "time": Date.now() });
        Dtr_Layer.getSource().updateParams({ "time": Date.now() });
        ET_METER_DETAILS_Layer.getSource().updateParams({ "time": Date.now() });
        substation_layer.getSource().updateParams({ "time": Date.now() });
        content.innerHTML
    }
    setTIME()
}, 1000)

//End refreshing each 1 seconds

// sarch auto complete start
// var serApi = 'http://10.10.55.7:94/api/v1/DtrLoadLevelRange';
var serApi = 'https://localhost:7166/api/v1/DtrLoadLevelRange';


var Searchinput = [] // Stores api calls structure codes 

$.ajax({
    url: serApi,
    type: "GET",
    dataType: "json",
    success: function (data) {
        for (let i = 0; i < data.length; i++) {
            var structurecode = data[i].structureCode
            Searchinput.push(structurecode)
            $("#epsg-query").autocomplete({
                source: Searchinput
            })
        }
    }

})
// search functionality implementation start

var wfsurl = "https://gis.eficaa.com:8443/geoserver/tHES/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tHES%3AET_DTR_DETAILS&outputFormat=application/json"
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
    })
})
var vec_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        // format: new ol.format.GeoJSON(),
        // url: []
    }),
    style: wfsstyle,
    zIndex: 16
})

map.addLayer(vec_layer)

// wfs functionality into an array start for search implementation

var x = []; // which stores structure code
var structurecodeOf = []; // features of wfs service
$.ajax({
    url: wfsurl,
    type: "GET",
    dataType: "json",
    success: function (data) {
        var features = new ol.format.GeoJSON().readFeatures(data);
        for (i = 0; i < features.length; i++) {
            var z = features[i].getProperties()['STRUCTURE_CODE']; // structure codes of wms service
            x.push(z)
            structurecodeOf.push(features[i]) // each feature of wfs service will get stored here

        }


    }
})

// wfs functionality into an array end for search implementation
function search() {
    document.querySelector('form.row').addEventListener('submit', function (e) {
        //         //prevent the normal submission of the form
        e.preventDefault();
        var nameInput = document.getElementById('epsg-query');
        var inputvalue = nameInput.value


        // var searchdata = []; // not using
        const repeatedValues = [];// each structure value loading once inut is enterd
        var vectordata = [];// used for wfs features
        var featurestoAdd = [];
        var featuresult;// 

        x.forEach(value => {
            if (value == inputvalue) {
                repeatedValues.push(value)
            }
        })

        for (i = 0; i < structurecodeOf.length; i++) {
            var wfsvalue = structurecodeOf[i].getProperties()['STRUCTURE_CODE'];

            if (wfsvalue === inputvalue) {
                vectordata.push(structurecodeOf[i])

            }

        }



        if (repeatedValues.length !== 0) {

            if (repeatedValues.length > 0) {
                e.preventDefault();

                for (let j = 0; vectordata.length > j; j++) {
                    featuresult = vectordata[j];
                    featurestoAdd.push(vectordata[j]);
                }
                overlay.setPosition(undefined)
                vec_layer.getSource().clear()
                vec_layer.getSource().addFeatures(featurestoAdd);
                var latitide = featuresult.getProperties()["LATITUDE"]
                var longitude = featuresult.getProperties()["LONGITUDE"]
                map.getView().setCenter([longitude, latitide])
                map.getView().setZoom(18);
                vec_layer.setStyle(wfsstyle);



            }
            else {
                e.preventDefault();
                overlay.setPosition(undefined)
                for (let j = 0; vectordata.length > j; j++) {
                    featuresult = vectordata[j];
                    featurestoAdd.push(vectordata[j]);
                }
                vec_layer.getSource().clear()
                vec_layer.getSource().addFeatures(featurestoAdd);
                var latitide = featuresult.getProperties()["LATITUDE"]
                var longitude = featuresult.getProperties()["LONGITUDE"]
                map.getView().setCenter([longitude, latitide])
                map.getView().setZoom(19);
                vec_layer.setStyle(wfsstyle);

            }

        }
    });
}


const searchButton = document.getElementById('epsg-search');
searchButton.onclick = search()
// search functionality end




// pop up get info start
// var api_url1 = 'http://10.10.55.7:94/api/v1/DtrLoadLevelRange/'
var api_url1 = 'https://localhost:7166/api/v1/DtrLoadLevelRange/'

var api_url2 = '/BlockLoad/Data/byStructureCode'

// var IstantaneousUrl = "http://10.10.55.7:94/api/v1/ResponseDayWiseReports/";
var IstantaneousUrl = "https://localhost:7166/api/v1/ResponseDayWiseReports/";


var instaniousStructureCode = [];


function getinfo(e) {
    overlay.setPosition(undefined);
    var view = map.getView();
    var viewResolution = /** @type {number} */ map.getView().getResolution();
    var url = Dtr_source.getFeatureInfoUrl(e.coordinate,
        viewResolution, view.getProjection(), {
        'INFO_FORMAT': 'application/json',
        'PIXELRADIUS': 5,
        // 'FEATURE_COUNT': 10,
    });

    if (url) {
        // map.addOverlay(overlay)
        $.getJSON(url, function (data) {
            var Wms_Array = data
            var feature = Wms_Array.features[0];
            var prop = feature.properties;
            var selection_wms = prop['STRUCTURE_CODE']
            // instaniousStructureCode.push(selection_wms)
            var lat = prop["LATITUDE"]
            var long = prop["LONGITUDE"]
            // map.getView().setCenter([long, lat])
            map.getView().setCenter(e.coordinate)
            map.getView().setZoom(18)
            var xhr = new XMLHttpRequest();
            // open request
            xhr.open('GET', api_url1 + selection_wms + api_url2, true);
            console.log( api_url1 + selection_wms + api_url2)

            var IstantaneousData = [];

            $.ajax({
                url: IstantaneousUrl + selection_wms,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    if (data != null && data.length > 0) {
                        IstantaneousData.push(data)// each data will get saved here
                    }
                }
            });
            // onload funciton
            xhr.onload = function () {
                // Istantaneousdata from url

                var apiJson = JSON.parse(this.responseText)


                var result = (apiJson.length == 0 ? null : JSON.stringify(apiJson))


                if (result !== null && IstantaneousData.length !== 0) {
                    var ArrayofStructurecode = [];// this will get repeated sturcute code values
                    var userJSON
                    var struccode2 = []  // structure code values will get pushed here
                    for (let i = 0; i < apiJson.length; i++) {
                        struccode2.push(apiJson[i]["structureCode"])
                        struccode2.forEach(value => {
                            if (value === selection_wms) {
                                ArrayofStructurecode.push(value)
                            }
                        })

                    }
                    if (ArrayofStructurecode.length <= 1) {

                        overlay.setPosition(undefined)

                        userJSON = apiJson

                        for (let i = 0; userJSON.length > i; i++) {

                            if (userJSON[i]["structureCode"] === selection_wms) {

                                var APIDeviceSno = userJSON[i]["dtrId"];
                               
                                content.innerHTML =
                                    '<div id="special">'
                                    + '<h4>' + 'Instantaneous Values Data' + '</h4>'
                                    + '<table>'
                                    + '<tr id=tablecontent>'
                                    + '<th>' + 'Parameter' + '</th>'
                                    + '<th>' + 'Values of Meter' + '</th>'

                                    + '<th>' + 'Parameter' + '</th>'
                                    + '<th>' + 'Values of Meter' + '</th>'

                                    + '<th>' + 'Parameter' + '</th>'
                                    + '<th>' + 'Values of Meter' + '</th>'
                                    + '<tr>'

                                    + '<td>' + 'RTC' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["rtc"] ?? "---") + '</td>'
                                    + '<td>' + 'Signed 3 Φ PF' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["signedThreePhasePowerFactorPF"] ?? "---") + '</td>'
                                    + '<td>' + 'Billing Date ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["billingTime"] ?? "---") + '</td>'
                                    + '</tr>'
                                    + '<tr>'

                                    + '<td>' + 'Current R Φ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["currentRphase"] ?? "---") + '</td>'
                                    + '<td>' + 'Frequency' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["frequency"] ?? "---") + '</td>'
                                    + '<td>' + 'Cumulative Energy kWh Import' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["cumulativeEnergykWhimport"] ?? "---") + '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'Current Y Φ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["currentYphase"] ?? "---") + '</td>'
                                    + '<td>' + 'Apparent Power kVA' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["apparentPowerkVA"] ?? "---") + '</td>'
                                    + '<td>' + 'Cumulative Energy kVArh Lag I Import' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["cumulativeEnergykvarhLagIImport"] ?? "---")+ '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'Current B Φ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["currentBphase"] ?? "---" )+ '</td>'
                                    + '<td>' + 'Signed Active Power kW' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["signedActivePowerkW"] ?? "---")+ '</td>'
                                    + '<td>' + 'Cumulative Energy kVArh Lead IV Export' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["cumulativeEnergykvarhLeadIVExport"] ?? "---") + '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'L1 Voltage V(rn)' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["l1VoltageVRN"] ?? "---" )+ '</td>'
                                    + '<td>' + 'Signed Reactive Power kVAr' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["signedReactivePowerkvar"] ?? "---") + '</td>'
                                    + '<td>' + 'Cumulative Energy kVAh Import' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["cumulativeEnergykVAhimport"] ?? "---")+ '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'L2 Voltage V(yn)' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["l2VoltageVYN"] ?? "---") + '</td>'
                                    + '<td>' + 'Number of Power Failures' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["noOfPowerFailures"] ?? "---")+ '</td>'
                                    + '<td>' + 'MD kW Import ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["mDkWImport"] ?? "---") + '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'L3 Voltage V(bn)' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["l3VoltageVBN"] ?? "---") + '</td>'
                                    + '<td>' + 'Cumulative Power Failure Duration  ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["cumulativePowerFailureDurationMin"] ?? "---") + '</td>'
                                    + '<td>' + 'MD kWIport Time Stamp ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["mDkWImportTimeStamp"] ?? "---") + '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'L1 Signed PF R Φ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["l1SignedPowerFactorRPhase"] ?? "---" )+ '</td>'
                                    + '<td>' + 'Cumulative Tamper Count' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["cumulativeTamperCount"] ?? "---") + '</td>'
                                    + '<td>' + 'MD kVA Import ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["mDkVAImp"] ?? "---")+ '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'L2 Signed PF Y Φ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["l2SignedPowerFactorYPhase"] ?? "---") + '</td>'
                                    + '<td>' + 'Cumulative Billing Count ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["cumulativeBillingCount"] ?? "---")+ '</td>'
                                    + '<td>' + 'MD kVA Import Time Stamp ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["mDkVAImpTimeStamp"] ?? "---")+ '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'L3 Signed PF B Φ' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["l3SignedPowerFactorBPhase"] ?? "---")+ '</td>'
                                    + '<td>' + 'Cumulative Programming Count' + '</td>'
                                    + '<td>' + (IstantaneousData[0][0]["cumulativeProgrammingCount"] ?? "---")+ '</td>'
                                    + '</tr>'

                                    + '</table>'

                                    //block data from api



                                    + '<h4>' + 'Block Load Profile Data' + '</h4>'
                                    + '<table>'
                                    + '<tr id=tablecontent>'
                                    + '<th>' + 'Parameter' + '</th>'
                                    + '<th>' + 'Values of Meter' + '</th>'

                                    + '<th>' + 'Parameter' + '</th>'
                                    + '<th>' + 'Values of Meter' + '</th>'

                                    + '<tr>'

                                    + '<td>' + 'Structure Code' + '</td>'
                                    + '<td>' + (prop["STRUCTURE_CODE"] ?? "---") + '</td>'

                                    + '<td>' + 'Avg Voltage V(rn)' + '</td>'
                                    + '<td>' + (userJSON[0]["l1voltageVrn"] ?? "---") + '</td>'
                                    + '</tr>'

                                    + '<tr>'
                                    + '<td>' + 'Meter Id' + '</td>'
                                    + '<td>' + (userJSON[0]["meterId"] ?? "---") + '</td>'
                                    + '<td>' + 'Avg Voltage V(bn)' + '</td>'
                                    + '<td>' + (userJSON[0]["l3voltageVbn"] ?? "---") + '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'Real Time Clock' + '</td>'
                                    + '<td>' + (userJSON[0]["rtc"] ?? "---")+ '</td>'
                                    + '<td>' + 'Avg Voltage V(yn)' + '</td>'
                                    + '<td>' + (userJSON[0]["l2voltageVyn"] ?? "---")+ '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'Block Energy kVah Import' + '</td>'
                                    + '<td>' + (userJSON[0]["blockEnergyVahImport"]  ?? "---") + '</td>'
                                    + '<td>' + 'Avg Current I(b)' + '</td>'
                                    + '<td>' + (userJSON[0]["currentBphase"] ?? "----") + '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'Block Energy kvarh Lead import' + '</td>'
                                    + '<td>' + (userJSON[0]["blockEnergykvarhLeadIiiimport"]  ?? "---") + '</td>'
                                    + '<td>' + 'Avg Current I(r)' + '</td>'
                                    + '<td>' + (userJSON[0]["currentRphase"] ?? "---")+ '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'Block Energy kvarh Lag import' + '</td>'
                                    + '<td>' + (userJSON[0]["blockEnergykvarhLagIimport"]  ?? "---") + '</td>'
                                    + '<td>' + 'Avg Current I(y)' + '</td>'
                                    + '<td>' + (userJSON[0]["currentYphase"] ?? "---")+ '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                    + '<td>' + 'Block Energy kWh Import' + '</td>'
                                    + '<td>' + (userJSON[0]["blockEnergyWhImport"] ?? "---") + '</td>'
                                    + '</tr>'
                                    + '</table>'
                                    + '</div>'



                                overlay.setPosition(e.coordinate)


                            }

                        }
                    }
                    else if (struccode2.length > 1) {
                        overlay.setPosition(undefined)
                        userJSON = apiJson


                        content.innerHTML =
                            '<div id="special">'
                            + '<h4>' + 'Instantaneous Values Data' + '</h4>'
                            + '<table>'
                            + '<tr id=tablecontent>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<tr>'

                            + '<td>' + 'RTC' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["rtc"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["rtc"] ?? "---")+ '</td>'
                            + '<td>' + 'Signed 3 Φ PF' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["signedThreePhasePowerFactorPF"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["signedThreePhasePowerFactorPF"] ?? "---")+ '</td>'
                            + '<td>' + 'Billing Date ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["billingTime"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["billingTime"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'

                            + '<td>' + 'Current R Φ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["currentRphase"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["currentRphase"] ?? "---") + '</td>'
                            + '<td>' + 'Frequency' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["frequency"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["frequency"] ?? "---")+ '</td>'
                            + '<td>' + 'Cumulative Energy kWh Import' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["cumulativeEnergykWhimport"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["cumulativeEnergykWhimport"] ?? "---") + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Current Y Φ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["currentYphase"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["currentYphase"] ?? "---")+ '</td>'
                            + '<td>' + 'Apparent Power kVA' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["apparentPowerkVA"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["apparentPowerkVA"] ?? "---")+ '</td>'
                            + '<td>' + 'Cumulative Energy kVArh Lag I Import' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["cumulativeEnergykvarhLagIImport"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["cumulativeEnergykvarhLagIImport"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Current B Φ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["currentBphase"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["currentBphase"] ?? "---")+ '</td>'
                            + '<td>' + 'Signed Active Power kW' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["signedActivePowerkW"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["signedActivePowerkW"] ?? "---")+ '</td>'
                            + '<td>' + 'Cumulative Energy kVArh Lead IV Export' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["cumulativeEnergykvarhLeadIVExport"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["cumulativeEnergykvarhLeadIVExport"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L1 Voltage V(rn)' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["l1VoltageVRN"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["l1VoltageVRN"] ?? "---")+ '</td>'
                            + '<td>' + 'Signed Reactive Power kVAr' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["signedReactivePowerkvar"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["signedReactivePowerkvar"] ?? "---")+ '</td>'
                            + '<td>' + 'Cumulative Energy kVAh Import' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["cumulativeEnergykVAhimport"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["cumulativeEnergykVAhimport"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L2 Voltage V(yn)' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["l2VoltageVYN"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["l2VoltageVYN"] ?? "---")+ '</td>'
                            + '<td>' + 'Number of Power Failures' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["noOfPowerFailures"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["noOfPowerFailures"] ?? "---")+ '</td>'
                            + '<td>' + 'MD kW Import ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["mDkWImport"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["mDkWImport"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L3 Voltage V(bn)' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["l3VoltageVBN"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["l3VoltageVBN"] ?? "---")+ '</td>'
                            + '<td>' + 'Cumulative Power Failure Duration  ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["cumulativePowerFailureDurationMin"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["cumulativePowerFailureDurationMin"] ?? "---")+ '</td>'
                            + '<td>' + 'MD kWIport Time Stamp ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["mDkWImportTimeStamp"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["mDkWImportTimeStamp"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L1 Signed PF R Φ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["l1SignedPowerFactorRPhase"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["l1SignedPowerFactorRPhase"] ?? "---") + '</td>'
                            + '<td>' + 'Cumulative Tamper Count' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["cumulativeTamperCount"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["cumulativeTamperCount"] ?? "---")+ '</td>'
                            + '<td>' + 'MD kVA Import ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["mDkVAImp"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["mDkVAImp"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L2 Signed PF Y Φ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["l2SignedPowerFactorYPhase"] ?? "---" )+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["l2SignedPowerFactorYPhase"] ?? "---")+ '</td>'
                            + '<td>' + 'Cumulative Billing Count ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["cumulativeBillingCount"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["cumulativeBillingCount"] ?? "---")+ '</td>'
                            + '<td>' + 'MD kVA Import Time Stamp ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["mDkVAImpTimeStamp"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["mDkVAImpTimeStamp"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L3 Signed PF B Φ' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["l3SignedPowerFactorBPhase"] ?? "---") + '</td>'
                            + '<td>' + (IstantaneousData[0][1]["l3SignedPowerFactorBPhase"]?? "---") + '</td>'
                            + '<td>' + 'Cumulative Programming Count' + '</td>'
                            + '<td>' + (IstantaneousData[0][0]["cumulativeProgrammingCount"] ?? "---")+ '</td>'
                            + '<td>' + (IstantaneousData[0][1]["cumulativeProgrammingCount"] ?? "---")+ '</td>'
                            + '</tr>'

                            + '</table>'

                            + '<h4>' + 'Block Load Profile Data' + '</h4>'
                            + '<table>'
                            + '<tr id=tablecontent>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<tr>'

                            + '<td>' + 'Structure Code' + '</td>'
                            + '<td>' + (prop["STRUCTURE_CODE"] ?? "---")+ '</td>'
                            + '<td>' + (prop["STRUCTURE_CODE"] ?? "---")+ '</td>'
                            + '<td>' + 'Avg Voltage V(rn)' + '</td>'
                            + '<td>' + (userJSON[0]["l1voltageVrn"] ?? "---") + '</td>'
                            + '<td>' + (userJSON[1]["l1voltageVrn"] ?? "---") + '</td>'
                            + '</tr>'

                            + '<tr>'
                            + '<td>' + 'Meter Id' + '</td>'
                            + '<td>' + (userJSON[0]["meterId"] ?? "---")+ '</td>'
                            + '<td>' + (userJSON[1]["meterId"] ?? "---")+ '</td>'
                            + '<td>' + 'Avg Voltage V(bn)' + '</td>'
                            + '<td>' + (userJSON[0]["l3voltageVbn"] ?? "---") + '</td>'
                            + '<td>' + (userJSON[1]["l3voltageVbn"]?? "---") + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Real Time Clock' + '</td>'
                            + '<td>' + (userJSON[0]["rtc"] ?? "---") + '</td>'
                            + '<td>' + (userJSON[1]["rtc"] ?? "---" )+ '</td>'
                            + '<td>' + 'Avg Voltage V(yn)' + '</td>'
                            + '<td>' + (userJSON[0]["l2voltageVyn"] ?? "---") + '</td>'
                            + '<td>' + (userJSON[1]["l2voltageVyn"] ?? "---")+ '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kVah Import' + '</td>'
                            + '<td>' + userJSON[0]["blockEnergyVahImport"] + '</td>'
                            + '<td>' + userJSON[1]["blockEnergyVahImport"] + '</td>'
                            + '<td>' + 'Avg Current I(b)' + '</td>'
                            + '<td>' + userJSON[0]["currentBphase"] + '</td>'
                            + '<td>' + userJSON[1]["currentBphase"] + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kvarh Lead import' + '</td>'
                            + '<td>' + userJSON[0]["blockEnergykvarhLeadIiiimport"] + '</td>'
                            + '<td>' + userJSON[1]["blockEnergykvarhLeadIiiimport"] + '</td>'
                            + '<td>' + 'Avg Current I(r)' + '</td>'
                            + '<td>' + userJSON[0]["currentRphase"] + '</td>'
                            + '<td>' + userJSON[1]["currentRphase"] + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kvarh Lag import' + '</td>'
                            + '<td>' + userJSON[0]["blockEnergyWhImport"] + '</td>'
                            + '<td>' + userJSON[1]["blockEnergyWhImport"] + '</td>'
                            + '<td>' + 'Avg Current I(y)' + '</td>'
                            + '<td>' + userJSON[0]["currentYphase"] + '</td>'
                            + '<td>' + userJSON[1]["currentYphase"] + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kWh Import' + '</td>'
                            + '<td>' + userJSON[0]["blockEnergykvarhLagIimport"] + '</td>'
                            + '<td>' + userJSON[1]["blockEnergykvarhLagIimport"] + '</td>'
                            + '</tr>'
                            + '</table>'
                            + '</div>'
                        overlay.setPosition(e.coordinate)


                    }
                }



                else if (result == null && IstantaneousData.length == 0) {
                    var doublestruc = [];
                    var vector_Data = []; // each structure code will get stored
                    for (let xyz of x) {
                        if (xyz === selection_wms) {
                            vector_Data.push(xyz)

                        }
                    }

                    if (vector_Data.length > 1) {
                        //     overlay.setPosition(undefined)
                        content.innerHTML =
                            '<div id="special">'
                            + '<h4>' + 'Instantaneous Values Data' + '</h4>'
                            + '<table>'
                            + '<tr id=tablecontent>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<tr>'

                            + '<td>' + 'RTC' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Signed 3 Φ PF' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Billing Date ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'

                            + '<td>' + 'Current R Φ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Frequency' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Cumulative Energy kWh Import' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Current Y Φ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Apparent Power kVA' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Cumulative Energy kVArh Lag I Import' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Current B Φ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Signed Active Power kW' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Cumulative Energy kVArh Lead IV Export' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L1 Voltage V(rn)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Signed Reactive Power kVAr' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Cumulative Energy kVAh Import' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L2 Voltage V(yn)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Number of Power Failures' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'MD kW Import ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L3 Voltage V(bn)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Cumulative Power Failure Duration  ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'MD kWIport Time Stamp ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L1 Signed PF R Φ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Cumulative Tamper Count' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'MD kVA Import ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L2 Signed PF Y Φ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Cumulative Billing Count ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'MD kVA Import Time Stamp ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L3 Signed PF B Φ' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Cumulative Programming Count' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'

                            + '</table>'




                            //block data from api call

                            + '<h4>' + 'Block Load Profile Data' + '</h4>'
                            + '<table>'
                            + '<tr id=tablecontent>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter 1' + '</th>'
                            + '<th>' + 'Values of Meter 2' + '</th>'
                            + '<tr>'

                            + '<td>' + 'Structure Code' + '</td>'
                            + '<td>' + (prop["STRUCTURE_CODE"] ?? "---") + '</td>'
                            + '<td>' + (prop["STRUCTURE_CODE"] ?? "---")+ '</td>'
                            + '<td>' + 'Avg Voltage V(rn)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'

                            + '<tr>'
                            + '<td>' + 'Meter Id' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Avg Voltage V(bn)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Real Time Clock' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Avg Voltage V(yn)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kVah Import' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Avg Current I(b)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kvarh Lead import' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Avg Current I(r)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kvarh Lag import' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + 'Avg Current I(y)' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kWh Import' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '<td>' + '---' + '</td>'
                            + '</tr>'

                            + '</table>'
                            
                            + '</div>';

                        overlay.setPosition(e.coordinate)




                    }
                    else if (vector_Data.length <= 1) {
                        // overlay.setPosition(undefined)
                        content.innerHTML =
                            // instanious data for api
                            '<div id="special">'
                            + '<h4>' + 'Instantaneous Values Data' + '</h4>'
                            + '<table>'
                            + '<tr id=tablecontent>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter ' + '</th>'

                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter ' + '</th>'

                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter ' + '</th>'

                            + '<tr>'

                            + '<td>' + 'RTC' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Signed 3 Φ PF' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Billing Date ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'

                            + '<td>' + 'Current R Φ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Frequency' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Cumulative Energy kWh Import' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Current Y Φ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Apparent Power kVA' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Cumulative Energy kVArh Lag I Import' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Current B Φ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Signed Active Power kW' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Cumulative Energy kVArh Lead IV Export' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L1 Voltage V(rn)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Signed Reactive Power kVAr' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Cumulative Energy kVAh Import' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L2 Voltage V(yn)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Number of Power Failures' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'MD kW Import ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L3 Voltage V(bn)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Cumulative Power Failure Duration  ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'MD kWIport Time Stamp ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L1 Signed PF R Φ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Cumulative Tamper Count' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'MD kVA Import ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L2 Signed PF Y Φ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Cumulative Billing Count ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'MD kVA Import Time Stamp ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'L3 Signed PF B Φ' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Cumulative Programming Count' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'

                            + '</table>'

                            //block data from api call

                            + '<h4>' + 'Block Load Profile Data' + '</h4>'
                            + '<table>'
                            + '<tr id=tablecontent>'
                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter ' + '</th>'

                            + '<th>' + 'Parameter' + '</th>'
                            + '<th>' + 'Values of Meter ' + '</th>'

                            + '<tr>'

                            + '<td>' + 'Structure Code' + '</td>'
                            + '<td>' + prop["STRUCTURE_CODE"] + '</td>'

                            + '<td>' + 'Avg Voltage V(rn)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'

                            + '<tr>'
                            + '<td>' + 'Meter Id' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Avg Voltage V(bn)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Real Time Clock' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Avg Voltage V(yn)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kVah Import' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Avg Current I(b)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kvarh Lead import' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Avg Current I(r)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kvarh Lag import' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '<td>' + 'Avg Current I(y)' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'
                            + '<tr>'
                            + '<td>' + 'Block Energy kWh Import' + '</td>'
                            + '<td>' + '---' + '</td>'

                            + '</tr>'

                            + '</table>'
                            + '</div>'
                            + '</div>';

                        overlay.setPosition(e.coordinate)

                    }


                }

            }

            xhr.send()

        }

        )
    }

}
map.on('click', getinfo)

// popup getinfo end 


