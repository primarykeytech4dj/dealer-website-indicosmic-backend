import React from "react";
import Api from "../../../../api";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialSelect from "../../../../Tags/MaterialSelect"
import MaterialButton from "../../../../Tags/MaterialButton";
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import DatePickers from '../../../../Tags/DatePicker'



export class VehicleCreation extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      
        new_used:"",
        history:{},
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

    render(){
        const fuletype={
            "petrol":"Petrol",
            "cng":"CNG",
            "desiel":"Desiel",
            "desiel+cng": "Desiel+CNG"
        }
        const new_used={
            "new":"New",
            "used":"Used"
        }
        const Transmission={
            "automatic":"Automatic" ,
            "manual":"Manual"	
        }
        const handleDatePicker = (value, name) => {
            
            this.setState(old => ({...old , history:{...old.history, [name]: value}}))
            
        }


        //console.log("state=>",this.state)
        console.log("props=>",this.props)
        return(<>

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row mb-3 ml-1">
                    <label><b>{"Vehicle Creation"}</b></label>
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="row">
                    <div className="col-md-4 mb-2">
                    <MaterialSelect name="vehicle_type" label="Vehicle Type" data={""} fullWidth onChange={(e)=>this.setState({vehicle_type : e.target.value})}/>

                    </div>
                    <div className="col-md-4 mb-2">
                    <MaterialSelect label="Vehicle Model" data={""} fullWidth/>

                    </div>
                    <div className="col-md-4 mb-2">
                    <MaterialSelect name="transmission" label="Transmission" data={Transmission} fullWidth onChange={(e)=>this.setState({transmission : e.target.value})}/>

                    </div>
                    <div className="col-md-4 mb-2">
                    <MaterialSelect label="Fule Type" name="fule_type" data={fuletype} onChange={(e)=>this.setState({fule_type : e.target.value})} fullWidth/>

                    </div>
                    <div className="col-md-4 mb-2">
                    <MaterialSelect name="new_used" label="New/Used" value={this.state.new_used} data={new_used} fullWidth onChange={(e)=>this.setState({new_used : e.target.value})}/>

                    </div>

                </div>
                {this.state.new_used=="used"?
                    <>
                      <Divider sx={{ borderColor: '#dac4c4'}} />

                        <div className="row mt-3 mb-3 ml-1">
                            <label><b>{"History"}</b></label>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <MaterialTextField label="Km Driven" name="km_driven" placeholder="Km Driven" fullWidth onChange={(e)=>this.setState(old=>({...old,history:{...old.history,km_driven : e.target.value}}))}/>

                            </div>
                            <div className="col-md-4 mb-3">
                                <MaterialTextField label="Last Serviced On" name="last_serviced" placeholder="Last Serviced On" fullWidth onChange={(e)=>this.setState(old=>({...old,history:{...old.history,last_serviced : e.target.value}}))}/>

                            </div>

                            <div className="col-md-4 mb-3">
                                <MaterialTextField type={"number"} name="registration_no" label="Registration No" placeholder="Registration No" fullWidth onChange={(e)=>this.setState(old=>({...old,history:{...old.history,registration_no : e.target.value}}))}/>

                            </div>

                            <div className="col-md-4 mb-3">
                                <MaterialTextField name="registered_in"  label="Registered In" placeholder="Registered In" fullWidth onChange={(e)=>this.setState(old=>({...old,history:{...old.history,registered_in : e.target.value}}))}/>

                            </div>

                            <div className="col-md-4 mb-3">
                                <MaterialTextField label="Owner" name="owner" placeholder="Owner" fullWidth onChange={(e)=>this.setState(old=>({...old,history:{...old.history,owner : e.target.value}}))}/>

                            </div>

                            <div className="col-md-4 mb-3">
                                <DatePickers name="insurance_validity"  
                                defaultValue={this.state.history.insurance_validity ? this.state.history.insurance_validity: ''}   
                                value={this.state.history.insurance_validity ? this.state.history.insurance_validity: ''} 
                                onChange={(e)=>handleDatePicker(e, "insurance_validity")}  
                            
                                label="Insurance Validity" fullWidth/>

                            </div>

                        </div>
                      
                    </>:""
                }

                {/* <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="row mt-3 mb-3 ml-1">
                    <label><b>{"Specification"}</b></label>
                </div>
                <div className="row">

                    {Object.entries(this.state.Specification).map(([key,value])=>{

                        return(<>

                               <div className="col-md-4 mb-3">
                                <MaterialTextField label={key} value={value} onChange={(e)=>{this.setState(old=>({...old,Specification:{...old.Specification,[e.target.name]:e.target.value}}))}} fullWidth/>

                               </div>
                        </>)

                    })}

                </div> */}
                   
                                

            
            </Box>

              
        </>)
    }
}