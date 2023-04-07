import React from "react";
import Api from "../../../../api";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialButton from "../../../../Tags/MaterialButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from 'react-bootstrap';
import { useState } from "react";
import Swal from "sweetalert2";
import Switch from '@mui/material/Switch';
import SliderCreation from "./Slider_Creation";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
export default class SliderList extends React.Component{

    constructor(props){
        super(props);
        this.state = {    
          
            data:[],
            isLoading: false,
            filter:"",
            page: 0,
            pageSize: 10,
            sliderData:[],

        }
        this.apiCtrl = new Api;
        
      }

    
        
        // componentDidMount=()=>{
         
        //   this.getSliderList();
        // }
        
        componentWillMount = () => {
          this.getSliderList();
          
        }

        componentDidUpdate(prevProps, prevState){
          // console.log('update')
         
          // if ((prevState.page !== this.state.page)||(prevState.pageSize !== this.state.pageSize)) {
          //   this.getSliderList();
          // }
            if ((prevState.page !== this.state.page)) {
              this.getSliderList(this.state.pageSize);
          }
          if ((prevState.pageSize !== this.state.pageSize)) {
            this.getSliderList(prevState.pageSize);
          }
          if((prevState.filter!==this.state.filter)){
            this.getSliderList()
          }
        }
        
        
       
      
         
    
      getSliderList=(pageSize) =>{

       
        this.setState(old => ({...old, isLoading:true}))
        var data = {filter:this.state.filter,length:this.state.pageSize, start:this.state.page*this.state.pageSize};

       
      // this.setState(old => ({...old, data:response.data, total:response.data.iTotalRecords}))

      
        this.apiCtrl.callAxios('slider/all',data).then(response => {
            console.log("APIresponse=>",response);
            
            if(response.success == true){
                //this.setState(old => ({...old, data:response.data, }))
               // this.setState(old => ({...old, data:[...old.data, ...response.data.aaData], total:response.data.iTotalRecords}))
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

        // componentDidUpdate(prevProps, prevState){
        //     if (prevState.page !== this.state.page) {
        //                 this.getSliderList();
        //             }

        // }

     



      render(){

        const  handleClick = (data) => {
          //  console.log("dataproduct===",data.id)
             this.setState({sliderData: data})
           }

        const columns = [
            { field: 'sr_no', headerName: 'SR No', width: 100 },
            { field: 'name', headerName: 'Name', width: 190 },
            { field: 'slider_code', headerName: 'Slider Code', width: 190 },
            { field: 'image_count', headerName: 'Image Count', width: 150 },
            { field: 'css', headerName: 'Css', width: 150},
            { field: 'js', headerName: 'Js', width: 100 },
            { field: 'is_active', headerName: 'Active', width: 150 ,renderCell: (params) => <IsActive key={params.row.id+'_'+params.row.sr_no} func={this.getSliderList}  param={params.row} />,},
            { field: 'created', headerName: 'Created', width: 150 },
            { field: 'modified', headerName: 'Modified', width: 150 },
            { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Action func={(e)=>{handleClick(e)}} key={params.row.id+'_'+params.row.sr_no} param={params.row} />, },
          ];
        return(<>

            <BreadCrumb breadcrumb="Slider List" />
            {/* <Button  type="button" style={{ backgroundColor: '#183883',width:"139px", marginBottom: "20px", marginLeft:"47rem",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Add product</Button> */}
       
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
                <div className="col-md-3 mb-2">
                  <MaterialTextField size="small" name='search'  placeholder="Search"
                  onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}
                  />
                </div>
                <div className="col-md-3">
                <Button  type="button" style={{ backgroundColor: '#183883',width:"auto", color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Create Slider</Button>

                </div>


              </div>
        
            <div style={{ height: '100%', width: '100%' }}>
        
            <DataGrid
                autoHeight
                rows={this.state.data}
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

            <EditSlider params={this.state.sliderData} />
            <Model/>
            </Box>
        </>)
      }

}

function Action(props){
    const editSliderdata = (event)=>{
        props.func(props.param)
      }
    return(<>

      <Button type='button' data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={(e)=>{editSliderdata(e)}} >Edit</Button>&nbsp;
      
    </>)

}

function IsActive(props){

 //console.log("peops=>",props.params) 
 const [state,setState]=useState(props.param)
 const apiCtrl = new Api;

 const deletesliderdata=(e)=>{
 // console.log("event",event.target.checked)
  setState(old=>({...old,is_active:e.target.checked?1:0}))

  const data={
   
    is_active:e.target.checked?1:0
  }
 // console.log("productdeletedata",data)

  // apiCtrl.callAxios(`slider/delete/${state.id}`,data).then(response => {
  //   console.log("response=>",response)
  //   if(response.success == true){
    //   location.reload("/slider-list")
  //     }
    
  // })
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
    apiCtrl.callAxios(`slider/delete/${state.id}`,data).then(response => {


        if(response.success == true){
          Swal.fire({
           
               title:`Slider ${msg1} Successfully!`,
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
          });
          setTimeout(() => {
            Swal.close()
      }, 3000);
          //location.reload("/admin/slider-list")
            } else {
              Swal.fire({
                title: `Slider ${msg1} unsuccessfully!`,
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
    }else{
     // location.reload("/admin/slider-list")
     
    }
  });
}
    return(<>
        
        <div className="col-md-4 mb-4">
          {/* <FormControlLabel control={<Checkbox checked={state.is_active== "1"?true:false} onClick={deletesliderdata}  />} label={"Is Active"} /> */}
          <Switch checked={state.is_active== "1"?true:false} onClick={deletesliderdata}   fullWidth /> 
          {/* <strong>   {removeCharacter(props.name, '_')}</strong>          */}
        </div>

    </>)
}

  
function Model(props){

  //  console.log( "modelprops==>",props)
   
    return(
      <>
     
        <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-xl modal-dialog-centered ">
          <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Create Slider</h5>
              <div className="row ml-1" style={{ paddingTop: '2%'}}>
                  {/* <label><b>{props.params.any} Details</b></label> */}
              </div>
              <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body m-body">
              
            <div className="row">
              
            <SliderCreation/>
  
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


  class EditSlider extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      
       
        data: [],
        SliderImage:[< SliderImage func={this.sliderImage.bind(this)} imgupld={this.sliderImageUpload.bind(this)} delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={0} id={0}/>],       
       //SliderImage:[]
      }
      this.apiCtrl = new Api;
      
    }

    componentDidUpdate(prevProps,prevState){
     
        if(prevProps.params.id !== this.props.params.id){
          this.setState(old=>({...old,SliderImage:[""]}))

        //   Swal.fire({
        //     title: 'Loading...',
        //     didOpen: () => {
        //         Swal.showLoading()
        //     }
        // })

          this.apiCtrl.callAxios(`slider/show/${this.props.params.slider_code}`).then(response => {
            //  location.reload('/user-list')
            console.log("response=>",response)
             this.setState(response.data[0])
            console.log("staet =>",response.data)

            var data = [];
             Object.entries(this.state.slider_details).map(([index, value])=>{
           //   console.log("index",index,"value====>",value)
            
              data = [...data, < SliderImage  func={this.sliderImage.bind(this)} imgupld={this.sliderImageUpload.bind(this)} delbyidfunc={this.deletebyid} value={{key:index, val:value}} key={index} id={index}/>]
              
              
            })
            
            this.setState(old=>({
                ...old, SliderImage: data
            }))
            
           console.log("staet  =>",this.state)
          // Swal.close()
          })

          
          //this.setState(this.props.params)
          //console.log("props=>",this.props)
         

        } 
      }



  
  sliderImage=({name,value,position})=>{

    //const {name,value}=e.target
         
    
    this.setState(old=>({...old,slider_details:{...old.slider_details,[position]:{...old.slider_details[position],[name]:value}}}))

  
    // console.log("state--=>",this.state)     

 }

 

  // sliderImageUpload=(e,position)=>{
  //     const {name}=e.target

  //     const selectedFile=e.target.files[0]
  //     const formData = new FormData()
  //     formData.append("img_url", selectedFile, selectedFile.name);

  //     this.setState(old=>({...old,slider_details:{...old.slider_details,[position]:{...old.slider_details[position],[name]:formData}}}))
    

  // }

  sliderImageUpload=(e,position)=>{
    const {name}=e.target

    //  const selectedFile=e.target.files[0]
    // const formData = new FormData()
    // formData.append("image", selectedFile, selectedFile.name);

    this.setState(old=>({...old,slider_details:{...old.slider_details,[position]:{...old.slider_details[position],[name]:e.target.files[0]}}}))
  

}

  deletebyid=(delrowbyid)=>{
      console.log("delrowbyid",delrowbyid)
    //  const adlngth=delrowbyid 
      const Keyvaluefield= this.state.SliderImage
      console.log("oflength=>",Keyvaluefield)
      delete Keyvaluefield[delrowbyid]
      // console.log("oflength=>",oflength)
        this.setState(old=>({...old,Keyvaluefield}))
         console.log("stateAfterdel=>",this.state)
  

  }

    render(){

      const submituser=(e)=>{

        // const data={
        //   id:this.state.id,
        //   name:this.state.name,
        //   js:this.state.js,
        //   css:this.state.css,
        //   is_active:this.state.is_active,
        //   slider_code:this.state.slider_code,
        //   slider_details:this.state.slider_details
        // }
        // console.log("data",data)

        var data = new FormData();

            //   data.append('name', this.state.name);
            
            Object.entries(this.state).map(([index, value])=>{
                 console.log('key', index)
                // console.log('Value', value)
                //data.append(`${index}`, value);
                
                if(index !== "SliderImage"&& index !=="slider_details"){
                    data.append(`${index}`, value);
                }
                if(index==="slider_details"){
                Object.entries(value).map(([index1,val1])=>{
                    console.log('index1',index1, "val1",val1)
                    Object.entries(val1).map(([index2,val3])=>{
                          console.log('index2',index2, "val3",val3)
                         
                            data.append(`slider_details[${index1}][${index2}]`,val3);
                          

                      
                    })
                    
                })
                }
            })



        this.apiCtrl.callAxiosFile("slider/create-update",data,true).then((response)=>{
            if(response.success == true){
            Swal.fire({
                title: " Slider",
                text: "Updated",
                icon: "success",
                showConfirmButton: false,
            })
            setTimeout(() => {
              Swal.close()
              $('.close').trigger('click');
              //location.reload("/admin/Sliders/list")
        }, 3000);
        } else {
            Swal.fire({
                title: " Slider",
                text: "Not Updated!",
                icon: "error",
                showConfirmButton: false,
            })
            setTimeout(() => {
              Swal.close()
              $('.close').trigger('click');
        }, 3000);
        }
            console.log("===>",response);
           // location.reload("/slider-list")
          
        }).catch(function (error) {
          console.log(error);
        });

        // this.apiCtrl.callAxios('slider/create-update', data).then(response => {
        //   //  location.reload('/user-list')

        //   if(response.success == true){
        //     Swal.fire({
        //         title: " Slider",
        //         text: "Updated",
        //         icon: "success",
        //         showConfirmButton: false,
        //     })
        // } else {
        //     Swal.fire({
        //         title: " Slider",
        //         text: "Not Updated!",
        //         icon: "error",
        //         showConfirmButton: false,
        //     })
        // }
        //     console.log("===>",response);
        //     location.reload("/slider-list")
          
        // }).catch(function (error) {
        //   console.log(error);
        // });

      }

      let Addmore = (e) => {
                  
        this.setState(old=>({...old,SliderImage:[...old.SliderImage,<SliderImage func={this.sliderImage.bind(this)} imgupld={this.sliderImageUpload.bind(this)} delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={this.state.SliderImage.length} id={this.state.SliderImage.length}   />]}))
      }
       
    
  
     
      // console.log('Propps', this.props.params)

      return (
        <>
  
          {/* <BreadCrumb breadcrumb="Product" breadcrumbItem1='Create' /> */}
           
           
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog  modal-xl modal-dialog-centered  ">
          <div className="modal-content">
          <div className="modal-header">
              <div className="row ml-1" style={{ paddingTop: '2%'}}>
                    <label><b>Update Slider</b></label>
                  
              </div>
              <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body m-body">
              
            <div className="row">
              
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
  
              
  
                <Divider sx={{ borderColor: '#dac4c4'}} />
  
                <div className="row ml-1">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <MaterialTextField label="Name" value={this.state.name?this.state.name:""} placeholder="Name"  fullWidth name='name'onChange={(e)=>this.setState({name : e.target.value})} />

                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <MaterialTextField label="Code" value={this.state.slider_code?this.state.slider_code:""} placeholder="code"  fullWidth name='slider_code' onChange={(e)=>this.setState({slider_code : e.target.value})}/>

                        </div> */}
                          <div className="col-md-4 mb-4">
                            {/* <FormControlLabel control={<Checkbox checked={this.state.is_active== "1"?true:false}   onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}/>} label={"Is ACtive"} /> */}
                            <Switch checked={this.state.is_active=="1"?true:false} onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}   fullWidth />                 
                            { <strong> {"Active"} </strong>         }
                          </div>
                        <div className="col-md-6 mb-3">
                            <MaterialTextArea  style={{height: "123px"}} row={4} label="JS"value={this.state.js?this.state.js:""}  multiline placeholder="js" fullWidth name='js' onChange={(e)=>this.setState({js : e.target.value})}/>

                        </div>
                        <div className="col-md-6 mb-3">
                            <MaterialTextArea style={{height: "123px"}} row={4}label="Css" value={this.state.css?this.state.css:""}  multiline placeholder="Css" fullWidth name='css' onChange={(e)=>this.setState({css : e.target.value})}/>

                        </div>
                    


                        
                    </div>


                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className="row ml-1">
                    <label><b>{"Slider Image"}</b></label>
                </div>

            

                <div className="row">

                    <div className="col-md-2"><strong>Type</strong></div>
                    <div className="col-md-2"><strong>Title-1</strong></div>
                    <div className="col-md-2"><strong>Title-2</strong></div>
                    <div className="col-md-2"><strong>Description</strong></div>
                    <div className="col-md-2"><strong>Image/Youtube url</strong></div>
                    <div className="col-md-2"><strong>Priority</strong></div>


                </div>

                {/* <div className="row mt-3">

                  {
                  this.state.SliderImage.map((value, index)=>{
                    //      console.log("index",index)
                          return value;
                    
                      })  
                  }


                 </div> */}

                  {
                   this.state.SliderImage.map((value, index)=>{
                    //      console.log("index",index)
                          return value;
                    
                      })  
                  }

                 <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>
                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className='row'>
                  <div className="col-md-12 d-flex justify-content-end">
                      <Button style={{ backgroundColor: '#183883' }} onClick={ submituser }>Update</Button>
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


  function SliderImage(props){

    console.log("propsimage=>",props)
    
    const [value,setValue]=useState(props.value.val)
    const type={
        'image':"Image",
        "youtube-video":"Youtube Video"
    }

       const handleChange = ({name,value,position})=>{
        //console.log("name",name,"value",value,"position",position)
        setValue(old=>({...old,[name]:value}))
        props.func({name:name,value:value,position:position})
       
      }
       


       const remove=()=>{
       
        props.delbyidfunc(props.id)
      
       }
   
   
    //  console.log("state=>",state)
       return (
           <>
      <div className="row mt-3" key={props.key}>      
         
        <div className="col-md-2 mb-2">
        <MaterialSelect  name="type"  value={value.type?value.type:""}   data={type}   onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})}    label="Select Type" fullWidth />                     
        </div>

        

        <div className="col-md-2 mb-2">
        
      <MaterialTextField value={value.title_1?value.title_1:""}  name="title_1"  label="title-1" onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})}  fullWidth  />
      </div>
      <div className="col-md-2">
      <MaterialTextField  value={value.title_2?value.title_2:""}  name="title_2"  label="tittle-2" onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})}  fullWidth  />
      </div>
      <div className="col-md-2 mb-2" >
      <MaterialTextField   name="short_description"  value={value.short_description?value.short_description:""} label="description" onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})}  fullWidth  />
      </div>
      {value.type==="image"?

        <>
          <div className="col-md-2 mb-2">
            <MaterialTextField style={{width:"40%", borderRadius:"14px"}} type="file" name="image"  placeholder="Choose File" label="" onChange={(e)=>props.imgupld(e,props.id)}    />
            
            {value.image!==""?
        
            <img  style={{width:"38%", height:"58%",marginLeft:"15px"}} src={value.image?value.image  :""} />
            :""
            }
          </div>
        </>

        : 
        <div className="col-md-2 mb-2">
        <MaterialTextField  value={value.link?value.link:""} name="link"  label="" onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})}  fullWidth  />
        </div> 
      }

    
     <div className="col-md-1 mb-2">
      <MaterialTextField type="type"  value={value.priority?value.priority:""} name="priority"  label="Priority" onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})}  fullWidth  />
      </div>

      <div className="col-md-1 mb-4 d-flex"style={{justifyContent:"right", marginBottom:"auto"}}>
        <IconButton onClick={remove} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
        </IconButton>
       </div>
    </div>         
           </> 
       
      )
     
   }
