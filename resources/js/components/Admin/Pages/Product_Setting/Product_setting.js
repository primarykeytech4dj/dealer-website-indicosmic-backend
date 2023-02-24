import React, { useEffect, useState } from "react";

import MaterialSelect from '../../../../Tags/MaterialSelect';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Button } from 'react-bootstrap';
import Switch from '@mui/material/Switch';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from "../../../../api";
import { Col, ToggleButton } from "react-bootstrap";
import { removeCharacter } from "../Product_Creation/Product_creation";
import { remove, size } from "lodash";
import  dataOfproduct from "../Product_Json/Product_json"

export  const ProductSetting=()=>{
    const [setup,setSetup]=React.useState({})

    const apiCtrl = new Api;
    
 
    useEffect(() => {
   
        const dataJson = dataOfproduct
        // console.log("dataJson==>",dataOfproduct)
      
        setSetup({basic_settings:dataJson.basic_settings,product_setting:dataJson.product_setting.fields,category_setting:dataJson.category_setting.fields
                  });
    //  apiCtrl.callAxiosGet(`get-file/Products.json`,[]).then(response => {
    //     // console.log("prosetting==>",response.data.product_setting.fields)
    //      setSetup({product_setting:response.data.product_setting.fields,category_setting:response.data.category_setting.fields
    //      });

    //  })
   },[]);

   var data={
    "2.0":"2.0"
 }

  //var fields=[]
   var jsonProduct= Object.entries(setup)
    console.log("jsnpro==>",jsonProduct)


    return(
        <>
          <BreadCrumb breadcrumb={"Product Setting"} breadcrumbItem1='Create' />

          <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

          { jsonProduct.map(([key, val])=>                       
                    {  
                       console.log('Value',val, 'Key '+key)
                        
                       return(
                                <>
                                    <div className="row ml-1 mb-4 ">
                                            <label><b>{removeCharacter(key, '_')}</b></label>
                                        </div>
                        
                                    <Divider sx={{ borderColor: '#dac4c4'}} />
                        
                                    <div className="row mb-4">
                                    <div className="row">
                                      

                           </div>

                               
                                  
                                       
                                    <FieldMaker  param={val} key={key} title={key} />
                                            
                                        
                                </div>
                                <Divider sx={{ borderColor: '#dac4c4', marginBottom:5}} />
                            </>
                       ) 
                    }
                    
                    )}
        </Box>
        </>
    )
}



const FieldMaker = (props) =>{
   
    const [state,setState] =useState([])
    const [module, setModule] = useState({"-1":`Select ${removeCharacter(props.title, '_')}`});
    const [value, setValue] = useState("-1");
    
    const [rowData, setRowData] = useState(props.param);
    
   
    //console.log("rowdata==>",rowData)
     var data={
        "2.0":"2.0"
     }
    const handleeType = ({key,val}) => {
        // props.param[value].type=val;

    console.log('Key '+key, 'Value', val)
        setRowData((old) => ({...old, [key]:{ ...old[key], type:val}}))
        console.log('Type ',rowData[key]    )
    }
    
       
        useEffect(()=>{
            Object.entries(props.param).map(([key, val])=>{
                  // console.log('Value',val, 'Key '+key)
                data = {...data, [key]:removeCharacter(key, '_')};
            
            })
    
            setModule(old=> ({...old, ...data}));
        },[])
     
        
       // console.log("data==>",data)

    return(

            <div className="row">
                
                    {
                    
                    Object.entries(rowData).map(([key, val])=>{
                        //  console.log('Value',val, 'Key '+key)
                         
                          
                         
                           return(<>

                                    

                         
                            <div className="col-md-12 mt-3">
                                    
                                <fieldset className="form-group border p-3">
                                 

                                <div className="row">
                                  <legend className="col-form-label col-sm-2 w-auto pt-0" >{ removeCharacter(key, '_')}</legend>
                                     
                                    <div className="col-sm-10">

                                        <div className="row">

                                   
                                      

                                            {
                                               

                                                Object.entries(val).map(([attr, values])=>{
                                                    //console.log('Value',val, 'Key '+key)

                                                    switch (`${attr}`){  
                                                                        
                                                        case "default":
                                                        // console.log('default case')
                                                            return <MakeDefault key={attr}  type={val.type} name={attr} attrval={values}/>
                                                        
                                                        case "display":
                                                        //  console.log('display case')
                                                            return (
                                                            <Checkboxs key={attr} name={attr} attrval={values}/>
                                                            )
                                                        
                                                                
                                                        case "placeholder":
                                                            return (
                                                            <TextField key={attr} name={attr} attrval={values}/>
                                                            )
                                                        case "required":
                                                            return (
                                                            <Checkboxs key={attr} name={attr} attrval={values}/>
                                                            )
                                                        case "type":
                                                            return (
                                                                <SelectField key={attr} fieldName={key} func={handleeType} name={attr} attrval={values}/>
                                                            )
                                                                
                                                            default:
                                                                return true;
                                                                        
                                                
                                                    } 
                                                })
                                            }
                                        </div>

                                    </div>
                                </div>
                            </fieldset>
                               
                           {/* <label>   </label>
                           <Divider sx={{ borderColor: '#dac4c4', marginBottom:'10px'}} /> */}
                          
                            </div> 
                            </> )

                    
                    })
                
                }

            </div>       
    )
  
}

