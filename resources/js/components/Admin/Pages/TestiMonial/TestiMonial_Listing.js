import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import MaterialButton from '../../../../Tags/MaterialButton';
import { Button } from 'react-bootstrap';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Button  from '@mui/material/Button';
import Switch from "@mui/material/Switch";
import TextEditor from "../TextEditor/Text_Editor";
import Swal from 'sweetalert2';
import Api from '../../../../api';
import TestiMonial from "./TestiMonial_Creation";
import { useState } from "react";
export default class TestiMonialList extends React.Component {
    constructor(props){
      super(props)
      this.apiCtrl = new Api;
  
      this.state = {
        data : [],
        isLoading: false,
        page: 0,
        pageSize: 10,
        testimonialData:[],
        
  
    }
  
    }
  
    componentWillMount = () => {
      this.getProductList();
    }

    componentDidUpdate(prevProps, prevState){
      // console.log('update')
      if ((prevState.page !== this.state.page) ) {
        this.getProductList();
      } 
    
    }
   
  
    getProductList = () =>{
  
      this.setState(old => ({...old, isLoading:true}))
      var data = {length:this.state.pageSize, start:this.state.page*this.state.pageSize};
      this.apiCtrl.callAxios('testimonial/list',data).then(response => {
          console.log("rs==>",response);
          
          if(response.success == true){
              this.setState(old => ({...old, data:response.data,}))
  
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
  
  
      const  handleClick = (data) => {
        // console.log("dataproduct===",data)
         this.setState({testimonialData: data})
       }
  
      const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', width: 190 },
        { field: 'image', headerName: 'Image', width: 190 },
        { field: 'description', headerName: 'Description ', width: 100 },
        { field: 'is_active', headerName: 'Active', width: 150 ,renderCell: (params) => <IsActive key={params.row.id}  param={params.row} />,},
        { field: 'priority', headerName: 'Priority', width: 150 },
        { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Action fun={handleClick} param={params.row} />, },
      ];
  
  
    return (
      <>
      <BreadCrumb breadcrumb="Testimonial List" />
     
      <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
      <Button  type="button" style={{ backgroundColor: '#183883',width:"auto", marginBottom: "20px", marginLeft:"47rem",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Create Testimonial</Button>
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
        
          onPageChange={(newPage) => this.setState(old=>({...old, page: newPage}))}
          onPageSizeChange={(newPageSize) => this.setState(old=>({...old, pageSize: newPageSize}))}

  
          />
         
      </div>
  
       <Model />
       <TestiMonialEdit params={this.state.testimonialData}/>
      </Box>
      </>
    );
  }
  }
  function Action(props){ 
    
    const editProductdata = (event)=>{
      props.fun(props.param)
    }
  
  
       
    return(
        
      <>
      <Button type='button' data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editProductdata} >Edit</Button>&nbsp;
      
  
      </>
        
    );
  }

  function IsActive(props){
    const [state,setState]=useState(props.param)
    const apiCtrl=new Api;
    const deletestestimonialdata=(e)=>{
      console.log("event",e.target.checked?1:0)
       setState(old=>({...old,is_active:e.target.checked?1:0}))
     
       const data={
        
         is_active:e.target.checked?1:0
       }
  //    console.log("productdeletedata",data)

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


      Swal.fire({
        title: 'Are you sure?',
        html: `${msg}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00B96F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, De-Activated!',
      }).then((result) => {
        if (result.value) {
          apiCtrl.callAxios(`testimonial/delete/${state.id}`,data).then(response => {
    
            if(response.success == true){
              Swal.fire({
                   title:`Testimonial ${msg1}  Successfully!`,
                icon: "success",
                showConfirmButton: false,
                timer: 1200,
              });
              setTimeout(() => {
                Swal.close()
                location.reload("/admin/testimonial-list")
          }, 3000);
              
                } else {
                  Swal.fire({
                    title: `Testimonial ${msg1}  unsuccessfully!`,
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
        }
        location.reload("/admin/testimonial-list")
      });
     
      //  apiCtrl.callAxios(`testimonial/delete/${state.id}`,data).then(response => {

      //   console.log("res=>",response)
      //    if(response.success == true){
      //       location.reload("/testimonial-list")
      //      }//else {
     
      //   //      alert()
      //   //    }
         
      //  })
    }


    return(<>

      <div className="col-md-4 mb-4">
      {/* <FormControlLabel control={<Checkbox checked={state.is_active== "1"?true:false} onClick={deletesliderdata}  />} label={"Enable"} /> */}
      <Switch checked={state.is_active== "1"?true:false} onClick={deletestestimonialdata}   fullWidth /> 
      </div>
    </>)
  }
  
function Model(props){

    //  console.log( "modelprops==>",props)
     
      return(
        <>
       
          <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered  modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Create Testimonial</h5>
                <div className="row ml-1" style={{ paddingTop: '2%'}}>
                    {/* <label><b>{props.params.any} Details</b></label> */}
                </div>
                <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div className="modal-body m-body">
                
              <div className="row">
                
                <TestiMonial   />
    
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


class TestiMonialEdit extends React.Component {
    constructor(props){
      super(props);
      this.state = {

        title:null,
        priority:null,     
        image:null, 
        description:null,

        errors:{},
        validation:{
            title:{required:true},
            priority:{required:true},     
            image:{required:true}, 
            description:{require:true}
      
       
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
        //console.log("props=>",this.props)
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
                  if((index!=="errors")&&(index!=="validation")&&(index!=="isValid")){
                  data.append(`${index}`, value);
                  }
                })


                this.apiCtrl.callAxiosFile("testimonial/create-update",data,true).then((res)=>{
                  if(res.success   === true){
                                // console.log("response=>",response)
                      Swal.fire({
                      title: "Testimonial",
                      text:"Updated",
                      icon: "success",
                      showConfirmButton: false,
                          })
                      //  Swal.close()
                      setTimeout(() => {
                            Swal.close()
                               location.reload("/admin/testimonials")
                      }, 3000);
                     // location.reload("/testimonials")
                  
                  } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    
                    })
                        setTimeout(() => {
                          Swal.close()
                    }, 3000);
                    }
                     })
      } 


      const onhandlechange =({val})=>{
        // console.log("val=>",val)
          this.setState(old=>({...old,description:val}))
      }

     
      const handleChange = (e) => {

        validation(e.target.name, e.target.value)
        console.log(e.target.value)

        if((e.target.name==="image")){
          this.setState(old=>({...old,[e.target.name] : e.target.files[0]}))
        }
      }
      
  
      return (
        <>
  
          {/* <BreadCrumb breadcrumb="Product" breadcrumbItem1='Create' /> */}
            
            
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered  modal-lg">
          <div className="modal-content">
          <div className="modal-header">
              <div className="row ml-1" style={{ paddingTop: '2%'}}>
                    <label><b>Testimonial Update</b></label>
                  
              </div>
              <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body m-body">
              
            <div className="row">
              
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
  
              
  
                <Divider sx={{ borderColor: '#dac4c4'}} />
  
                <div className="row mt-3">
                    {/* <div className="col-md-3 mb-2">
                        <MaterialTextField name="name" value={this.state.name?this.state.name:""} label="Name" fullWidth onChange={(e)=>this.setState({name : e.target.value})}/>
                          
                    </div> */}
                    <div className="col-md-4 mb-2">
                        <MaterialTextField name="title" value={this.state.title?this.state.title:""} label="Title" fullWidth 
                        onChange={(e)=>{handleChange(e)}} 
                        helperText={
                            this.state.errors.title
                            ? this.state.errors.title
                            : ''
                           }
                           error={this.state.errors.title?true:false}
                        />
                          
                    </div>
                    <div className="col-md-4 mb-2">
                        <MaterialTextField name="priority"value={this.state.priority?this.state.priority:""} label="Priority" fullWidth 
                        onChange={(e)=>{handleChange(e)}} 
                        helperText={
                          this.state.errors.priority
                          ? this.state.errors.priority
                          : ''
                         }
                         error={this.state.errors.priority?true:false}
                        />
                          
                    </div>
                    <div className="col-md-4 mb-4">
                        {/* <FormControlLabel control={<Checkbox checked={this.state.is_active== "1"?true:false}  onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}/>}   label={"Is Active" } /> */}
                        <Switch checked={this.state.is_active=="1"?true:false} onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}   fullWidth />                 
                            { <strong> {"Active"} </strong>         }
                    </div>

                    <div className="col-md-4 mb-2">
                        <MaterialTextField type="file"  name="image" label="Image"  fullWidth 
                        onChange={(e)=>{handleChange(e)}} 
                        helperText={
                           this.state.errors.image
                           ? this.state.errors.image
                           : ''
                          }
                          error={this.state.errors.image?true:false}
                        />             
                    </div>
                    
                  
                    {this.state.image!==null?
                    <div className="col-md-4 mb-2">
                    <img  style={{width:"58px",marginLeft:"2px"}} src={this.state.image?this.state.image:""} />
                    </div>:""
                     }
                    <strong>Description</strong>
                    {/* <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                    
                        <TextEditor func={onhandlechange}/>
                    
            
                    </div> */}

                  <div className="col-md-12 mb-4" >
                    <MaterialTextArea row={4} multiline label={" Description" } placeholder=" Description" value={this.state.description?this.state.description:""} fullWidth name='description' 
                    onChange={(e)=>{handleChange(e)}} 
                    helperText={
                       this.state.errors.description
                       ? this.state.errors.description
                       : ''
                      }
                      error={this.state.errors.description?true:false}
                    />
                    </div>

                  </div>
                
                
                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className='row mt-3'>
                
                    <div className="col-md-3">
                        <Button style={{ backgroundColor: '#183883' }} onClick={ submitdata }>Update</Button>
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
    
    