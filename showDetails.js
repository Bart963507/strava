import { generatePopup } from "./addActivities.js";
import { getActivity  } from "./getActivities.js";
import { getPhotos } from "./getActivities.js";
import { layerArr } from "./addActivities.js";
import { borderLayer } from "./loadMap.js";


async function showDetails(activity){
    
    const detailEle = document.querySelector("#detail-view")
    const flexContainer = document.querySelector(".flex-container")
    const statsDiv = document.querySelector(".stats")
    detailEle.style.display = "flex"
    flexContainer.innerHTML = ""
    statsDiv.innerHTML = ""

    statsDiv.innerHTML = generatePopup(activity)
  

    detailEle.append(statsDiv)
    
    const fullActivity = await getActivity(activity["id"])

    if (fullActivity.photos.count > 0){
        const photos = await getPhotos(activity["id"]);
            photos.forEach((photo) => {
                const picture = photo.urls["5000"]
                const imgElement = document.createElement("div")
                imgElement.innerHTML
                 = `
                <div class="gallery">
                    <img src= ${picture}>
                </div>
                `
            flexContainer.append(imgElement)})
        }  
     
    console.log(layerArr[0].options["ID"], activity.id)
    const clickedLayer = layerArr.find(layer => layer.options["ID"] === activity.id)
    
    borderLayer.clearLayers()
    const highlightLayer = L.geoJSON(clickedLayer.toGeoJSON(), {
        style: {
            weight: 7,
            opacity: 1,
            color: "black",
        },
    }).addTo(borderLayer);

    
    const border = L.geoJSON(clickedLayer.toGeoJSON(), {
        style: {
            weight:5,
            opacity:1,
            color:"#39ff14"},
    }).addTo(borderLayer);
    
}
export { showDetails }

