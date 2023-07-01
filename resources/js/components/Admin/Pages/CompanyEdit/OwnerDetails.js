import React from "react";
import { Box, Divider } from "@mui/material";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Api from "../../../../api";
import MaterialButton from "../../../../Tags/MaterialButton";
export class OwnerDetails extends React.Component {
    constructor(props){
      super(props);
      this.state = {

        admindetails:{
            ...this.props.data
          
           
        },
      
       
        errors:{}, 
        validation:{
            first_name:{required:true, type:'alpha'}, 
             middle_name:{required:false, type:'alpha'}, 
            surname:{required:true, type:'alpha'},
            contact_1:{required:true, min:10, max:10,type:'numeric'}, 
             contact_2:{required:true, min:10, max:10, type:'numeric'}, 
            primary_email:{required:true,min:6, type:'email'},  
            secondary_email:{required:false,min:6, type:'email'},  
           
           
           

            

        },
        isValid:false,
        
      }
      this.apiCtrl = new Api;
    
     
    }

    componentDidUpdate = (prevProps, prevState) => {
        
        if (prevState.admindetails !== this.state.admindetails) {
            this.props.func({...this.state.admindetails})
            
        }
    }

    render(){
       


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
                this.setState(old => ({...old,admindetails:{...old.admindetails,[fieldName]: fieldValue} }) ) 
                 
            }

          
           
        }



        const next=()=>{


            let errors = {};
            let isValid = true;
          let fieldValue = '';

            Object.entries(this.state.validation).map(([fieldName, value])=>{
              fieldValue = (typeof this.state.admindetails[fieldName] !== 'undefined') ? ( this.state.admindetails[fieldName]!==null?this.state.admindetails[fieldName]:"")  : '';
          
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

            this.props.funcnext("3")


        }


        const handleChange=(e)=>{
            validation(e.target.name,e.target.value)

            //this.setState(old=>({...old,[e.target.name]:e.target.value}))

         this.props.func({...this.state.admindetails})

        }

        return(<>
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row mb-2">
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="first_name" value={this.state.admindetails.first_name?this.state.admindetails.first_name:""}  label="First Name" onChange={handleChange} fullWidth
                            helperText={
                                this.state.errors.first_name
                                ? this.state.errors.first_name
                                : ''
                               }
                               error={this.state.errors.first_name?true:false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="middle_name" value={this.state.admindetails.middle_name?this.state.admindetails.middle_name:""} label="Middle Name" onChange={handleChange} fullWidth
                          helperText={
                            this.state.errors.middle_name
                            ? this.state.errors.middle_name
                            : ''
                           }
                           error={this.state.errors.middle_name?true:false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="surname" value={this.state.admindetails.surname?this.state.admindetails.surname:""} label="Surname" onChange={handleChange} fullWidth
                          helperText={
                            this.state.errors.surname
                            ? this.state.errors.surname
                            : ''
                           }
                           error={this.state.errors.surname?true:false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="primary_email" value={this.state.admindetails.primary_email?this.state.admindetails.primary_email:""} label="Primary Email" onChange={handleChange} fullWidth
                          helperText={
                            this.state.errors.primary_email
                            ? this.state.errors.primary_email
                            : ''
                           }
                           error={this.state.errors.primary_email?true:false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField name="secondary_email" value={this.state.admindetails.secondary_email?this.state.admindetails.secondary_email:""} label="Secondary Email" onChange={handleChange} fullWidth
                          helperText={
                            this.state.errors.secondary_email
                            ? this.state.errors.secondary_email
                            : ''
                           }
                           error={this.state.errors.secondary_email?true:false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField type="number" value={this.state.admindetails.contact_1?this.state.admindetails.contact_1:''} name="contact_1" label="Conatact 1" onChange={handleChange} fullWidth
                            helperText={
                                this.state.errors.contact_1
                                ? this.state.errors.contact_1
                                : ''
                               }
                               error={this.state.errors.contact_1?true:false}
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField type="number" value={this.state.admindetails.contact_2?this.state.admindetails.contact_2:""} name="contact_2" label="Contact 2 (WhatsApp No)" onChange={handleChange} fullWidth
                             helperText={
                                this.state.errors.contact_2
                                ? this.state.errors.contact_2
                                : ''
                               }
                               error={this.state.errors.contact_2?true:false}
                        />

                    </div>

                </div>
                <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  name="submit" text="Next" onClick={next}/>
                </div>
            </Box>

          

          
        </>)

        
    }


}