import { generatePopup } from "./addActivities.js";
import { getActivity  } from "./getActivities.js";
import { getPhotos } from "./getActivities.js";

async function showDetails(activity){
    
    const detailEle = document.querySelector("#detail-view")
    const flexContainer = document.querySelector(".flex-container")
    const statsDiv = document.querySelector(".stats")
    detailEle.style.display = "block"
    flexContainer.innerHTML = ""
    statsDiv.innerHTML = ""


    
    statsDiv.innerHTML = generatePopup(activity)
  

    detailEle.append(statsDiv)
    
    const fullActivity = await getActivity(activity["id"])
    console.log(fullActivity)


    

    if (fullActivity.photos.count > 0){
        const photos = await getPhotos(activity["id"]);
            photos.forEach((photo) => {
                console.log(photo)
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
        
    }

export { showDetails }

