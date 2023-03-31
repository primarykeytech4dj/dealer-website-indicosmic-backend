import React from "react";
import Api from "../../../../api";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Button  from '@mui/material/Button';

import TextEditor from "../TextEditor/Text_Editor";
import MaterialButton from "../../../../Tags/MaterialButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Switch from "@mui/material/Switch";
import axios from "axios";
import Swal from "sweetalert2";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import Editor from "../Editor/Editor";
export default class TestiMonial extends React.Component{
    constructor(props){
        super(props);
        this.state = {    
            is_active:1,
            title:null,
            priority:null,     
            image:null, 
            description:null,
            imgshow:null,

            errors:{},
            validation:{
                title:{required:true},
                priority:{required:true},     
                image:{required:true}, 
                description:{required:true}
          
           
            },
            isValid:false,
         
        }
        this.apiCtrl = new Api;
        
      }
     

      render(){

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
        

        const submitdata=(e)=>{
            e.preventDefault();
                      

                    //   data.append('name', this.state.name);

                    let errors = {};
                    let isValid = this.state.isValid;
                    Object.entries(this.state.validation).map(([key,value])=>{
             
                        
                      if((typeof this.state[key] === 'undefined') || (this.state[key] === null) ||(this.state[key] === "")) {
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
                    Object.entries(this.state).map(([index, value])=>{
                        // console.log('key', index)
                        // console.log('Value', value)
                        if((index!=="errors")&&(index!=="validation")&&(index!=="isValid")&&(index!=="imgshow")){
                        data.append(`${index}`, value);
                        }
                    })
                  
                   
                    console.log('DATA',this.state)
                    this.apiCtrl.callAxiosFile("testimonial/create-update",data,true).then((res)=>{
                        if(res.success   === true){
                                      // console.log("response=>",response)
                                       Swal.fire({
                                        title: "TestiMonial",
                                        text:"Created",
                                        icon: "success",
                                        showConfirmButton: false,
                                    })
                                    setTimeout(() => {
                                        Swal.close()
                                        this.state({
                                            title:null,
                                            priority:null,     
                                            image:null, 
                                            description:null,
                                
                                        })
                                        $('.close').trigger('click');
                                  }, 3000);
                                  
                            
                                    } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Something went wrong!',
                                    
                                    })
                                    setTimeout(() => {
                                        Swal.close()
                                        $('.close').trigger('click');
                                  }, 3000);
                                    }
                    })
                   
      
      } 

      const handleChange = (e) => {

        validation(e.target.name, e.target.value)
        console.log(e.target.value)

        if((e.target.name==="image")){
          this.setState(old=>({...old,[e.target.name] : e.target.files[0]}))
          this.setState(old=>({...old,imgshow:URL.createObjectURL(e.target.files[0])}))
        }
      }
      const handleEdit=(data)=>{
        console.log("data=>",data)

        this.setState(old=>({...old,description:data}))

      }

  
        

     

        // const onhandlechange =({val})=>{
        //     // console.log("val=>",val)
        //      this.setState(old=>({...old,description:val}))
        //    }
        return(
            <>

                {/* <BreadCrumb breadcrumb={"TestiMonial"} breadcrumbItem1='Create' /> */}

                <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                    {/* <div className="row ml-1">
                        <label><b>{"TestiMonial"}</b></label>
                    </div> */}

                    <Divider sx={{ borderColor: '#dac4c4'}} />

                    <div className="row mt-3">
                        {/* <div className="col-md-3 mb-2">
                            <MaterialTextField name="name" label="Name" fullWidth onChange={(e)=>this.setState({name : e.target.value})}/>
                             
                        </div> */}
                        <div className="col-md-4 mb-2">
                            <MaterialTextField name="title" label="Title" fullWidth  onChange={(e)=>{handleChange(e)}} 
                            value={this.state.title?this.state.title:""}
                                helperText={
                                    this.state.errors.title
                                    ? this.state.errors.title
                                    : ''
                                   }
                                   error={this.state.errors.title?true:false}
                             />
                             
                        </div>
                        <div className="col-md-4 mb-2">
                            <MaterialTextField name="priority" label="Priority" fullWidth  onChange={(e)=>{handleChange(e)}} 
                              value={this.state.priority?this.state.priority:""}
                              helperText={
                                this.state.errors.priority
                                ? this.state.errors.priority
                                : ''
                               }
                               error={this.state.errors.priority?true:false}
                             />
                             
                        </div>
                        <div className="col-md-4 mb-4">
                            {/* <FormControlLabel control={<Checkbox checked={this.state.is_active=="1"?true:false} onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}/>}   label={"Enable" } /> */}
                            <Switch checked={this.state.is_active=="1"?true:false} onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}   fullWidth />                 
                            { <strong> {"Active"} </strong>         }
                        </div>

                        <div className="col-md-4 mb-2">
                            <MaterialTextField type="file" name="image" label="Image"  fullWidth  onChange={(e)=>{handleChange(e)}} 
                              
                             helperText={
                                this.state.errors.image
                                ? this.state.errors.image
                                : ''
                               }
                               error={this.state.errors.image?true:false}
                             />
                             
                        </div>
                         {this.state.imgshow!==null?
                            <div className="col-md-4 mb-2">
                                <img  src={this.state.imgshow?this.state.imgshow:""}/>

                            </div>:""
                         }
                        
                        {/* <strong>Description</strong>

                          <div className="col-md-12">
                            <MaterialTextArea  style={{height: "118px"}} row={4} multiline label={" Description" }placeholder='Enter About your description'  fullWidth name='description'   onChange={(e)=>{handleChange(e)}}  
                             value={this.state.description?this.state.description:""}
                                 helperText={
                                    this.state.errors.description
                                    ? this.state.errors.description
                                    : ''
                                   }
                                   error={this.state.errors.description?true:false}
                            />

                          </div> */}
                             <Editor func={handleEdit} data={this.state.description?this.state.description:""}/>


                        {/* <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                        
                            <TextEditor func={onhandlechange}/>
                        
                
                        </div> */}

                    </div>
                    <Divider sx={{ borderColor: '#dac4c4'}} />
                    <div className='row mt-3'>
                    
                        <div className="col-md-3">
                            <Button style={{ backgroundColor: '#183883' }} onClick={ submitdata }>Submit</Button>
                        </div>
                    </div>
                </Box>
                            
            
            
            </>
        )
      }
}