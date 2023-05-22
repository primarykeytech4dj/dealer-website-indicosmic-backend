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
  const apiCtrl=new Api
  console.log("state=>",state)
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const filetypes = ["PDF"];
 

  useEffect(()=>{



  })


 
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

        setState(old=>({...old,other_images:{...file}}))
        //setState(old=>({...old,showgalleryimages:[...old.showgalleryimages,URL.createObjectURL(value)]}))
       setshowgalleryimages(old=>([...old,URL.createObjectURL(value)]))
    })
      
  };

  const docupload =(file)=>{
       console.log(file)
      

        setState(old=>({...old,document:file}))
        
  

  }
 
  // console.log("props model=>",props.params)
  // console.log("stae=>",state)
  // console.log("shoimage=>",showgalleryimages)
  console.log("message=>",message)
 
 

 
  
  
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

                
                  <div className="col-md-6 mb-3">
                      <MaterialTextField type={"file"} label="Feature image" accept="image/*" name="feature_image" fullWidth  onChange={(e)=>setState(old=>({...old,feature_image : e.target.files[0]}))}/>
                      <label className="d-flex justify-content-start"><span className="text-success">{message.featured_image?message.featured_image.success:""}</span></label>
                  </div>
                
                  <div className="col-md-6 mb-3">
                      <MaterialTextField type={"file"} label="Banner Image" accept="application/pdf" name="banner_image" fullWidth onChange={(e)=>setState(old=>({...old,banner_image : e.target.files[0]}))}/>
                      <label className="d-flex justify-content-start"><span className="text-success">{message.banner_image?message.banner_image.success:""}</span></label>
              
                  </div>
                 

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
                <div className="container">
                <Slider {...settings}>
                    {showgalleryimages.length >0 && Object.entries(showgalleryimages).map(([key,image])=>{
                    return(<>
                        <div className="card" style={{width:"180px"}}>
                        <img className="sliderimage" src={image}  alt="..."/>
                        
                        </div>
                        {/* <img className="image" src={image}/> */}
                    </>)  

                    })}
                
                    
                        
                </Slider> 
                    
                </div>

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