import { layerArr } from "./addActivities.js";

export const highlightSideInfo = function(activity){
    const clickedLayer = layerArr.find(layer => layer.options["ID"] === activity.id)
    const clickedLayerID = clickedLayer.options.ID
    const sideInfoID = `activity-${clickedLayerID}`

    
    const sideInfoEle = document.querySelector(`#${sideInfoID}`)

    const parent = sideInfoEle.parentElement
    const parentChildren = [...parent.children]
    
    parentChildren.forEach(child => child.style.border = "none")

    sideInfoEle.style.border = "thick solid #0000FF"
}