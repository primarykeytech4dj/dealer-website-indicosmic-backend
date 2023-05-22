import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import MaterialButton from '../../../../Tags/MaterialButton'
import { Button } from 'react-bootstrap';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import MaterialSelect from '../../../../Tags/MaterialSelect'
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams } from 'react-router-dom';




import Api from '../../../../api';
import Swal from "sweetalert2";


import { ErrorMessage } from "@hookform/error-message";
import { event } from "jquery";
import swal from "sweetalert";
import Editor from "../Editor/Editor";
import ProductCategory from "./ProductCategory";

class ProductCategoryList extends React.Component{

    constructor(props){
        super(props);

        this.state = 
        {
          
            data : [],
            isLoading: false,
            filter:"",
            page: 0,
            pageSize: 10,
            productCategoryData:[],

        }


        this.apiCtrl = new Api;

     
    }

    componentWillMount = () => {
        this.getProductcategoryList();
    }

    componentDidUpdate = (prevProps, prevState) =>{
      if(prevProps.params !== this.props.params){
        this.getProductcategoryList();
      }
      if ((prevState.page !== this.state.page)) {
        this.getProductcategoryList(this.state.pageSize);
      }
      if ((prevState.pageSize !== this.state.pageSize)) {
        this.getProductcategoryList(prevState.pageSize);
      }
      if((prevState.filter!==this.state.filter)){
        this.getProductcategoryList()
      }

     }

    getProductcategoryList = (pageSize) =>{

        this.setState(old => ({...old, isLoading:true}))
        var data = {
          is_service: (this.props.title === 'service')?1:0,
          length:this.state.pageSize, start:this.state.page*this.state.pageSize,
          filter:this.state.filter

        }
        this.apiCtrl.callAxios('product/product-category-list',data).then(response => {
            console.log(response);
            
            if(response.success == true){
               // this.setState(old => ({...old, data:response.data, total:response.data.iTotalRecords}))
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
      // console.log("propscate==>",this.props)
      const  handleClick = (data) => {
       // console.log("dataproduct===",data)
        this.setState({productCategoryData: data})
      }

      const handleAddCategory = () => {
        this.setState({productCategoryData: {}})
      }

        const columns = [
            { field: 'sr_no', headerName: 'Sr.No', width: 100 },
            { field: 'category_name', headerName: 'Category Name', width: 190 },
            { field: 'hsn_code', headerName: 'HSN Code', width: 190 },
            { field: 'description', headerName: 'Description', width: 150 },
            // { field: 'is_service', headerName: 'Is Service', width: 150 },
            // {field:"link",headerName:'Link',width:190,renderCell:(params) => params.row.link !== null ? <span>{params.row.link}</span>: ''},
             {field:"link",headerName:'Link',width:190,renderCell:(params) => params.row.link !== null ?  <a href={params.row.link}>{params.row.link}</a>: ''},
            { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Editbutton fun={handleClick}  key={params.row.id} param={params.row} />, },
           
        ];

        // let  products =  this.props.params.any.replace(/-/g, " "); 
        //let products ="product"

          let  products =  this.props.title.replace(/-/g, " "); 
        var productType =   products
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        console.log("title=>",products)
          


       
        return (
            <>
             <BreadCrumb breadcrumb={productType+"Category"} breadcrumbItem1='list' />
              
              <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                {/* <div className="row" style={{textAlign:"right", width:"100%", display:'block'}}> */}
                <div className="row" >
                  <div className="col-md-3"></div>   
                  <div className="col-md-3"></div>
                  <div className="col-md-3 mb-2">
                    <MaterialTextField size="small" name='search'  placeholder="Search"
                    onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}
                    />
                  </div>
                  <div className="col-md-3 mb-2">
                    <Button  type="button" onClick={handleAddCategory} style={{ backgroundColor: '#183883',width:" 162px", height:"39px",fontSize: "small",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >{"Add"+" "+productType+" "+"Category"}</Button>

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
            </Box>
            < Model title={this.props.title}/>
            <ProductCategoryEdit title={this.props.title} params={this.state.productCategoryData} />
          
            
            </>
          );
        
    }

}


export default   ProductCategoryList

// export default (props) => {
//   return <ProductCategoryList {...props}   params={useParams()}/>
  
// }



function Editbutton(props){ 
//  apiCtrl = new Api;
const  apiCtrl = new Api;

  const editProductcatdata = (event)=>{
  props.fun(props.param)
  
   
   
 }

 const deleteproductcategory=(event)=>{
    const  data={
      id:event.id,
      is_active:event.is_active
    }
    // data.push({})
    console.log("data",data)


    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.value) {
        apiCtrl.callAxios("product/delete-product-category", data).then(response => {
          // Swal.fire({
          //   title: 'Deleted successfully',
          //   showConfirmButton: false,
          //   timer: 1200,
          // });


          if(response.success == true){
            Swal.fire({
              title: 'Deleted successfully',
              icon: "success",
              showConfirmButton: false,
              timer: 1200,
            });
            setTimeout(() => {
              Swal.close()
             
        }, 3000);
            
              } else {
                Swal.fire({
                  title: 'Deleted unsuccessfully!',
                  icon: "error",
                  showConfirmButton: false,
                  timer: 1200,
                });
                setTimeout(() => {
                  Swal.close()
                
            }, 3000);
                
              }
            
          console.log('deleted res', response);

         // this.getAllproduct();
        });
      }
    });


 }
 
 return (  
   <>

            <Button  type="button"  data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editProductcatdata}>Edit</Button>&nbsp;&nbsp;
            <Button  type="button"  size='small' onClick={()=>deleteproductcategory(props.param)}>Delete</Button>
          
          
</>
                    

);



}



