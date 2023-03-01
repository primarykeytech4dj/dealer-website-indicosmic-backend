import React from "react";
import Api from "../../../../api";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Button  from '@mui/material/Button';
import MaterialSelect from "../../../../Tags/MaterialSelect"
import MaterialButton from "../../../../Tags/MaterialButton";
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import DatePickers from '../../../../Tags/DatePicker'



export class VehicleCreation extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      
        // new_used:"",
        // history:{},
        // fields:{

        //     Specification:{

        //         "Engine & Transmission":{
        //          "Engine":"",
        //          "Engine Type":"",
        //          "Fuel Type":"",
        //          "Max Power (bhp@rpm)":""
     
        //         },
        //         "Dimensions & Weight":{
        //          "Length":"",
        //          "Width":"",
        //          "Height":"",
        //          "Wheelbase":""
                 
        //         },
        //         "Capacity":{
        //          "Doors":"",
        //          "Seating Capacity":"",
        //          "No of Seating Rows":"",
        //          "Fuel Tank Capacity":""
     
        //         },
        //         "Suspensions, Brakes & Steering":{
        //          "Suspension Front":"",
        //          "Suspension Rear":"",
        //          "Front Brake Type":"",
        //          "Rear Brake Type":""
     
     
        //         },
     
               
     
        //      },
        //      Features:{
        //          "Safety":{
        //              "No Airbags":"",
        //              "No Middle":"",
        //              "No Airbags":"",
        //              "No Middle":"",
     
        //          },
        //          "Braking & Traction":{
        //              "No Electronic Brake-force Distribution (EBD)":"",
        //              "No Four-Wheel-Drive":"",
        //              "No Electronic Brake-force Distribution (EBD)":"",
        //              "No Four-Wheel-Drive":"",
     
        //          },
        //          "Locks & Security":{
        //              "Engine immobilizer":"",
        //              "No Speed Sensing Door Lock":"",
        //              "Engine immobilizer":"",
        //              "No Speed Sensing Door Lock":"",
        //          },
        //          "Comfort & Convenience":{
        //             " No Rear AC":"",
        //             "Steering Adjustment":"",
        //             " No Rear AC":"",
        //             "Steering Adjustment":"",
        //          },
        //          "Telematics":{
        //              "Find My Car":"",
        //              "Geo-Fence":"",
        //              "Find My Car":"",
        //              "Geo-Fence":"",
        //          },
        //          "Seats & Upholstery":{
        //              "No Leather-wrapped Steering Wheel":"",
        //              "No Front Passenger Seat Adjustment":"",
        //              "No Leather-wrapped Steering Wheel":"",
        //              "No Front Passenger Seat Adjustment":"",
        //          }
        //      }

        // }
      
        
      }
      this.apiCtrl = new Api;
    
     
    }

    componentDidMount(){
        this.setState(this.props.data)
    }

    render(){
        
       

        console.log("state=>",this.state)
        console.log("vehiclecreationprops=>",this.props)
        return(<>

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                    {/* <Divider sx={{ borderColor: '#dac4c4'}} /> */}

                {Object.entries(this.state).map(([key,value])=>{

                    

                    return(<>

                    <div className="row mb-3 ml-1">
                    <label><b>{key}</b></label>
                    </div>
                    <div className="row">

                        {Object.entries(value).map(([key1,val1])=>{
                           
                            return(<>

                                

                               
                                    <div className="col-md-4 mb-3">
                                        <MaterialTextField label={key1} name={key1}  fullWidth onChange={(e)=>this.setState(old=>({...old,history:{...old.history,km_driven : e.target.value}}))}/>

                                    </div>
                                


                            </>)
                    

                        })}
                    </div>
                         

                       


                    </>)
                })}

               <Divider sx={{ borderColor: '#dac4c4', marginBottom:"2%"}} />


                <div className='row'>
                    <div className="col-md-12 d-flex justify-content-end">
                        <Button style={{ backgroundColor: '#183883'}} >Next</Button>
                    </div>
                </div>
    

                
              
               
                   
                                

            
            </Box>

              
        </>)
    }
}