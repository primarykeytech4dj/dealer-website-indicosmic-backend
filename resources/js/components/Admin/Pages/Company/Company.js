import React from "react";
import Api from "../../../../api";
import Button  from '@mui/material/Button';
import { Box, Divider } from '@mui/material';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Switch from "@mui/material/Switch";
import Editor from "../Editor/Editor";

export  class Company extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        
        
      }
      this.apiCtrl = new Api;
      
    }

    render(){
        return(<>
            <BreadCrumb breadcrumb={"Company"} breadcrumbItem1='Create' />

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="company_name" label="Company Name" fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField type="file" name="logo" label="Logo" fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">               
                        <Switch checked={this.state.is_active=="1"?true:false} onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}   fullWidth />                 
                        { <strong> {"Active"} </strong>         }
                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="first_name" label="First Name" fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="middle_name" label="Middle Name" fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="surname" label="Surname" fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="primary_email" label="Primary Email" fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="Secondary_email" label="Secondary Email" fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField type="number" name="contact_1" label="Conatact 1" fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField type="number" name="contact_2" label="Contact 2" fullWidth/>

                    </div>
                    
                    
                    <div className="col-md-4 mb-3"> 
                        <MaterialTextField fullWidth name="meta_keyword" label="Meta Keyword"/>

                    </div>
                    <div className="col-md-4 mb-3"> 
                        <MaterialTextField fullWidth name="meta_description" label="Meta Description"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="website" label="Website"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="about_company" label="About Company"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth type="file" name="about_company_image" label="About Company Image"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="company_mission" label="Company Mission"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth type="file" name="company_mission_image" label="Company Mission Image"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="company_vision" label="Company Vision"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth type="file" name="company_vision_image" label="Company Vision Image"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="pan_no" label="Pan Card Number"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="gst_no" label="GST Number"/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="adhaar_no" label="Adhaar Card Number"/>

                    </div>
                    <Editor label={"Comapny Address"}/>

                </div>
                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className='row mt-3'>
                
                    <div className="col-md-3">
                        <Button style={{ backgroundColor: '#183883' }} >Submit</Button>
                    </div>
                </div>
            </Box>

              
        </>)
    }

}