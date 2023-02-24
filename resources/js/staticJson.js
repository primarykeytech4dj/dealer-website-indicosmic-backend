
import  React, {useState} from 'react';
import axios from 'axios';

const STATIC_JSON_PATH = process.env.MIX_STATIC_JSON_PATH;

export default class Staticjson extends React.Component {
  constructor(props) {
    super(props);
  }

  getStaticJsonPath(){
    //console.log("Static Json Path="+STATIC_JSON_PATH)
    return STATIC_JSON_PATH;
  }
   
  callAxiosJsonFile(endPoint){
    //console.log(endPoint)
    return new Promise((resolve, reject) => {
      //alert("hiii");
      //alert(this.getStaticJsonPath());
      Promise.all([this.getStaticJsonPath()])
        .then(data => {
          //alert(data[0]+" "+endPoint)
          if (data[0] && data[0] != null) {
            var config = {
              method: 'get',
              url: 'https://dealer-website.primarykeytech.in/dynamic/api/public/config-json/Home.json',
              headers: { 
                'Authorization': 'Bearer '+localStorage.getItem('_token')
            },
            };
            
            axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });

          } else {
            resolve({success: false, data: 'Some Error occured!'});
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err);
        });
    });
  }

 
}