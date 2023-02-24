import React, {useState, useEffect} from 'react'
import Button  from '@mui/material/Button';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from '../../../../api';
import { useParams } from 'react-router-dom';
import MaterialSelect from '../../../../Tags/MaterialSelect';
import Swal from 'sweetalert2';
import Geocode from "react-geocode";
import withRouter from '../../../../withRouter';
//import Googlemap from '../Google_lat_lan/Google_lat_lan';

export class AddUsers extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        id:"",
        btnVariant : "contained",     
        statedata:[""],
         errors:{}, 
         citydata:[""]   ,
         rolenameData:{},
       
         name: null,
         email: null,
         mobile: null,
         password: null,
         c_password: null,
         address: null,
         district: null,
         role:null,
         city: null,
         state: null,
         pincode: null,
         validation:{
            name:{required:true,min:4, type:'alpha'}, 
            mobile:{required:true, min:10, max:10, type:'numeric'}, 
            email:{required:true,min:6, type:'email'}, 
            insured_nominee_name:{required:true,min:4, type:'alpha'}, 
            password:{required:true,min:6, type:'AlphaNumeric'}, 
            c_password:{required:true, type:'AlphaNumeric'}, 
            district:{required:true, type:'AlphaNumeric'}, 
            address:{required:true, type:'AlphaNumeric'}, 
            role:{required:true},
            state:{required:true}, 
            city:{required:true},
            pincode:{required:true, min:6, max:6, type:'Numeric'} 
        },
        isValid:false,
         
        
      }
      this.apiCtrl = new Api;
    
     
    }

   
    // componentDidUpdate(prevProps,prevState){
    //     if(prevProps.location.state.param.id !== this.props.location.state.param){
    //     //   console.log('Propps', this.props.data)
    //       //this.setState(this.props.params)
    //      // this.props.location.state.param
    //       console.log("Location ",this.props.location)
    //     } 
    //   }


    componentDidMount(){
        console.log("Location ",this.props.location)

        if(this.props.location.state!==null){
            this.setState(old=>({...old,...this.props.location.state.param}))
        }


    }
  

    
   
    
    render(){


        const getLatLng = (data) => {
            Geocode.setApiKey("AIzaSyDlOIZMAxvmuidV7IHT8daDSpm2visn_OI");

           // console.log("data==>",data)

            //  var latLng = Googlemap(data);
                
            //  console.log('Latlng==>',latLng)
              
            Geocode.fromAddress(data).then(
                (response) => {
        
                //  console.log("res==>",response)
                 const { lat, lng } = response.results[0].geometry.location;
                        console.log("lat lan==>",lat, lng);
                        this.setState(old => ({...old,lat:lat,lng:lng})) 
                        
                },
                (error) => {
                  console.error(error);
                }
              );


            // if(data.res==="ok"){
            //      this.setState(old => ({...old, latitude:{...old.latitude,latitude:data.lat,longitude:data.lan}})) 
        
            // }
            // this.setState(old => ({...old, latitude:{...old.latitude,latitude:data.lat,longitude:data.lan}})) 
        
//console.log("===>",this.state)
           

            
        }

        const getstatedata = () => {
            this.apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {

                res.data.map((value)=>{                  
                    //console.log("STATE==>",value)
                     this.setState(old => ({...old, statedata:{ ...old.statedata, [value.id]:value.state_name}}))                
                })      
            })
        }

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
                this.setState(old => ({...old,[fieldName]: fieldValue }) )                
            }
        }

        const handleChange = (e) => {

            validation(e.target.name, e.target.value)
            console.log(e.target.value)
            let error={}
            let isValid = true;
            if(e.target.name ==="c_password"){
                if(e.target.value!==this.state.password){
                    error[e.target.name] = `Password and confirm password does not match`
                    isValid = false;
                }
                if(isValid == true) {
                        
                    error.c_password = '';
                }

                
            }
            this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 

            if(e.target.name=="state"){
                this.apiCtrl.callAxios('cities/list',{search:{state_id:e.target.value}}).then(res => {
                    res.data.map((value)=>{                  
                    //    console.log("city==>",value)
                            this.setState(old => ({...old, citydata:{ ...old.citydata, [value.id]:value.city_name}}))                
                    })      
                    })
            }
          
        }



            


        const submituser= async (e) => {
         e.preventDefault();
     
         let errors = {};
        let isValid = this.state.isValid;
        Object.entries(this.state.validation).map(([key,value])=>{

            
            if((typeof this.state[key] === 'undefined') || (this.state[key] === null) ||(this.state[key] === "")  ) {
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

     
      
          
        
            var data = {
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
                password: this.state.password,
                c_password: this.state.c_password,
                role: this.state.role,
                address: this.state.address,
                district: this.state.district,
                city: this.state.city,
                state: this.state.state,
                pincode: this.state.pincode,
                lat:this.state.lat,
                lng:this.state.lng

            
            }

            var updatedata = {
        
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
                // password: this.state.password,
                // c_password: this.state.c_password,
                role: this.state.role,
                address: this.state.address,
                district: this.state.district,
                city: this.state.city,
                state: this.state.state,
                pincode: this.state.pincode,
      
            
            }



            if( this.state.id==""){
      
                this.apiCtrl.callAxios('users/create', data).then(response => {
                
                    if(response.success == true){
                        Swal.fire({
                            title: "User",
                            text: "Created",
                            icon: "success",
                            showConfirmButton: false,
                        })
                        setTimeout(() => {
                            Swal.close()
                            
                        }, 3000);
                    } else {
                        Swal.fire({
                            title: "user",
                            text: "Not Created!",
                            icon: "error",
                            showConfirmButton: false,
                        })
                        setTimeout(() => {
                            Swal.close()
                            
                        }, 3000);
                    }


                //location.reload('/user-list')
                //  console.log("Adduser===>",response);
                    // sessionStorage.setItem('_token', response.data.)
                    
                }).catch(function (error) {
                    console.log("Adduser===>",error);
                });
            }else{
                this.apiCtrl.callAxios(`users/edit/${this.props.location.state.param.id}`, updatedata).then(response => {

                    if(response.success == true){
                        Swal.fire({
                            title: "User",
                            text: "Updated",
                            icon: "success",
                            showConfirmButton: false,
                        })
                        setTimeout(() => {
                            Swal.close()
                            
                        }, 3000);
                    } else {
                        Swal.fire({
                            title: "user",
                            text: "Not Updated!",
                            icon: "error",
                            showConfirmButton: false,
                        })
                        setTimeout(() => {
                            Swal.close()
                            
                        }, 3000);
                    }
                   // location.reload('/user-list')
                    console.log("Updateuser===>",response);
                    // sessionStorage.setItem('_token', response.data.)
                    
                  }).catch(function (error) {
                    console.log("Updateuser===>",error);
                  });
            }


        
     
          
     
      } 

      const userrolelist=()=>{
           
          this.apiCtrl.callAxios("users/roles-list").then(res=>{
            console.log("rolelist=>",res )
            Object.entries(res.data.aaData).map(([index,value])=>{
                // console.log("index",index ,"value",value)
                    let  rolename =  value.role_name.replace(/-/g, " "); 
                     
                     var namerole = rolename
                     .toLowerCase()
                     .split(' ')
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                     .join(' ');
     
                   
                     this.setState(old => ({...old, rolenameData:{...old.rolenameData,[value.role_name]:namerole}}))
            })})
      
    }
    
    //   const handleOnchange=({rolename})=>{
       
    //     console.log("role=>",rolename)
        
    //     // this.apiCtrl.callAxios("users/roles",role_name).then(res=>{
    //     //     console.log("response=>",res)
    //     // })
    //  }
    

  // console.log("dataprps--",this.props.data.id)
   // console.log("===>",this.state)

    // let user =  this.props.params.any.replace(/-/g, " "); 
    //   var userType = user
    //   .toLowerCase()
    //   .split(' ')
    //   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    //   .join(' ');
         console.log("sate===>",this.state)
        //console.log("Location ",this.props.location)
        
  return (
    <>
      {/* <BreadCrumb breadcrumb="Users" breadcrumbItem1={'Create ' +   userType} /> */}

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

        <div className="row ml-1">
            <label><b>Add {  "User" } Details</b></label>
        </div>

        {/* <Button style={{ backgroundColor: '#183883'}} onClick={ getdatabyid }>getdatabyid</Button> */}

        <Divider sx={{ borderColor: '#dac4c4'}} />
        
        <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
            <label><b>Personal Information</b></label>
        </div>
        <div className="row ">

            <div className="col-md-4 mb-4">
                <div className='row'>
                    <div className='col-md-8'>
                     <MaterialSelect onMouseEnter={userrolelist} size="small" label="Roles" value={this.state.role} data={this.state.rolenameData} name="role" fullWidth onChange={(e)=>{handleChange(e)}} 
                       helperText={
                        this.state.errors.role
                        ? this.state.errors.role
                        : ''
                       }
                       error={this.state.errors.role?true:false}
                     />
                    </div>
                    <div className="col-md-4 mb-4">
                       <button style={{width: "73px",  height: "40px", fontSize: "11px"}}   type="button" data-bs-toggle="modal" size='small' href="#exampleModalToggle2" className="btn btn-outline-dark">Add Role</button>
                    </div>
                </div>

             
            </div>

            {/* <div className="col-md-1 mb-4">
             <button style={{width: "73px",  height: "40px", fontSize: "11px"}}   type="button" data-bs-toggle="modal" size='small' href="#exampleModalToggle2" className="btn btn-outline-dark">Add Role</button>
            </div> */}

            <div className="col-md-4 mb-4">
                <MaterialTextField 
                value={this.state.name?this.state.name:""}
                 label={"User Name *"} 
                 size="small"
                fullWidth name='name' onChange={(e)=>{handleChange(e)}}
                helperText={
                    this.state.errors.name
                    ? this.state.errors.name
                    : ''
                   }
                   error={this.state.errors.name?true:false}
                 />
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.email?this.state.email:""}   label={" User Email *"} size="small" fullWidth name='email' onChange={(e)=>{handleChange(e)}}
                  helperText={
                    this.state.errors.email
                    ? this.state.errors.email
                    : ''
                   }
                   error={this.state.errors.email?true:false}
                 />
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.mobile?this.state.mobile:""} label={ " User Mobile *"} size="small" fullWidth name='mobile' onChange={(e)=>{handleChange(e)}}
                helperText={
                    this.state.errors.mobile
                    ? this.state.errors.mobile
                    : ''
                   }
                   error={this.state.errors.mobile?true:false}
                 />
            </div>
            { this.state.id==""?
             <>
                <div className="col-md-4 mb-4">
                    <MaterialTextField     value={this.state.password?this.state.password:""} type={"password"} label={" User Password *"} size="small" fullWidth name='password' onChange={(e)=>{handleChange(e)}} 
                      helperText={
                        this.state.errors.password
                        ? this.state.errors.password
                        : ''
                       }
                       error={this.state.errors.password?true:false}
                    />
                </div>
                
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.c_password?this.state.c_password:""} type={"password"} label="Confirm Password *" size="small" fullWidth name='c_password' onChange={(e)=>{handleChange(e)}}
                       helperText={
                        this.state.errors.c_password
                        ? this.state.errors.c_password
                        : ''
                       }
                       error={this.state.errors.c_password?true:false}
                     />
                </div>
             </>
              :""
            }
            {/* <div className="text-danger">{this.state.errors.c_password}</div> */}
            
        </div>

        <Divider sx={{ borderColor: '#dac4c4'}} />
        
        <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
            <label><b>Address</b></label>
        </div>
        <div className="row ">

            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.address?this.state.address:""} label="Address *" size="small" fullWidth name='address' onChange={(e)=>{handleChange(e)}}  onKeyUp={(e)=>getLatLng(e.target.value)}
                   helperText={
                    this.state.errors.address
                    ? this.state.errors.address
                    : ''
                   }
                   error={this.state.errors.address?true:false}
                />
            </div>
            {/* <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.city?this.state.city:""}label="City *" size="small" fullWidth name='city' onChange={(e)=>this.setState({city : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.state?this.state.state:""} label="State *" size="small" fullWidth name='state' onChange={(e)=>this.setState({state : e.target.value})}/>
            </div> */}
            <div className='col-md-4 mb-4'>        
              <MaterialSelect size="small" value={this.state.state?this.state.state:""} onMouseEnter={getstatedata}       data={this.state.statedata}  id="state_id" labelId="state" name="state" onChange={(e)=>{handleChange(e)}}  label="State *" fullWidth
               helperText={
                this.state.errors.state
                ? this.state.errors.state
                : ''
               }
               error={this.state.errors.state?true:false}
              />
            </div>

            <div className='col-md-4 mb-4'>        
              <MaterialSelect  size="small"  value={this.state.city?this.state.city:""}      data={this.state.citydata}  id="city_id" labelId="city-id" name="city" onChange={(e)=>{handleChange(e)}}  label="City *" fullWidth
               helperText={
                this.state.errors.city
                ? this.state.errors.city
                : ''
               }
               error={this.state.errors.city?true:false}
              />
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField value={this.state.pincode?this.state.pincode:""} label="Pincode *" size="small" fullWidth name='pincode' onChange={(e)=>{handleChange(e)}} 
                helperText={
                    this.state.errors.pincode
                    ? this.state.errors.pincode
                    : ''
                   }
                   error={this.state.errors.pincode?true:false}
                />
            </div>
            
        </div>

        <div className='row'>
            <div className="col-md-3">
                <Button style={{ backgroundColor: '#183883'}} onClick={ submituser }>Submit</Button>
            </div>
        </div>

        <Model/>


        {/* <Googlemap data={ this.state.address} func={handleLatLng} /> */}
        {/* <Googlemap data={ this.state.address} func={handleLatLng} /> */}
        </Box>
    </>
  )
}
}

// export default (props) => {
//     return <AddUsers {...props}   params={useParams()}/>
//   }
export default withRouter(AddUsers)



  function Model(props){

    const [state,setState]=useState()
    const apiCtrl=new Api

    const submit=(e)=>{
        e.preventDefault();
        apiCtrl.callAxios("users/roles/create",state).then(response=>{
            if(response.success == true){
                Swal.fire({
                    title: "Role",
                    text: "Created",
                    icon: "success",
                    showConfirmButton: false,
                })
            } else {
                Swal.fire({
                    title: "Role",
                    text: "Not Created!",
                    icon: "error",
                    showConfirmButton: false,
                })
            }

        })
        
    }

    // const handleOnchange=({rolename})=>{
       
    //     console.log("role=>",rolename)
        
    //     // this.apiCtrl.callAxios("users/roles",role_name).then(res=>{
    //     //     console.log("response=>",res)
    //     // })
    //  }
    
    return(
      <>


        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Create Role</h5>
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
                        <MaterialTextField  name="role" placeholder=" Role" fullWidth onChange={(e)=>setState({role_name:e.target.value})}/>

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