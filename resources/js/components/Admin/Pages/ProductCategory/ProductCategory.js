import React, { useState } from "react";
import { useForm } from "react-hook-form";

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



class ProductCategory extends React.Component {

    constructor(props){
        super(props);

        this.state = 
        {

            //  id:this.props.data.id?this.props.data.id:"",

              category_name:null,
              description:null,
              hsn_code:null,
              image_name_1:null,
              imageshow:null,
             // gst:null,
              is_service:this.props.title==="service"?1:0,

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

 
    
  
     
        

        render(){
           console.log("props=>",this.props)

          //  let  products =  this.props.params.any.replace(/-/g, " "); 
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


        
          

        const handleChange = (e) => {

          validation(e.target.name, e.target.value)
          console.log(e.target.value)

          if(e.target.name==="image_name_1"){
            this.setState(old=>({...old, image_name_1 : e.target.files[0]}))
            this.setState(old=>({...old, imageshow :URL.createObjectURL(e.target.files[0])}))
          }
         
          
          // this.setState({errors: ''})
        }

        console.log()
    
           
        const prosumbmit = async (e) => {              
            e.preventDefault();            
            // var data = {
                

            //     category_name:this.state.category_name,
            //     description:this.state.description,
            //     hsn_code:this.state.hsn_code,
            //     gst:this.state.gst,
            //     is_service:this.state.isservice,
            //     is_parent:this.state.isparent,
            //     // slug:this.props.data.slug
            
            // }

            
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
              is_service:this.state.is_service

            }

            if(products=="service"){
              statedata.link = this.state.link;
              
            }
  
  

            

            Object.entries(statedata).map(([index, value])=>{
              // if((index!=="errors")&&(index!=="validation")&&(index!=="isValid")&&(index!=="imageshow")){
              //   data.append(`${index}`, value);
              // }

              data.append(`${index}`, value);
            
            })         
            //  console.log(data);
              // return;


              this.apiCtrl.callAxiosFile("product/create-product-category",data).then((response)=>{
              if(response.success == true){
                Swal.fire({
                    title: productType+" "+"Category",
                    text: "Created!",
                    icon: "success",
                    showConfirmButton: false,
                })
                setTimeout(() => {
                  Swal.close()
                  this.setState({
                    category_name:null,
                    description:null,
                    hsn_code:null,
                    image_name_1:null,
                  })
                  $('.close').trigger('click');
                  
                 }, 3000);

              } else {
                    Swal.fire({
                      title: productType+" "+"Category",
                        text: "Not Created!",
                        icon: "error",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                      Swal.close()
                      $('.close').trigger('click');
                    
                }, 3000);
                    //$('.close').trigger('click');
                    // location.reload(`/${products}-category`)
                }
              
                // console.log("CategoryCreate===>",response);
                // sessionStorage.setItem('_token', response.data.)
                
              }).catch(function (error) {
                console.log(error);
              });
              
              
        }

        const handleEdit=(data)=>{
          console.log("data=>",data)

          this.setState(old=>({...old,description:data}))

        }

             

                  
              

           console.log("state=>",this.state)
            return(
                <>
                 {/* <BreadCrumb breadcrumb="Roles" breadcrumbItem1='Create' /> */}
              
              <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
  
              {/* <div className="row ml-1">
                  <label><b>ProductCategory</b></label>
              </div> */}

              <Divider sx={{ borderColor: '#dac4c4'}}    />


           
             <div className="row mb-4">

               <div className="col-md-6 mb-3">
               
               <MaterialTextField   name="category_name"  onChange={(e)=>{handleChange(e)}}   
                 label="category Name" 
                  fullWidth 
                  value={this.state.category_name?this.state.category_name:""}
                  helperText={
                    this.state.errors.category_name
                    ? this.state.errors.category_name
                    : ''
                }
                error={this.state.errors.category_name?true:false}
                 />
               

               </div>

               {/* <div className="col-md-6 mb-3">
               
               <MaterialTextField    name="description" onChange={(e)=>{handleChange(e)}}  
                  label="Description"
                  value={this.state.description?this.state.description:""}
                  helperText={
                    this.state.errors.description
                    ? this.state.errors.description
                    : ''
                }
                error={this.state.errors.description?true:false}
                fullWidth 
               />
               

               </div> */}

               <div className="col-md-6 mb-3">
               
               <MaterialTextField    name="hsn_code"  onChange={(e)=>{handleChange(e)}}     
               label="Hsn Code"
                 fullWidth  
                 value={this.state.hsn_code?this.state.hsn_code:""}
                 helperText={
                  this.state.errors.hsn_code
                  ? this.state.errors.hsn_code
                  : ''
              }
              error={this.state.errors.hsn_code?true:false}
              />
               

               </div>
               {products=="service"?<>

                <div className="col-md-6 ">
                
                  <MaterialTextField placeholder="Enter URL"   name="link"  onChange={(e)=>this.setState({link : e.target.value})} label="Link"  fullWidth  />
                  

                </div>
               </>:""}

              
        
                {/* <div className="col-md-6">
                <FormControlLabel control={<Checkbox checked={this.state.is_service===1?true:false}   onChange={(e)=>this.setState({is_service:e.target.checked?1:0})}/>} label="Is Service" />
                    
                 </div> */}
                {/* <div className="col-md-6">
                <FormControlLabel control={<Checkbox checked={this.state.is_parent?this.state.is_parent:""}   onChange={(e)=>this.setState({is_parent:e.target.checked?1:0})}/>} label="Is Parent" />
                    
                </div> */}

             </div>

            <div className="row">

              <div className="col-md-6 mb-3">
               
               <MaterialTextField    name="image_name_1" type="file" 
                 onChange={(e)=>{handleChange(e)}}    
                  label="Image 1"  fullWidth  
                  
                  helperText={
                   this.state.errors.image_name_1
                   ? this.state.errors.image_name_1
                   : ''
                  }
                  error={this.state.errors.image_name_1?true:false}
               />
                
 
              </div>
              {this.state.imageshow!==null?
                 <div className="col-md-4">
                 <img src={this.state.imageshow?this.state.imageshow:""}/>
               </div>:""
              }
              


            
            </div>

            <Editor func={handleEdit}/>

          
           
             
            <div className="row mt-2">
                <div className="col-md-12 d-flex " style={{justifyContent:"right"}}>

                  
                    <MaterialButton style={{ backgroundColor: '#183883' , border: '1px solid #183883',height:55}} name="Submit" text="Create"  onClick={prosumbmit} />

                    
                </div>
            </div>

           
            
             </Box>
                </>
            )
        }
}







export default ProductCategory



