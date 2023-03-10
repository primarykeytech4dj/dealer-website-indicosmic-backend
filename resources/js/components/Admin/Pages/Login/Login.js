import { Box, Divider } from '@mui/material'
import React from 'react'
import MaterialButton from '../../../../Tags/MaterialButton'
import MaterialTextField from '../../../../Tags/MaterialTextField'
import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
import  {Link } from "react-router-dom"
import ToggleButtons from './ToggleButton'
import FormControlLabel, { getFormControlLabelUtilityClasses } from '@mui/material/FormControlLabel';

import Api from '../../../../api'

import './Login.css'

import swal from 'sweetalert'

import withRouter from '../../../../withRouter'

import Swal from 'sweetalert2'
import { object } from 'prop-types'
import { keys } from 'lodash'


export  class Login extends React.Component {

    constructor(props){
        super(props);
        this.apiCtrl = new Api;

        this.state = {
            email : '',
            password : '',
           errors:{}
        }
    }

    formValidation =()=>{
        const {email, password}=this.state;
        let isValid =true;
        const errors={};
        if(email.trim().length< 1){
            errors.email ="Please Enter your Email"
            isValid= false;
        }else if(!email.includes("@")){
            errors.email ="Invalid Email"
            isValid= false;
        } 

        if( password.trim().length< 1){
            errors.password ="please Enter your Password "
            isValid= false;
        }

        
        this.setState({errors:errors});
        return  errors;
    }

    // setup=(e)=>{
    //     //alert("hiii");
    //     this.apiCtrl.callAxios('setup/list',{type:"backend"}).then(response => {
    //      console.log("setuplist==>",response)
    //      location.reload('/')
    //     })
    // }
    render(){
       


        const handlechange =(e)=>{
            this.setState({[e.target.name]:e.target.value})
        }

    const submituser=  (e) => {
        e.preventDefault();
        var data ={
            email:this.state.email,
            password:this.state.password
         }
         const isValid =this.formValidation()
         var msg = Object.entries(isValid);
         var str = '';
         msg.map((msg, key)=>{
           str+=msg[1]+"<br>";
         })

        if(!isValid.email &&!isValid.password){
            // this.setState({})
        this.apiCtrl.callAxios('login', data, false).then(response => {

            // console.log("logres===",response)
            if(response.success) {
                // alert(response.success);
                localStorage.setItem('dealer_token', response.access_token)
                localStorage.setItem('user_roles',  JSON.stringify(response.data.user_roles));
                localStorage.setItem('user_details', JSON.stringify(response.data.user_details));
                // x = this.setup();
                Swal.fire({
                    title: "Login",
                    text: "Logged In Successfully!",
                    icon: "success",
                    showConfirmButton: false,
                })
                
                window.location.reload('/admin')
                // this.props.location.navigattion('/admin')
                // if(x){
                //     Swal.fire({
                //         title: "Login",
                //         text: "Logged In Successfully!",
                //         icon: "success",
                //         showConfirmButton: false,
                //     })
                //     location.reload('/')
                // }
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login',
                    text: ''+response.message==="Validation Error"?"Please Enter Data":response.message,
                
                })
            }
        }).catch(function (error) {
    
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            
            })
        });
    }else{

       
        Swal.fire({
            title: "Login",
            // html: `${this.state.errors} <br>`,
            html:` ${str}`,
         
            icon: 'error',
            showConfirmButton: false,
        })

    }

    }

    const {errors}=this.state
  return (
    <>

       <div style={{ height: 'auto', width:"40%", maxWidth:"90%", backgroundColor: '#FFFFFF', margin:"2px auto",marginTop:"10%", textAlign:'center',  paddingBottom: '5%' }} className="login-box">
        <Divider sx={{ backgroundColor: '#183883', borderWidth: '2px', borderColor: '#183883', justifyContent:"center" }} />
            <div className="row" style={{justifyContent:"center"}}>
                <label style={{ fontSize: '26px', color: '#000000', marginTop: '5%'}}>Welcome!</label>
            </div>
            <div className="row" style={{justifyContent:"center"}}>
                <div className="mb-4">
                    {/* <label style={{ fontSize: '18px', color: '#000000' }}>Please Enter Your Valid Credentials</label> */}
                </div>
            </div>
            {/* <div className='row'>
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mb-4">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button>Quality Checker</Button>
                    <Button>Dealer</Button>
                    <Button>Assessor</Button>
                </ButtonGroup>
                </div>
                <div className="col-md-1 mb-4"></div>
            </div> */}
            {/* <div className='row'>
                <div className="col-md-12 mb-4">
                    <ToggleButtons/>
                </div>
            </div> */}

        <form onSubmit={submituser}>
            <div className='row'>
                <div className="col-md-1 mb-4"></div>
                {/* <div className="col-md-10 mb-4">
                    <MaterialTextField label="Login ID" size="small" fullWidth onChange={(e)=>this.setState({email: e.target.value})} name="email" />
                </div> */}
                <div className="col-md-10 mb-4">
                    <MaterialTextField label="Login ID" size="small" fullWidth onChange={handlechange} name="email" />
                </div>
                <div className="col-md-1 mb-4"></div>

            </div>
            <div className='row'>
                <div className="col-md-1 mb-4"></div>
                {/* <div className="col-md-10 mb-4">
                    <MaterialTextField type={"password"}  label="Password"  size="small" fullWidth onChange={(e)=>this.setState({password: e.target.value})} name="password" />
                </div> */}
                <div className="col-md-10 mb-4">
                    <MaterialTextField type={"password"}  label="Password"  size="small" fullWidth onChange={handlechange} name="password" />
                </div>
                <div className="col-md-1"></div>
            </div>

            <div className='row' style={{ justifyContent:"center"}}>
                    {/* <FormControlLabel control={<Checkbox />} style={{marginTop:'10px'}} label="Remember me" /> */}
                <a href="#" style={{marginTop:"10px"}}>Forgot Password?</a>
               
            </div>
            {/* <div className="row">
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mt-4">
                    <MaterialButton style={{ backgroundColor: '#183883'}} fullWidth name="login" text="Login" onClick={ submituser } />
                </div>
                <div className="col-md-1 mb-4"></div>
            </div> */}
             <div className="row">
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mt-4">
                    <MaterialButton style={{ backgroundColor: '#183883'}} type="submit"  fullWidth name="login" text="Login"  />
                </div>
                <div className="col-md-1 mb-4"></div>
            </div>
        </form>
        </div>
    </>
  )
        }
}


export default withRouter(Login)