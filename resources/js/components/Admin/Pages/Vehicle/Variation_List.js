import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider } from '@mui/material';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialButton from '../../../../Tags/MaterialButton';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Switch from "@mui/material/Switch";
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import Api from "../../../../api";
import { VariationCreate } from "./Variation_Create";
import { useState } from "react";



export default class VariationList extends React.Component {
    constructor(props){
      super(props)
      this.apiCtrl = new Api;
  
      this.state = {
        data : [],
        isLoading: false,
        page: 0,
        pageSize: 10,
        variationData:[],
        
  
    }
  
    }
  
    componentWillMount = () => {
      this.getProductList();
    }

    componentDidUpdate(prevProps, prevState){
      // console.log('update')
      if ((prevState.page !== this.state.page) ) {
        this.getProductList();
      } 
    
    }
   
  
    getProductList = () =>{
  
      this.setState(old => ({...old, isLoading:true}))
      var data = {length:this.state.pageSize, start:this.state.page*this.state.pageSize};
      this.apiCtrl.callAxios('variation/list',data).then(response => {
          console.log("rs==>",response);
          
          if(response.success == true){
              this.setState(old => ({...old, data:response.data,}))
  
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
  
  
      const  handleClick = (data) => {
        // console.log("dataproduct===",data)
         this.setState({variationData: data})
       }
     
  
      const columns = [
        { field: 'id', headerName: 'Sr,No', width: 100 },
        { field: 'name', headerName: 'Name', width: 190 },
        { field: 'value', headerName: 'Value', width: 190 },
        { field: 'remark', headerName: 'Remark ', width: 100 },     
        { field: 'datatype', headerName: 'Data Type ', width: 100 },
        { field: 'is_active', headerName: 'Active', width: 150 ,renderCell: (params) => <IsActive key={params.row.id}  param={params.row} />,},
        { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Action fun={handleClick} param={params.row} />, },
      ];
  
  
    return (
      <>
      <BreadCrumb breadcrumb="Variation List" />
     
      <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
     
      <div style={{ height: '100%', width: '100%' }}>
      <Button  type="button" style={{ backgroundColor: '#183883',width:"auto", marginBottom: "20px", marginLeft:"83%",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Create Variation</Button>
     
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

  
          />
         
      </div>
  
       <Model />
       <VariationEdit params={this.state.variationData}/>
      </Box>
      </>
    );
  }
  }

  function Action(props){ 
    
    const editProductdata = (event)=>{
      props.fun(props.param)
    }
  
  
       
    return(
        
      <>
      <Button type='button' data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editProductdata} >Edit</Button>&nbsp;
      
  
      </>
        
    );
  }

  function IsActive(props){
    const [state,setState]=useState(props.param)
    const apiCtrl=new Api;
    const deletestestimonialdata=(e)=>{
      console.log("event",e.target.checked?1:0)
       setState(old=>({...old,is_active:e.target.checked?1:0}))
     
       const data={
        
         is_active:e.target.checked?1:0,
         id:state.id
       }
  //    console.log("productdeletedata",data)

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


      Swal.fire({
        title: 'Are you sure?',
        html: `${msg}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00B96F',
        cancelButtonColor: '#d33',
        // confirmButtonText: 'Yes, De-Activated!',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          apiCtrl.callAxios(`variation/delete`,data).then(response => {
    
            if(response.success == true){
              Swal.fire({
                   title:`Variation ${msg1}  Successfully!`,
                icon: "success",
                showConfirmButton: false,
                timer: 1200,
              });
              setTimeout(() => {
                Swal.close()
                // location.reload("/variation-list")
                
          },5000);
              
                } else {
                  Swal.fire({
                    title: `Variation ${msg1}  unsuccessfully!`,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1200,
                  });
                  setTimeout(() => {
                    Swal.close()
                    
              },5000);
                }
              
            console.log('deleted res', response);
    
         
          });
        }
        // location.reload("/variation-list")
        
      });
     
      //  apiCtrl.callAxios(`testimonial/delete/${state.id}`,data).then(response => {

      //   console.log("res=>",response)
      //    if(response.success == true){
      //       location.reload("/testimonial-list")
      //      }//else {
     
      //   //      alert()
      //   //    }
         
      //  })
    }


    return(<>

      <div className="col-md-4 mb-4">
      {/* <FormControlLabel control={<Checkbox checked={state.is_active== "1"?true:false} onClick={deletesliderdata}  />} label={"Enable"} /> */}
      <Switch checked={state.is_active== "1"?true:false} onClick={deletestestimonialdata}   fullWidth /> 
      </div>
    </>)
  }
  


      
function Model(props){
    // var id=props.userid.id
    // console.log("id=====>",id)
   // console.log("propsinmodel----->",props)
   //console.log(props.eventid)
    return(
      <>
     
        <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
          <div className="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Variation Create</h5>
              <div className="row ml-1" style={{ paddingTop: '2%'}}>
                  {/* <label><b>{props.params.any} Details</b></label> */}
              </div>
              <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body m-body">
              
            <div className="row">
              {/* <AddUsers  params={this.props.params}  /> */}
              <VariationCreate/>
  
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


class VariationEdit extends React.Component {
  constructor(props){
    super(props);
    this.apiCtrl = new Api;
    this.state = {
      is_active:"1",
     
    }
  }

 

  componentDidUpdate(prevProps,prevState){
    if(prevProps.params.id !== this.props.params.id){
      console.log('Propps', this.props.params)
      this.setState(this.props.params)
    } 
    //console.log("props=>",this.props)
  }

  render(){

      const submitdata=(e)=>{
          e.preventDefault();

          const data={
              id:this.state.id,
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
                              text:res.message,
                              icon: "success",
                              showConfirmButton: false,
                          })
                          setTimeout(() => {
                              Swal.close()
                            
                              
                        }, 3000);
                        
                  
                          } else {
                          Swal.fire({
                            title: "Variation",
                            text:res.message,
                            icon: "error",
                            showConfirmButton: false,
                          
                          })
                          setTimeout(() => {
                              Swal.close()
                        }, 3000);
                          }
          })
      }

     // console.log("props=>",this.props)
      return(<>


        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered  modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row ml-1" style={{ paddingTop: '2%'}}>
                      <label><b>Variation Update</b></label>
                    
                </div>
                <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div className="modal-body m-body">
                
                <div className="row">

            
          
                  <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                      <div className="row">

                          <div className="col-md-4 mb-4">
                              <MaterialTextField name="name" label="Name" disabled={true} fullWidth  
                              value={this.state.name?this.state.name:""}
                              onChange={(e)=>this.setState({name:e.target.value})}
                                  
                              />
                                  
                          </div>
                          <div className="col-md-4 mb-4">
                              <MaterialTextField name="value" label="Vlaue"  disabled={true} fullWidth  
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
                          
                              onChange={(e)=>this.setState({vehicle_type_id:e.target.vehicle_type_id
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
                              <Button style={{ backgroundColor: '#183883' }} onClick={ submitdata }>Update</Button>
                          </div>
                      </div>
                  </Box>

                </div>
              </div>
            </div>
          </div>
        </div>

      </>)
  }
}



  
  