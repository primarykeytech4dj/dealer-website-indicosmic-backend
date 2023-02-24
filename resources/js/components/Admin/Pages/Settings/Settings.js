import React from "react";
import Api from '../../../../api';
import Staticjson from '../../../../staticJson';
import {websiteJson} from '../../../../constants';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import MaterialSelect from '../../../../Tags/MaterialSelect';
import Button  from '@mui/material/Button';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Box, Divider } from '@mui/material';
import ColorPicker from 'react-color-picker'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import Swal from "sweetalert2";
 
import 'react-color-picker/index.css'
//const STATIC_JSON_PATH = process.env.STATIC_JSON_PATH+"public/config-json/Website.json";
export class Setting extends React.Component {
    constructor(props){
      super(props);
      this.apiCtrl = new Api;
      this.state = {
        showPickerp: false,
        showPicker: false,
        showPickerd: false,

          

          site_settings: {
            
            color: {
                primary:" #808000",
                backgound: "#4b74a1",
                dark: "#1f2e43"
            },
          },

          type:"frontend",
          modulename:"Website",
          
    
      }
        // this.staticJsonFile = new Staticjson;
        // //alert(websiteJson);
        // this.staticJsonFile.callAxiosJsonFile(websiteJson).then(response => {
        //     console.log("path data=",response)
        //     this.setState({response})

        // })
       
        
       
       
      
       
    }
    
    onClick = () => {
        this.setState({ 
          showPicker: !this.state.showPicker ,
          
        })
    };
    primary = () => {
        this.setState({ 
         
          showPickerp: !this.state.showPickerp
        })
    };

    dark = () => {
        this.setState({ 
         
          showPickerd: !this.state.showPickerd
        })
    };
 
    onClose = () => {
      this.setState({ 
        showPickerp: false ,
        showPicker: false ,
        showPickerd:false
      })
    };

    componentDidMount=()=>{

      var obj ={}
      this.apiCtrl.callAxios("setup/list",{type:this.state.type,module_name:this.state.modulename}).then(response => {
        //  console.log("response=>",response)
        Object.entries(response.data).map(([key,value])=>{
          console.log("value",value)
           obj = JSON.parse(value.config);


          console.log("onkj=>",obj)
            
          
        
        })
       
        this.setState (obj)
        

      })

    }
 
    
   
