import React from "react";
import Api from "../../../../api";
import { FileUploader } from "react-drag-drop-files";
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import MaterialTextField from "../../../../Tags/MaterialTextField";
export  class LinkUpload extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        
       
      }
      this.apiCtrl = new Api;
      
    }

    render(){


        const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

        return(<>
             

             <BreadCrumb breadcrumb={"FileUpload"} breadcrumbItem1='Create' />

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row mb-3 ml-1">
                    <label><b>{ ""}</b></label>
                </div>

              <Divider sx={{ borderColor: '#dac4c4'}} />

              <div className="row">
              <div className="row">
              <MaterialTextField label="Links"/>
                </div>

              </div>
            </Box>



        </>)
    }
}