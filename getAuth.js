"use strict";

import { settings } from "./config.js";

const body = {
    "client_id": settings["client_id"],
    "client_secret": settings["client_secret"],
    "grant_type": "refresh_token",
    "refresh_token": settings["refresh_token"],
    "f": "json"

}

const getAuth = async function(){
    try{
         // Make the GET request using fetch
        const request = await fetch("https://www.strava.com/oauth/token", {
            method: 'POST',
            body:  JSON.stringify(body),
            headers:{
                "Content-Type": "application/json"
            }
    })
     // Parse the response body
    const response = await request.json();
    return response

} catch (err) {
 console.error('Network error:', err);
 return null
    }
    
}

export {getAuth}