    render(){
        const styles = reactCSS({
            'default': {
            //   color: {
            //     width: '40px',
            //     height: '15px',
            //     borderRadius: '3px',
            //     background: `rgba(${ this.state.color. primary }, ${ this.state.color.backgound }, ${ this.state.color.dark })`,
            //   },
              popover: {
                position: 'absolute',
                zIndex: '3',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
              swatch: {
                padding: '6px',
                background: '#ffffff',
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'inline-block',
                boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
              },          
            },
          });

        const theme={"dealer":"Dealer","panagea admin":"Panagea Admin"}
       
          
       const  imgupload =(event)=>{
        var   selectedFile= event.target.files[0]
        const formData = new FormData();
      
        formData.append("dataFile", selectedFile, selectedFile.name);
        this.setState(old=>({...old,site_settings:{...old.site_settings,logo:formData} }))
       }
     
    
    

        const submitdata=(e)=>{

           e.preventDefault();

           var config={
            site_settings:this.state.site_settings,
            theme:theme
           }

           this.apiCtrl.callAxios("setup/create",{config:config, theme:this.state.theme,type:this.state.type,module_name:this.state.module_name}).then(response => {
        
            console.log ("response==>",response)

            if(response.success == true){
                Swal.fire({
                    title: " Website",
                    text: "Updated",
                    icon: "success",
                    showConfirmButton: false,
                })
            } else {
                Swal.fire({
                    title: "Website",
                    text: "Not Updated",
                    icon: "error",
                    showConfirmButton: false,
                })
            }

        }).catch(function (error) {
         console.log(error);
        }); 
   
          
        }


        Object.entries(this.state.site_settings).map(([key, value])=>{
          console.log("key",key,"value",value)
        })

       
         console.log("state=>",this.state)
        return(
            <>
               <BreadCrumb breadcrumb="Users" breadcrumbItem1={"Setting"} />
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row ml-1">
                    <label><b></b></label>
                </div>
              <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
                 <label><b>Site Settings</b></label>
                </div>
                <div className="row ">

                  <div className="col-md-4 mb-4">
                    <MaterialTextField
                        type="file"
                        label="Logo" size="large" 
                        fullWidth name='logo' 
                        onChange={imgupload}
                        //onChange={(e)=>this.setState(old=>({...old,site_settings:{...old.site_settings,logo:e.target.value} }))}
                    />
                  </div>

                                   
                    <div className="col-md-4 mb-4">
                    

                    <MaterialTextField
                    onClick={ this.primary }
                    label="Primary" size="large" 
                    fullWidth value={this.state.site_settings.color.primary} 
                    type="text"
                   />
                    

                    
                    { this.state.showPickerp ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.onClose }/>
                        <SketchPicker color={ this.state.site_settings.color.primary } 
                        
                            onChange={(e)=>this.setState(old=>({...old,site_settings:{...old.site_settings,color:{...old.site_settings.color,primary:e.hex}} }))}
                            />
                    </div> : null }

                    </div>


                    <div className="col-md-4 mb-4">
                    

                    <MaterialTextField
                    onClick={ this.onClick }
                    label="Background" size="large" 
                    fullWidth value={this.state.site_settings.color.backgound} 
                    type="text"
                />
                    

                    
                    { this.state.showPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.onClose }/>
                        <SketchPicker color={ this.state.site_settings.color.backgound } 
                        
                            onChange={(e)=>this.setState(old=>({...old,site_settings:{...old.site_settings,color:{...old.site_settings.color,backgound:e.hex}} }))}
                            />
                    </div> : null }

                    </div>
                    
                    <div className="col-md-4 mb-4">
                    

                    <MaterialTextField
                    onClick={ this.dark }
                    label="Dark" size="large" 
                    fullWidth value={this.state.site_settings.color.dark} 
                    type="text"
                    />
                    

                    
                    { this.state.showPickerd ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.onClose }/>
                        <SketchPicker color={ this.state.site_settings.color.dark } 
                        
                            onChange={(e)=>this.setState(old=>({...old,site_settings:{...old.site_settings,color:{...old.site_settings.color,dark:e.hex}} }))}
                            />
                    </div> : null }

                    </div>
    



                  <div className="col-md-4 mb-4">
                    <MaterialTextField
                        
                        label="Title" size="large" 
                        fullWidth name='title' 
                        onChange={(e)=>this.setState(old=>({...old,site_settings:{...old.site_settings,title:e.target.value} }))}
                    />
                  </div>
                  <div className="col-md-4 mb-4">
                    <MaterialTextField
                        
                        label="Subtitle" size="large" 
                        fullWidth name='Subtitle' 
                        onChange={(e)=>this.setState(old=>({...old,site_settings:{...old.site_settings,subtitle:e.target.value} }))}
                    />
                  </div>
                  {/* <div className="col-md-4 mb-4">
                    <MaterialTextField
                        
                        label="Footer Text" size="small" 
                        fullWidth name='footer-text' 
                        onChange={(e)=>this.setState(old=>({...old,site_settings:{...old.site_settings,footer_text:e.target.value} }))}
                    />
                  </div>*/}
                </div> 

                <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
                 <label><b>Footer</b></label>
                </div>

                <div className="row">
                    <div className="col-md-4">
                    <FormControlLabel control={<Checkbox     onChange={(e)=>this.setState(old=>({...old,site_settings:{...old.site_settings,footer_text:{...old.site_settings}} }))}/>} label="Is New" />

                    </div>

                </div>
                  

                <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
                 <label><b>Theme</b></label>
                </div>

                <div className="row ">
                    <div className="col-md-4">
                        <MaterialSelect 
                        
                        data={theme}  id="theme_id" labelId="theme-id"
                            name="theme" 
                            label="Theme *" fullWidth
                            size="large"
                            value={this.state.theme}
                            onChange={(e)=>this.setState(old=>({theme : e.target.value}))}
                        />
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className="col-md-3">
                        <Button style={{ backgroundColor: '#183883'}} onClick={ submitdata }>Submit</Button>
                    </div>
                </div>
            </Box>






            </>
        )
            
        
    }
}