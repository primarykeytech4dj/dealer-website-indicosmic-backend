import React from "react";
import Api from "../../../../api";
import { Box } from "@mui/system";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import { Divider } from "@mui/material";
import Button  from '@mui/material/Button';
import MaterialSelect from "../../../../Tags/MaterialSelect";



export class FeatureCreation extends React.Component {
    constructor(props){
      super(props);
      this.apiCtrl = new Api;
      this.state = {
        is_active:"1",
        vehicletype:{}
       
      }
    }

    componentDidMount(){
        this.apiCtrl.callAxios("get-vehicle-type").then(res=>{
          var  vehicleType={}
            if(res.success==true){
               console.log("res=>type",res)
                res.data.length>0&&res.data.map((val,key)=>{
                     
                    vehicleType={...vehicleType,[val.id]:val.vehicle_type}
                          
                })
            }
            console.log("vehicleType=>",vehicleType)

            this.setState(old=>({...old,vehicletype:{...vehicleType}}))

        })
    }

    render(){

        const submitdata=(e)=>{
            e.preventDefault();

            const data={
                type:this.state.type,
                value:this.state.value,
                datatype:this.state.datatype,
                vehicle_type_id:this.state.vehicle_type_id,
                is_active:this.state.is_active,
            }
            this.apiCtrl.callAxios("feature/create",data).then((res)=>{
                if(res.success   === true){
                              // console.log("response=>",response)
                               Swal.fire({
                                title: "Feature",
                                text:res.message ,
                                icon: "success",
                                showConfirmButton: false,
                            })
                            setTimeout(() => {
                                Swal.close()
                                this.state({
                                    type:null,
                                    value:null,
                                  
                                    datatype:null,
                                    vehicle_type_id:null,
                        
                                })
                                $('.close').trigger('click');
                               
                          }, 3000);
                          
                    
                            } else {
                            Swal.fire({
                                 title: "Feature",
                                text:res.message ,
                                icon: "error",
                                showConfirmButton: false,
                            
                            })
                            setTimeout(() => {
                                Swal.close()
                                $('.close').trigger('click');
                          }, 3000);
                            }
            })
        }
    

  
     console.log("festurestate=>",this.state)

        return(<>

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row">
                    <div className="col-md-4 mb-4">
                        <MaterialTextField name="type" label="Type" fullWidth  
                         value={this.state.type?this.state.type:""}
                         onChange={(e)=>this.setState({type:e.target.value})}
                            
                        />
                             
                    </div>
                    <div className="col-md-4 mb-4">
                        <MaterialTextField name="value" label="Vlaue" fullWidth  
                           value={this.state.value?this.state.value:""}
                         onChange={(e)=>this.setState({value:e.target.value})}
                        />
                             
                    </div>
                   
                    <div className="col-md-4 mb-4">
                        <MaterialTextField name="datatype" label="Data Type" fullWidth  
                        onChange={(e)=>this.setState({datatype:e.target.value})}
                        value={this.state.datatype?this.state.datatype:""}
                         
                            
                        />
                             
                    </div>
                    <div className="col-md-4 mb-4">
                        <MaterialSelect name="vehicle_type_id" data={this.state.vehicletype} type={"number"} label="Vehicle Type" fullWidth  
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
                
                    <div className="col-md-12 d-flex justify-content-end ">
                        <Button style={{ backgroundColor: '#183883' }} onClick={ submitdata }>Submit</Button>
                    </div>
                </div>
            </Box>

        </>)
    }

}