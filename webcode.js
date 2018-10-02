// JavaScript source code
var isashape = false;
window.onload = function ()
{
    document.getElementById("barrie").addEventListener("click", function () { viewtest.setZoom(12); viewtest.setCenter(ol.proj.fromLonLat([-79.6903, 44.3984])) });
    document.getElementById("toronto").addEventListener("click", function () { viewtest.setZoom(12); viewtest.setCenter(ol.proj.fromLonLat([-79.3832, 43.6532])) });
    document.getElementById("add_shape").addEventListener("click", function () {
        if (!(isashape))
        {
            feature[1] = new ol.Feature(point2);
            feature[1].setStyle(styles[stylekey[0]]);
            source.addFeature(feature[1]);
            isashape = true;
        }
    });


    var stroke = new ol.style.Stroke({ color: 'black', width: 2 });
    var fill = new ol.style.Fill({ color: 'red' });
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

    var coord2 = ol.proj.fromLonLat([-79.3832, 43.6532]);
    var point2 = new ol.geom.Point(coord2);

    var coord1 = ol.proj.fromLonLat([-79.686054, 44.391123]);
    var point1 = new ol.geom.Point(coord1);
    var feature = Array(2);
    feature[0] = new ol.Feature(point1);
    feature[0].setStyle(styles[stylekey[0]]);
    feature[1] = new ol.Feature();

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
            }), vectorLayer
        ],
        view: viewtest
    });
}