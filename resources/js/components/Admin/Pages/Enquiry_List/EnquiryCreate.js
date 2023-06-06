import React from "react";
import { Box } from "@mui/material";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Editor from "../Editor/Editor";
import MaterialButton from "../../../../Tags/MaterialButton";

import Api from "../../../../api";
import Swal from "sweetalert2";

  
class EnquiryCreate extends React.Component {
  
    constructor(props) {
    
     
      super(props);
        
      
        this.state = {

            errors:{}, 
            validation:{
                name:{required:true, type:'alpha'}, 
            
                phone:{required:true, min:10, max:10,type:'numeric'}, 
            
                email:{required:true,min:6, type:'email'},  
                remark:{required:true, type:'alpha'}, 
            
            
            

                

            },
            isValid:false,
        
        }
        this.apiCtrl = new Api;
        
     
    }
    
   
    
    render() {
       
        const validation = (fieldName, fieldValue) => {
            // console.log("fieldname",fieldName,"fieldvalue",fieldValue)
            
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
                        if(((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null))  && (value)){
                            error[fieldName] = `${name} Field is required`
                            isValid = false;
                        } 
                    } else if(key === 'min'){
                        if(fieldValue.length < value){
                            error[fieldName] = `${name} Is Invalid`
                            isValid = false;
                        }
                    } else if(key === 'max'){
                        if(fieldValue.length > value){
                            error[fieldName] = `${name} Is Invalid`
                            isMax = value;
                            isValid = false;
                        }
                    } else if(key === 'type'){
                        if(value === 'alpha'){
                            if(!fieldValue.match(/^[A-Za-z\s]*$/)){
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        } else if(value === 'AlphaNumeric'){
                            if(!fieldValue.match(/^[A-Za-z0-9,-.\s]*$/)){
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        } else if(value === 'Numeric'){
                            if(!fieldValue.match(/^[0-9]*$/)){
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        } else if(value === 'email'){
                            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        } 
                        else if(value === 'pan'){
                            let reg = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }
                        }else if(value == "aadhar"){
                            let reg =/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }

                        }else if(value == "gst"){
                            let reg =/^[0-9]{2}[a-zA-Z]{3}[cphfatbljgCPHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1}$/;
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} Is Invalid`
                                isValid = false;
                            }

                        }


                           
                    }
                    if(isValid) {
                        
                        error[fieldName] = '';
                    }
                })
                // console.log("erroe=>",error)    
                this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
            }
           
            
            if(isMax >= fieldValue.length){
                this.setState(old => ({...old,[fieldName]: fieldValue} ) ) 
                 
            }

          
           
        }
        const handleChange=(e)=>{
            validation(e.target.name,e.target.value)
        }

        const handleEdit=(data)=>{
           // console.log("data=>",data)
  
            this.setState(old=>({...old,description:data}))
  
        }

        const submit=()=>{
            let errors = {};
            let isValid = true;
          let fieldValue = '';

            Object.entries(this.state.validation).map(([fieldName, value])=>{
              fieldValue = (typeof this.state[fieldName] !== 'undefined') ? ( this.state[fieldName]!==null?this.state[fieldName]:"")  : '';
          
                if(typeof this.state.validation[fieldName] !== "undefined"){
                    Object.entries(this.state.validation[fieldName]).map(([key,value])=>{
                        let temp =  fieldName.replace(/_/g, " "); 
                        var name = temp
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                  
                        if(key === 'required' ){
                            if(((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null) ) && (value)){
                                errors[fieldName] = `${name} Field is required`
                                isValid = false;
                            } 
                        } 
                        if(isValid) {
                            
                            errors[fieldName] = '';
                        }
                 
                    })
                    // console.log("erroe=>",errors)    
                    this.setState(old=>({...old,errors:{ ...old.errors, ...errors}})) 
                }
                
            })


    
            var count = 0;
            Object.entries(errors).map(([key, value])=>{
                if(value !== ''){
                    count += 1;
                }
            })
            // console.log("count=>",count)  
            console.log("erroe=>",errors)          
            if(count>0){
               
                return false;
            }

            const data={
                name:this.state.name,
                phone:this.state.phone,
                email:this.state.email,
                remark:this.state.remark,
                description:this.state.description,
                enquiry_type:"enquiry"

            }

            this.apiCtrl.callAxios("enquiry/create-update",data).then(res=>{
                if(res.success == true){
                    Swal.fire({
                        title:"Enquiry",
                        text: res.message,
                        icon: "success",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                      Swal.close()
                      
                      
                     }, 3000);
    
                  } else {
                        Swal.fire({
                          title:"Enqiry",
                          text: res.message,
                            icon: "error",
                            showConfirmButton: false,
                        })
                        setTimeout(() => {
                          Swal.close()
                          
                    }, 3000);
                        //$('.close').trigger('click');
                        // location.reload(`/${products}-category`)
                    }
            })
        }


        return(<>

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <MaterialTextField label={"Name"} name={"name"} onChange={handleChange}
                           helperText={
                            this.state.errors.name
                            ? this.state.errors.name
                            : ''
                           }
                           error={this.state.errors.name?true:false}
                        />

                    </div>
                    <div className="col-md-3 mb-3">
                        <MaterialTextField label={"Email"} name={"email"}  onChange={handleChange}
                           helperText={
                            this.state.errors.email
                            ? this.state.errors.email
                            : ''
                           }
                           error={this.state.errors.email?true:false}
                        />

                    </div>
                    <div className="col-md-3 mb-3">
                        <MaterialTextField label={"Phone"} name={"phone"}  onChange={handleChange}
                           helperText={
                            this.state.errors.phone
                            ? this.state.errors.phone
                            : ''
                           }
                           error={this.state.errors.phone?true:false}
                        />

                    </div>
                    <div className="col-md-3 mb-3">
                        <MaterialTextField label={"Remark"} name={"remark"}  onChange={handleChange}
                          helperText={
                            this.state.errors.remark
                            ? this.state.errors.remark
                            : ''
                           }
                           error={this.state.errors.remark?true:false}
                        />

                    </div>
                    <div className="col-md-12 mb-3">
                        <Editor func={handleEdit}/>

                    </div>

                </div>
                <div className="row mt-2">
                    <div className="col-md-12 d-flex " style={{justifyContent:"right"}}>

                    
                        <MaterialButton style={{ backgroundColor: '#183883' , border: '1px solid #183883',height:55}} name="Submit" text="Create"  onClick={submit} />

                        
                    </div>
                </div>


            </Box>
        </>)
    }
  }
    
  export default EnquiryCreate;