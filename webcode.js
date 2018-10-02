// JavaScript source code
var isashape = false;
var isaheatmap = true;
window.onload = function ()
{
    document.getElementById("barrie").addEventListener("click", function () { viewtest.setZoom(12); viewtest.setCenter(ol.proj.fromLonLat([-79.6903, 44.3984])) });
    document.getElementById("toronto").addEventListener("click", function () { viewtest.setZoom(12); viewtest.setCenter(ol.proj.fromLonLat([-79.3832, 43.6532])) });
    document.getElementById("add_shape").addEventListener("click", function () {
        if (!(isashape)) {
            source.addFeature(shapetoadd);
            isashape = true;
        }
        else {
            source.removeFeature(shapetoadd);
            isashape = false;
        }
    });
    document.getElementById("heatmapper").addEventListener("click", function () {
        var i;
        if (!(isaheatmap)) {
            for (i = 0; i < 250; i++) {
                source2.addFeature(features2[i]);
            }
            isaheatmap = true;
        }
        else {
            for (i = 0; i < 250; i++) {
                source2.removeFeature(features2[i]);
            }
            isaheatmap = false;
        }
    });

    //******************************************V For the popup V**************************************//
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    //Creates a new layer for the popup to appear on
    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    //Close popup event
    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    //*****************************************^ For the popup ^****************************************************//

    //**********************************V HeatMap V*****************************************//
    var features2 = Array(250);
    var i;
    var e = 10000000;
    for (i = 0; i < 250; i++) {
        var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
        features2[i] = new ol.Feature(new ol.geom.Point(coordinates));
        features2[i].set('weight', 0.9);
    }

    var source2 = new ol.source.Vector({
        features: features2
    });
    var heatmaplayer = new ol.layer.Heatmap({
        source: source2,
        raidus: 15,
        blur: 20,
        visible: isaheatmap
    });

    //***********************************^ HeatMap ^****************************************//

    var stroke = new ol.style.Stroke({ color: 'black', width: 2 });
    var fill = new ol.style.Fill({ color: 'red' });

    //viewtest variable allows dynamic changes
    var viewtest = new ol.View({
        center: ol.proj.fromLonLat([-79.6903, 44.3984]),
        zoom: 12
    });

    var styles = {
        'square': new ol.style.Style({
            image: new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: 6,
                angle: Math.PI / 4
            })
        })
    };

    var stylekey = ['square'];

    var coord2 = ol.proj.fromLonLat([-79.3832, 43.6532]); //Toronto coord
    var point2 = new ol.geom.Point(coord2);

    var coord1 = ol.proj.fromLonLat([-79.686054, 44.391123]); //Barrie coord
    var point1 = new ol.geom.Point(coord1);
    var feature = Array(1);

    //Creates and styles the features below
    feature[0] = new ol.Feature(point1);
    feature[0].setStyle(styles[stylekey[0]]);
    var shapetoadd = new ol.Feature(point2);
    shapetoadd.setStyle(styles[stylekey[0]]);

    feature[0].setId("Barrie"); //Barrie feature name (set geometry name changes something else, will research further)
    shapetoadd.setId("Toronto");  //Toronto feature name

    var source = new ol.source.Vector({
        features: feature
    });

    var vectorLayer = new ol.layer.Vector({
        source: source
    });

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }), vectorLayer, heatmaplayer
        ],
        overlays: [overlay],
        view: viewtest
    });

    //Popup event handler
    map.on('singleclick', function (evt) {
        var coordinate = evt.coordinate; //Sets click coordinate to variable
        var closestFeature = source.getClosestFeatureToCoordinate(coordinate); //Finds closest feature in source layer to click
        var newcoordinate = closestFeature.getGeometry().getCoordinates(); //Sets coordinate of closest feature

        content.innerHTML = '<p>Closest city:</p><code>' + closestFeature.getId() +
            '</code>';
        overlay.setPosition(newcoordinate); //Sets popup to appear at the closest feature
    });
}
