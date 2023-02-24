import React, { useState } from 'react';
import MaterialSelect from '../../../../Tags/MaterialSelect';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Button } from 'react-bootstrap';
import { Box, Divider, TextField } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from "../../../../api";
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import Swal from 'sweetalert2';
// import state from 'sweetalert/typings/modules/state';
// import { set } from 'lodash';





export default class WebsiteSetting extends React.Component{

    constructor(props){
        super(props)
        this.apiCtrl = new Api;
    
          this.state = {
            type:"frontend",
            "module_name":"Website",

            site_settings:{
              logo: "logo-tvs.png",
              color: {
                primary: "#FFA500",
                backgound: "#4b74a1",
                dark: "#1f2e43"
                },
                // "title": "PRIMARYKEYTECHNOLOGIES",
                title: "",
                Subtitle: "YourTechnicalConsultant",
                'footer-text': "AllRightsReserved"
            },
              
            theme:"rsa"

           
              
          
          }
    
      }
 
 




    componentWillMount = () => {
        this.webdata();
      }
    

    // componentDidUpdate(prevProps,prevState){
    //     if(prevState.site_settings !== this.state.site_settings){
    //         this.webdata();
          
       
    //   }
    // }

        webdata=()=>{
         var obj={}
        
            this. apiCtrl.callAxios("setup/list",{type:this.state.type,module_name:this.state.module_name}).then(response => {
                    //  console.log("response=>",response)
                  
              obj=  JSON.parse(response.data[0].config);
              //console.log("obj=>",obj)
             this.setState({site_settings: obj.site_settings, theme: obj.theme})
            })

           
        
        
        }

  
    render(){

        const submission =(e)=>{
        e.preventDefault();
           var data = new FormData();
           const config={
            site_settings:this.state.site_settings,
            theme:this.state.theme


           }

           data.append("type",this.state.type);
           data.append("module_name",this.state.module_name)
          
            Object.entries(config).map(([index, value])=>{
                if((typeof value !== 'string') &&  (Object.keys(value).length > 0)){
                  Object.entries(value).map(([key, val])=>{
                    if((typeof val !== 'string') && (Object.keys(val).length > 0)){
                      Object.entries(val).map(([key1, val1])=>{
                        data.append(`config[${index}][${key}][${key1}]`, val1)
                      })
                    } else {
                      data.append(`config[${index}][${key}]`, val)
                    }
                  })
                } else {
                  data.append(`config[${index}]`, value)
                }
              

              // if(index !== "theme"&& index !=="site_settings"){
              //   data.append(`${index}`, value);
              // }
              // if(index !== "type"&& index !=="module_name"){
              // // data.append(`${index}`, value);
              //   if(index !=="site_settings"){
              //     data.append(`config[${index}]`,value);
              //   }
              //   if(index !=="theme"){
              //     Object.entries(index).map(([index1, value1])=>{
              //       console.log('key', index1)
              //       console.log('Value', value1)
              //       if(index1!=="logo"){
              //           data.append(`config[${index}][${index1}]`,value1);
              //       }
              //       if(index1==="logo"){
              //         Object.entries(index1).map(([index2, value3])=>{
              //           data.append(`config[${index}][${index1}][${index2}]`,value3);
              //         })
              //       }

              //     })
                  
              //   }
                
              // }
            })

          this. apiCtrl.callAxiosFile("setup/create",data).then(response => {
        
        //    console.log ("response==>",response)

            if(response.success == true){
                Swal.fire({
                    title: "Website",
                    text: "Updated",
                    icon: "success",
                    showConfirmButton: false,
                })
                setTimeout(() => {
                  Swal.close()
                  
            }, 3000);
                
            } else {
                Swal.fire({
                    title: "Website",
                    text: "Not Updated",
                    icon: "error",
                    showConfirmButton: false,
                })
                setTimeout(() => {
                  Swal.close()
                  
            }, 3000);
                
            }

          }).catch(function (error) {
          console.log(error);
          });   
        }
        
        const onHandleChange =({key, name, val})=>{
             // console.log('Key '+key, 'Value', val, 'name' ,name)   
            this.setState((old) => ({...old, [key]:{ ...old[key],  [name]:val }}))
            // console.log("onHandle ==>",rowData[key])     
        }
          const onhandleChange =({key, name, val ,atrname})=>{
              //console.log('Key '+key, 'Value', val, 'name' ,name,"atrname",atrname)   
            this.setState((old) => ({...old, [key]:{ ...old[key], [atrname]:{...old[key][atrname] ,[name]:val}  }}))
            // console.log("onHandle ==>",rowData[key]
    
          }
     
          const imgupload =({key, name, val})=>{
          //  console.log('Key '+key, 'Value', val, 'name' ,name)   
            var   selectedFile =val
            const formData = new FormData();
            formData.append("dataFile", selectedFile, selectedFile.name);
           this.setState((old) => ({...old, [key]:{ ...old[key], [name]:val}}))     
          }



          console.log("state========>",this.state)
        return(
            <>
              <BreadCrumb breadcrumb={"Website"} breadcrumbItem1='Settings' />

              <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <form onSubmit={submission}>

                  <div className='row'>

                  {/* {this.state.site_settings.logo!==""?
                      <div className='col-md-4'>
                        <img style={{width:"58px",marginLeft:"2px"}} src={this.state.site_settings.logo}/>

                      </div>:""
                    } */}
                    

                    { Object.entries(this.state).map(([index,value])=>{
                            //console.log("index",index,"value",value)
                                

                        return(
                            <>

                              {Object.entries(value).map(([attr, values])=>{
                              //  console.log("attr",attr,"values",values)
                                  switch(attr){
                                      case "color":
                  
                                      return <Color func={onhandleChange} fieldName={index} key={attr}  name={attr} attr={value.color}/>
                                  case "title":
                                      
                                      return <TextFields func={onHandleChange} values={values} fieldName={index} key={attr}  name={attr}      />
                                  case "Subtitle":
                                      
                                      return <TextFields func={onHandleChange} values={values} fieldName={index} key={attr} name={attr}   />
                                  case "footer-text":
                                      
                                      return <TextFields func={onHandleChange}values={values} fieldName={index} key={attr} name={attr}    />
                                  case "logo":
                                      
                                      return <ImgFields logofucn={imgupload} values={values} fieldName={index} key={attr} name={attr}     />
                                  }
                              

                              })}
                              {index==="theme"?
                                
                                <div className="col-md-4 mt-3"style={{width: "340px"}} key={index}>
                                    <MaterialTextField
                                    
                                        id="theme_id" labelId="theme-id"
                                        name={index} 
                                        label={index} fullWidth
                                        size="large"
                                        value={this.state.theme}
                                        onChange={(e)=>this.setState(old=>({theme : e.target.value}))}
                                    />
                                </div>:""
                                
                              } 

                             

                            </>
                        )


                      
            
                    })}

                   



                  

                  </div>
                  
                  <div className='row'>

                    <div style={{width:"auto",display:"flex",justifyContent:"right"}}>

                      <Button type="submit" style={{ backgroundColor: '#183883',width:"96px",color:"#fff", fontSize:"15px", marginTop: "14px", height: "48px"}}   size='medium'>Submit</Button>

                    </div>


                  </div>

                </form>
              
              
              </Box>

            </>
        )
    
    

   }
   

}



