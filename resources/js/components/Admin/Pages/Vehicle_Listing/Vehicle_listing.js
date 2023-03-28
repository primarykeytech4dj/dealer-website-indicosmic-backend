import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialButton from "../../../../Tags/MaterialButton";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Swal from 'sweetalert2';
import Api from '../../../../api';
import './Vehicle.css'

import textModifier from "../../../services/textModifier";
import { useEffect } from "react";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

 export class VehicleList extends React.Component {
    constructor(props){
      super(props)
      this.apiCtrl = new Api;
  
      this.state = {
        data : [],
        isLoading: false,
        page: 0,
        pageSize: 5,
        productData:[],
        vehiclemodel:[]
       // product_type:this.props.title,
      
  
    }
  
    }
  
    componentWillMount = () => {
      this.getProductList();
    }



    

    componentDidUpdate(prevProps, prevState){
      // console.log('update')
      if ((prevState.page !== this.state.page)||(prevState.pageSize !== this.state.pageSize)) {
          this.getProductList();
      }
    }

    // componentDidUpdate = (prevProps, prevState) =>{
    //   if(prevProps.params !== this.props.params){
    //     this.getProductcategoryList();
    //   }
    //  }
  
  
    getProductList = () =>{
  
      this.setState(old => ({...old, isLoading:true}))
       var data = {length:this.state.pageSize, start:this.state.page*this.state.pageSize};
      // var data = {
      //   is_service: (this.props.params.any === 'service')?1:0
      // }
      this.apiCtrl.callAxios('vehicle/list',data).then(response => {
          console.log(response);
          
          if(response.success == true){
              this.setState(old => ({...old, data:[...old.data, ...response.data.aaData], total:response.data.iTotalRecords}))
  
          } else {
          alert("No Data Available")
          }
          this.setState(old => ({...old, isLoading:false}))
          // sessionStorage.setItem('_token', response.data.)
          
      }).catch(function (error) {
          this.setState(old => ({...old, isLoading:false}))
          console.log(error);
      });
    }
  
    
    render() {
      
     // console.log("props",this.props)
     const  handleClick = (data) => {
      //console.log("userdata",data)
       this.setState({vehiclemodel: data})
     }
    
  
      const columns = [
        { field: 'sr_no', headerName: 'Sr no', width: 100 },
        { field: 'vehicle_model', headerName: 'Vehicle Model', width: 200,renderCell: (params) => textModifier(params.row.vehicle_model) },
        { field: 'vehicle_make', headerName: 'Vehicle Make', width: 150 },
        { field: 'transmission', headerName: 'Transmission', width: 150 },
        { field: 'fuel_type', headerName: 'Fuel Type', width: 100 },
        {field:'vehicle_status',headerName:'Vehicle Status',width:100},
        {field:'system_code',headerName:'System Code',width:100,renderCell: (params) => textModifier(params.row.system_code) },
        {field:'images',headerName:'Images',width:200,renderCell: (params) => <Images key={params.row.id}    param={params.row} />,},
        { field: 'is_active', headerName: 'Active', width: 150 ,renderCell: (params) => <IsActive key={params.row.id}    param={params.row} />,},
        { field: 'upload', headerName: 'Upload', width: 150 ,renderCell: (params) => <Upload key={params.row.id} func={handleClick}   param={params.row} />,},
        { field: 'edit', headerName: 'Edit', width: 150 ,renderCell:(params)=><EditVehicle key={params.row.id} func={handleClick}   param={params.row}/>},
       
      ];


     
  
    return (
      <>
      <BreadCrumb breadcrumb={"Vehicle List"} />
     
      <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', textAlign:'right', borderRadius:"6px", padding: '2%' }}>
   
      <Link  to={"/admin/vehicletab"} ><Button style={{marginBottom: '18px'}}>Creacte Vehicle</Button></Link>
      <div style={{ height: '100%', width: '100%' }}>
     
      <DataGrid
          autoHeight
          rows={this.state.data}
          rowCount={this.state.total}
          page={this.state.page}
      
          loading={this.state.isLoading}
          columns={columns}
          pagination
  
          pageSize={this.state.pageSize}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
      
          onPageChange={(newPage) => this.setState(old=>({...old, page: newPage}))}
          onPageSizeChange={(newPageSize) => this.setState(old=>({...old, pageSize: newPageSize}))}
          disableRowSelectionOnClick
  
          />
         
      </div>

      <UploadModel params={this.state.vehiclemodel}/>
  
      
      </Box>
      </>
    );
  }
  }

  
