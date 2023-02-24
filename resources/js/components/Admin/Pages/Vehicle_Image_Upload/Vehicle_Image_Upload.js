import React from "react";
import Api from "../../../../api";
import { Box,Divider } from '@mui/material';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialButton from "../../../../Tags/MaterialButton";
import Button  from '@mui/material/Button';
import MaterialSelect from "../../../../Tags/MaterialSelect";

export class VehicleImageUpload extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        typeData:[]
        
      }
      this.apiCtrl = new Api;
    
     
    }

    render(){

        const submit=(e)=>{
            e.preventDefault();

            var data = new FormData();
            Object.entries(this.state).map(([index, value])=>{
                
                data.append(`${index}`, value);
               
            })

            this.apiCtrl.callAxiosFile("",data,true).then((res)=>{
                if(res.success   === true){
                        console.log("response=>",response)
                    //    Swal.fire({
                    //     title: "TestiMonial",
                    //     text:"Created",
                    //     icon: "success",
                    //     showConfirmButton: false,
                    // })
            
                    // } else {
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: 'Something went wrong!',
                    
                    // })
                }
            })


     
        }
        const vehiclelist=()=>{


            this.apiCtrl.callAxios('vehicle/list').then(response => {
                console.log("responselist=>",response.data);

                if(response.success == true){

                    Object.entries(response.data).map(([index,value])=>{
                     // console.log("index",index ,"value",value)
                       // let  types =  value.type.replace(/-/g, " "); 
                        
                        var vehiclemodel =   value.vehicle_model
                        // .toLowerCase()
                        // .split(' ')
                        // .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        // .join(' ');
        
                        
                        this.setState(old => ({...old, typeData:{...old.typeData,[value.vehicle_model]:vehiclemodel}}))
                    
           
                    })
                       
                    
                } else {
                alert("No Data Available")
                }
              
              
            
                
            })
        }
        return(<>

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row mb-3 ml-1">
                    <label><b>{"Vehicle Upload"}</b></label>
                </div>

               <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="row">

                    <div className="col-md-12">
                        <MaterialButton 
                        style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  
                        data-bs-toggle="modal"  href="#exampleModalToggle1"
                        name="" text="Upload" />


                    </div>

                </div>

                <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
                                <div className="row ml-1" style={{ paddingTop: '2%'}}>
                                    {/* <label><b>{props.params.any} Details</b></label> */}
                                </div>
                                <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        
                        <div className="modal-body m-body">
                            
                            <div className="row">

                                <div className="col-md-4 mb-3">
                                    <MaterialSelect value={this.state.vehicle_model} onMouseEnter={vehiclelist} label=" Vehicle Model" name="vehicle_model" fullWidth  data={this.state.typeData} onChange={(e)=>this.setState({vehicle_model : e.target.value})}/>

                                </div>
                                <div className="col-md-4 mb-3">
                                    <MaterialTextField type={"file"} label="Image Upload" accept="image/*" name="image" fullWidth  onChange={(e)=>this.setState({image : e.target.files[0]})}/>

                                </div>
                                <div className="col-md-4 mb-3">
                                    <MaterialTextField type={"file"} label="Other Upload" accept="application/pdf" name="other" fullWidth onChange={(e)=>this.setState({other : e.target.files[0]})}/>

                                </div>
                            

                            </div>
                            
                            <div className="modal-footer">
                                

                                <Button style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}} onClick={submit}>Submit</Button>&nbsp;&nbsp;
                                
                        
                                
                            </div>
                        </div>  

                        
                        </div>
                    </div>
                </div>


            </Box>
                    
             
              
        </>)
    }
}