function Model(props){

    console.log( "model-->",props)
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
          <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">{"Create"+" "+ productType +" "+"Category"}</h5>
              <div className="row ml-1" style={{ paddingTop: '2%'}}>
                  {/* <label><b>{props.params.any} Details</b></label> */}
              </div>
              <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body m-body">
              
            <div className="row">
            <ProductCategory  title={props.title} />
  
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


class ProductCategoryEdit extends React.Component {

    constructor(props){
        super(props);

        this.state = 
        {

            //  id:this.props.data.id?this.props.data.id:"",
             id:null,
            category_name:null,
            description:null,
            hsn_code:null,
            image_name_1:null,
            imageshow:"",
           // gst:null,

            errors:{},
            validation:{
              category_name:{required:true},
              description:{required:true},     
              hsn_code:{required:true}, 
              image_name_1:{required:true},
                
           
            },
            isValid:false,

             
             
             
        

        }


        this.apiCtrl = new Api;

      

    }

    componentDidUpdate(prevProps,prevState){
      if(prevProps.params.id !== this.props.params.id){
        console.log('Propps', this.props.params)
        this.setState(this.props.params)
      } 
    }

     
    
  
     
        

        render(){
        //   let  products =  this.props.param.any.replace(/-/g, " "); 
          //let products ="product"
          let  products =  this.props.title.replace(/-/g, " "); 
          
          var productType =   products
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

          const validation = (fieldName, fieldValue) => {
            
            let error={}
            let isValid = true;
            let isMax = 1000;
            if(typeof this.state.validation[fieldName] !== "undefined"){
                Object.entries(this.state.validation[fieldName]).map(([key,value])=>{
             
                    let temp =  fieldName.replace(/_/g, " "); 
                    var name = temp
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
              
                    if(key === 'required'){
                        if((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null)){
                            error[fieldName] = `${name} Field is required`
                            isValid = false;
                        } 
                    } else if(key === 'min'){
                        if(fieldValue.length < value){
                            error[fieldName] = `${name} must be more than ${value} characters`
                            isValid = false;
                        }
                    } else if(key === 'max'){
                        if(fieldValue.length > value){
                            error[fieldName] = `${name} must be less than ${value} characters`
                            isMax = value;
                            isValid = false;
                        }
                    } else if(key === 'type'){
                        if(value === 'alpha'){
                            if(!fieldValue.match(/^[A-Za-z\s]*$/)){
                                error[fieldName] = `${name} must be String characters`
                                isValid = false;
                            }
                        } else if(value === 'AlphaNumeric'){
                            if(!fieldValue.match(/^[A-Za-z0-9,-.\s]*$/)){
                                error[fieldName] = `${name} must be String Alpha Numeric`
                                isValid = false;
                            }
                        } else if(value === 'Numeric'){
                            if(!fieldValue.match(/^[0-9]*$/)){
                                error[fieldName] = `${name} must be String Numeric`
                                isValid = false;
                            }
                        } else if(value === 'email'){
                            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} must be in Email format`
                                isValid = false;
                            }
                        } 
                           
                    }
                    if(isValid == true) {
                        
                        error[fieldName] = '';
                    }
                })
                this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
            }
            if(isMax >= fieldValue.length){
               this.setState(old=>({...old,[fieldName]: fieldValue } ))
            }
        }

        
         
          
           
            const prosumbmit = async (e) => {
               
                e.preventDefault();               
                


                        
              let errors = {};
              let isValid = this.state.isValid;
              Object.entries(this.state.validation).map(([key,value])=>{
    
                
                if((this.state[key] === null) ) {
                    let temp =  key.replace(/_/g, " "); 
                    var name = temp
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
    
                    if(value.required === true){
                        errors[key] = `${name} Field is Required`;
                        isValid = false;
                    }
                } else {
                    errors[key] = '';
                    isValid = true;
                }
                this.setState(old=>({
                    ...old,
                    errors:errors
                })) 
            })
    
            var count = 0;
            Object.entries(errors).map(([key, value])=>{
                if(value !== ''){
                    count += 1;
                }
            })
            
            if(count>0){
                return false;
            }
              
                var data = new FormData();
                const statedata={

                  category_name:this.state.category_name,
                  description:this.state.description,
                  hsn_code:this.state.hsn_code, 
                  image_name_1:this.state.image_name_1,
                  id:this.state.id,
                  is_service:this.state.is_service

                }

                if(products=="service"){
                  statedata.link = this.state.link;
                 
               }

                

                Object.entries(statedata).map(([index, value])=>{
                  // if((index!=="errors")&&(index!=="validation")&&(index!=="isValid")){
                  //   data.append(`${index}`, value);
                  // }
                  data.append(`${index}`, value);
                
                })      
                
                 //console.log(data);
                 // return;


                 this.apiCtrl.callAxiosFile("product/create-product-category",data,true).then((response)=>{
                  if(response.success == true){
                    Swal.fire({
                        title: productType+" "+"Category",
                        text: "Updated",
                        icon: "success",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                      Swal.close()
                      $('.close').trigger('click');
                     // location.reload("/admin/product-category")
                }, 3000);
                    

                    
                } else {
                    Swal.fire({
                      title: productType+" "+"Category",
                        text: "Not Updated",
                        icon: "error",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                      Swal.close()
                      $('.close').trigger('click');
                      
                }, 3000);
                }
              
                console.log("CategoryUpdate===>",response);
                // sessionStorage.setItem('_token', response.data.)
                
              }).catch(function (error) {
                console.log(error);
              });               
               
                



                  
            } 

             // console.log("productcategoryeditdataprps--",this.props)
               
              //console.log("this State--",this.state)

              const handleChange = (e) => {

                validation(e.target.name, e.target.value)
                console.log(e.target.value)
      
                if(e.target.name==="image_name_1"){
                  this.setState(old=>({...old, image_name_1 : e.target.files[0]}))
                  this.setState(old=>({...old,imageshow:URL.createObjectURL(e.target.files[0])}))

                }
              }

              const handleEdit=(data)=>{
                console.log("data=>",data)
      
                this.setState(old=>({...old,description:data}))
      
              }
      

            
               
            return(
                <>
               <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">{productType+" " +"Category "+" "+ "Update"}</h5>
              <div className="row ml-1" style={{ paddingTop: '2%'}}>
                  {/* <label><b>{props.params.any} Details</b></label> */}
              </div>
              <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body m-body">
              
            <div className="row">


            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                
                {/* <div className="row ml-1">
                    <label><b>ProductCategory</b></label>
                </div> */}

                <Divider sx={{ borderColor: '#dac4c4'}}    />



              <div className="row mb-4">

                <div className="col-md-6 ">
                
                <MaterialTextField  value={this.state.category_name?this.state.category_name:""}  name="category_name"  onChange={(e)=>{handleChange(e)}}   
                 label="category Name"
                   fullWidth 
                   helperText={
                    this.state.errors.category_name
                    ? this.state.errors.category_name
                    : ''
                  }
                error={this.state.errors.category_name?true:false}

                />
                

                </div>

                {/* <div className="col-md-6">
                
                <MaterialTextField  value={this.state.description?this.state.description:""}  
                 name="description"   onChange={(e)=>{handleChange(e)}}    label="Description" 
                  fullWidth

                  helperText={
                    this.state.errors.description
                    ? this.state.errors.description
                    : ''
                  }
                  error={this.state.errors.description?true:false}

                 />
                

                </div> */}
                <div className="col-md-6 mb-2">
                
                <MaterialTextField  value={this.state.hsn_code?this.state.hsn_code:""}  name="hsn_code"  
                 onChange={(e)=>{handleChange(e)}}  
                   label="Hsn Code"  fullWidth 
                   helperText={
                    this.state.errors.hsn_code
                    ? this.state.errors.hsn_code
                    : ''
                  }
                  error={this.state.errors.hsn_code?true:false}

                   
                 />
                

                </div>
              </div>

              <div className="row ">

                

                {products=="service"?<>

                <div className="col-md-6 mb-2 ">
                
                  <MaterialTextField placeholder="Enter URL"   name="link"  onChange={(e)=>this.setState({link : e.target.value})} label="Link"  fullWidth  />
                  

                </div>
               </>:""}


                {/* <div className="col-md-6 ">
                
                <MaterialTextField  value={this.state.gst?this.state.gst:""}   name="gst"  onChange={(e)=>this.setState({gst : e.target.value})} label="Gst"  fullWidth  />
                

                </div> */}
              </div>


              <div className="row">
                  {/* <div className="col-md-6">
                  <FormControlLabel control={<Checkbox   checked={this.state.is_service== "1"?true:false}  onChange={(e)=>this.setState({is_service:e.target.checked?1:0})}/>} label="Is Service" />
                      
                  </div> */}
                  {/* <div className="col-md-6">
                  <FormControlLabel control={<Checkbox checked={this.state.is_parent?this.state.is_parent:""}   onChange={(e)=>this.setState({is_parent:e.target.checked?1:0})}/>} label="Is Parent" />
                      
                  </div> */}
                  <div className="col-md-6 mt-1">
               
                    <MaterialTextField    name="image_name_1" type="file"    onChange={(e)=>{handleChange(e)}} 
                       label="Image 1"  fullWidth
                       helperText={
                        this.state.errors.image_name_1
                        ? this.state.errors.image_name_1
                        : ''
                      }
                      error={this.state.errors.image_name_1?true:false}
    

                     />
               

                   </div>

                   {this.state.imageshow==""?
                    <div className="col-md-4 mb-2">
                    <img  style={{width:"58px",marginLeft:"2px"}} src={this.state.image_name_1?this.state.image_name_1:""} />
                    </div>:
                     <div className="col-md-4 mb-2">
                     <img  style={{width:"58px",marginLeft:"2px"}} src={this.state.imageshow?this.state.imageshow:""} />
                     </div>

                     }

              </div>

              <Editor func={handleEdit} data={this.state.description?this.state.description:""}/>


              
              <div className="row mt-2">
                  <div className="col-md-12 d-flex " style={{justifyContent:"right"}}>

                    
                      <MaterialButton style={{ backgroundColor: '#183883' , border: '1px solid #183883',height:55}} name="Submit" text="Update"  onClick={prosumbmit} />

                      
                  </div>
              </div>



          </Box>
         
  
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
}