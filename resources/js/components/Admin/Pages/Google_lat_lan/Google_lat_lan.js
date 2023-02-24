import React, { useState } from "react";

import Geocode from "react-geocode";

import AddUsers from "../Users/AddUsers";
const Googlemap = (props) =>{
console.log("props==>",props)

  
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyDlOIZMAxvmuidV7IHT8daDSpm2visn_OI");

  
    
// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");


Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();



// const handlechange =(data)=>{
 return   Geocode.fromAddress(props).then(
        (response) => {

        //  console.log("res==>",response)
         const { lat, lng } = response.results[0].geometry.location;
       //   console.log("lat lan==>",lat, lng);
        // //  setState({lat:lat,lng:lng})
      // return{
      //   lat:lat,lng:lng
      // } ;

  return response.results[0].geometry.location;
 
//return(const { lat, lng } = response.results[0].geometry.location;)
          // props.func({lat:lat,lng:lng,res:response.status})
        },
        (error) => {
          console.error(error);
        }
      );
// }

  //  handlechange(props.data)
 //  console.log("props====>",props)
    
}

export default Googlemap;