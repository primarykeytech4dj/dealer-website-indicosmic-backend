import React, { useEffect } from "react";

import Api from "../../../../api";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialButton from "../../../../Tags/MaterialButton";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from 'react-bootstrap';
import { useState } from "react";
import Swal from "sweetalert2";
import Switch from '@mui/material/Switch';

import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import { Link } from "react-router-dom";



export default class BranchList extends React.Component{

    constructor(props){
        super(props);
        this.state = {    
          
            data:[
                 
                
                ],
            isLoading: false,
            filter:"",
            page: 0,
            pageSize: 10,
            BrachData:[],

        }
        this.apiCtrl = new Api;
        
      }

    
        
        // componentDidMount=()=>{
         
        //   this.getSliderList();
        // }
        
        componentWillMount = () => {
          this.getComapnyList();
          
        }

        componentDidUpdate(prevProps, prevState){
          // console.log('update')
         
          // if ((prevState.page !== this.state.page)||(prevState.pageSize !== this.state.pageSize)) {
          //   this.getSliderList();
          // }
            if ((prevState.page !== this.state.page)) {
              this.getComapnyList(this.state.pageSize);
          }
          if ((prevState.pageSize !== this.state.pageSize)) {
            this.getComapnyList(prevState.pageSize);
          }
          if((prevState.filter!==this.state.filter)){
            this.getComapnyList()
          }
        }
        
        
       
      
         
    
      getComapnyList=(pageSize) =>{

       
        this.setState(old => ({...old, isLoading:true}))
        var data = {filter:this.state.filter, start:this.state.page*this.state.pageSize};

       
      // this.setState(old => ({...old, data:response.data, total:response.data.iTotalRecords}))

      
        this.apiCtrl.callAxios('branch/list',data).then(response => {
            console.log("branchAPIresponse=>",response);
            
            if(response.success == true){
                //this.setState(old => ({...old, data:response.data, }))
               // this.setState(old => ({...old, data:[...old.data, ...response.data.aaData], total:response.data.iTotalRecords}))
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

      

     



      render(){

        const  handleClick = (data) => {
          //  console.log("dataproduct===",data.id)
             this.setState({BrachData: data})
           }

        const columns = [
            { field: 'sr_no', headerName: 'SR No', width: 100 },
            { field: 'branch_name', headerName: 'Branch Name', width: 190 },
          
             { field: 'is_active', headerName: 'Active', width: 100 ,renderCell: (params) => <IsActive key={params.row.id}  param={params.row} />,},
             { field: 'created_at', headerName: 'Created', width: 150 },
           
          { field: 'action', headerName: 'Action',  width: 100,  renderCell: (params) => <Action func={(e)=>{handleClick(e)}} key={params.row.id} param={params.row} />, },
          ];
        return(<>

            <BreadCrumb breadcrumb="Branch List" />
            {/* <Button  type="button" style={{ backgroundColor: '#183883',width:"139px", marginBottom: "20px", marginLeft:"47rem",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Add product</Button> */}
       
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
                <div className="col-md-3 mb-2">
                  <MaterialTextField size="small" name='search'  placeholder="Search"
                  onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}
                  />
                </div>
                <div className="col-md-3">
                  <Link><Button  type="button" style={{ backgroundColor: '#183883',width:"auto", color:"#fff"}} href="#exampleModalToggle2" data-bs-toggle="modal" size='large' >Create Branch</Button></Link> 
                </div>


              </div>
        
            <div style={{ height: '100%', width: '100%' }}>
        
            <DataGrid
                autoHeight
                rows={this.state.data}
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

           <Model brachdata={this.state.BrachData} />
           <Craete/>
            </Box>
        </>)
      }

}



function Action(props){
    const editbrachdata = (event)=>{
        props.func(props.param)
      }
    return(<>

      {/* <Button type='button'>Edit</Button>&nbsp; */}
      <IconButton aria-label="Edit Branch List"  data-bs-toggle="modal" size='small' href="#exampleModalToggle1" onClick={(e)=>{editbrachdata(e)}} > <EditIcon fontSize="inherit" /></IconButton>
      
    </>)

}

function IsActive(props){

  
 const [state,setState]=useState(props.param)
 const apiCtrl = new Api;
 console.log("peops delete=>",props)
 
//  useEffect(()=>{
//   setState({...props.params})
//  },)
 console.log("state delete=>",state)
 const deletesliderdata=(e)=>{
 // console.log("event",event.target.checked)
  setState(old=>({...old,is_active:e.target.checked?1:0}))

  const data={
   
    is_active:e.target.checked?1:0,
    slug:state.slug
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
    apiCtrl.callAxios(`branch/delete`,data).then(response => {


        if(response.success == true){
          Swal.fire({
           
               title:`Slider ${msg1} Successfully!`,
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
          });
          setTimeout(() => {
            Swal.close()
      }, 3000);
          //location.reload("/admin/slider-list")
            } else {
              Swal.fire({
                title: `Slider ${msg1} unsuccessfully!`,
                icon: "error",
                showConfirmButton: false,
                timer: 1200,
              });
              setTimeout(() => {
                Swal.close()
          }, 3000);
            }
          
        console.log('deleted res', response);

     
      });
    }else{
     // location.reload("/admin/slider-list")
     
    }
  });
}
    return(<>
        
        <div className="col-md-4 mb-4">
          {/* <FormControlLabel control={<Checkbox checked={state.is_active== "1"?true:false} onClick={deletesliderdata}  />} label={"Is Active"} /> */}
          <Switch checked={state.is_active== "1"?true:false} onClick={deletesliderdata}   fullWidth /> 
          {/* <strong>   {removeCharacter(props.name, '_')}</strong>          */}
        </div>

    </>)
}


function Craete(){

    const [state,setState]=useState({})
    const apiCtrl=new Api
  
    console.log(" branch modelstate=>",state)



    const submit=(e)=>{
        e.preventDefault();
        apiCtrl.callAxios("branch/create",state).then(response=>{
            if(response.success == true){
                Swal.fire({
                    title: "Branch",
                    text:response.message,
                    icon: "success",
                    showConfirmButton: false,
                })
            } else {
                Swal.fire({
                    title: "Branch",
                    text: response.message,
                    icon: "error",
                    showConfirmButton: false,
                })
            }

        })
        
    }

    
    
    return(
      <>


        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Create Branch</h5>
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
                        <MaterialTextField value={state.branch_name?state.branch_name:""}  name="branch_name" placeholder=" Branch Name" fullWidth onChange={(e)=>setState({branch_name:e.target.value})}/>

                    </div>

                </div>
                    
                
                </div>  

                <div className='modal-footer'>

                  <Button  type="button"  size='small' onClick={submit}>Submit</Button>
               
             

                </div>

            
            </div>
        </div>
        </div>

     
     
  
  
      </>
    )
  }

function Model(props){

    const [state,setState]=useState({})
    const apiCtrl=new Api
  //  console.log("props brach=>",props)
   
    useEffect(()=>{
       
            console.log("props brach=>",props)
   
            setState({...props.brachdata})
            // props.brachstate("")
     
   
    },[props.brachdata])
    console.log(" branch modelstate=>",state)



    const submit=(e)=>{
        e.preventDefault();
        apiCtrl.callAxios("branch/create",state).then(response=>{
            if(response.success == true){
                Swal.fire({
                    title: "Branch",
                    text: response.message,
                    icon: "success",
                    showConfirmButton: false,
                })
            } else {
                Swal.fire({
                    title: "Branch",
                    text: response.message,
                    icon: "error",
                    showConfirmButton: false,
                })
            }

        })
        
    }

    
    
    return(
      <>


        <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Update Branch</h5>
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
                        <MaterialTextField value={state.branch_name?state.branch_name:""}  name="branch_name" placeholder=" Branch Name" fullWidth onChange={(e)=>setState(old=>({...old,branch_name:e.target.value}))}/>

                    </div>

                </div>
                    
                
                </div>  

                <div className='modal-footer'>

                  <Button  type="button"  size='small' onClick={submit}>Upadte</Button>
               
             

                </div>

            
            </div>
        </div>
        </div>

     
     
  
  
      </>
    )
  }