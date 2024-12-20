import { getAuth } from "./getAuth.js";

// Define the Strava API endpoint for fetching activities
const url = "https://www.strava.com/api/v3/athlete/activities";
const params = { per_page: 200, page: 1 };
const queryString = new URLSearchParams(params).toString();
const fullUrl = `${url}?${queryString}`;

// Get the accesstoken with the getAuth function
const getAcccesToken = async function () {
  try {
    const authResponse = await getAuth();
    const accessToken = await authResponse["access_token"];
    return accessToken;
  } catch {
    console.error("Network error:", err);
  }
};

// Get the accesstoken with the getAccesToken function
const getActivities = async function () {
  try {
    const accessToken = await getAcccesToken();
    // Make the GET request using fetch
    const request = await fetch(fullUrl, {
      method: "GET",
      params: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getActivity = async function (activityID) {
  try {
    const accessToken = await getAcccesToken();
    const activityUrl = `https://www.strava.com/api/v3/activities/${activityID}`
    // Make the GET request using fetch
    const request = await fetch(activityUrl, {
      method: "GET",
      params: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getPhotos = async function (activityID) {
  try {
    const accessToken = await getAcccesToken();
    const activityUrl = `https://www.strava.com/api/v3/activities/${activityID}/photos?size=5000`
    // Make the GET request using fetch
    const request = await fetch(activityUrl, {
      method: "GET",
      params: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};





export { getActivity };
export { getActivities };
export { getPhotos };
