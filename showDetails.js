import { generatePopup } from "./addActivities.js";
import { getActivity  } from "./getActivities.js";
import { getPhotos } from "./getActivities.js";

async function showDetails(activity){
    
    const detailEle = document.querySelector("#detail-view")
    detailEle.style.display = "block"
    detailEle.innerHTML = ""

    createCloseButton(detailEle)

    const statsDiv = Object.assign(document.createElement("div"), {
        className: "stats",
        innerHTML:generatePopup(activity)
      });

    detailEle.append(statsDiv)
    
    const fullActivity = await getActivity(activity["id"])
    console.log(fullActivity)


    

    if (fullActivity.photos.count > 0){
        const photos = await getPhotos(activity["id"]);
            photos.forEach((photo) => {
                console.log(photo)
                const picture = photo.urls["5000"]
                const img =  Object.assign(document.createElement("img"), {
                src: picture,
                width: 400,
                height: 400
              });
            detailEle.append(img)})
        }  
        
    }






function createCloseButton(parentEle){
    const closeButton = document.createElement("span");

    // Set the text and class for styling
    closeButton.textContent = "X";
    closeButton.className = "close-button";

    // Set the onclick event to hide the parent element
    closeButton.onclick = function() {
        parentEle.style.display = "none";
    };

    parentEle.append(closeButton);

}

export { showDetails }

