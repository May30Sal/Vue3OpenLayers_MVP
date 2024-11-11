<!-- Create the template or what will show on the screen -->
<template>
  <div id="app">
    <div class="cell cell-map">
      <!-- Use the declared component -->
      <MapContainer></MapContainer>
      <button id="zoomtolayer">Zoom to Layer</button> 
    </div>
  </div>
</template>

<!-- Export the component, telling Vue what it is -->
<script>

//Import the components that will show
import MapContainer from './components/MapContainer.vue';

//Declare the imported components
export default {
  name: 'App',
  components: {
    MapContainer,
  },
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  display: grid;
  grid-template-columns: 100vh;
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

.cell-edit {
  grid-column: 2;
  grid-row: 1;
}
</style>