const MakeDefault = (props) => {
    
    // console.log("propsKey==>",props)
    
    switch (`${props.type}`){                      
        case "dropdown":
            return(
                <Static key={props.name} name={props.name} attr={props.attrval}/>
            );
        
        case "numeric":
            return (
                <TextField key={props.name} type={props.type} name={props.name} attr={props.attrval}/>
            )
            
        case "text":
            return (
                <TextField key={props.name}type={props.type} name={props.name} attr={props.attrval}/>
            )
        case "toggle":
            return (
                <Checkboxs key={props.name} name={props.name} attr={props.attrval}/>
            )
            
            default:
        return <></>;
                        
    
    }
     
      
     
 }
 
 const Static =(props)=>{
    // console.log("staticprops=>",props)
     const [state,setState]=useState({static:false})
     const [multifield,setMultifield]=useState({  Keyvaluefield:[< Keyvaluefield key={0} id={0}/>] })
     const [defaultfieldfield,setDefaultfieldfield]=useState({  defaultfieldsfield:[<Defaultfield  key={0} id={0}/>] })
   
    
 
    let Addmore = (e) => {
     e.preventDefault()
   
    setMultifield(old=>({...old,Keyvaluefield:[...old.Keyvaluefield,<Keyvaluefield  key={multifield.Keyvaluefield.length} id={multifield.Keyvaluefield.length}   />]}))
   }
   let adddefault =(e) =>{
     e.preventDefault()
   
     setDefaultfieldfield(old=>({...old,defaultfieldsfield:[...old.defaultfieldsfield,<Defaultfield  key={defaultfieldfield.defaultfieldsfield.length} id={defaultfieldfield.defaultfieldsfield.length}   />]}))
   }
     return(<>
        <div className="col-md-4 mt-3">
             <Switch checked={state.static}   onChange={(e)=>setState({static:e.target.checked?true:false})}  fullWidth /> 
                 <strong>   {"Static"}</strong>  
        
        </div>


      
        {defaultfieldfield.defaultfieldsfield} 
       
       

          <div className="col-md-12 mb-4 d-flex" style={{justifyContent:"right",marginTop:"-4rem",marginBottom:"auto"}}>
             <Button type="submit" onClick={ adddefault}style={{ backgroundColor: '#183883',width:"96px",color:"#fff", fontSize:"15px", marginTop: "14px", height: "48px"}}   size='medium'>Add More</Button>
         </div>
       
         { state.static?[multifield.Keyvaluefield]:<div className="col-md-4 mt-3"><MaterialTextField placeholder={"URL"}/></div>} 
        
         {state.static?
         <div className="col-md-2 mb-4 d-flex" style={{justifyContent:"right",marginTop:"-4rem",marginBottom:"auto"}}>
             <Button type="submit" onClick={ Addmore}style={{ backgroundColor: '#183883',width:"96px",color:"#fff", fontSize:"15px", marginTop: "14px", height: "48px"}}   size='medium'>Add More</Button>
         </div>:""
         }
 
         
            
     </>)
 }
 
 const Defaultfield =()=>{
     return(<>
    
         <div className="col-md-4 mt-3">
            <MaterialTextField   placeholder="Title" fullwidth/>
           </div>
           <div className="col-md-3 mt-3">
           <MaterialTextField placeholder="Value" fullwidth/>
           </div>
         
           
     
     
          
         </>)
 
 }
 
 const Keyvaluefield =()=>{
     return(<>
    
     <div className="col-md-4 mt-3">
        <MaterialTextField   placeholder="Key" fullwidth/>
       </div>
       <div className="col-md-4 mt-3">
       <MaterialTextField placeholder="Value" fullwidth/>
       </div>
     
       
 
 
      
     </>)
 }
 
 const TextField =  (props)=>{
//   console.log("props=>",props)
     return(<> 
            <div className="col-md-4 mt-3">
              <MaterialTextField type={props.type==="numeric"?"number":props.type}name={props.name} label={props.name} placeholder={props.name} />
            </div>
            
     </>)
 }
 
 const Checkboxs =(props)=>{
      // console.log("Checkboxprops==>",props)
     
     return(
         <>   
          <div className="col-md-4 mt-3">
          <Switch checked={props.attr}    fullWidth /> 
          <strong>   {removeCharacter(props.name, '_')}</strong>         
               
          </div>      
           
         </>
     )
 }
 
 const SelectField =(props)=>{
    // console.log("selectprops=>",props)
 const [value, setValue] = useState(props.attrval);
 
    var types={
     "numeric":"Number",
     "text":"Text",
     "toggle":"Toggle",
     "dropdown":"Dropdown"
    }
    const onHandleChange = (e) =>{
     
     props.func({key:props.fieldName, val:e.target.value})
     setValue(e.target.value)
  
 }
 
 
   
     return(
         <>
             <div className="col-md-4 mt-3">
                 <MaterialSelect
                     style={{width: "184%"}}  
                     name={props.name} 
                     label={props.name}
                     placeholder={props.name}
                     data={types}  
                     value={value}
                     onChange={onHandleChange}
                 />
             </div>
         </>
     )
 } 

