import React from "react";
import { Box } from "@mui/system";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Switch from "@mui/material/Switch";
import { Divider } from "@mui/material";
import Button  from '@mui/material/Button';
import Swal from "sweetalert2";
import Api from "../../../../api";

export class VariationCreate extends React.Component {
    constructor(props){
      super(props);
      this.apiCtrl = new Api;
      this.state = {
        is_active:"1",
       
      }
    }

   

    render(){

        const submitdata=(e)=>{
            e.preventDefault();

            const data={
                name:this.state.name,
                value:this.state.value,
                remark:this.state.remark,
                datatype:this.state.datatype,
                vehicle_type_id:this.state.vehicle_type_id,
                is_active:this.state.is_active,
            }
            this.apiCtrl.callAxios("variation/create",data).then((res)=>{
                if(res.success   === true){
                              // console.log("response=>",response)
                               Swal.fire({
                                title: "Variation",
                                text:"Created",
                                icon: "success",
                                showConfirmButton: false,
                            })
                            setTimeout(() => {
                                Swal.close()
                                this.state({
                                    name:null,
                                    value:null,
                                    remark:null,
                                    datatype:null,
                                    vehicle_type_id:null,
                        
                                })
                                // location.reload("/variation-list")
                                $('.close').trigger('click');
                          }, 3000);
                          
                    
                            } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            
                            })
                            setTimeout(() => {
                                Swal.close()
                                $('.close').trigger('click');
                          }, 3000);
                            }
            })
        }

     
        return(<>

            {/* <BreadCrumb breadcrumb="Users" breadcrumbItem1={'Create User'} /> */}
        
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row">

                    <div className="col-md-4 mb-4">
                        <MaterialTextField name="name" label="Name" fullWidth  
                         value={this.state.name?this.state.name:""}
                         onChange={(e)=>this.setState({name:e.target.value})}
                            
                        />
                             
                    </div>
                    <div className="col-md-4 mb-4">
                        <MaterialTextField name="value" label="Vlaue" fullWidth  
                           value={this.state.value?this.state.value:""}
                         onChange={(e)=>this.setState({value:e.target.value})}
                        />
                             
                    </div>
                    <div className="col-md-4 mb-4">
                        <MaterialTextField name="remark" label="Remark" fullWidth  
                          value={this.state.remark?this.state.remark:""}
                         onChange={(e)=>this.setState({remark:e.target.value})}
                            
                        />
                             
                    </div>
                    <div className="col-md-4 mb-4">
                        <MaterialTextField name="datatype" label="Data Type" fullWidth  
                        onChange={(e)=>this.setState({datatype:e.target.value})}
                        value={this.state.datatype?this.state.datatype:""}
                         
                            
                        />
                             
                    </div>
                    <div className="col-md-4 mb-4">
                        <MaterialTextField name="vehicle_type_id" type={"number"} label="Vehicle Type" fullWidth  
                                value={this.state.vehicle_type_id?this.state.vehicle_type_id:""}
                     
                         onChange={(e)=>this.setState({vehicle_type_id:e.target.value
                         })}
                            
                        />
                             
                    </div>
                    <div className="col-md-4 mb-4">
                        {/* <FormControlLabel control={<Checkbox checked={this.state.is_active=="1"?true:false} onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}/>}   label={"Enable" } /> */}
                        <Switch checked={this.state.is_active=="1"?true:false}    fullWidth onChange={(e)=>this.setState({is_active:e.target.checked?1:0})} />                 
                        { <strong> {"Active"} </strong>         }
                    </div>



                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className='row mt-3'>
                
                    <div className="col-md-12 d-flex justify-content-end">
                        <Button style={{ backgroundColor: '#183883' }} onClick={ submitdata }>Submit</Button>
                    </div>
                </div>
            </Box>

        </>)
    }
}