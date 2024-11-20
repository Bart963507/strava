import { layerArr } from "./addActivities.js";

export const highlightSideInfo = function(activity){
    const clickedLayer = layerArr.find(layer => layer.options["ID"] === activity.id)
    const clickedLayerID = clickedLayer.options.ID
    const sideInfoID = `activity-${clickedLayerID}`

    console.log(sideInfoID)
    
    const sideInfoEle = document.querySelector(`#${sideInfoID}`)
    sideInfoEle.style.border = "thick solid #0000FF"
}