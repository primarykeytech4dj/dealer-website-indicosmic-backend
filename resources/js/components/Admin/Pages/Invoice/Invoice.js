import React, { useEffect } from "react";
import { Box, Divider } from '@mui/material';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { SearchDropdown } from "../../../../Tags/Searchabledropdown";
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import MaterialButton from "../../../../Tags/MaterialButton";
import TextEditor from "../TextEditor/Text_Editor";
import { useState } from "react";
import { Button } from "react-bootstrap";



import './Invoice.css'
import Swal from "sweetalert2";
import DatePickers from "../../../../Tags/DatePicker";
import { object } from "prop-types";
import Api from "../../../../api";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import SearchIcon from '@mui/icons-material/Search';
import { event } from "jquery";



import IconButton from '@mui/material/IconButton';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default class Invoice extends React.Component{
    constructor(props){
        super(props);
        this.state = {    
           item:[< Items fun={this.handleitem.bind(this)}     value={{key:'', val:''}} namekey={0} key={0} id={0}/>],
           invoice_details:{
           
           },
           allTotal:{},
           address:{},
           customernames:{},
           customer_name:"",
           errors:{},
           validation:{
            customer_name:{required:true,},
            date:{required:true}, 
            email:{required:true,type:"email"},
            contact_no:{required:true,min:10,max:10,type:"Numeric"},
            gst_no:{required:true,min:15,max:15,type:"gst"},
           
      
       
        },
      }
      this.apiCtrl = new Api
    }

    
     handleitem=({name,value,position,total})=>{

        //const {name,value}=e.target

       // console.log("total=>",total)
             
        if((typeof name!=="undefined")&& (typeof value!=="undefined")){
            this.setState(old=>({...old,invoice_details:{...old.invoice_details,[position]:{...old.invoice_details[position],[name]:value}}}))
           
        }
        if(typeof total!=="undefined"){
            var totals = parseFloat(total)
           // this.setState(old=>({...old,items_details:{...old.items_details,[position]:{...old.items_details[position],total: parseFloat(total)}}}))
            this.setState(old=>({...old,allTotal:{...old.allTotal,[position]:{...old.allTotal[position],total: parseFloat(total)}}}))
           //this.setState(old=>({...old,total: parseFloat(total)}))
        }
      
        // console.log("state--=>",this.state)     
    
     }

     deletebyid=(delrowbyid)=>{
        // console.log("delrowbyid",delrowbyid)
      //  const adlngth=delrowbyid 
         const Keyvaluefield= this.state.item
        //  console.log("oflength=>",Keyvaluefield)
         delete Keyvaluefield[delrowbyid]
        // console.log("oflength=>",oflength)
          this.setState(old=>({...old,Keyvaluefield}))
        //   console.log("stateAfterdel=>",this.state)
     

    }

     componentWillMount(){
        this.customerList()
        
     }

     customerList=()=>{
        this.apiCtrl.callAxios("users/list").then(res=>{
            if(res.success==true){
                if(res.data.aaData.length >0){
                    const {aaData}=res.data
                   var customername={}
                    aaData.map((value,index)=>{

                        customername={...customername,[value.name]:value.name}
                      

                    })
                    console.log("cutomername=>",customername)
                    this.setState(old=>({...old,customernames:{...customername}}))
                }
              
            }
          
            console.log("response ",res)
        })
     }

     




    render(){
        const validation = (fieldName, fieldValue) => {
            
            let error={}
            let isValid = true;
           // let isMax = 1000;
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
                        }else if(value ==="gst"){
                            let reg= "^[0-9]{2}[a-zA-Z]{3}[cphfatbljgCPHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1}$"
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} must be in GST format`
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
            // if(isMax >= fieldValue.length){
            //    this.setState(old=>({...old,[fieldName]: fieldValue } ))
            // }
            this.setState(old=>({...old,[fieldName]: fieldValue } ))
        }
        


        let Addmore = (e) => {
           
              
            this.setState(old=>({...old,item:[...old.item,<Items fun={this.handleitem.bind(this)} delbyidfunc={this.deletebyid}  namekey={this.state.item.length}   key={this.state.item.length} id={this.state.item.length}   />]}))
        }

        const submit=(e)=>{
         e.preventDefault();

         const data={

            customer_name:this.state.customer_name,
            invoice_no:this.state.invoice_no,
            email:this.state.email,
            contact_no:this.state.contact_no,
            date:this.state.date,
            gst_no:this.state.gst_no,
            discount:this.state.discount,
            adjustment:this.state.adjustment,
            
            invoice_details:{...this.state.invoice_details}
           

         }
        


        this.apiCtrl.callAxios("invoice/create",data).then(res=>{
            if(res.success==true){
                Swal.fire({
                    title: "Invoice",
                    text: res.message,
                    icon: "success",
                    showConfirmButton: false,
                })
            } else {
                Swal.fire({
                    title: "Invoice",
                    text:  res.message,
                    icon: "error",
                    showConfirmButton: false,
                })
            }
        })

        
        }

        const handleDatePicker = (value, name) => {
            this.setState(old=>({[name]:value}))
        }

        const handleChange=(e)=>{
            validation(e.target.name,e.target.value)
            //this.setState(old=>({...old,[e.target.name]:e.target.value}))

        }
        const handleaddress=(val)=>{
            //console.log("parameterval=>",val)
           // console.log("name=>",e.target.name,"value=>",e.target.value)
         this.setState(old=>({...old,address:{...val}}))
        }
        const invoicedetails=()=>{
            this.apiCtrl.callAxios("invoice/detail",{invoice_no:this.state.invoice_no}).then(res=>{
            console.log("Invoicedetails=>",res)

            


              const{customer_name,date,invoice_no,email,contact_no,gst_no,address,invoice_details,discount,adjustment}=res.data
              var data = [];
          
                invoice_details.map((value, index)=>{
                    console.log("index",index,"value====>",value)
                    
                    //  data = [...data, < SliderImage  func={this.sliderImage.bind(this)} imgupld={this.sliderImageUpload.bind(this)} delbyidfunc={this.deletebyid} value={{key:index, val:value}} key={index} id={index}/>]
                data= [...data,< Items fun={this.handleitem.bind(this)}     value={{...value}} namekey={index} key={value.id} id={value.id}/>]
                
                
                })
             console.log("data=>",data)
             this.setState(old=>({item:[...data]}))

              this.setState(old=>({...old,customer_name,date,invoice_no,email,contact_no,gst_no,address,invoice_details,discount,adjustment}))
            })

           

          
           
            
        }
        
        var subtotal=0
        if(Object.keys(this.state.allTotal).length >0){

        Object.entries(this.state.allTotal).map(([key,value])=>{
            // console.log("key",key,"value",value)

            // if(key=="total" &&!isNaN(value)){
                    
            //     subtotal+=value
            // }

            return Object.entries(value).map(([key1,val2])=>{
                if(key1=="total" &&!isNaN(val2)){
                    
                    subtotal+=val2
                }
                    
            })
        })

        // console.log("subtotal=>",subtotal)
        }
        
        if(Object.keys(this.state).length >0){
            if(this.state.discount){
               // console.log("discountvalue=>",this.state.discount)
                 subtotal = subtotal -  parseFloat(this.state.discount)
               //  console.log("subtotal=>",subtotal)
                
            }
        }

         

         console.log("state=>",this.state)
        




      
        return(<>
      
             <BreadCrumb breadcrumb={"Invoice"} breadcrumbItem1='Create' />

             <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <SearchDropdown style={{width:"100%"}}
                          data={this.state.customernames}
                          label={"Customer name"}
                          size={"small"}
                          name="customer_name"
                          value={this.state.customer_name&&this.state.customer_name}
                           fullWidth
                           autoComplete={"off"}
                           onChange={handleChange}
                        />
                        <label>{this.state.errors.customer_name?this.state.errors.customer_name:""}</label>


                    </div>
                    <div className="col-md-1">  
                        <Avatar style={{cursor: "pointer"}} href="#exampleModalToggle009" data-bs-toggle="modal">
                            <AddIcon />
                        </Avatar>
                    </div>
                    <CreateCustomer/>

                    {/* <div className="col-md-3 mb-3">
                        <MaterialTextField size={"small"} name="invoice_no" label="Invoice" fullWidth 
                         value={this.state.invoice_no?this.state.invoice_no:""}
                            
                        />
                       
                            
                    </div> */}
                     <div className="col-md-4 mb-3">
                        <FormControl sx={{ m: 0, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Invoice</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={'text'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={invoicedetails}
                                  
                                    edge="end"
                                    > 
                                    {/* <Visibility /> */}
                                    <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                                }
                                name="invoice_no"
                                onChange={handleChange}
                                size="small"
                                 label="Invoice"

                            />
                        </FormControl>
                     </div> 
                    {/* <div className="col-sm-1">
                        <button onClick={invoicedetails}>  <SearchIcon /></button>
                      
                        
                    </div> */}

                    
                    <div className="col-md-4 mb-3">
                        <DatePickers  
                     
                            maxDate={new Date()}
                            label=" Date" 
                            onChange={(e)=>handleDatePicker(e, "date")} 
                            size={"small"}
                            name="date" fullWidth
                            value={this.state.date?this.state.date:""}
                            helperText={
                                this.state.errors.date
                                ? this.state.errors.date
                                : ''
                            }
                            error={this.state.errors.date?true:false}
                            style={{height:" 39px"}}
                        />
                            
                    
                            
                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} name="email" label="Email" fullWidth 
                         onChange={handleChange}
                         value={this.state.email?this.state.email:""}
                         helperText={
                            this.state.errors.email
                            ? this.state.errors.email
                            : ''
                           }
                           error={this.state.errors.email?true:false}
                            
                        />
                            
                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} name="contact_no" label="Contact" fullWidth 
                          onChange={handleChange}
                          value={this.state.contact_no?this.state.contact_no:""}
                          helperText={
                            this.state.errors.contact_no
                            ? this.state.errors.contact_no
                            : ''
                           }
                           error={this.state.errors.contact_no?true:false}
                            
                        />
                            
                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} name="gst_no" label="GST No" fullWidth 
                          onChange={handleChange}
                          value={this.state.gst_no?this.state.gst_no:""}
                          helperText={
                            this.state.errors.gst_no
                            ? this.state.errors.gst_no
                            : ''
                           }
                           error={this.state.errors.gst_no?true:false}
                            
                        />
                            
                    </div>

                    <div className="col-md-auto mb-3">

                        <label>Address</label> <span>{this.state.address.address?this.state.address.address:''}</span><span>{this.state.address.city?this.state.address.city:''}</span><span>{this.state.address.state?this.state.address.state:''}</span><span>{this.state.address.pincode?this.state.address.pincode:''}</span>

                        {/* {Object.keys(this.state.address).length >0 &&
                        
                          Object.entries(this.state).map((key,value)=>{
                            if(key=="address"){
                                return(<>
                                   <label>Address</label> <span>{this.state.address?this.state.address:""}</span>
                                </>)
                               
                            }
                          })
                           
                        } */}

                    </div>
                    <div className="col-md-1"> 
                                       
                        <Avatar style={{cursor:"pointer"}} href="#exampleModalToggle190" data-bs-toggle="modal">
                            <AddIcon />
                        </Avatar>
                

                    </div>
                     
                    
                    
                    
                    <AddressModal onhandle={handleaddress}/>
                  
                    
                </div>

                <Divider sx={{ borderColor: '#dac4c4',marginTop:'10px'}} />

                <div className="row ml-1 mb-3">
                    <label><b>{"Item"}</b></label>
                </div>
                <div className="row mb-2">

                    <div className="col-md-12">
                        <div className="row">

                        <div className="col-md-2"><strong>Product Name</strong></div>
                        {/* <div className="col-md-2"><strong>Description</strong></div> */}
                        <div className="col-md-2"><strong>Hsn Code</strong></div>
                        <div className="col-md-2"><strong>Qty</strong></div>
                        <div className="col-md-2"><strong>Rate</strong></div>
                        <div className="col-md-1"><strong>gst</strong></div>
                        <div className="col-md-2"><strong>Total</strong></div>


                        </div>

                    </div>

                   


                </div>
                 
                <div className="row mt-3">

                    <div className="col-md-12">
                        <div className="row">

                          {this.state.item}
                        </div>

                    </div>
                </div>

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>

                <Divider sx={{ borderColor: '#dac4c4',marginTop:'10px', marginBottom:"10px"}} />

                <div className="row">
                    <div className="col-md-12 mb-3 d-flex justify-content-end ">

                       <MaterialTextField className="textfield" value={subtotal} disabled={true} size={"small"}label="Sub Total"/> 
                        
                    </div>
                    <div className="col-md-12 mb-3 d-flex justify-content-end ">
                        <MaterialTextField name="discount" value={this.state.discount?this.state.discount:""} onChange={handleChange} size={"small"} label="Discount"/>
                    
                    </div>

                    <div className="col-md-12 mb-3 d-flex justify-content-end ">
                     <MaterialTextField name="adjustment"  value={this.state.adjustment?this.state.adjustment:""}  onChange={handleChange} size={"small"} label="Adjustment"/>
                    </div>

                    <div className="col-md-12 mb-3 d-flex justify-content-end ">
                      <MaterialTextField size={"small"} label="Total"/>


                    </div>



                </div>

                <Divider sx={{ borderColor: '#dac4c4',marginTop:'10px', marginBottom:"10px"}} />

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                  <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  onClick={submit} name="submit" text="Submit" />
                </div>

            </Box>

              

        </>)
    }
}

 const AddressModal =(props)=>{
    const apiCtrl=new Api

    const [state,setState]=useState({
        citydata:[""]   ,
        statedata:[""],
    })

    const getstatedata = () => {
      apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {

            res.data.map((value)=>{                  
                //console.log("STATE==>",value)
                setState(old=>({...old,citydata:['']}))
                 setState(old => ({...old, statedata:{ ...old.statedata, [value.id]:value.state_name}}))                
            })      
        })
    }
    const handleChange=(e)=>{

        setState(old=>({...old,[e.target.name]:e.target.value}))
        if(e.target.name=="state"){
            apiCtrl.callAxios('cities/list',{search:{state_id:e.target.value}}).then(res => {
                res.data.map((value)=>{                  
                //    console.log("city==>",value)
                        setState(old => ({...old, citydata:{ ...old.citydata, [value.id]:value.city_name}}))                
                })      
                })
        }
        // props.onhandle(e)
        

    }
   const submitaddress=(e)=>{
    

     props.onhandle({state:state.state,city:state.city,address:state.address,pincode:state.pincode})

   }


    return(<>
          
          <div className="modal fade" id="exampleModalToggle190" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered  modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Adresss</h5>
                <div className="row ml-1" style={{ paddingTop: '2%'}}>
                    {/* <label><b>{props.params.any} Details</b></label> */}
                </div>
                <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div className="modal-body m-body">
                
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <MaterialTextArea  style={{height: "38px"}}label="Address" row={4} multiline placeholder="Enter Your Address" onChange={(e)=>handleChange(e)} fullWidth name='address' 
                    />

                    </div>
                

                    <div className='col-md-4 mb-4'>        
                     <MaterialSelect size="small" value={state.state?state.state:""} onMouseEnter={getstatedata}       data={state.statedata}  id="state_id" labelId="state" name="state" onChange={(e)=>{handleChange(e)}}  label="State *" fullWidth
                    
                    />
                    </div>

                    <div className='col-md-4 mb-4'>        
                      <MaterialSelect  size="small"  value={state.city?state.city:""}      data={state.citydata}  id="city_id" labelId="city-id" name="city" onChange={(e)=>{handleChange(e)}}  label="City *" fullWidth
                   
                    />
                    </div>
                    <div className="col-md-4 mb-4">
                        <MaterialTextField value={state.pincode?state.pincode:""} label="Pincode *" size="small" fullWidth name='pincode' onChange={(e)=>{handleChange(e)}} 
                       
                        />
                    </div>
   
                </div>
                
              <div className="modal-footer">
                      
    
                      {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                     */}
              
                      <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={submitaddress }>Submit</Button> 
                    
                    </div>
              </div>  
    
              
            </div>
          </div>
          </div>
    
    </>)

 }

 const GstModel =(props)=>{

    const  [state,setState]=useState(props.data)

    //   const submitdata =()=>{
    //      props.func({...state})
    //   }

    const handleChange=(e)=>{
        setState(old=>({...old,[e.target.name]:e.target.value}))
        props.func({name:e.target.name,value:e.target.value,position:props.id})

    }


    return(<>
          
          <div className="modal fade" id={`exampleModalToggle${props.namekey}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered  modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                {/* <h5 className="modal-title" id="exampleModalLongTitle">GST</h5> */}
                <div className="row ml-1" style={{ paddingTop: '2%'}}>
                    {/* <label><b>{props.params.any} Details</b></label> */}
                </div>
                <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div className="modal-body m-body">
                
              <div className="row" key={props.key}>
                
               <div className="col-md-4">
                 <MaterialTextField  value={state.sgst?state.sgst:""}name="sgst" type="number"  label=" SGST" onChange={handleChange} />

               </div>
               <div className="col-md-4">
                 <MaterialTextField value={state.cgst?state.cgst:""} name="cgst" type="number" label=" CGST" onChange={handleChange} />


               </div>
               <div className="col-md-4">
                 <MaterialTextField value={state.igst?state.igst:""} name="igst" type="number" label=" IGST" onChange={handleChange} />


               </div>
    
              </div>
                
              <div className="modal-footer">
                      
    
                      {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                    
               */}
                       <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}}>Submit</Button> 
                    
                    </div>
              </div>  
    
              
            </div>
          </div>
          </div>
    
    </>)

 }

 const CreateCustomer=(props)=>{
    const apiCtrl=new Api

    const [state,setState]=useState({
        citydata:[""]   ,
        statedata:[""],
    })

    const getstatedata = () => {
      apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {

            res.data.map((value)=>{                  
                //console.log("STATE==>",value)
                setState(old=>({...old,citydata:['']}))
                 setState(old => ({...old, statedata:{ ...old.statedata, [value.id]:value.state_name}}))                
            })      
        })
    }
    const handleChange=(e)=>{

        setState(old=>({...old,[e.target.name]:e.target.value}))
        if(e.target.name=="state"){
            apiCtrl.callAxios('cities/list',{search:{state_id:e.target.value}}).then(res => {
                res.data.map((value)=>{                  
                //    console.log("city==>",value)
                        setState(old => ({...old, citydata:{ ...old.citydata, [value.id]:value.city_name}}))                
                })      
                })
        }
        // props.onhandle(e)
        

    }

    const submitdata=()=>{

    }


    return(<>
        <div className="modal fade" id={`exampleModalToggle009`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered  modal-lg">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Create Customer</h5>
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            
            <div className="modal-body m-body">
            <div className="row ml-1 mb-3">
                <label><b>{"Customer Details"}</b></label>
            </div>
            
            <div className="row mb-3" >
            
            <div className="col-md-4">
                <MaterialTextField name="customer_name" size="small"  onChange={(e)=>handleChange(e)}  label="Customer Name"  />

            </div>
            <div className="col-md-4">
                <MaterialTextField name="email" size="small" onChange={(e)=>handleChange(e)}  label=" Email"  />


            </div>
            <div className="col-md-4">
                <MaterialTextField  name="contact_no" size="small" onChange={(e)=>handleChange(e)}   label=" Phone No"  />


            </div>

            </div>

            <div className="row ml-1 mb-3">
                <label><b>{"Address Details"}</b></label>
            </div>
            <div className="row">
                    <div className="col-md-4 mb-4">
                        <MaterialTextArea  style={{height: "38px"}}label="Address" row={4} multiline placeholder="Enter Your Address" onChange={(e)=>handleChange(e)} fullWidth name='address' 
                    />

                    </div>
                

                    <div className='col-md-4 mb-4'>        
                     <MaterialSelect size="small" value={state.state?state.state:""} onMouseEnter={getstatedata}       data={state.statedata}  id="state_id" labelId="state" name="state" onChange={(e)=>{handleChange(e)}}  label="State *" fullWidth
                    
                    />
                    </div>

                    <div className='col-md-4 mb-4'>        
                      <MaterialSelect  size="small"  value={state.city?state.city:""}      data={state.citydata}  id="city_id" labelId="city-id" name="city" onChange={(e)=>{handleChange(e)}}  label="City *" fullWidth
                   
                    />
                    </div>
                    <div className="col-md-4 mb-4">
                        <MaterialTextField value={state.pincode?state.pincode:""} label="Pincode *" size="small" fullWidth name='pincode' onChange={(e)=>{handleChange(e)}} 
                       
                        />
                    </div>
   
                </div>
            
            <div className="modal-footer">
                    

                    {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                
            */}
                    <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={submitdata}>Submit</Button> 
                
                </div>
            </div>  

            
        </div>
        </div>
        </div>

      
    </>)
 }



