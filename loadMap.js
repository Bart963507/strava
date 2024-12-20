//Define the map and the view of the map

const map = L.map("map").setView([51.505, -0.09], 13);

map.on("click", (e) => removeHighlights(e));

const removeHighlights = function (e) {
  const clickedElement = e.originalEvent.target;
  if (clickedElement.id !== "map") {
    return;
  }
  const detailEle = document.querySelector("#detail-view");
  detailEle.style.display = "none";
  borderLayer.clearLayers();
};

//Add the tilelayer of openstreetmap to the map

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "false",
}).addTo(map);

const activityLayer = L.layerGroup().addTo(map);
const borderLayer = L.layerGroup().addTo(map);

export { map };
export { activityLayer };
export { borderLayer };
