import { getActivities } from "./getActivities.js";
import { map } from "./loadMap.js";
import { zoomToActivity } from "./zoomToActivity.js";

/// This module needs to be cleaned up into functions

/// Declare the first variables
const sideBar = document.getElementById("sidebar");
const sideBarWidth = sideBar.getBoundingClientRect().width;
const mapHeight = document.getElementById("map").getBoundingClientRect().height;
const activities = await getActivities();
const svgWidth = sideBarWidth * 0.8;
const svgHeight = mapHeight * 0.1;

/// For each activity add it to the map and create an overview and the left.
activities.forEach((activity) => {
  const encodedPolyline = activity.map.summary_polyline;
  const coordinates = polyline.decode(encodedPolyline);
  const polylinePath = L.polyline(coordinates, {
    color: setColor(activity.sport_type),
  }).addTo(map);

  // Add a pop-up to the activity
  polylinePath.bindPopup(generatePopup(activity));

  const sideMapDiv = createSideMapDiv(activity);

  // Get the min and max values for latitude and longitude
  const minLat = Math.min(...coordinates.map((c) => c[0]));
  const maxLat = Math.max(...coordinates.map((c) => c[0]));
  const minLng = Math.min(...coordinates.map((c) => c[1]));
  const maxLng = Math.max(...coordinates.map((c) => c[1]));

  // Define scaling factors to map the coordinates into the SVG space
  const scaleLat = svgHeight / (maxLat - minLat);
  const scaleLng = svgWidth / (maxLng - minLng);

  // Convert lat/lng coordinates into SVG points
  const svgPoints = coordinates
    .map((coord) => {
      const x = (coord[1] - minLng) * scaleLng; // Longitude to x-axis
      const y = svgHeight - (coord[0] - minLat) * scaleLat; // Latitude to y-axis, invert for SVG
      return `${x},${y}`; // Format as x,y pair
    })
    .join(" ");

  // Create the SVG polyline element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "20vh");
  const svgPolyline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline"
  );
  svgPolyline.setAttribute("transform", "translate(10, 30)");
  svgPolyline.setAttribute("points", svgPoints);
  svgPolyline.setAttribute("fill", "none");
  svgPolyline.setAttribute("stroke", setColor(activity.sport_type));
  svgPolyline.setAttribute("stroke-width", "2");
  svgPolyline.setAttribute("viewBox", "0 0 250 150");
  svgPolyline.setAttribute("preserveAspectRatio", "xMidYMid meet");

  // Append polyline to SVG
  svg.appendChild(svgPolyline);

  // Create title element
  const title = document.createElement("p");
  title.innerText = `${activity.sport_type}: ${activity[
    "start_date_local"
  ].slice(0, 10)}`;

  const titleDiv = Object.assign(document.createElement("div"), {
    className: "title",
  });
  const mapDiv = Object.assign(document.createElement("div"), {
    className: "map",
  });

  sideMapDiv.append(titleDiv);
  sideMapDiv.append(mapDiv);

  titleDiv.append(title);
  mapDiv.append(svg);
  mapDiv.addEventListener("click", () => zoomToActivity(polylinePath, map));

  // Append the SVG to the sidebar
  sideBar.append(sideMapDiv);
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
      return "purple";
    default:
      return "black";
  }
}

function createSideMapDiv(activity) {
  const sideMapDiv = document.createElement("li");
  const sideMapID = `map-${activity["id"]}`;
  sideMapDiv.setAttribute("id", sideMapID);
  sideMapDiv.setAttribute("class", "sideMapDiv");
  return sideMapDiv;
}

function zoomToLastActivity() {
  console.log(activities[activities.length - 1]);
  const encodedPolyline =
    activities[activities.length - 1].map.summary_polyline;
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
