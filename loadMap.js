
//Define the map and the view of the map


const map = L.map('map').setView([51.505, -0.09], 13);


//Add the tilelayer of openstreetmap to the map

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'false'
}).addTo(map);

const activityLayer =  L.layerGroup().addTo(map);
const borderLayer = L.layerGroup().addTo(map)

export { map }
export { activityLayer }
export { borderLayer }
