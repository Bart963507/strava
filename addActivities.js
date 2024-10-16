import { getActivities } from "./getActivities.js";
import { map }  from "./loadMap.js";

const sideBar = document.getElementById("sidebar")
const activities = await getActivities()
const balkanHike = activities.filter(a => a.name.includes("Balkan"))
const irelandHike = activities.filter(a => a.name.includes("Kerry"))

console.log(activities)

activities.forEach(activity => {
    const encodedPolyline = activity.map.summary_polyline
    const coordinates = polyline.decode(encodedPolyline);
    const polylinePath = L.polyline(coordinates, {color: setColor(activity.sport_type)}).addTo(map);
    polylinePath.bindPopup(
        `<b>${activity["name"]}</b><br>
        <br>
        <b>Activiteit:</b> ${activity["sport_type"]}<br>
        <b>Datum:</b> ${activity["start_date_local"].slice(0,10)}<br>
        <b>Afstand:</b> ${Math.round(activity["distance"]/1000)} KM <br>
        <b>Duur:</b> ${Math.round(activity["moving_time"]/60)} Minuten <br>
        `
        )

        
    const mapDiv = document.createElement("div")   
    mapDiv.setAttribute("id", `map-${activity["id"]}`)
    mapDiv.style.width = "100%";  // Set width to 100% of the sidebar or a specific pixel value
    mapDiv.style.height = "200px"; // Set a fixed height for visibility
    console.log(mapDiv)
    sideBar.append(mapDiv) 
    const miniMap = L.map(`map-${activity["id"]}`).setView([51.505, -0.09], 13);
    miniMap.fitBounds(coordinates)
    L.polyline(coordinates, {color: setColor(activity.sport_type)}).addTo(miniMap);
      
    });


const encodedPolyline = activities[activities.length-1].map.summary_polyline
const coordinates = polyline.decode(encodedPolyline);
map.fitBounds(coordinates)


function setColor(activity) {
    switch(activity) {
        case 'Hike':
            return "red";
        case 'Run':
            return "blue";
        case 'Ride':
            return "green";
        case 'TrailRun':
            return "purple"
        case "MountainBikeRide":
            return "purple"
        default:
            return "black";
    }
}


