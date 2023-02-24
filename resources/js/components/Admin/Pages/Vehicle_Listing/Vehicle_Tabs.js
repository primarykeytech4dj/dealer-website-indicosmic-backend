import React from "react";

import Box  from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { Tabs, Tab } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Api from '../../../../api';
import { VehicleCreation } from "./Vehicle_Creation";


export default class VehicleTabs extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        
        value:"1",
        fields:{

            Specification:{

                "Engine & Transmission":{
                 "Engine":"",
                 "Engine Type":"",
                 "Fuel Type":"",
                 "Max Power (bhp@rpm)":""
     
                },
                "Dimensions & Weight":{
                 "Length":"",
                 "Width":"",
                 "Height":"",
                 "Wheelbase":""
                 
                },
                "Capacity":{
                 "Doors":"",
                 "Seating Capacity":"",
                 "No of Seating Rows":"",
                 "Fuel Tank Capacity":""
     
                },
                "Suspensions, Brakes & Steering":{
                 "Suspension Front":"",
                 "Suspension Rear":"",
                 "Front Brake Type":"",
                 "Rear Brake Type":""
     
     
                },
     
               
     
             },
             Features:{
                 "Safety":{
                     "No Airbags":"",
                     "No Middle":"",
                     "No Airbags":"",
                     "No Middle":"",
     
                 },
                 "Braking & Traction":{
                     "No Electronic Brake-force Distribution (EBD)":"",
                     "No Four-Wheel-Drive":"",
                     "No Electronic Brake-force Distribution (EBD)":"",
                     "No Four-Wheel-Drive":"",
     
                 },
                 "Locks & Security":{
                     "Engine immobilizer":"",
                     "No Speed Sensing Door Lock":"",
                     "Engine immobilizer":"",
                     "No Speed Sensing Door Lock":"",
                 },
                 "Comfort & Convenience":{
                    " No Rear AC":"",
                    "Steering Adjustment":"",
                    " No Rear AC":"",
                    "Steering Adjustment":"",
                 },
                 "Telematics":{
                     "Find My Car":"",
                     "Geo-Fence":"",
                     "Find My Car":"",
                     "Geo-Fence":"",
                 },
                 "Seats & Upholstery":{
                     "No Leather-wrapped Steering Wheel":"",
                     "No Front Passenger Seat Adjustment":"",
                     "No Leather-wrapped Steering Wheel":"",
                     "No Front Passenger Seat Adjustment":"",
                 }
             }

        }
        
      }
      this.apiCtrl = new Api;
      
    }
   
    // componentDidUpdate(prevProps,prevState){
    //   alert()
    //   if(prevProps.location.state.params.id !== this.props.location.state.params.id){
    //     console.log('Propps', this.props.params)
    //     this.setState(this.props.location.state.params)
    //   } 
    //   //console.log("props=>",this.props)
    // }
    // componentDidMount(){
    //   alert()
    //   this.setState(this.props.location.state.param)
    // }
  
    
   
    render(){
        //console.log("Location ",this.props.location)
        const handleChange = (event, value) => {
           console.log("value ")
            this.setState(old => ({...old, value: value}));
          };

        return(<>


      <BreadCrumb breadcrumb={this.props.title} breadcrumbItem1={this.props.title+" "+'Update'} />
      <Box sx={{ width: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px" }}>


        <TabContext value={this.state.value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={this.state.value} onChange={handleChange} aria-label="Vehicle"  variant={"scrollable"}
                   scrollButtons={"auto"} >
 
                    <Tab label={<b>For Used Vehicle</b>} value="1" />
                    <Tab label={<b>For Used Vehicle</b>} value="2" />
                    {Object.entries(this.state.fields).map(([key,value])=>{
                       // console.log("key",key,"value",value)
                       var i = 1;
                        return(<>

                                  <Tab label={<b>{key}</b>} value={(++i)} />
                        </>)
                    })}

                 
                    
                </Tabs>

                <TabPanel value={"1"}><VehicleCreation  /></TabPanel> 

                <TabPanel value={"2"}><VehicleCreation  /></TabPanel> 

                {Object.entries(this.state.fields).map(([key,value])=>{
                    var i = 1;
                       // console.log("key",key,"value",value)
                        return(<>

                         <TabPanel value={(++i)}><h1>hello</h1></TabPanel> 
                        </>)
                    })}
              
                
            </Box>
       
        </TabContext>

      </Box>
      
        </>)
    }
}