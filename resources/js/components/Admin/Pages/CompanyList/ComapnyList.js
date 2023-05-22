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
import LanguageIcon from '@mui/icons-material/Language';
import FactoryIcon from '@mui/icons-material/Factory';
import { Button } from 'react-bootstrap';
import { useState } from "react";
import Swal from "sweetalert2";
import Switch from '@mui/material/Switch';

import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import { Link } from "react-router-dom";



export default class ComapnyList extends React.Component{

    constructor(props){
        super(props);
        this.state = {    
          
            data:[],
            isLoading: false,
            filter:"",
            page: 0,
            pageSize: 10,
            sliderData:[],

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

      
        this.apiCtrl.callAxios('company/list',data).then(response => {
            console.log("APIresponse=>",response);
            
            if(response.success == true){
                //this.setState(old => ({...old, data:response.data, }))
               // this.setState(old => ({...old, data:[...old.data, ...response.data.aaData], total:response.data.iTotalRecords}))
            //    const {aaData}=response.data
            const {data}=response
            
               if(pageSize == this.state.pageSize){
                 this.setState(old => ({...old, data:[...old.data,...data], total:response.data.iTotalRecords}))
               } else {
                 this.setState(old => ({...old, data:data, total:response.data.iTotalRecords}))
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
             this.setState({sliderData: data})
           }

        const columns = [
            { field: 'id', headerName: 'SR No', width: 100 },
            { field: 'company_name', headerName: 'Comany Name', width: 190 },
            { field: 'primary_email', headerName: 'Email', width: 200},
            { field: 'logo', headerName: 'Logo', width: 200 ,renderCell: (params) => <Images key={params.row.id}    param={params.row} />,},
            { field: 'website', headerName: 'Website', width: 200},
             { field: 'is_active', headerName: 'Active', width: 100 ,renderCell: (params) => <IsActive key={params.row.id}  param={params.row} />,},
             { field: 'created', headerName: 'Created', width: 150 },
            // { field: 'modified', headerName: 'Modified', width: 150 },
             { field: 'action', headerName: 'Action',  width: 200,  renderCell: (params) => <Action func={(e)=>{handleClick(e)}} key={params.row.id} param={params.row} />, },
          ];
        return(<>

            <BreadCrumb breadcrumb="Comapny List" />
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
                  <Link to={"/admin/company/create"}><Button  type="button" style={{ backgroundColor: '#183883',width:"auto", color:"#fff"}} size='large' >Create Company</Button></Link> 
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

          
            </Box>
        </>)
      }

}


function Action(props){
    const editSliderdata = (event)=>{
        props.func(props.param)
      }
    return(<>

      {/* <Button type='button' onClick={(e)=>{editSliderdata(e)}} >Edit</Button>&nbsp; */}
      <Link key={props.key}  to={`/admin/company/create`} state={{param:props.param}}><IconButton aria-label="Edit Company List"> <EditIcon fontSize="inherit" /></IconButton></Link>  
      <Link to={`/admin/branch`} ><IconButton aria-label="Branch Create"><FactoryIcon fontSize="inherit"/></IconButton></Link>
     <Link to={"/admin/setup/type/website"} state={{param:props.param}}> <IconButton aria-label="Web Config"><LanguageIcon fontSize="inherit"/></IconButton></Link>
    

      
    </>)

}

function IsActive(props){

 //console.log("peops=>",props.params) 
 const [state,setState]=useState(props.param)
 const apiCtrl = new Api;

 const deletesliderdata=(e)=>{
 // console.log("event",event.target.checked)
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
    apiCtrl.callAxios(`/${state.id}`,data).then(response => {


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


function Images(props){
//console.log("props imgcomanylist =>",props)
     
  // const [image,setImage]=useState()

 
  // const logos =props.param.website_config!==null?(props.param.website_config.logo!==undefined?props.param.website_config.site_settings.logo:''):"";
  // console.log("img==>",logos)
  //  setImage(logos)

//  useEffect(()=>{
//   const logos =props.param.website_config!==null?(props.param.website_config.logo!==undefined?props.param.website_config.site_settings.logo:''):"";
//   console.log("img==>",logos)
//    setImage(logos)
//  },props.param)
 
  // if(logos!==undefined){
  //  var img= atob(logos)
  
  // }
 
  // console.log("setimg=>",image)
   
    return(<>


          <div className="col-md-12">

            {/* {props.param!==undefined&&
             Object.entries(props.param).map(([key,val])=>{
             // console.log("key",key,"val1",val)
               if(key=="website_config"){
                  
               return Object.entries(val).map(([key1,val1])=>{
                     console.log("key1",key1,"val1",val1)
                     if(val1.logo!==undefined){
                       return  <img style={{width:"100%"}} className="img-fluid img-thumbnail" key={props.param.id} src={ val1.logo} alt={""} />
                     }
                    
                })
               }
             })
            } */}
             <img style={{width:"58%"}} className="img-fluid img-thumbnail" key={props.param.id} src={props.param.logo?props.param.logo:""} alt={""} />
          

          </div>
    </>)
}
