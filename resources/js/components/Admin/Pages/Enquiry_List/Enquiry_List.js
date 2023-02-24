import React from "react";
import { DataGrid } from '@mui/x-data-grid';

import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Swal from 'sweetalert2';
import Api from '../../../../api';
import { useState } from "react";
import textModifier from "../../../services/textModifier";
import { object } from "prop-types";


 export class EnquiryList extends React.Component {
    constructor(props){
      super(props)
      this.apiCtrl = new Api;
  
      this.state = {
        data : [],
        isLoading: false,
        page: 0,
        pageSize: 10,
        detailsData:[],
       // product_type:this.props.title,
      
  
    }
  
    }
  
    componentWillMount = () => {
      this.getProductList();
    }

    

    // componentDidUpdate(prevProps, prevState){
    //   // console.log('update')
    //   if ((prevState.page !== this.state.page)||(prevProps.params !== this.props.params)) {
    //       this.getProductList();
    //   }
    // }

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
      this.apiCtrl.callAxios('enquiry/list',data).then(response => {
          console.log(response);
          
          if(response.success == true){
              this.setState(old => ({...old, data:response.data, total:response.data.iTotalRecords}))
  
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
         console.log("dataproduct===",data)
         this.setState({detailsData: data})
       }
  
    
  
      const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 190 },
        { field: 'phone', headerName: 'Phone ', width: 190 },
        { field: 'enquiry_type', headerName: 'Enquiry Type', width: 150 },
        { field: 'address', headerName: 'Address', width: 100 },
        { field: 'remark', headerName: 'Remark', width: 100 },  
        { field: 'is_active', headerName: 'Active', width: 130,renderCell: (params) => <IsActive key={params.row.id}  fun={handleClick}    param={params.row} />,},
        { field: 'action', headerName: 'Action', width: 300,renderCell: (params) => <Action key={params.row.id}  fun={handleClick}    param={params.row} />,},
        // { field: 'gst', headerName: 'GST', width: 150 },
       
      ];


     
  
    return (
      <>
      <BreadCrumb breadcrumb={"Enquiry List"} />
     
      <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
   
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

  
          />
         
      </div>

      <Model params={this.state.detailsData}/>
  
      
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
            location.reload(`/${props.url}-list`)
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
        location.reload(`/${props.url}-list`)
       }
     });
   }
       return(<>
              
             {/* <FormControlLabel control={<Checkbox checked={state.is_active== "1"?true:false} onClick={deletesliderdata}  />} label={"Is Active"} />&nbsp; */}
             <Switch checked={state.is_active== "1"?true:false} onClick={deletedata}   fullWidth /> 
             
       </>)
   }

function Action(props){
  const viewdetails = (event)=>{
    props.fun(props.param.data)
  }

  return(<>

       <Button type='button' data-bs-toggle="modal" size='small' href="#exampleModalToggle1" onClick={viewdetails} >View Details</Button>&nbsp;
  </>)

}


function Model(props){

   const [data,setData]=useState(props)
   console.log("props",props)
   console.log("data",data)
     
      return(
        <>
       
          <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle"></h5>
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

                    {(props.params!==null )?
                      <fieldset className="form-group border p-3">
                        <div className="row " >
                          {/* <legend className="col-form-label col-sm-2  pt-0" ></legend> */}
                            <div className="col-sm-10">
                                <div className="row">
                                 
                                 {Object.entries(props.params).map(([key,value])=>{

                                   
                                    return(<>

                                          <span><b>{textModifier(key)}</b>:  {value}</span>
                                    </>)

                                 })}


                                </div>
                            </div>
                        </div>
                      </fieldset>:"No Data Available"
                    }

                </div>
                                
                
                
    
              </div>
                
              {/* <div className="modal-footer">
                      
    
                      <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                    
              
                      {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={ submituser }>Submit</Button> 
                    
                    </div>*/}
              </div>  
    
              
            </div>
          </div>
          </div>
    
    
        </>
      )
    }
    