import React from "react";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialButton from "../../../../Tags/MaterialButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Divider } from '@mui/material';

import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Api from "../../../../api";
import { useState } from "react";
import Swal from "sweetalert2";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import { object } from "prop-types";
export default class SliderCreation extends React.Component{
    constructor(props){
        super(props);
        this.state = {    
            
            SliderImage:[< SliderImage func={this.sliderImage.bind(this)} imgupld={this.sliderImageUpload.bind(this)} delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={0} id={0}/>],
            name:null,
            js:null,     
            css:null, 
            
            slider_details:{
                
            },

            errors:{},
            validation:{
                name:{required:true},
                js:{required:true},     
                css:{required:true}, 
                slider_details:{require:true}
        
            },
        isValid:false,
            is_active:1
        }
        this.apiCtrl = new Api;
        
      }

      sliderImage=(e,position)=>{
        const {name,value}=e.target   
        this.setState(old=>({...old,slider_details:{...old.slider_details,[position]:{...old.slider_details[position],[name]:value}}}))
  
        // console.log("state--=>",this.state)     
    
     }

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

      

        let Addmore = (e) => {
              
              this.setState(old=>({...old,SliderImage:[...old.SliderImage,<SliderImage func={this.sliderImage.bind(this)} imgupld={this.sliderImageUpload.bind(this)} delbyidfunc={this.deletebyid} key={this.state.SliderImage.length} id={this.state.SliderImage.length}   />]}))
          }

          const handleChange = (e) => {
           
            this.setState(old=>({[e.target.name]:e.target.value}))
            
        }

        
        
        const Submit=(e)=>{
            e.preventDefault();

           
     
           
            var data = new FormData();

            //   data.append('name', this.state.name);
            
            Object.entries(this.state).map(([index, value])=>{
                 console.log('key', index)
                // console.log('Value', value)
                //data.append(`${index}`, value);
                if((index!=="errors")&&(index!=="validation")&&(index!=="isValid")){

                    if(index !== "SliderImage" && index !=="slider_details"){
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
                }
                
               
            })


           


            this.apiCtrl.callAxiosFile("slider/create-update",data,true).then((response)=>{
                if(response.success == true){
                    Swal.fire({
                        title: "Create Slider",
                        text: "Created!",
                        icon: "success",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                        Swal.close()
                        this.state({
                            name:null,
                            js:null,     
                            css:null, 
                            
                            slider_details:{
                                
                            },
                        })
                        $('.close').trigger('click');
                  }, 3000);
                } else {
                    Swal.fire({
                        title: "Create Slider",
                        text: "Not Created!",
                        icon: "error",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                        Swal.close()
                        $('.close').trigger('click');
                  }, 3000);
                }
            })
            

        }

        return(<>

            {/* <BreadCrumb breadcrumb={"Slider"} breadcrumbItem1='Create' /> */}

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row ml-1">
                    <label><b>{"New Slider"}</b></label>
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="row ml-1 mt-2">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <MaterialTextField label="Name" placeholder="Name"  fullWidth name='name' onChange={(e)=>handleChange(e)}
                            value={this.state.name?this.state.name:""}
                             helperText={
                                this.state.errors.name
                                ? this.state.errors.name
                                : ''
                               }
                               error={this.state.errors.name?true:false}
                            />

                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <MaterialTextField label="Code" placeholder="Slider code"  fullWidth name='code' onChange={(e)=>handleChange(e)}/>

                        </div> */}
                          <div className="col-md-4 mb-4">
                            {/* <FormControlLabel control={<Checkbox checked={this.state.is_active=="1"?true:false}   onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}/>} label={"Enable"} /> */}
                            <Switch checked={this.state.is_active=="1"?true:false} onChange={(e)=>this.setState({is_active:e.target.checked?1:0})}   fullWidth />                 
                            { <strong> {"Active"} </strong>         }
                          </div>
                        <div className="col-md-6 mb-3">
                            <MaterialTextArea style={{height: "123px"}}label="Js" row={4} multiline placeholder="js" fullWidth name='js' onChange={(e)=>handleChange(e)}
                              value={this.state.js?this.state.js:""}
                               helperText={
                                this.state.errors.js
                                ? this.state.errors.js
                                : ''
                               }
                               error={this.state.errors.js?true:false}
                            
                            />

                        </div>
                        <div className="col-md-6 mb-3">
                            <MaterialTextArea style={{height: "123px"}} label="CSS" row={4} multiline placeholder="Css" fullWidth name='css' onChange={(e)=>handleChange(e)}
                            value={this.state.css?this.state.css:""}
                             helperText={
                                this.state.errors.css
                                ? this.state.errors.css
                                : ''
                               }
                               error={this.state.errors.css?true:false}
                            />

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

                <div className="row mt-3">

                {this.state.SliderImage}


                 </div>


                

             
                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Submit} name="submit" text="Submit" />
                </div>
                

               
            </Box>
        </>)

    }
}

function SliderImage(props){
    

   // console.log("props=>",props)

    const [state,setState]=useState({
        type:""
    })
    const [showimg,setShowimg]=useState({
        imgslider:""
    })
   
    const type={
        'image':"Image",
        "youtube-video":"Youtube Video"
    }
       const handleChange = (e)=>{
        setState({type:e.target.value})
        props.func(e,props.id)
       
       }
       const imagehandlechange=(e)=>{
         props.imgupld(e,props.id)

         setShowimg({imgslider:URL.createObjectURL(e.target.files[0])})
       
       }

       const remove=()=>{
       
        props.delbyidfunc(props.id)
      
       }
   
   
      console.log("state=>",state)
       return (
           <>
              
         
        <div className="col-md-2 mb-2">
        <MaterialSelect  name="type"  value={state.type}   data={type}    onChange={(e)=>handleChange(e)}   label="Select Type" fullWidth />                     
        </div>

        

        <div className="col-md-2 mb-2">
        
      <MaterialTextField   name="title_1"  label="title-1" onChange={(e)=>props.func(e,props.id)}  fullWidth  />
      </div>
      <div className="col-md-2">
      <MaterialTextField   name="title_2"  label="tittle-2" onChange={(e)=>props.func(e,props.id)}  fullWidth  />
      </div>
      <div className="col-md-2 mb-2" >
      <MaterialTextField   name="short_description"  label="description" onChange={(e)=>props.func(e,props.id)}  fullWidth  />
      </div>
      {state.type==="image"?
           <div className="col-md-2 mb-2">
            <MaterialTextField style={{width:"40%", borderRadius:"14px"}} label={"600px X 300px "} type="file" name="image"   onChange={imagehandlechange}  fullWidth  />
            {showimg.imgslider!==""?
             
                
                <img  style={{width:"38%", height:"58%",marginLeft:"15px"}} src={showimg.imgslider?showimg.imgslider  :""} />
                :""
            }
           
           </div>
           

           : 
           <div className="col-md-2 mb-2">
           <MaterialTextField   name="link" placeholder="Enter Url" label="" onChange={(e)=>props.func(e,props.id)}  fullWidth  />
           </div> 
      }
    
     <div className="col-md-1 mb-2">
      <MaterialTextField  test="number" name="priority"  label="Priority" onChange={(e)=>props.func(e,props.id)}  fullWidth  />
      </div>

      <div className="col-md-1 mb-4 d-flex"style={{justifyContent:"right", marginBottom:"auto"}}>
        <IconButton onClick={remove} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
        </IconButton>
       </div>

       
            
       
    
                    
               

                                
              
                         
                       
             
           
              
           </> 
       
      )
     
   }