const Color =(props)=>{
    const [state,setState]=useState({
        showPickerp: false,
        
    })

    const [coloratr,setColoatr]=useState(
        props.attr
    )
   // console.log("coloratr=>",coloratr)
  // console.log("clrprops=>",props)



   return(<>

  {Object.entries(coloratr).map(([key,value])=>{
      //  console.log("key",key,"value",value)
       return(<>
<ColorMaker func={props.func} fieldName={props.fieldName}  atr={props.name} name={key} val={value} />

      
       </>)

    })}

   
</>)
   

    
}

const ColorMaker = (props) => {
    const [state,setState]=useState({
        showPickerp: false,
        
    })
    const [colors, setColors] = useState(props.val);
   const  primary = () => {
     
    setState({ 
     
        showPickerp: !state.showPickerp
    })
   };
///console.log("propsclr=>",props)
   const onClose = () => {
    setState({ 
      showPickerp: false ,
      
    })
  };

  const onHandleChange =({key, name, val})=>{
    //console.log('Key '+key, 'Value', val, 'name' ,name)   
    setColors(val)
    props.func( { key:key ,name:name ,val:val, atrname:props.atr})
 // this.setState((old) => ({...old, [key]:{ ...old[key], [name]:val}}))
  // console.log("onHandle ==>",rowData[key])

   



}

  

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

    return(
        
         
        <div className="col-md-4 mt-3" key={props.name}>
        <div style={{position:'relative'}}>
        <MaterialTextField  onClick={()=> primary() } name={props.name} value={colors} label={props.name} fullwidth />

       { state.showPickerp ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ onClose }/>
                        <SketchPicker color={colors} 
                       // onChange={(e)=>props.func({key:props.fieldName,  name:[key], val:e.hex})}
                       // name={key}
                       
                    //   onChange={(e)=>setColors(e.hex)}
                     onChange={(e)=>onHandleChange({key:props.fieldName,  name:props.name, val:e.hex})}
                       />
        </div> : null }
                       </div>
        </div>
    )
}
const TextFields=(props)=>{
  //  console.log("propstext=>",props)
     return(<> 
           
          
        <div className="col-md-4 mt-3" >
            <MaterialTextField fullwidth  type="text" 
            name={props.name}  value={props.values} label={props.name} placeholder={props.name} 
            onChange={(e)=>props.func({key:props.fieldName, name:e.target.name, val:e.target.value})} 
        
            
            />
        </div>
         
            
     </>)
 }

 const ImgFields=(props)=>{
     const [logoimg,setLogoimg]=useState({
      imglogo:""
     })
    //console.log("props=>",props)
    const logoupload=(e)=>{
      props.logofucn({key:props.fieldName, name:e.target.name, val:e.target.files[0]})
      setLogoimg({imglogo:URL.createObjectURL(e.target.files[0])})
              
      //onChange={(e)=>props.logofucn({key:props.fieldName, name:e.target.name, val:e.target.files[0]})}
              
    }
     return(<> 
           
          
            <div className="col-md-2 mt-3" >
              <MaterialTextField fullwidth type="file"   
              name={props.name}  value={[props.value]} label={props.name} placeholder={props.name} 
            
              onChange={logoupload}
              />
            </div>

            <div className='col-md-2 mt-3' >

            {props.value!==""&&logoimg.imglogo==""?
        
            <img  style={{width:"38%", height:"58%",marginLeft:"15px"}} src={props.value?props.value  :""} />
            :""
            }

            {logoimg.imglogo!==""?
                 <img  style={{width:"38%", height:"58%",marginLeft:"15px"}} src={logoimg.imglogo?logoimg.imglogo  :""} />
                 :""
            }

            </div>


         
            
     </>)
 }