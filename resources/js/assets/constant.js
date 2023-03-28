import React from "react";

let host = window.location.host;
let protocol = window.location.protocol;
let parts = host.split(".");
var subdomain = "shubhauto";
var domain = '2wh'
// If we get more than 3 parts, then we have a subdomain
// INFO: This could be 4, if you have a co.uk TLD or something like that.
if (parts.length >= 3) {
  if( parts[0] === 'www'){
    subdomain = parts[1];
    domain = parts[2];
  } else {
    subdomain = parts[0];
    domain = parts[1];
  }

  // subdomain = 'dealer-website';
  // Remove the subdomain from the parts list
  // parts.splice(0, 1);
  // Set the location to the new url
  // window.location = protocol + "//" + parts.join(".") + "/" + subdomain;
} 

// BASE_URL: `http://127.0.0.1:8003/api`, //'https://primarykeytech.in/glocal/api',
export const API_CONSTANTS = {
  BASE_URL: `https://${subdomain}.${domain}.in/dynamic/api/api`, //'https://primarykeytech.in/glocal/api',
  URL: `https://${subdomain}.${domain}.in/dynamic/api`,
    login: "/login", //used
    refresh: "/refresh",
    setupList: "/setup/list",



    subdomain: `${subdomain}`,
}