function Items (props){
    const [total,setTotal]=useState()
    // const [qty,setQty]=useState()
    // const [gst,setGst]=useState()
    const [state,setState]=useState({...props.value})

    
    const HandleChange = ({name,value,position})=>{
        //console.log("name",name,"value",value,"position",position)
        setState(old=>({...old,[name]:value}))
        props.fun({name:name,value:value,position:position})
       
      }
       
   
    React.useEffect(()=>{
        handleCalculate()
    },[state])
    

  

   

    const handleCalculate  = async () => {

        var Amnt = parseFloat(state.base_price).toFixed(2);
        var qty = 1;
        if((state.qty !== '') && (typeof state.qty !== 'undefined'))
        {
            qty =  parseFloat(state.qty).toFixed(2)
        }
        var amt = Amnt*qty;
        var tax = 0.00;
        if((state.sgst !== '') && (typeof state.sgst !== 'undefined'))
        {
            tax = parseFloat(state.sgst).toFixed(2);
        }
        var totals = amt+(amt*tax/100.00);
        //setProductAmt(total);
         setTotal(totals)

         console.log("totalsss=>",totals)
         props.fun({total:totals,position:props.id})
       
          


        
        
    }

    const remove=()=>{
       
        props.delbyidfunc(props.id)
      
       }
   


//  console.log("itemState=>",state)
//  console.log("propsitem=>",props.value)



    return(<>

        <div className="col-md-2 mb-2" key={props.key}>  
            {/* <SearchDropdown
            data={""}
            name="product_id"
            onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})} 
            value={state.product_id?state.product_id:""}
            size={"small"}
            /> */}

            <MaterialTextField name="product_name"
              value={state.product_name?state.product_name:""}
             onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})} 
             size={"small"}
            />

        </div>
        {/* <div className="col-md-2 mb-2">
            <MaterialTextArea style={{height: "42px"}} row={4}
            multiline placeholder=""  name='description' 
            value={state.description?state.description:""}
            onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})} 
            size={"small"}
            />
        </div> */}
        <div className="col-md-2 mb-2">
            <MaterialTextField name="hsn_code"
              value={state.hsn_code?state.hsn_code:""}
             onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})} 
             size={"small"}
            />

        </div>
        <div className="col-md-2 mb-2">
            <MaterialTextField size={"small"}  name="qty"   value={state.qty?state.qty:""} type="number" onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})}   />

            <MaterialTextField id="standard-basic" placeholder="UOM" variant="standard" />
        </div>
       
        <div className="col-md-2 mb-2">
            <MaterialTextField size={"small"}  value={state.base_price?state.base_price:""} name="base_price" type="number"  onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})}  />


        </div>

        <div className="col-md-1 mb-2" >
      
            <Avatar style={{cursor:"pointer"}} href={`#exampleModalToggle${props.namekey}`} data-bs-toggle="modal">
                <AddIcon />
            </Avatar>

            <GstModel namekey={props.namekey} data={{sgst:state.sgst,cgst:state.cgst,igst:state.igst}} id={props.id} key={props.namekey} func={HandleChange}/>



        </div>

        <div className="col-md-2 mb-2">
            <MaterialTextField size={"small"} value={!isNaN(total)?total:"0"} disabled={true}/>


        </div>

        <div className="col-md-1 mb-4 d-flex"style={{justifyContent:"right", marginBottom:"auto"}}>
        <IconButton onClick={remove} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
        </IconButton>
       </div>

       
      


    </>)
}