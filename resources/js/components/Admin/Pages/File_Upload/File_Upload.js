import React from "react";
import Api from "../../../../api";
import { FileUploader } from "react-drag-drop-files";
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { object } from "prop-types";
import '../File_Upload/Upload_file.css'
export  class FileUpload extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        images:[],
       
        files:[],
        error:"",
        success:""
        
      }
      this.apiCtrl = new Api;
      
    }

    render(){

      var types=this.props.type
        // const handleChange = (file) => {
        //     // console.log(file)
        //     Object.entries(file).map(([index, value])=>{

        //         this.setState(old=>({...old,other_images:[...old.other_images,value]}))
        //     })
        //      console.log("stae=>",this.state)
        // };
        
        const handleChange = (file) => {
          // console.log("file",file)
           var array = [];
           Object.entries(file).map(([index, image])=>{
            array = [...array, image]
          })

          // this.setState(old=>({...old,files:array}))
          // console.log("files=>",this.state.files)

            var data = new FormData();
            data.append(`files`, array)
            data.append(`type`, this.props.type)
            data.append(`campaign_code`, this.props.campaign_code)
            // Object.entries(this.state).map(([index, value])=>{
            //   console.log("index",index,value)
            //   if(index === 'files'){

            //                   value.map((val1, key1)=>{
            //                     console.log("key",key1)
    
            //                       data.append(`${index}[]`, value[key1]);
            //                   })
            //               }
              

            // })
            //   if(Object.keys(this.state).length > 0){

            //   Object.entries(this.state).map(([index, value])=>{
            //       if(index!=="images"&&index!=="error"&&index!=="success"){
            //           if(index === 'files'){

            //               value.map((val1, key1)=>{
            //                 console.log("key",key1)

            //                   data.append(`${index}[]`, value[key1]);
            //               })
            //           } else {
            //             //  data.append(`${index}`, value);
            //           }
            //       }
            //   })
            // }
          
          
           this.apiCtrl.callAxiosFile("upload-docs-campaign",data).then((response)=>{
            
            console.log("respomnse=>",response)
            
                if(response.success === true){
                    this.setState(old=>({...old,files:[""]}))
                    var success=types+"Uploaded"
                      this.setState(old=>({...old,imagelist:response.data,success:success}))
                  }else{
                
                        var errors=types+" "+"not Uploaded"
                        this.setState(old=>({...old,error:errors}))
                    }
                 })
              };
              
              console.log("state filesupload=>",this.state)
        const fileTypes={
            image:["JPG", "PNG","JPEG"] ,
            video:["mp4"],
            file:["pdf"]
        }
            
        
       
       // var typename=this.props.typename
    

        

        return(<div key={this.props.key} >
             
             
                <FileUploader handleChange={handleChange}   multiple={true} name={`files[]`} types={fileTypes[types]} />
             
                {this.state.error!==""?<label className="text-danger">{this.state.error}</label>:""}
                {this.state.success!==""?<label className="text-success">{this.state.success}</label>:""} 

           
               



        </div>)
    }
}