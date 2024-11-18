import { getActivities } from "./getActivities.js";
import { activityLayer, map } from "./loadMap.js";
import { showDetails } from "./showDetails.js";
import { zoomToActivity } from "./zoomToActivity.js";

/// This module needs to be cleaned up into functions

/// Declare the first variables
const sideBar = document.getElementById("sidebar");
const activities = await getActivities();
const layerArr =[]


/// For each activity add it to the map and create information and the left.
activities.forEach((activity) => {
  const encodedPolyline = activity.map.summary_polyline;
  const coordinates = polyline.decode(encodedPolyline);
  const polylinePath = L.polyline(coordinates, {
    color: setColor(activity.sport_type), ID: activity.id
  })
  
  polylinePath.on("click", () => showDetails(activity))
  layerArr.push(polylinePath)
  polylinePath.addTo(activityLayer);


  // Add a pop-up to the activity
  //polylinePath.bindPopup(generatePopup(activity));

  
  //Create top bar element for styling
  const topBarDiv = document.createElement("div")
  topBarDiv.classList.add('top-bar', `top-bar-${activity.sport_type}`);

  //Create img elelemnt
  const logo =  Object.assign(document.createElement("img"), {
    src: setImage(activity.sport_type),
    width: 50,
    height:50
  });

  const logoDiv = Object.assign(document.createElement("div"), {
    className: "logo",
  });


  // Create title element
  const title = document.createElement("p");
  title.innerHTML = generatePopup(activity)
  const titleDiv = Object.assign(document.createElement("div"), {
    className: "title",
  });

  const sideInfoDiv = Object.assign(document.createElement("li"), {
    id: `activity-${activity["id"]}`,
    class: "sideInfoDiv",
  });

  sideInfoDiv.append(topBarDiv);

  sideInfoDiv.append(titleDiv);
  titleDiv.append(title);

  sideInfoDiv.append(logoDiv);
  logoDiv.append(logo);

  //sideInfoDiv.addEventListener("click", () => showDetails(activity));
  sideInfoDiv.addEventListener("click", () => zoomToActivity(polylinePath, map, activity));
  sideBar.append(sideInfoDiv);
});
zoomToLastActivity();

function setColor(activity) {
  switch (activity) {
    case "Hike":
      return "red";
    case "Run":
      return "blue";
    case "Ride":
      return "green";
    case "TrailRun":
      return "purple";
    case "MountainBikeRide":
      return "lightblue";
    default:
      return "black";
  }
}

function zoomToLastActivity() {
  console.log(activities[0]);
  const encodedPolyline =
    activities[0].map.summary_polyline;
  const coordinates = polyline.decode(encodedPolyline);
  map.fitBounds(coordinates);
}

function generatePopup(activity) {
  const popUp = `
    <b>${activity["name"]}</b><br>
    <br>
    <b>Activiteit:</b> ${activity["sport_type"]}<br>
    <b>Datum:</b> ${activity["start_date_local"].slice(0, 10)}<br>
    <b>Afstand:</b> ${Math.round(activity["distance"] / 1000)} KM <br>
    <b>Duur:</b> ${Math.round(activity["moving_time"] / 60)} Minuten <br>
    `;
  return popUp;
}
  
  function setImage(activityType){
    switch (activityType) {
      case "Hike":
        return "pictures/Hike.png";
      case "Run":
        return "pictures/Run.png";
      case "Ride":
        return "pictures/Ride.png";
      case "TrailRun":
        return "pictures/TrailRun.png";
      case "MountainBikeRide":
        return "pictures/MountainBikeRide.png";
      case "Walk":
        return "pictures/Hike.png";
      default:
        return "pictures/Hike.png";
  }
}


export { generatePopup }
export { layerArr }
