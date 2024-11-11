import { createApp } from 'vue'
import App from './App.vue'
// import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css";
import Geometries from "vue3-openlayers";
  

createApp(App)
    //.use(OpenLayersMap)
    .use(Geometries)
    .mount("#app");
