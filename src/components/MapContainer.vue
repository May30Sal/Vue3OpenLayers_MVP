<template>
  <div ref="map-root" style="width: 100%; height: 100%"></div>
</template>

<script>
import GeoJSON from 'ol/format/GeoJSON.js';
//import Polygon from 'ol/geom/MultiPolygon.js';
import { Map, View } from 'ol/index.js'; //Feature
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { useGeographic } from 'ol/proj.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import {defaults as defaultControls, ZoomToExtent} from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
//import { Point } from 'ol/geom.js';
//import * as olCoordinate from 'ol/coordinate';
import "ol/ol.css";
//import { Point } from 'ol/geom';


useGeographic();

let data = [[-114.1177, 51.1176],  
            [-114.1054, 51.1164], 
            [-114.1051, 51.1105], 
            [-114.1181, 51.1106], 
            [-114.1258, 51.1106], 
            [-114.1177, 51.1176]]



export default {
  name: "MapContainer",
  components: {},
  props: {
    geojson: Object,
  },
  mounted() {

  // function DrawPolygon() {
  //   alert("I work")
  // }


  const geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857',
    },
  },
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [data],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [-114.06, 51.04],
      }
    } 
  ]};

    let vectorPolygon = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject)
    })

    let vectorLayer = new VectorLayer({
      source: vectorPolygon,
      style: {
        'stroke-color': 'blue', 'stroke-width': 3, 'fill-color': 'rgba(0, 0, 255, 0.1)',
      },
    //   geometry: function (feature) {
    //   const coordinates = feature.getGeometry().getCoordinates()[0];
    //   return new Polygon(coordinates)
    // }
    })

    let vectorPoint = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject)
    })

    let vectorLayer2 = new VectorLayer({
      source: vectorPoint,
      style: {
        'circle-radius': 6,
        'circle-fill-color': 'blue',
      }
    })

    const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:3857',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    // className: 'custom-mouse-position',
    // target: document.getElementById('mouse-position'),
  });

    let view = new View({
      projection: 'EPSG:3857',
      zoom: 8,
      center: [-114.06, 51.04],
    })

    let map = new Map({
      // 
      controls: defaultControls().extend([
        mousePositionControl,
                    new ZoomToExtent({}),
                ]),
      target: this.$refs["map-root"],
      layers: [
        new TileLayer({
          source: new OSM(),
          name: "OpenStreetMap",
        }),
        vectorLayer,
        vectorLayer2
        //vectorPoint
      ],
      view: view,
    });

    const zoomtolayer = document.getElementById('zoomtolayer');
zoomtolayer.addEventListener(
  'click', function () {
    const feature = vectorPolygon.getFeatures()[0];
    const polygon = feature.getGeometry();
    view.fit(polygon, {padding: [170, 50, 30, 150]});
  },
  false,
)
 
    return map
  }, 
};

</script>
