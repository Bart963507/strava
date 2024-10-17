import { getActivities } from "./getActivities.js";
import { map }  from "./loadMap.js";

const sideBar = document.getElementById("sidebar")
const sideBarWidth = document.getElementById("sidebar").getBoundingClientRect().width


const mapHeight = document.getElementById("map").getBoundingClientRect().height

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

    /*   
    const mapDiv = document.createElement("div")   
    mapDiv.setAttribute("id", `map-${activity["id"]}`)
    mapDiv.style.width = "100%";  // Set width to 100% of the sidebar or a specific pixel value
    mapDiv.style.height = "200px"; // Set a fixed height for visibility
    console.log(mapDiv)
    sideBar.append(mapDiv) 
    const miniMap = L.map(`map-${activity["id"]}`).setView([51.505, -0.09], 13);
    miniMap.fitBounds(coordinates)
    L.polyline(coordinates, {color: setColor(activity.sport_type)}).addTo(miniMap);
    */

 



    const sideMapDiv = document.createElement("li")
    const sideMapID = `map-${activity["id"]}`
    sideMapDiv.setAttribute("id", sideMapID)
    sideMapDiv.setAttribute("class", "sideMapDiv")
    const title = document.createElement("p")
    title.innerText = activity["start_date_local"]

    
 
    
    const svgWidth = sideBarWidth*0.8;
    const svgHeight = mapHeight*0.1
    
    // Get the min and max values for latitude and longitude
    const minLat = Math.min(...coordinates.map(c => c[0]));
    const maxLat = Math.max(...coordinates.map(c => c[0]));
    const minLng = Math.min(...coordinates.map(c => c[1]));
    const maxLng = Math.max(...coordinates.map(c => c[1]));
    
    // Define scaling factors to map the coordinates into the SVG space
    const scaleLat = svgHeight / (maxLat - minLat);
    const scaleLng = svgWidth / (maxLng - minLng);
    
    // Convert lat/lng coordinates into SVG points
    const svgPoints = coordinates.map(coord => {
        const x = (coord[1] - minLng) * scaleLng; // Longitude to x-axis
        const y = svgHeight - (coord[0] - minLat) * scaleLat; // Latitude to y-axis, invert for SVG
        return `${x},${y}`; // Format as x,y pair
    }).join(' ');

    // Create the SVG polyline element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%"); // Set width with px
    svg.setAttribute("height", "20vh"); // Set height with px
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg"); // Corrected the typo
    svg.setAttribute("viewBox", "0 0 250 150")
    svg.setAttribute("preserveAspectRatio","xMidYMid")
    const svgPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    svgPolyline.setAttribute('points', svgPoints);
    svgPolyline.setAttribute('fill', 'none');
    svgPolyline.setAttribute('stroke', 'blue');
    svgPolyline.setAttribute('stroke-width', '2');

    // Append polyline to SVG
    svg.appendChild(svgPolyline);

    sideMapDiv.append(svg)

    // Append the SVG to the sidebar
    sideBar.append(sideMapDiv);
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


