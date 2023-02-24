import React from "react";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialButton from "../../../../Tags/MaterialButton";
import { FileUpload } from "../File_Upload/File_Upload";

import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import Api from "../../../../api";
export  class FileUploadCampaign extends React.Component {
    constructor(props){
      super(props);
      this.apiCtrl = new Api;
      this.state = {
        
       
        LinkUrl:[<LinkUrl func={this.urllinkupload.bind(this)}  delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={0} id={0}/>],
        link:{},
        imagelist:{},
        error:"",

        files:[]
      
      }
      
    }

    urllinkupload=({name,value,position})=>{
        // console.log("name",name,"value",value,"position",position)        
         this.setState(old=>({...old,link:{...old.link,[position]:{...old.link[position],value}}}))       
         console.log("state--=>",this.state)     
     
    }

 
    deletebyid=(id)=>{
       console.log("id=>",id)
        const linksrow =this.state.LinkUrl
        console.log("linksrow",linksrow)
         delete linksrow[id]
       // console.log("deletedata=>",datadelete)
         this.setState(old=>({...old, linksrow}))
       console.log("state",this.state)
    }


 
    
    render(){
      
      const filedownload = () => {
        this.apiCtrl.callAxios('vehicle/export-vehicle-format', {vehicle_type:1}).then((res)=>{
          console.log(res);
          if(res.success == true){
            window.open(res.message)
          }
        })
      }
     
        let Addmore = (e) => {
              
            this.setState(old=>({...old,LinkUrl:[...old.LinkUrl,<LinkUrl func={this.urllinkupload.bind(this)}  delbyidfunc={this.deletebyid} key={this.state.LinkUrl.length} id={this.state.LinkUrl.length}/>]}))
        }


        // const handleChange = (file) => {
        //    //  console.log("file",file)
        //     Object.entries(file).map(([index, value])=>{

        //         this.setState(old=>({...old,files:[...old.files,value]}))
        //     })
        //     // console.log("stae=>",this.state)

        //     this.apiCtrl.callAxiosFile("product/create-product",this.state.files).then((response)=>{
        
        //       if(response.success === true){
        //         this.setState(old=>({...old,files:[""]}))

        //          this.setState(old=>({...old,imagelist:response.data}))
        //       }else{

        //           var errors="Image not Upload"
        //          this.setState(old=>({...old,error:errors}))
        //       }
        //     })
        // };


        console.log("state =>",this.state)

        return(<>

            <BreadCrumb breadcrumb={""} breadcrumbItem1='Create' />

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row mb-3 ml-1">
                    <label><b>{""}</b></label>
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />


                <div className="row">
                  <label><b>{"Video Upload"}</b></label>
                    <div className="col-md-6 md-3" style={{justifyContent:"right", hight:"20px",marginBottom:"24px"}}>
                  
                      {/* <FileUpload func={handleChange} type={"video"} /> */}
                      <FileUpload  key={'video'} type={"video"} />
                    </div>

                    
                 
                     

                </div>
                <div className="row">
                <label><b>{"Image Upload"}</b></label>                
                    <div className="col-md-6 md-3"  style={{justifyContent:"right", hight:"20px",marginBottom:"24px"}}>
                     
                      {/* <FileUpload func={handleChange} type={"image"}/> */}
                      <FileUpload key={"image"} type={"image"}/>
                    </div>

                    <div className="col-md-6">
                      <fieldset className="form-group border p-3">
                        <div className="row " >
                          <legend className="col-form-label col-sm-2  pt-0" ></legend>
                            <div className="col-sm-10">

                                  

                                <div className="row">
                                </div>
                            </div>
                        </div>
                      </fieldset>
                    </div>
                  
                  
                </div>
                 
                <div className="row">
                <label><b>{"PDF Upload"}</b></label>
                  <div className="col-md-6 md-3"  style={{justifyContent:"right", hight:"20px",marginBottom:"24px"}}>
                 
                    {/* <FileUpload func={handleChange} type={"file"}/> */}
                    <FileUpload key={"file"} type={"file"}/>
                  </div>    

              </div>




                <div className="row">
                  <label className="mb-3"><b>{"Link Upload"}</b></label>
                  
                       

                        {this.state.LinkUrl}
                     
                   
                </div>
                    
                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton onClick={filedownload} style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  name="submit" text="Submit" />
                </div>
                

                
            </Box>
        </>)
    }
}


function LinkUrl(props){
    //console.log("props=>",props)
    const remove=()=>{
       
        props.delbyidfunc(props.id)
      
       }
    return(<>

      
      <div className="col-md-6 mb-4" >
      <MaterialTextField label="Upload Link" onChange={(e)=> props.func({name:e.target.name,value:e.target.value,position:props.id})}  placeholder="Enter URL" fullWidth/>
       
      </div>
       
     

       <div className="col-md-2 d-flex mb-4 "style={{justifyContent:"right", marginBottom:"auto"}}>
              <IconButton onClick={remove} aria-label="delete" size="large">
                  <ClearIcon fontSize="inherit" />
              </IconButton>
            </div>
            
      
     
    </>)

}