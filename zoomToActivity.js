import { highlightSideInfo } from "./highlightSideInfo.js";
import { showDetails } from "./showDetails.js";

function zoomToActivity(polylinePath, map, activity){
    const bounds = polylinePath.getBounds()
    map.fitBounds(bounds, {padding: [200,200]});
    showDetails(activity)
    highlightSideInfo(activity)
}

export { zoomToActivity }