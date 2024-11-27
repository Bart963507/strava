import { borderLayer } from "./loadMap.js";

export const clearAllHighlights = function () {
  // Clear map highlights
  borderLayer.clearLayers();

  // Close detailelement
  const detailEle = document.querySelector("#detail-view");
  detailEle.style.display = "none";

  // Remove border from sideInfo
  const sideInfoEle = document.querySelector("#sidebar");
  const parentChildren = [...sideInfoEle.children];
  parentChildren.forEach((child) => (child.style.border = "none"));

  // Add event listener
  const closeButton = document.querySelector(".close-button");
  console.log(closeButton);
};
