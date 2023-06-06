import React from "react";
import { DataGrid } from '@mui/x-data-grid';

import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialButton from '../../../../Tags/MaterialButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Swal from 'sweetalert2';
import Api from '../../../../api';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Products } from "./Products";

 class ProductsList extends React.Component {
    constructor(props){
      super(props)
      this.apiCtrl = new Api;
  
      this.state = {
        data : [],
        isLoading: false,
        page: 0,
        pageSize: 10,
        productData:[],
       // product_type:this.props.title,
       filter:"",
        is_service: this.props.title === 'service'?1:0
  
    }
  
    }
  
    componentWillMount = () => {
      this.getProductList();
   
    }
  //  componentDidMount=()=>{
  //   this.getProductList();
   
  //  }

    

    componentDidUpdate(prevProps, prevState){
      // console.log('update')
      if ((prevState.page !== this.state.page)||(prevProps.params !== this.props.params)) {
          this.getProductList();
      }
      if ((prevState.page !== this.state.page)) {
        this.getProductList(this.state.pageSize);
      }
      if ((prevState.pageSize !== this.state.pageSize)) {
        this.getProductList(prevState.pageSize);
      }

      if((prevState.filter!==this.state.filter)){
        this.getProductList()
      }
    }

    // componentDidUpdate = (prevProps, prevState) =>{
    //   if(prevProps.title !== this.props.title){
    //     this.getProductList()
    //   }
    //  }
  
  
    getProductList = (pageSize) =>{
      console.log("state=>",this.state)
      this.setState(old => ({...old, isLoading:true}))
       var data = {filter:this.state.filter,is_service:this.props.title=== 'service'?1:0,length:this.state.pageSize, start:this.state.page*this.state.pageSize};
      // var data = {
      //   is_service: (this.props.params.any === 'service')?1:0
      // }
      this.apiCtrl.callAxios('product/product-service-list',data).then(response => {
          console.log(response);
          
          if(response.success == true){
              //this.setState(old => ({...old, data:response.data, total:response.data.iTotalRecords}))
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
  
      const  handleClick = (data) => {
        // console.log("dataproduct===",data)
         this.setState({productData: data})
       }
  
      const columns = [
        { field: 'sr_no', headerName: 'Sr.No', width: 100 },
        { field: 'product', headerName: 'Product', width: 190 },
        { field: 'product_code', headerName: 'Product Code', width: 190 },
        // { field: 'slug', headerName: 'Slug', width: 150 },
        { field: 'base_price', headerName: 'Base Price', width: 100 },
        { field: 'is_active', headerName: 'Active', width: 150 ,renderCell: (params) => <IsActive key={params.row.id}  url={this.props.title}  param={params.row} />,},
        // { field: 'gst', headerName: 'GST', width: 150 },
        { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Action key={params.row.id} fun={handleClick} params={this.props.title} param={params.row} />, },
      ];


      // let  products =  this.props.params.any.replace(/-/g, " "); 
      //let products ="product"
      let  products =  this.props.title.replace(/-/g, " "); 
       
      var productType =   products
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
     console.log("props=>",this.props)
  
    return (
      <>
      <BreadCrumb breadcrumb={productType} />
     
      <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
      <div className="row mb-3" >  
        <div className="col-md-3"></div>   
        <div className="col-md-3"></div>
        <div className="col-md-3 mb-2">
          <MaterialTextField size="small" name='search'  placeholder="Search"
          onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}
          />
        </div>
      
        <div className="col-md-3 mb-2">
           <Button  type="button" style={{ backgroundColor: '#183883',width:"139px",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Add {productType}</Button>
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
          // checkboxSelection
          onPageChange={(newPage) => this.setState(old=>({...old, page: newPage}))}
          onPageSizeChange={(newPageSize) => this.setState(old=>({...old, pageSize: newPageSize}))}

  
          />
         
      </div>

      <Model title={this.props.title}/>
  
      
      </Box>
      </>
    );
  }
  }

export default (props) => {
  // return <ProductsList {...props}   params={useParams()}/>
  return<ProductsList {...props} params={useParams()}/>
  
}


function Action(props){

  const [state,setState]=useState(props.param)

  var url=props.params=="product"?"product":"service"
  
 

  return(<>

{/* <Button  type="button"  size='small' onClick={()=>deleteproductcategory(props.param)}>Delete</Button> */}
    {/* <Link to={{
      pathname:'/product/edit',
      state: props.param
    }} > Edit</Link> */}
    <Link key={props.key}  to={`/admin/${url}/edit`} state={{param:props.param}}><Button>Edit</Button></Link>  
    
  </>)
}


function IsActive(props){

  //console.log("peops=>",props.params) 
  const [state,setState]=useState(props.param)
  const apiCtrl = new Api;
  let  products =  props.url.replace(/-/g, " "); 
  var productType =   products
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
 
  const deleteproductdata=(e)=>{
   console.log("event",e)

   setState(old=>({...old,is_active:e.target.checked?1:0}))
 
   const data={
      id:props.param.id,
     is_active:e.target.checked?1:0
   }
  // console.log("productdeletedata",data)
 
   // apiCtrl.callAxios(`slider/delete/${state.id}`,data).then(response => {
   //   console.log("response=>",response)
   //   if(response.success == true){
     //   location.reload("/slider-list")
   //     }
     
   // })
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
     apiCtrl.callAxios("product/delete-product",data).then(response => {
 
 
         if(response.success == true){
           Swal.fire({
            
                title:`${productType} ${msg1} Successfully!`,
             icon: "success",
             showConfirmButton: false,
             timer: 1200,
           });

           setTimeout(() => {
            Swal.close()
            // location.reload(`/${props.url}-list`)
          }, 5000);
          
         
          
          location.reload(`/admin/${props.url}-list`)
             } else {
               Swal.fire({
                 title: `${productType} ${msg1} unsuccessfully!`,
                 icon: "error",
                 showConfirmButton: false,
                 timer: 1200,
               });

               setTimeout(() => {
                Swal.close()
                location.reload(`/admin/${props.url}-list`)
          }, 3000);
              
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
           <Switch checked={state.is_active== "1"?true:false} onClick={deleteproductdata}   fullWidth /> 
         </div>
 
     </>)
 }


function Model(props){

  //  console.log( "modelprops==>",props)
  // let  products =  props.params.any.replace(/-/g, " "); 
  //let products ="product"
  let  products =  props.title.replace(/-/g, " "); 
   
  var productType =   products
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

   
    return(
      <>
     
        <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered  modal-lg">
          <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Create {productType}</h5>
              <div className="row ml-1" style={{ paddingTop: '2%'}}>
                  {/* <label><b>{props.params.any} Details</b></label> */}
              </div>
              <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body m-body">
              
            <div className="row">
              
              <Products title={props.title}/>
  
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