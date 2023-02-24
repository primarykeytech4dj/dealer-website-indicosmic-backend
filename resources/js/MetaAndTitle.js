import React from 'react'
import { useEffect } from "react";
import { BrowserRouter as Router , Routes, Route , useLocation} from 'react-router-dom'

export default function MetaAndTitle() {
    const pathname = window.location.pathname;

    // useEffect(() => {
    //   if (action !== "POP") {
    //     window.scrollTo(0, 0);
    //   }
    // }, [action]);
    

  
    useEffect(() => {
      let title = "";
      let metaDescription = "";
      //TODO: Update meta titles and descriptions below
      switch (pathname) {
        case "/":
          title = "Dashboard";
          metaDescription = "Dashboard";
          break;
        case "/dealer/add-claim":
          title = "Add Claim";
          metaDescription = "Add claim";
          break;
        case "/dealer/update-claim-form":
          title = "Update Claim Form";
          metaDescription = "Update Claim Form";
          break;
        case "/assessor/claim-assessment":
          title = "Claim Assessment";
          metaDescription = "Claim Assessment";
          break;
        case "/dealer/claim-details":
          title = "Claim Details";
          metaDescription = "Claim Details";
          break;
        default:
          title= "Claim Insurance";
          metaDescription= "Claim Insurance";
         
        
       
      }
      
  
      if (title) {
        document.title = title;
      }
  
      if (metaDescription) {
        const metaDescriptionTag = document.querySelector(
          'head > meta[name="description"]'
        );
        if (metaDescriptionTag) {
          metaDescriptionTag.content = metaDescription;
        }
      }
    }, [pathname]);
  return (
    <></>
  )
}
