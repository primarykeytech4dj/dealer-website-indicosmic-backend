import React from "react";


import { DataGrid } from '@mui/x-data-grid';

import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import MaterialTextField from "../../../../Tags/MaterialTextField";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Swal from 'sweetalert2';
import Api from '../../../../api';
import { useState } from "react";
import textModifier from "../../../services/textModifier";
import { object } from "prop-types";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PaymentIcon from '@mui/icons-material/Payment';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import LaunchIcon from '@mui/icons-material/Launch';


 export class SalesList extends React.Component {
    constructor(props){
      super(props)
      this.apiCtrl = new Api;
  
      this.state = {
        data : [],
        isLoading: false,
        filter:"",
        page: 0,
        pageSize: 10,
        detailsData:[],
        enquiry_type:""
       // product_type:this.props.title,
      
  
    }
  
    }
  
    componentWillMount = () => {
      this.getsaleslist();
    }

    

    componentDidUpdate(prevProps, prevState){
      // console.log('update')
      if(prevState.enquiry_type !== this.state.enquiry_type){
          // this.setState(old=>({...old,data:[""]}))
        
        this.getsaleslist();
      
      } 

      // if ((prevState.page !== this.state.page)||(prevProps.params !== this.props.params)||(prevState.pageSize !== this.state.pageSize)) {
      //     this.getsaleslist();
      // }
        if ((prevState.page !== this.state.page)) {
          this.getsaleslist(this.state.pageSize);
      }
      if ((prevState.pageSize !== this.state.pageSize)) {
        this.getsaleslist(prevState.pageSize);
      }
      if((prevState.filter!==this.state.filter)){
        this.getsaleslist()
      }
    }

    // componentDidUpdate = (prevProps, prevState) =>{
    //   if(prevProps.params !== this.props.params){
    //     this.getProductcategoryList();
    //   }
    //  }
  
  
    getsaleslist = (pageSize) =>{
  
      this.setState(old => ({...old, isLoading:true}))
       var data = {filter:this.state.filter,enquiry_type:this.state.enquiry_type,length:this.state.pageSize, start:this.state.page*this.state.pageSize};
      // var data = {
      //   is_service: (this.props.params.any === 'service')?1:0
      // }
      this.apiCtrl.callAxios('enquiry/list',data).then(response => {
          console.log(response);
            this.setState({data:""})
          
          if(response.success == true){
              //this.setState(old => ({...old, data:response.data.aaData, total:response.data.iTotalRecords}))
              //this.setState(old => ({...old, data:[...old.data, ...response.data.aaData], total:response.data.iTotalRecords}))
  
              const {aaData}=response.data
            
              if(pageSize == this.state.pageSize){
                this.setState(old => ({...old, data:[...old.data,...aaData], total:response.data.iTotalRecords}))
              } else {
                this.setState(old => ({...old, data:aaData, total:response.data.iTotalRecords}))
              }
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
     const enquiryType={

      "vehicle":"Vehicle",
      "product":"Product",
      "contact-us":"Contact-us",
      "":"All"


     }

     const onHandleChange=(e)=>{
      this.setState(old =>({...old, enquiry_type:e.target.value}))
     

   }

     const  handleClick = (data) => {
       //  console.log("dataproduct===",data)
         this.setState({detailsData: data})
       }

       console.log("Enquiry State =>",this.state)
  
    
  
      const columns = [
        { field: 'sr_no', headerName: 'Sr.No', width: 100 },
        { field: 'name', headerName: 'Name', width: 190 },
        { field: 'phone', headerName: 'Phone ', width: 190 },
        { field: 'enquiry_type', headerName: 'Enquiry Type', width: 150 },
        {field:"invoice_no",headerName:"Invoice No",width:150},
        {field:"payment",headerName:"Payment Status",width:150, renderCell:()=><span className="badge bg-success">Success</span>},
        { field: 'is_active', headerName: 'Active', width: 130,renderCell: (params) => <IsActive key={params.row.id}  fun={handleClick}    param={params.row} />,},
        { field: 'action', headerName: 'Action', width: 60,renderCell: (params) => <Action key={params.row.id}  fun={handleClick}    param={params.row} />,},
        // { field: 'gst', headerName: 'GST', width: 150 },
       
      ];


     
  
    return (
      <>
      <BreadCrumb breadcrumb={"Sales Enquiry List"} />
     
      <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
        {/* <div className="row mb-3">
           <div className="col-md-3"></div>
          
            <div className="col-md-3 d-flex justify-content-end mb-2">
             <Button  type="button" style={{ backgroundColor: '#183883',width:"auto",color:"#fff"}}  size='large' >Generate Payment Link</Button>

            </div>
            <div className="col-md-3 d-flex justify-content-end mb-2">
             <Button  type="button" style={{ backgroundColor: '#183883',width:"auto",color:"#fff"}}  size='large' >Create Demo Website</Button>

            </div>
            <div className="col-md-3 d-flex justify-content-end mb-2">
             <Button  type="button" style={{ backgroundColor: '#183883',width:"auto",color:"#fff"}}  size='large' >Create Live Website</Button>

            </div>



        </div> */}
   
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
        //   checkboxSelection
          onPageChange={(newPage) => this.setState(old=>({...old, page: newPage}))}
          onPageSizeChange={(newPageSize) => this.setState(old=>({...old, pageSize: newPageSize}))}
          disableRowSelectionOnClick
  
          />
         
      </div>

    
      
      </Box>
      </>
    );
  }
  }

  
function IsActive(props){

    //console.log("peops=>",props.params) 
       const [state,setState]=useState(props.param)
    const apiCtrl = new Api;

   
   
    const deletedata=(e)=>{
     console.log("event",e)
  
     setState(old=>({...old,is_active:e.target.checked?1:0}))
   
     const data={
       is_active:e.target.checked?1:0
     }
   
     const msg_1={
      text_1:"Do you want to De-active",
      //text_1:"",
      text_3:" De-active ",
      text_2:"Do you want to Active",
    
      text_4:" Active "
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
       apiCtrl.callAxios(`delete/${props.param.enquiry_code}`,data).then(response => {
   
   
           if(response.success == true){
             Swal.fire({
              
                  title:`Vehicle ${msg1} Successfully!`,
               icon: "success",
               showConfirmButton: false,
               timer: 1200,
             });
            location.reload(`/admin/${props.url}-list`)
               } else {
                 Swal.fire({
                   title: `Vehicle ${msg1} unsuccessfully!`,
                   icon: "error",
                   showConfirmButton: false,
                   timer: 1200,
                 });
               }
             
           console.log('deleted res', response);
   
        
         });
       }else{
        location.reload(`/admin/${props.url}-list`)
       }
     });
   }
       return(<>
              
             {/* <FormControlLabel control={<Checkbox checked={state.is_active== "1"?true:false} onClick={deletesliderdata}  />} label={"Is Active"} />&nbsp; */}
             <Switch checked={state.is_active== "1"?true:false} onClick={deletedata}   fullWidth /> 
             
       </>)
   }

function Action(props){
  // console.log("props action",props)
  const viewdetails = (event)=>{
      const{data}=props.param
    // props.fun(props.param.data)
    props.fun(data)
  }

    return(<>

      
        <div className="">
           
            <span
               style={{cursor:"pointer"}}data-bs-toggle="dropdown" aria-expanded="false"
            >
               
                <MoreVertIcon/>
            </span>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#"><span><PaymentIcon/></span> Generate Payment Link</a></li>
                <li><a className="dropdown-item" href="#"><span><WebAssetIcon/></span>Create Demo Website</a></li>
                <li><a className="dropdown-item" href="#"><span><LaunchIcon/></span>Create Live Website</a></li>
              
            </ul>
        </div>
    </>)

}