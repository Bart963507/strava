import { generatePopup } from "./addActivities.js";
import { getActivity  } from "./getActivities.js";

async function showDetails(activity){
    const detailEle = document.querySelector("#detail-view")
    detailEle.style.display = "block"
    detailEle.innerHTML = generatePopup(activity)

    const fullActivity = await getActivity(activity["id"])
    console.log(fullActivity)


const closeButton = document.createElement("span");

// Set the text and class for styling
closeButton.textContent = "X";
closeButton.className = "close-button";

// Set the onclick event to hide the parent element
closeButton.onclick = function() {
    detailEle.style.display = "none";
};

// Append the close button to the desired parent element

detailEle.appendChild(closeButton);

    if (fullActivity.photos.count > 1){
        const photo = fullActivity.photos.primary.urls["600"]
        const img =  Object.assign(document.createElement("img"), {
                src: photo,
                width: 400,
                height: 400
              });

            detailEle.append(img)

    }

    };

export { showDetails }

