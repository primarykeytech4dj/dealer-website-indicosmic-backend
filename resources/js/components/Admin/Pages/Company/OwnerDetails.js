import React from "react";
import { Box, Divider } from "@mui/material";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Api from "../../../../api";
import MaterialButton from "../../../../Tags/MaterialButton";
export class OwnerDetails extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      
       
      
        
      }
      this.apiCtrl = new Api;
    
     
    }

    render(){

        const handleChange=(e)=>{

            this.setState(old=>({...old,[e.target.name]:e.target.value}))

         this.props.func(...this.state)

        }

        return(<>
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row mb-2">
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="first_name" value={this.state.first_name?this.state.first_name:""} label="First Name" onChange={handleChange} fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="middle_name" label="Middle Name" onChange={handleChange} fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="surname" label="Surname" onChange={handleChange} fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="primary_email" label="Primary Email" onChange={handleChange} fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="Secondary_email" label="Secondary Email" onChange={handleChange} fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField type="number" name="contact_1" label="Conatact 1" onChange={handleChange} fullWidth/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField type="number" name="contact_2" label="Contact 2" onChange={handleChange} fullWidth/>

                    </div>

                </div>
                <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  name="submit" text="Next" />
                </div>
            </Box>

          

          
        </>)

        
    }


}