import { generatePopup } from "./addActivities.js";
import { getActivity  } from "./getActivities.js";
import { getPhotos } from "./getActivities.js";
import { highlightObject } from "./highlightObject.js";

async function showDetails(activity){
    
    const detailEle = document.querySelector("#detail-view")
    const flexContainer = document.querySelector(".flex-container")
    const statsDiv = document.querySelector(".stats")
    

    //Clear the information of previous activity
    flexContainer.innerHTML = ""
    statsDiv.innerHTML = ""

    //Show the detail pane
    detailEle.style.display = "flex"
    statsDiv.innerHTML = generatePopup(activity)
    

    detailEle.append(statsDiv)
    
    const fullActivity = await getActivity(activity["id"])

    if (fullActivity.photos.count > 0){
        flexContainer.style.display = "flex"
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
    else{
        flexContainer.style.display = "none"
    }  
     
    highlightObject(activity)
    
}
export { showDetails }

