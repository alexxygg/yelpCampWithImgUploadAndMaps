//Our token dynamically filled, in case it is changed, works through
//script on show page where we saved the ejs value to a variable */

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-117.01238489411413, 32.511503684737576], // starting position [lng, lat]
  zoom: 10, // starting zoom
  projection: "globe", // display the map as a 3D globe
});
map.on("style.load", () => {
  map.setFog({}); // Set the default atmosphere style
});
