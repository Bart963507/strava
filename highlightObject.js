import { layerArr } from "./addActivities.js";
import { borderLayer } from "./loadMap.js";


// Function to highlight a polyline
const highlightObject = function(activity){
    
    // Find the layer stored in the layer array
    const clickedLayer = layerArr.find(layer => layer.options["ID"] === activity.id)

    // Clear the layer where the highlights are stored in
    borderLayer.clearLayers()


    //Add the outline to the map
    const highlightLayer = L.geoJSON(clickedLayer.toGeoJSON(), {
        style: {
            weight: 7,
            opacity: 1,
            color: "black",
        },
    }).addTo(borderLayer);

    //Add the inner polyline to the map
    const border = L.geoJSON(clickedLayer.toGeoJSON(), {
        style: {
            weight:5,
            opacity:1,
            color:"#39ff14"},
    }).addTo(borderLayer);
}

export { highlightObject }

