import React from "react";
import { Box, Divider } from '@mui/material';
import Button  from '@mui/material/Button';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Api from "../../../../api";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { TempleHinduSharp } from "@mui/icons-material";

export class UserCreation extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        is_active:false,
        priority:null
        
      }
      this.apiCtrl = new Api;
    
     
    }

    render(){

        const submituser=(e)=>{

            e.preventDefault();
           const data={
            is_active:this.state.is_active,
            role:this.state.role,
            priority:this.state.priority
           }

            this.apiCtrl.callAxios("/users/create",data).then((res)=>{
                if(response.success == true){
                    Swal.fire({
                        title: "User",
                        text: "Created",
                        icon: "success",
                        showConfirmButton: false,
                    })
                } else {
                    Swal.fire({
                        title: "user",
                        text: "Not Created!",
                        icon: "error",
                        showConfirmButton: false,
                    })
                }


                
              }).catch(function (error) {
                console.log("Adduser===>",error);
              });
           

        }

        const handleOnchange=({role})=>{

           this.setState(old=>({...old,role:role}))
        }

        const rolesdata=()=>{
           
            this.apiCtrl.callAxios("users/roles-list").then(res=>{
                console.log("res=>",res)
            })
        }

       
        console.log("state=>",this.state)
        return(<>
                

          <BreadCrumb breadcrumb="Users" breadcrumbItem1={'Create User'} />
 
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row">
                    <div className="col-md-3">

                      <MaterialSelect onMouseEnter={rolesdata} label="Users" data={""} fullWidth/>

                    </div>
                    <div className="col-md-1">
                    <button type="button" data-bs-toggle="modal" size='small' href="#exampleModalToggle1" className="btn btn-outline-dark">Add User</button>
                    {/* <button type="button" class="btn btn-outline-secondary">Add User</button> */}

                    </div>
                    <div className="col-md-4">
                      <FormControlLabel control={<Checkbox  onChange={(e)=>this.setState({is_active:e.target.checked})}  />} label={"Is Active"} />

                    </div>

                  { this.state.is_active? <div className="col-md-4">
                        <MaterialTextField label="Priority" name="priority" type={"number"} fullWidth  onChange={(e)=>this.setState({priority:e.target.value})}/>

                    </div>:""}

                    <Model func={handleOnchange}/>

                </div>

                <div className='row'>
                    <div className="col-md-3">
                        <Button style={{ backgroundColor: '#183883'}} onClick={ submituser }>Submit</Button>
                    </div>
               </div>
            </Box>
                
        </>)
    }
}



function Model(props){
    
    return(
      <>


        <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
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
                <div className="col-md-12">
                    <MaterialTextField  name="role" placeholder="User Role" fullWidth onChange={(e)=>props.func({role:e.target.value})}/>

                </div>

            </div>
                
            
            </div>  

            
            </div>
        </div>
        </div>

     
     
  
  
      </>
    )
  }