function IsActive(props){

    //console.log("peops=>",props.params) 
    // const [state,setState]=useState(props.param)
    const [state,setState]=useState(props.param)
    const apiCtrl = new Api;
   
    const deletevehicledata=(e)=>{
     //console.log("event",e)
  
     setState(old=>({...old,is_active:e.target.checked?1:0}))
   
     const data={
        // id:props.param.id,
       is_active:e.target.checked?1:0
     }
   
     const msg_1={
      text_1:"Do you want to De-Activate",
      //text_1:"",
      text_3:" De-Activate ",
      text_2:"Do you want to Activate",
    
      text_4:" Activate "
    }
     var msg=""
     var msg1=""
     if(data.is_active===0){
      msg= msg_1.text_1;
      msg1=msg_1.text_3
     }else{
      msg= msg_1.text_2;
      msg1=msg_1.text_4
     }
     // console.log("msg",msg)
   
   
     Swal.fire({
       title: 'Are you sure?',
       html: `${msg}`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#00B96F',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes',
     }).then((result) => {
   
       if (result.value) {
       apiCtrl.callAxios(`vehicle/delete/${state.id}`,data).then(response => {
   
   
           if(response.success == true){
             Swal.fire({
              
                  title:`Vehicle ${msg1} Successfully!`,
               icon: "success",
               showConfirmButton: false,
               timer: 1200,
             });
             setTimeout(() => {
              Swal.close()
              
             }, 5000);
            // location.reload(`/${props.url}-list`)
               } else {
                 Swal.fire({
                   title: `Vehicle ${msg1} unsuccessfully!`,
                   icon: "error",
                   showConfirmButton: false,
                   timer: 1200,
                 });
                 setTimeout(() => {
                  Swal.close()
                  
                 }, 5000);
               }
             
           console.log('deleted res', response);
   
        
         });
       }else{
        location.reload(`/admin/${props.url}-list`)
       }
     });
   }
       return(<>
           
           <div className="col-md-4 mb-4">
             {/* <FormControlLabel control={<Checkbox checked={state.is_active== "1"?true:false} onClick={deletesliderdata}  />} label={"Is Active"} /> */}
             <Switch checked={state.is_active== "1"?true:false} onClick={deletevehicledata}   fullWidth /> 
             
           </div>
   
       </>)
   }

function Images(props){

    return(<>


          <div className="col-md-12">
            <img key={props.param.id} src={props.param.images} alt={props.param.vehicle_model} />
          

          </div>
    </>)
}

function Upload(props){
   
  const vehicledata =()=>{
    props.func(props.param)
  }
  

  return(<>

      <div className="row">

      <div className="col-md-12">
          <MaterialButton 
          style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  
          data-bs-toggle="modal"  href="#exampleModalToggle1"
          name="" text="Upload"
          onClick={vehicledata}
           />


      </div>

</div>


  </>)
}

function EditVehicle(props){


  return(<>

{/* <Link key={props.key}  to={`/create/user`} state={{param:props.param}}><Button>Edit</Button></Link>  &nbsp; */}

<Link key={props.key} to={"/admin/vehicletab"} state={{...props.param}}><Button>Edit</Button></Link>&nbsp;
  </>)

}


function UploadModel(props){
  const [state,setState]=useState({
    vehicle_model:props.params.vehicle_model?props.params.vehicle_model:""
  })

  console.log("state=>",state)

 

useEffect(()=>{



})


  const apiCtrl=new Api
  const submit=()=>{
    
  }
  console.log("props=>",props.params)
 
 

 
  
  
  return(<>

    <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
      <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
              <div className="modal-header">
                  {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
                  <div className="row ml-1" style={{ paddingTop: '2%'}}>
                      <label><b>{props.params.vehicle_model}</b></label>
                  </div>
                  <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
          
          <div className="modal-body m-body">
              
              <div className="row">

                
                  <div className="col-md-6 mb-3">
                      <MaterialTextField type={"file"} label="Image Upload" accept="image/*" name="image" fullWidth  onChange={(e)=>setState({image : e.target.files[0]})}/>

                  </div>
                  <div className="col-md-6 mb-3">
                      <MaterialTextField type={"file"} label="Other Upload" accept="application/pdf" name="other" fullWidth onChange={(e)=>setState({other : e.target.files[0]})}/>

                  </div>
              

              </div>
              
              <div className="modal-footer">
                  

                  <Button style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}} onClick={submit}>Submit</Button>&nbsp;&nbsp;
                  
          
                  
              </div>
          </div>  

          
          </div>
      </div>
    </div>
  </>)
}