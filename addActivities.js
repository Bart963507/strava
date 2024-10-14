import { getActivities } from "./getActivities.js";
import { map}  from "./loadMap.js";

const activities = await getActivities()
const balkanHike = activities.filter(a => a.name.includes("Balkan"))
const irelandHike = activities.filter(a => a.name.includes("Kerry"))


activities.forEach(activity => {
    const encodedPolyline = activity.map.summary_polyline
    const coordinates = polyline.decode(encodedPolyline);
    const polylinePath = L.polyline(coordinates, {color: setColor(activity.sport_type)}).addTo(map);
});

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
            return "yellow"
        default:
            return "black";
    }
}