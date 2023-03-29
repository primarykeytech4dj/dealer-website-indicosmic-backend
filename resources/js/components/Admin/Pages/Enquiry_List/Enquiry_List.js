import React, { useEffect } from "react";
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
import MaterialSelect from "../../../../Tags/MaterialSelect";


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

    

    componentDidUpdate(prevProps, prevState){
      // console.log('update')
      if(prevState.enquiry_type !== this.state.enquiry_type){
        this.getProductList();
      
    } 
      if ((prevState.page !== this.state.page)||(prevProps.params !== this.props.params)||(prevState.pageSize !== this.state.pageSize)) {
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
       var data = {enquiry_type:this.state.enquiry_type,length:this.state.pageSize, start:this.state.page*this.state.pageSize};
      // var data = {
      //   is_service: (this.props.params.any === 'service')?1:0
      // }
      this.apiCtrl.callAxios('enquiry/list',data).then(response => {
          console.log(response);
          
          if(response.success == true){
              //this.setState(old => ({...old, data:response.data.aaData, total:response.data.iTotalRecords}))
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
         console.log("dataproduct===",data)
         this.setState({detailsData: data})
       }
  
    
  
      const columns = [
        { field: 'sr_no', headerName: 'Sr.No', width: 100 },
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
        <div className="row mb-3">
          <div className="col-md-10"></div>
          <div className="col-md-2 d-flex justify-content-end">
            
            <MaterialSelect value={this.state.enquiry_type?this.state.enquiry_type:""} size={"small"} data={enquiryType} 
            label={"Enquiry Type"}  onChange={(e)=>{onHandleChange(e)}} fullWidth/>

          </div>

        </div>
   
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
  const viewdetails = (event)=>{
    props.fun(props.param.data)
  }

  return(<>

       <Button type='button' data-bs-toggle="modal" size='small' href="#exampleModalToggle1" onClick={viewdetails} >View Details</Button>&nbsp;
  </>)

}


function Model(props){

   const [data,setData]=useState({})
  
  //  console.log("data",data)

  
  console.log("props",props)
  
      return(
        <>
       
          <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
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

                                 
                                 
                                 {(typeof props.params.data !== 'undefined') && Object.entries(props.params.data).slice(0).reverse().map(([key,value])=>{

                                    //console.log("key",key,"value",value)

                                    return(
                                      <>
                                      <div className="row m-2">
                                      <span><b>{textModifier(key)}</b></span>

                                      {
                                            Object.entries(value).slice(0).reverse().map(([key1,val1])=>{
                                             // console.log('first Loop', key1, val1)

                                             return(
                                              <div className='row m-1'>
                                                {/* <span><b>{textModifier(key1)}</b></span> */}
                                                {(typeof val1 === 'object') ?
                                                  <>
                                                  <span><b>{textModifier(key1)}</b></span>

                                                  {
                                                     Object.entries(val1).slice(0).reverse().map(([key2, val2])=>{
                                                     // console.log('second Loop', key2, val2)
                                                      return(
                                                        <div className='row m-1'>
                                                          {(typeof val2 === 'object') ?
                                                            <>
                                                            <span><b>{textModifier(key2)}</b></span>
                                                             { Object.entries(val2).slice(0).reverse().map(([key3, val3])=>{
                                                             //   console.log('Third Loop', key3, val3)
                                                                return(
                                                                  <>
                                                                    <span><b>{textModifier(key3)}</b> : {val3}</span>
                                                                  </>
                                                                )              
                                                              })}
                                                            </>
                                                            :
                                                            <span><b>{textModifier(key2)}</b> : {val2}</span>
                                                          }
                                                        </div>
                                                      )
                                                    })
                                                  }
                                                  </>
                                                  :
                                                  <span><b>{textModifier(key1)}</b> : {val1}</span>
                                                }
                                              </div>
                                             )
                                                // return(<>
                                                //    <Divider sx={{ borderColor: '#dac4c4',marginTop:"10px",marginBottom:"10px"}} />
                                                //   <span><b>{textModifier(key1)}</b></span>                             
                                                //  {
                                                //    Object.entries(val1).slice(0).reverse().map(([key2,val2])=>{

                                                //     return(<>

                                                //       { ( (Object.keys(val2).length > 0)) ? 
                                                //       <>

                                                //           {/* <span><b>{textModifier(key2)}</b></span> */}
                                                //        { Object.entries(val2).map(([key3, val3])=>{
                                                //           return <span><b>{textModifier(key3)}</b>:  {val3}</span>
                                                //         })}
                                                //         </>
                                                //        :
                                                       
                                                //         <span><b>{textModifier(key2)}</b>:  {val2}</span>
                                                //        }

                                                //     </>)

                                                  
                                                //   })
                                                //  }
                                                   
                                                  
                                                // </>)

                                              // if(key1=="user"){
                                                



                                              // }else{


                                              //   return(<>

                                                 
                                              //    <p>{textModifier(key1)}</p>

                                              //      {
                                              //           Object.entries(val1).slice(0).reverse().map(([key3,val3])=>{
                                              //         //   console.log("key3",key3,"val3",val3)

                                                    

                                              //         return(<>
                                                       
                                                            
                                              //           {key3!=="features"&&key3!=="specification"?

                                              //             <span><b>{textModifier(key3)}</b>:  {val3}</span>

                                              //         :   Object.entries(val3).map(([key4,val4])=>{

                                              //             //console.log("key4",key4,"val4",val4)

                                              //               return(<>


                                              //                   {Object.entries(val4).map(([key5,val5])=>{

                                              //                   return(<>
                                              //                         <span><b>{textModifier(key5)}</b>:  {val5}</span>
                                              //                   </>)
                                              //                   })}
                                              //               </>)

                                              //             })
                                                       


                                              //           }
                                                            
                                              //         </>)

                                              //       })
                                              //      }
                                              //   </>)

                                              // }
                                            
                                              


                                            })

                                      }

                                      </div>
                                      </>
                                    )
                                   
                                   

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
    