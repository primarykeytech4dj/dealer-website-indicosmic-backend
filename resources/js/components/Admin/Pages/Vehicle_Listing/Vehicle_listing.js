import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialButton from "../../../../Tags/MaterialButton";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Swal from 'sweetalert2';
import Api from '../../../../api';
import './Vehicle.css'

import textModifier from "../../../services/textModifier";
import { useEffect } from "react";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import Slider from "react-slick";
import { object } from "prop-types";

 export class VehicleList extends React.Component {
    constructor(props){
      super(props)
      this.apiCtrl = new Api;
  
      this.state = {
        data : [],
        isLoading: false,
        filter:"",
        page: 0,
        pageSize: 10,
        productData:[],
        vehiclemodel:[]
       // product_type:this.props.title,
      
  
    }
  
    }
  
    componentWillMount = () => {
      this.getProductList(this.state.pageSize);
    }



    

    componentDidUpdate(prevProps, prevState){
      // console.log('update')
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
    //   if(prevProps.params !== this.props.params){
    //     this.getProductcategoryList();
    //   }
    //  }
  
  
    getProductList = (pageSize) =>{
  
      this.setState(old => ({...old, isLoading:true}))
       var data = {filter:this.state.filter,length:this.state.pageSize, start:this.state.page*this.state.pageSize};
      // var data = {
      //   is_service: (this.props.params.any === 'service')?1:0
      // }
      this.apiCtrl.callAxios('vehicle/list',data).then(response => {
          console.log(response);
          
          
          if(response.success == true){
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
      //console.log("userdata",data)
       this.setState({vehiclemodel: data})
     }

      console.log("Vehicle List=>",this.state)
    
  
      const columns = [
        { field: 'sr_no', headerName: 'Sr no', width: 100 },
        { field: 'vehicle_model', headerName: 'Vehicle Model', width: 200,renderCell: (params) => textModifier(params.row.vehicle_model) },
        { field: 'vehicle_make', headerName: 'Vehicle Make', width: 150 },
        { field: 'transmission', headerName: 'Transmission', width: 150 },
        { field: 'fuel_type', headerName: 'Fuel Type', width: 100 },
        {field:'vehicle_status',headerName:'Vehicle Status',width:100},
        {field:'system_code',headerName:'System Code',width:100,renderCell: (params) => textModifier(params.row.system_code) },
        {field:'images',headerName:'Images',width:200,renderCell: (params) => <Images key={params.row.id}    param={params.row} />,},
        { field: 'is_active', headerName: 'Active', width: 150 ,renderCell: (params) => <IsActive key={params.row.id}    param={params.row} />,},
        { field: 'upload', headerName: 'Upload', width: 150 ,renderCell: (params) => <Upload key={params.row.id} func={handleClick}   param={params.row} />,},
        { field: 'edit', headerName: 'Edit', width: 150 ,renderCell:(params)=><EditVehicle key={params.row.id} func={handleClick}   param={params.row}/>},
       
      ];


     
  
    return (
      <>
      <BreadCrumb breadcrumb={"Vehicle List"} />
     
      <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', textAlign:'right', borderRadius:"6px", padding: '2%' }}>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-3 mb-2">
            <MaterialTextField size="small" name='search'  placeholder="Search"
            onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}
            />
          </div>
          {/* <div className="col-md-3">
          <Link  to={"/admin/vehicletab"} ><Button >Creacte Vehicle</Button></Link>

          </div> */}

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
      
          onPageChange={(newPage) => this.setState(old=>({...old, page: newPage}))}
          onPageSizeChange={(newPageSize) => this.setState(old=>({...old, pageSize: newPageSize}))}
          disableRowSelectionOnClick
  
          />
         
      </div>

      <UploadModel params={this.state.vehiclemodel}/>
  
      
      </Box>
      </>
    );
  }
  }

  
function IsActive(props){

    //console.log("peops=>",props.params) 
    // const [state,setState]=useState(props.param)
    const [state,setState]=useState(props.param)
    const apiCtrl = new Api;
   
    const deletevehicledata=(e)=>{
     //console.log("event",e)
  
     setState(old=>({...old,is_active:e.target.checked?1:0}))
   
     const data={
        // id:props.param.id,
       is_active:e.target.checked?1:0
     }
   
     const msg_1={
      text_1:"Do you want to De-Activate",
      //text_1:"",
      text_3:" De-Activate ",
      text_2:"Do you want to Activate",
    
      text_4:" Activate "
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
       apiCtrl.callAxios(`vehicle/delete/${state.id}`,data).then(response => {
   
   
           if(response.success == true){
             Swal.fire({
              
                  title:`Vehicle ${msg1} Successfully!`,
               icon: "success",
               showConfirmButton: false,
               timer: 1200,
             });
             setTimeout(() => {
              Swal.close()
              
             }, 5000);
            // location.reload(`/${props.url}-list`)
               } else {
                 Swal.fire({
                   title: `Vehicle ${msg1} unsuccessfully!`,
                   icon: "error",
                   showConfirmButton: false,
                   timer: 1200,
                 });
                 setTimeout(() => {
                  Swal.close()
                  
                 }, 5000);
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
             <Switch checked={state.is_active== "1"?true:false} onClick={deletevehicledata}   fullWidth /> 
             
           </div>
   
       </>)
   }

function Images(props){

    return(<>


          <div className="col-md-12">
            <img key={props.param.id} src={props.param.images} alt={props.param.vehicle_model} />
          

          </div>
    </>)
}

function Upload(props){
   
  const vehicledata =()=>{
    props.func(props.param)
  }
  

  return(<>

      <div className="row">

      <div className="col-md-12">
          <MaterialButton 
          style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  
          data-bs-toggle="modal"  href="#exampleModalToggle1"
          name="" text="Upload"
          onClick={vehicledata}
           />


      </div>

</div>


  </>)
}

function EditVehicle(props){


  return(<>

{/* <Link key={props.key}  to={`/create/user`} state={{param:props.param}}><Button>Edit</Button></Link>  &nbsp; */}

<Link key={props.key} to={"/admin/vehicletab"} state={{...props.param}}><Button>Edit</Button></Link>&nbsp;
  </>)

}


function UploadModel(props){
  const [state,setState]=useState({
    // vehicle_model:props.params.vehicle_model?props.params.vehicle_model:""
    
  })
  const [message,setMessage]=useState({})
  const [showgalleryimages,setshowgalleryimages]=useState([])
  const[imgshow,setImgshow]=useState({})
  const [errors, setErrors] = useState({})
  const apiCtrl=new Api
  console.log("state=>",state)
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const filetypes = ["PDF"];
 

  useEffect(()=>{
   console.log("propsupload=>",props)
   const {featured_image, document,other_images,banner_image   }=props.params
  
   setState(old=>({...old,featured_image,document,other_images,banner_image}))
  },[props.params])


 
  const submit=(e)=>{
    e.preventDefault();
    const slug=props.params.slug

    const statedata={

      featured_image:state.feature_image,
      banner_image:state.banner_image,
      other_images:state.other_images,
      document:state.document,

    }

    const data=new FormData
     
   

    Object.entries(statedata).map(([key,value])=>{

         console.log("key",key,"value",value)
      if(key=="other_images"){
      
          // console.log("====>",value)
          if(value!==undefined){

            Object.entries(value).map(([index,img])=>{
              console.log("img",img)   
                 
                 
                 data.append(`${key}[]`,img)
   
             })
          }
         
        
      
      }else{
        if(value!==undefined){
          data.append(`${key}`,value)

        }
        
          
      }
            
    
    })
    data.append("slug",slug)
    
    apiCtrl.callAxiosFile("vehicle/upload-docs-vehicle",data).then(res=>{

      if(res.success==true){
         
       setMessage(old=>({...old,...res.message}))
      
        Swal.fire({
            title: "Vehicle",
            text: "Vehicle Image Upload",
            icon: "success",
            showConfirmButton: false,
        })
    } else {
        Swal.fire({
            title: "Vehicle",
            text:  "Vehicle Image Not Upload",
            icon: "error",
            showConfirmButton: false,
        })
    }



    })
    
  }
  
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
  };

  const imageupload = (file) => {
     console.log(file)
    Object.entries(file).map(([index, value])=>{

     // console.log("value=>",value)

        setState(old=>({...old,other_images:{...old.other_images,...file}}))
        //setState(old=>({...old,showgalleryimages:[...old.showgalleryimages,URL.createObjectURL(value)]}))
       setshowgalleryimages(old=>([...old,URL.createObjectURL(value)]))
    })
      
  };

  const docupload =(file)=>{
       console.log(file)
      

        setState(old=>({...old,document:file}))
        
  

  }
  const validation = {


   
    feature_image: { required: true, },
    banner_image: { required: true, },
    
}
  const validate = (fieldName, fieldValue) => {

    let error = {}
    let isValid = true;
    let isMax = 1000;
    if (typeof validation[fieldName] !== "undefined") {
        Object.entries(validation[fieldName]).map(([key, value]) => {

            let temp = fieldName.replace(/_/g, " ");
            var names = temp
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            if (key === 'required') {
                if ((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null)) {
                    error[fieldName] = `${names} Field is required`
                    isValid = false;
                }
            } else if (key ==='min') {
                if (fieldValue.length < value) {
                    error[fieldName] = `${names} must be more than ${value} characters`
                    isValid = false;
                }
            } else if (key ==='max') {
                if (fieldValue.length > value) {
                    error[fieldName] = `${names} must be less than ${value} characters`
                    isMax = value;
                    isValid = false;
                }
            
            } else if (key === 'type') {
                if (value === 'alpha') {
                    if (!fieldValue.match(/^[A-Za-z\s]*$/)) {
                        error[fieldName] = `${names} must be String characters`
                        isValid = false;
                    }
                } else if (value === 'AlphaNumeric') {

                    // if(!fieldValue.match(/^[A-Za-z0-9/(),-.\s]*$/)){
                    if (!fieldValue.match(/^[A-Za-z0-9/(),-.\s]*$/)) {
                        error[fieldName] = `${names} Is Invalid`
                        isValid = false;
                    }
                } else if (value === 'Numeric') {
                    if (!fieldValue.match(/^[0-9]*$/)) {
                        error[fieldName] = `${names} must be String Numeric`
                        isValid = false;
                    }
                } else if (value === 'email') {
                    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                    if (!fieldValue.match(reg)) {
                        error[fieldName] = `${names} must be in Email format`
                        isValid = false;
                    }
                } else if (value == "phone") {
                    let reg = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
                    if (!fieldValue.match(reg)) {
                        error[fieldName] = `${names} Is Invalid`
                        isValid = false;
                    }
                }

            }
            if (isValid == true) {

                error[fieldName] = '';
            }
        })
        setErrors(old => ({ ...old, ...error }))
        // console.log('Error', errors);
        // console.log('Error NAme', errors.name);
    }

    if(fieldName=="banner_image"){
                 
      var reader = new FileReader();
      //Read the contents of Image File.
      reader.readAsDataURL(fieldValue);
     
      reader.onload = (e) => {
          //Initiate the JavaScript Image object.
          var image = new Image();
          //Set the Base64 string return from FileReader as source.
          image.src = e.target.result;
          image.onload = (e) => {
              //Determine the Height and Width.
              var height = image.height;
              var width = image.width;
              console.log("height=>",height,"width=>",height)
              var res = true;
              error[fieldName] = '';
              if (height<600 && width<640) {
                  error[fieldName] = "Height and Width must  exceed 600px."
                  // alert("Height and Width must not exceed 600px.");

                 // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
                  // return false;
                  res =  false;

              }
      
              // alert("Uploaded image has valid Height and Width.");
            
              // alert("validation")
         
              // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
              setErrors(old => ({ ...old, ...error }))
              if(res){
                    setState(old=>({...old,[fieldName]: fieldValue } ))
              }
              return res;
              
          };
         
      }

     
     
    }
    if(fieldName=="featured_image"){
       
      var reader = new FileReader();
      //Read the contents of Image File.
      reader.readAsDataURL(fieldValue);
     
      reader.onload = (e) => {
          //Initiate the JavaScript Image object.
          var image = new Image();
          //Set the Base64 string return from FileReader as source.
          image.src = e.target.result;
          image.onload = (e) => {
              //Determine the Height and Width.
              var height = image.height;
              var width = image.width;
              console.log("height=>",height,"width=>",height)
              var res = true;
              error[fieldName] = '';
              if (height>400 && width>400) {
                  error[fieldName] = "Height and Width must not exceed 400px."
                  // alert("Height and Width must not exceed 600px.");

                 // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
                  // return false;
                  res =  false;

              }
      
              // alert("Uploaded image has valid Height and Width.");
            
              // alert("validation")
         
              // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
              setErrors(old => ({ ...old, ...error }))
              if(res){
                    setState(old=>({...old,[fieldName]: fieldValue } ))
              }
              return res;
              
          };
         
      }

     
     
    }


   
}




  const handleChange=(e)=>{
    validate(e.target.name, e.target.files[0])
    // setState(old=>({...old,[e.target.name]:e.target.files[0]}))
    setImgshow(old=>({...old,[e.target.name]:URL.createObjectURL(e.target.files[0])}))
  }

  const deleteimage=(key,slug)=>{

    // console.log("key=>",key)
    // console.log("slug=>",slug)
    const data={
       id:key,
     
   }

    var arr=state.other_images     

    
    arr[key] ={};
    console.log("arr=>",arr)
     
    const msg_1={
      text_1:"Do you want to De-Activate",
      //text_1:"",
      text_3:" De-Activate ",
      text_2:"Do you want to Activate",
    
      text_4:" Activate "
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
        setState(old=>({...old,other_images:{...arr}}))
       apiCtrl.callAxios(`vehicle/deleteVehicleImage  `,data).then(response => {
   
   
           if(response.success == true){
             Swal.fire({
              
                  title:`Vehicle ${msg1} Successfully!`,
               icon: "success",
               showConfirmButton: false,
               timer: 1200,
             });
             setTimeout(() => {
              Swal.close()
              
             }, 5000);
            // location.reload(`/${props.url}-list`)
               } else {
                 Swal.fire({
                   title: `Vehicle ${msg1} unsuccessfully!`,
                   icon: "error",
                   showConfirmButton: false,
                   timer: 1200,
                 });
                 setTimeout(() => {
                  Swal.close()
                  
                 }, 5000);
               }
             
           console.log('deleted res', response);
   
        
         });
       }else{
        //location.reload(`/admin/${props.url}-list`)
       }
     });

   
  
   


  }
 
  // console.log("props model=>",props.params)
   console.log("stae=>",state)
  // console.log("shoimage=>",showgalleryimages)
 // console.log("message=>",message)
 
 

 
  
  
  return(<>

    <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
              <div className="modal-header">
                  {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
                  <div className="row ml-1" style={{ paddingTop: '2%'}}>
                      <label><b>{props.params.vehicle_model}</b></label>
                  </div>
                  <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
          
          <div className="modal-body m-body">
              
              <div className="row mb-2">

                
                  <div className="col-md-3 mb-3">
                      <MaterialTextField type={"file"} label="Feature image (400px X 400px)" accept="image/*" name="feature_image" fullWidth  onChange={handleChange}
                         helperText={
                          errors.feature_image
                          ? errors.feature_image
                          : ''
                          }
                          error={errors.feature_image?true:false}           
                      />
                      <label className="d-flex justify-content-start"><span className="text-success">{message.featured_image?message.featured_image.success:""}</span></label>
                  </div>
                  {imgshow.feature_image?
                    <div className="col-md-3 mb-3">
                    <img src={imgshow.feature_image?imgshow.feature_image:""}/>
                  

                    </div>:
                   state.featured_image?
                    <div className="col-md-3 mb-3">
                      <img src={state.featured_image?state.featured_image:""}/>
                    

                    </div>:""
                  }
                
                  <div className="col-md-3 mb-3">
                      <MaterialTextField type={"file"} label="Banner Image (600px X 600px)" accept="application/pdf" name="banner_image" fullWidth onChange={handleChange}
                        helperText={
                          errors.banner_image
                          ? errors.banner_image
                          : ''
                          }
                          error={errors.banner_image?true:false}      
                      />
                      <label className="d-flex justify-content-start"><span className="text-success">{message.banner_image?message.banner_image.success:""}</span></label>
              
                  </div>
                  {imgshow.banner_image?
                  <div className="col-md-3 mb-3">
                  <img src={imgshow.banner_image?imgshow.banner_image:""}/>
                

                </div>:
                  state.banner_image?
                    <div className="col-md-3 mb-3">
                      <img src={state.banner_image?state.banner_image:""}/>
                    

                    </div>:""
                  }
                 

              </div>

              <div className="row">
             
                <div className="col-md-6 mb-3">
                  <label className="d-flex justify-content-start"><b>{"Other Image Upload"}</b></label>
                   
                    <FileUploader handleChange={imageupload}  multiple={true} name="other_images" types={fileTypes} />
                    <label className="d-flex justify-content-start"><span className="text-success">{message.other_images?message.other_images.success:""}</span></label>
                </div>
               
                <div className="col-md-6 mb-3">
                 <label className="d-flex justify-content-start"><b>{"Document Upload"}</b></label>
                  <FileUploader handleChange={docupload}  name="doucment" types={filetypes} />
                  <label className="d-flex justify-content-start"><span className="text-success">{message.doucment?message.doucment.success:""}</span></label>
                </div>
                

              </div>
              <div  className="row mb-2">
                {/* <div className="container">
                {showgalleryimages.length>0?
                <Slider {...settings}>
                    {showgalleryimages.length >0 && Object.entries(showgalleryimages).map(([key,image])=>{
                    return(<>
                        <div className="card" style={{width:"180px"}}>
                        <img className="sliderimage" src={image}  alt="..."/>
                        
                        </div>
                       
                    </>)  

                    })}
                
                    
                        
                </Slider>:state.other_images?
                   
                   <Slider {...settings}>
                   {state.other_images.length >0 && Object.entries(state.other_images).map(([key,image])=>{
                   return(<>
                       <div className="card" style={{width:"180px"}}>
                       <img className="sliderimage" src={image}  alt="..."/>
                       
                       </div>
                     
                   </>)  

                   })}
               
                   
                       
               </Slider>:""
                 
                }
                    
                </div> */}
                 
                 
                 {showgalleryimages.length>0?<>
                    {
                         showgalleryimages.length >0 && Object.entries(showgalleryimages).map(([key,image])=>{
                          return(<>
                              <div className="col-md-3 profile-pic" >
                              <img className="sliderimage" src={image}  alt="..."/>
                              
                              </div>
                             
                          </>)  
      
                          })
                    }
                   </>:state.other_images?
                     <>
                     {
                          Object.keys(state.other_images).length >0 && Object.entries(state.other_images).map(([key,image])=>{
                          // console.log("key",key,"image",typeof image)
                           return(<>
                            {typeof image !=="object"&&
                              <div className="col-md-3 profile-pic " >
                                 <img style={{width:"100%"}} className="sliderimage" src={image}  alt="..."/>

                                  <div className="edit">
                     
                                    <button  type="submit" onClick={()=>deleteimage(key)}> <i className="fa fa-fw fa-trash" ></i></button>

                                  </div>
                               
                               
                              </div>
                            }
                              
                           </>)  
       
                           })
                     }
                    </>:""
                       
                  }

              </div>
           
              
              <div className="modal-footer">
                  

                  <Button style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}} onClick={submit}>Upload</Button>&nbsp;&nbsp;
                  
          
                  
              </div>
          </div>  

          
          </div>
      </div>
    </div>
  </>)
}