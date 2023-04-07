import React from "react";
import Api from "../../../../api";
import Button  from '@mui/material/Button';
import { Box, Divider } from '@mui/material';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Switch from "@mui/material/Switch";
import MaterialButton from "../../../../Tags/MaterialButton";



export  class ComapnyDetails extends React.Component {
    constructor(props){
      super(props);
      this.state = {

         comapnyDetails:{},

        imageshow:{},

       
       
      }
      this.apiCtrl = new Api;
      
    }

    

    render(){

        

        const handleChange = (e) => {

          
  
            if((e.target.name==="company_mission_image")||(e.target.name==="logo")||(e.target.name==="about_company_image")||(e.target.name==="company_vision_image")){
                //   this.setState(old=>({...old, image_name_1 : e.target.files[0]}))
                //   this.setState(old=>({...old, imageshow :URL.createObjectURL(e.target.files[0])}))
                this.setState(old=>({...old,comapnyDetails:{...old.comapnyDetails,[e.target.name]:e.target.files[0]}}))
               this.setState(old=>({...old,imageshow:{...old.imageshow, [e.target.name]:URL.createObjectURL(e.target.files[0])}}))
            }else{

                // this.setState(old=>({...old,[e.target.name]:e.target.value}))
                this.setState(old=>({...old,comapnyDetails:{...old.comapnyDetails,[e.target.name]:e.target.value}}))

            }

            this.props.func({...this.state.comapnyDetails})


           
            
            // this.setState({errors: ''})
        }
        return(<>
            

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
               

                <div className="row mb-2">
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="company_name" label="Company Name" fullWidth onChange={handleChange}/>

                    </div>
                    <div className={`${this.state.imageshow.logo?"col-md-3 mb-3":"col-md-4 mb-3"}`}>
                        <MaterialTextField type="file" name="logo" label="Logo" onChange={handleChange} fullWidth/>

                    </div>
                  
                    {this.state.imageshow.logo?
                        <div className="col-md-1 mb-3">
                        
                                <img style={{width:"57px",height:"55px"}} src={this.state.imageshow.logo}/>
                        </div>
                        :""
                    }
                   
                    <div className="col-md-4 mb-3">               
                        <Switch checked={this.state.is_active=="1"?true:false}  onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}   fullWidth />                 
                        { <strong> {"Active"} </strong>         }
                    </div>
                    
                    
                    
                    <div className="col-md-4 mb-3"> 
                        <MaterialTextField fullWidth name="meta_keyword" label="Meta Keyword" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3"> 
                        <MaterialTextField fullWidth name="meta_description" label="Meta Description" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="website" label="Website" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="about_company" label="About Company" onChange={handleChange}/>

                    </div>
                    <div className={`${this.state.imageshow.about_company_image?"col-md-3 mb-3":"col-md-4 mb-3"}`}>
                        <MaterialTextField fullWidth type="file" name="about_company_image" label="About Company Image" onChange={handleChange}/>

                    </div>
                   
                        {this.state.imageshow.about_company_image?
                            <div className="col-md-1 mb-3">                           
                            <img style={{width:"57px",height:"55px"}} src={this.state.imageshow.about_company_image}/>
                            </div>
                            :""
                            
                        }
                   
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="company_mission" label="Company Mission" onChange={handleChange}/>

                    </div>
                    <div className={`${this.state.imageshow.company_mission_image?"col-md-3 mb-3":"col-md-4 mb-3"}`}>
                        <MaterialTextField fullWidth type="file" name="company_mission_image" label="Company Mission Image" onChange={handleChange}/>

                    </div>
                   
                    {this.state.imageshow.company_mission_image?
                        <div className="col-md-1 mb-3">
                        
                                <img style={{width:"57px",height:"55px"}} src={this.state.imageshow.company_mission_image}/>
                        </div>
                        :""
                    }
                   
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="company_vision" label="Company Vision" onChange={handleChange}/>

                    </div>
                    <div className={`${this.state.imageshow.company_vision_image?"col-md-3 mb-3":"col-md-4 mb-3"}`}>
                        <MaterialTextField fullWidth type="file" name="company_vision_image" label="Company Vision Image" onChange={handleChange}/>

                    </div>
                   
                    {this.state.imageshow.company_vision_image?
                        <div className="col-md-1 mb-3">
                        
                            <img style={{width:"57px",height:"55px"}} src={this.state.imageshow.company_vision_image}/>
                        </div>
                        :""
                    }
                  
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="pan_no" label="Pan Card Number" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="gst_no" label="GST Number" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="adhaar_no" label="Adhaar Card Number" onChange={handleChange}/>

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