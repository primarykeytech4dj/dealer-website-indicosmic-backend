import React, { useEffect } from "react";
import MaterialSelect from '../../../../Tags/MaterialSelect';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Button } from 'react-bootstrap';
import { Box, Divider, TextField } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { removeCharacter } from "../Product_Creation/Product_creation";
import Api from "../../../../api";
import { useState } from "react";
import Switch from '@mui/material/Switch';
import { Title } from "@mui/icons-material";
import { object } from "prop-types";
export default class HomeSetting extends React.Component{
    constructor(props){
        super(props)
        this.apiCtrl = new Api;
    
        this.state = {
            // type:"frontend",
            // modulename:"Home",
            

        
        }
    }

    componentWillMount = () => {
       // alert("Mount")
        this.webdata();
      }
    

    // componentDidUpdate(prevProps,prevState){
    //     if(prevState.contact-us !== this.state.contact-us){
    //         alert("did")
    //         this.webdata();
          
       
    //   }
    // }

        webdata=()=>{
         var obj={}
        
            this. apiCtrl.callAxios("setup/list",{type:"frontend",module_name:"Home"}).then(response => {
                    //  console.log("response=>",response)
                Object.entries(response.data).map(([key,value])=>{
                //  console.log("value",value)
                obj=  JSON.parse(value.config);
        
        
                console.log("onkj=>",obj)
                this.setState(obj)
                
                
                })
            })

           
        
        
        }

    
    render(){   

        const onhandleChange =({key, name, val})=>{
             console.log('Key '+key, 'name' ,name,'Value', val)   
           // setSetup((old) => ({...old, [key]:{ ...old[key], [name]:val}}))
          //   console.log("onHandle ==>",rowData[key])
        
        
          }

      //  console.log("state=>",this.state)
        return(<>

           <BreadCrumb breadcrumb={"Home Setting"} breadcrumbItem1='Create' />

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                {Object.entries(this.state).map(([key,value])=>{
                  //  console.log("key",key,"value",value)
                    return( 
                        <>    

                            <div className="row ml-1 mb-4 d-flex justify-content-between ">
                                <label style={{width:'auto'}}><b>{removeCharacter(key, '_')}</b></label>
                                <h1 style={{width:"auto"}} class="btn " type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${key}`} aria-expanded="false" aria-controls="collapseExample">
                                    <b style={{fontSize:'40px'}}>-</b>
                                </h1>
                            </div>
                
                            <Divider sx={{ borderColor: '#dac4c4'}} />
                                
                
                            <div className="row mb-4 collapse" id={`collapseExample${key}`}>  
                            <FieldMaker func={onhandleChange}  key={key} fieldName={key} param={value}/>
                            </div>

                            


                        </> 
                    )
                    
                })}
            

               
            </Box>
      


        
        </>)
    }
}

const FieldMaker=(props)=>{
    const [state,setState]=useState({})
    const [rowData, setRowData] = useState(props.param);
  //console.log("rowData=>",rowData)


  const onHandleChange =({key, name, val})=>{
    console.log('Key '+key, 'name' ,name,'Value', val)   
    setRowData((old) => ({...old, [key]:{ ...old[key], [name]:val}}))
   console.log("onHandle ==>",rowData[key])


 }


 const onhandleChangesettings=({key,fieldattrName,fieldName, name, val})=>{
    console.log("fieldName",fieldName,"fieldattrName",fieldattrName ,"key",key, "name",name,"value",val)
 }


    // useEffect(()=>{
    //     Object.entries(props.param).map(([key, val])=>{
    //         console.log('Value',val, 'Key '+key)
    //      // data = {...data, [key]:removeCharacter(key, '_')};
      
    //   })

    //   //setModule(old=> ({...old, ...data}));

    // },[])


    return(<>

        <div className="row">

            <div className="col-md-12 mb-2">
                <fieldset className="form-group border p-3">
                    <div className="row " >
                        <legend className="col-form-label col-sm-2  pt-0" ></legend>
                        <div className="col-sm-10">
                            <div className="row">
                            {
    
                                Object.entries(rowData).map(([key, val])=>{
                                    //console.log('Value',val, 'Key '+key)

                                 switch(key){
                                    case"internal_link":
                                    return (
                                        <InternalLink fieldName={props.fieldName} func={props.func} key={key} name={key} value={val} />
                                    )
                                    case"heading":
                                    return(
                                    <HeadingField  fieldName={props.fieldName}  func={props.func} key={key} name={key} value={val}/>
                                    )
                                    case "title":
                                        return(
                                            <TitleField fieldName={props.fieldName}  func={props.func} key={key} name={key} value={val}/>
                                        )
                                    case "button_text":
                                    return(
                                        <ButtonTxtField fieldName={props.fieldName}  func={props.func} key={key} name={key} value={val}/>
                                    )

                                    case"button_link" :
                                    return(
                                        <ButtonTxtField fieldName={props.fieldName}  func={props.func} key={key} name={key} value={val}/>
                                    )
                                    case"contact_no":
                                    return(
                                        <ContactField  fieldName={props.fieldName}  func={props.func} key={key} name={key} value={val}/>
                                    )
                                    case "parameters":
                                        return(
                                            <ParameterField fieldName={props.fieldName}  func={props.func} key={key} name={key} value={val}/>
                                        )
                                    case "image":
                                        return(
                                            <ImgField key={key} fieldName={props.fieldName} name={key} value={val}/>
                                        )
                                        case "settings":
                                            return(
                                                <SettingField  fieldName={props.fieldName}  settigsfunc={onhandleChangesettings} func={onHandleChange} key={key} name={key} value={val}/>
                                            )
    
                                 }
                                
                                

                                })
                            }
        
                            </div>
                        </div>
                    
                    </div> 
                </fieldset>

            </div>
                    
            
        </div>

       


    </>)

}


const InternalLink=(props)=>{
//console.log("propsintennn=>",props)
    return(<>

    <div className="col-md-4 mt-3">
        <MaterialTextField name={props.name}  label={props.name}  fullWidth onChange={(e)=>props.func({key:props.fieldName, name:e.target.name, val:e.target.value})} />

    </div>
    </>)

}
const HeadingField=(props)=>{

    return(<>

        <div className="col-md-4 mt-3">
          <Switch checked={props.value}  name={props.name} fullWidth onChange={(e)=>props.func({key:props.fieldName, name:e.target.name, val:e.target.checked})}/> 
          <strong>   {removeCharacter(props.name, '_')}</strong>         
               
        </div> 
    </>)

}
const ButtonTxtField=(props)=>{

    return(<>

    <div className="col-md-4 mt-3">
        <MaterialTextField name={props.name} label={props.name}  fullWidth onChange={(e)=>props.func({key:props.fieldName, name:e.target.name, val:e.target.value})}/>

    </div>
    </>)

}

const ContactField=(props)=>{
    return(
        <div className="col-md-4 mt-3">
        <MaterialTextField name={props.name} label={props.name} type="number" fullWidth onChange={(e)=>props.func({key:props.fieldName, name:e.target.name, val:e.target.value})}/>

    </div>
    )
}

const TitleField=(props)=>{

    return(<>

    <div className="col-md-4 mt-3">
        <MaterialTextField name={props.name} label={props.name}  fullWidth onChange={(e)=>props.func({key:props.fieldName, name:e.target.name, val:e.target.value})}/>

    </div>
    </>)

}

const ImgField=(props)=>{

    return(<>

    <div className="col-md-4 mt-3">
        <MaterialTextField name={props.name}  type="file" label={props.name}  fullWidth/>

    </div>
    </>)

}

const SettingField =(props)=>{
const [settings,setSettings]=useState(props.value)

     const settingHandle=({key,fieldattrName,fieldName, name, val})=>{
        console.log("fieldName",fieldName,"fieldattrName",fieldattrName ,"key",key, "name",name,"value",val)
     setSettings(old=>({...old,[fieldattrName]:{...old[fieldattrName],[key]:{...old[fieldattrName][key], [name]:val}}}))
      props.settigsfunc({key:key,fieldattrName:fieldattrName,fieldName:fieldName, name:name, val:val})
     }
   //  console.log("settings=>",settings)
    return(
        <>
        {Object.entries(settings).map(([key,val])=>{
           // console.log("key",key,"value",val)

            switch(key){
                case "loop":
                    return(
                        <CheckSwitch  fieldName={props.name} func={props.func} key={key} name={key} value={val} />
                    )
                case "responsiveClass":
                return(
                    <CheckSwitch  fieldName={props.name} func={props.func} key={key} name={key} value={val}/>
                )
                case "margin":
                    return(
                        <Margin   fieldName={props.name} func={props.func} key={key} name={key} value={val}/>
                    )
                case "responsive":
                    return(
                        <ResponseSive funcsetting={settingHandle} fieldName={props.name} key={key} name={key} value={val}/>
                    )
            }
        })}
        



        </>
    )
    
}


const ResponseSive=(props)=>{
    return(<>
            
                <label>Responsive</label>
                <Divider sx={{ borderColor: '#dac4c4'}} />


          {Object.entries(props.value).map(([key,value])=>{
           // console.log("key",key,"value",value)
           

           return(<>

             
                {Object.entries(value).map(([attr,val])=>{
                        //   console.log("attr",attr,"value",val)

                        switch(attr){
                            case "items":
                              return(
                              <Items  key={attr} funcres={props.funcsetting} fieldName={props.fieldName} fieldattrName={props.name} name={attr} atrFieldname={key}  value={val}/>
                              )
                            case "loop":
                            return(
                            <Loops  key={attr} funcres={props.funcsetting} fieldName={props.fieldName} fieldattrName={props.name} name={attr} atrFieldname={key}  value={val}/>
                            )
                            case "nav":
                                return(
                                    <Loops funcres={props.funcsetting} fieldName={props.fieldName} fieldattrName={props.name} key={attr} name={attr} atrFieldname={key}  value={val}/>
                                )

                        }

                })}
           </>)
          })}
        <Divider sx={{ borderColor: '#dac4c4'}} />
    </>)
}

const Items=(props)=>{

    return(<>
           <label>{props.atrFieldname}</label>
           <div className="col-md-4 mb-2 mt-2">
            <MaterialTextField name={props.name} label={props.name} placeholder={props.name}
            onChange={(e)=>props.funcres({key:props.atrFieldname,fieldName:props.fieldName, fieldattrName:props.fieldattrName, name:e.target.name, val:e.target.value})}
             />

           </div>
         
    </>)
}

const Loops=(props)=>{
    return(<>

         <div className="col-md-4 mb-2">

         <Switch checked={props.value}  name={props.name}  fullWidth 
          onChange={(e)=>props.funcres({ key:props.atrFieldname, fieldName:props.fieldName, fieldattrName:props.fieldattrName,name:e.target.name, val:e.target.checked})}/> 
          <strong>   {removeCharacter(props.name, '_')}</strong>         

         </div>
    </>)
}

const CheckSwitch =(props)=>{
    return(<>

          <div className="col-md-4 mt-3">
          <Switch checked={props.value}  name={props.name}  fullWidth  onChange={(e)=>props.func({ key:props.fieldName, name:e.target.name, val:e.target.checked})}/> 
          <strong>   {removeCharacter(props.name, '_')}</strong>         
               
          </div> 
    </>)
}
const Margin=(props)=>{
    return(<>
      <div className="col-md-4 mt-3">
      <TextField name={props.name} label={props.name}  fullWidth  onChange={(e)=>props.func({key: props.fieldName, name:e.target.name, val:e.target.value})}/>
      </div>
      
    </>)
}



const ParameterField =(props)=>{
   // console.log("propsparameter=>",props)
    return(
        <>
           {Object.entries(props.value).map(([key,val])=>{

            return(

                 <div className="col-md-4 mt-3">

                {key==="active"?<div>
                <Switch checked={val}   fullWidth  name={key}  onChange={(e)=>props.func({key:props.name, name:e.target.name, val:e.target.checked})}/> 
                <strong>   {removeCharacter(key, '_')}</strong>  
                </div>:
                 <MaterialSelect
                   //   style={{width: "184% " }}  
                    fullWidth
                     name={key} 
                     label={key}
                     placeholder={key}
                     data={val}  
                     value={val}
                     
                 />
            }   
             </div> 

            )

           })}
           
        </>
    )
    
}