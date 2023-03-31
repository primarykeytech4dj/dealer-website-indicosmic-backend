import React, { useEffect } from "react";
import Api from "../../../../api";
import Button  from '@mui/material/Button';
import { Box, Divider } from '@mui/material';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Switch from "@mui/material/Switch";
import Editor from "../Editor/Editor";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialButton from "../../../../Tags/MaterialButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { use } from "browser-sync";

export  class Company extends React.Component {
    constructor(props){
      super(props);
      this.state = {

       
        Address:[< Address  delbyidfunc={this.deletebyid}   value={{key:'', val:''}} key={0} id={0}/>],
        
      }
      this.apiCtrl = new Api;
      
    }

    deletebyid=(delrowbyid)=>{
        console.log("delrowbyid",delrowbyid)
      //  const adlngth=delrowbyid 
         const Keyvaluefield= this.state.Address
         console.log("oflength=>",Keyvaluefield)
         delete Keyvaluefield[delrowbyid]
        // console.log("oflength=>",oflength)
          this.setState(old=>({...old,Keyvaluefield}))
          console.log("stateAfterdel=>",this.state)
     

    }
    

    render(){

        let Addmore = (e) => {
              
            this.setState(old=>({...old,Address:[...old.Address,<Address   delbyidfunc={this.deletebyid}   key={this.state.Address.length} id={this.state.Address.length}   />]}))
        }

        const handleChange = (e) => {

            // validation(e.target.name, e.target.value)
            // console.log(e.target.value)
  
            if(e.target.name==="image_name_1"){
              this.setState(old=>({...old, image_name_1 : e.target.files[0]}))
              this.setState(old=>({...old, imageshow :URL.createObjectURL(e.target.files[0])}))
            }else{

                this.setState(old=>({...old,[e.target.name]:e.target.value}))

            }
           
            
            // this.setState({errors: ''})
        }
        return(<>
            <BreadCrumb breadcrumb={"Company"} breadcrumbItem1='Create' />

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row ml-1  mb-2">
                    <label><b>Basic Details</b></label>
                </div>

                <div className="row mb-2">
                    <div className="col-md-4 mb-3">
                    <MaterialTextField name="first_name" label="First Name" onChange={handleChange} fullWidth/>

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

                <div className="row ml-1 mb-2">
                      <label><b>Comapny Details</b></label>
                </div>

                <div className="row mb-2">
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="company_name" label="Company Name" fullWidth onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField type="file" name="logo" label="Logo" onChange={handleChange} fullWidth/>

                    </div>
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
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth type="file" name="about_company_image" label="About Company Image" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="company_mission" label="Company Mission" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth type="file" name="company_mission_image" label="Company Mission Image" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth name="company_vision" label="Company Vision" onChange={handleChange}/>

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField fullWidth type="file" name="company_vision_image" label="Company Vision Image" onChange={handleChange}/>

                    </div>
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

                <div className="row ml-1 mb-2">
                    <label><b>Comapny Address</b></label>
                </div>

                <div className="row">
                    {this.state.Address}

                </div>

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  name="submit" text="Submit" />
                </div>


            </Box>

              
        </>)
    }

}


function Address(props){
    const apiCtrl=new Api

    const remove=()=>{
       
        props.delbyidfunc(props.id)
      
    }

    useEffect(()=>{



    },[])
   
    
    return(<>

        <div className="row ">

            <div className="col-md-10">
                <div className="row">

                    <div className='col-md-6 mb-4'>        
                        <MaterialSelect  size="small"       data={""}  id="city_id" labelId="city-id" name="city"  label="City *" fullWidth
                        
                        />
                    </div>

                    <div className='col-md-6 mb-4'>        
                        <MaterialSelect size="small"     data={""}  id="state_id" labelId="state" name="state"  label="State *" fullWidth
                        
                        />
                    </div>
                    

                    <div className="col-md-6 mb-4">
                        <MaterialTextField  label="Address *" size="small" fullWidth name='address' 
                        />
                    </div>
                
                    <div className="col-md-6 mb-4">
                        <MaterialTextField  label="Pincode *" size="small" fullWidth name='pincode' 
                    
                        />
                    </div>


                </div>
               

            </div>

            
            <div className="col-md-2">
                <div className="col-md-1 mb-4 d-flex"style={{justifyContent:"center", marginTop:"23px" ,marginLeft:"29px",   marginBottom:"auto"}}>
                        <IconButton onClick={remove} aria-label="delete" size="large">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </div>


                </div>
        </div>




        
    </>)
}