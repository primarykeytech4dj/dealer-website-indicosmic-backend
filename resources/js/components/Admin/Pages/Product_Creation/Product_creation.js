import { data } from "jquery";
import { object } from "prop-types";
import React, { useEffect, useState } from "react";
import MaterialSelect from '../../../../Tags/MaterialSelect';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import Switch from '@mui/material/Switch';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from "../../../../api";


import dataOfproduct from "../Product_Json/Product_json";


export const ProducCreation =()=>{
   const[state,setState]=useState({

   })

   const [setup, setSetup] = React.useState([]);
   const apiCtrl = new Api;

   useEffect(() => {
    apiCtrl.callAxiosGet(`get-file/Products.json`,[]).then(response => {
       // console.log("prosetting==>",response.data.product_setting.fields)
        setSetup({product_setting:response.data.product_setting.fields,category_setting:response.data.category_setting.fields
        });
    })
  },[]);

 
const handleonchange=(e)=>{
  console.log("event==>",e.target.value)
}

const data=dataOfproduct
var jsonProduct= Object.entries(setup)


  console.log(setup)
   
    return(
        <>
            <BreadCrumb breadcrumb={"Product Setting"} breadcrumbItem1='Create' />

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

           
                { jsonProduct.map(([key, val])=>                       
                    {  
                      //  console.log('Value',val, 'Key '+key)
                        
                       return(
                                <>
                                    <div className="row ml-1 mb-4 ">
                                            <label><b>{removeCharacter(key, '_')}</b></label>
                                        </div>
                        
                                    <Divider sx={{ borderColor: '#dac4c4'}} />
                        
                                    <div className="row mb-4">
                                        
                                    
                                       
                                    <FieldMaker func={handleonchange} param={val} key={key} title={key} />
                                            
                                        
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

  //  console.log("fieldmaker=>",props)
    return(
        Object.entries(props.param).map(([key, val])=>{

            switch (`${val.type}`){                      
                case "dropdown":
                    return(
                        <SelectField key={key} func={props.func} name={key} attr={val}/>
                    );
                
                case "numeric":
                    return (
                        <TextField key={key} func={props.func} name={key} attr={val}/>
                    )
                    
                case "text":
                    return (
                        <TextField key={key} func={props.func} name={key} attr={val}/>
                    )
                case "toggle":
                    return (
                        <Checkbox key={key} func={props.func} name={key} attr={val}/>
                    )
                    
                    default:
                        return true;
                            
        
                }
        })
    )

}



const TextField = (props) => {
    const [state,setState]=useState(
      
      )
    //console.log("props=>",props)
   const { required, placeholder, type, display } = props.attr;
   const onHandleChange = (e) =>{
    
       props.func(e)
    
   }
    return(
        <>

           
          
                <div className="col-md-3 mt-3" style={{display:display?type:'none' }}>
                    <MaterialTextField
                     name={props.name}
                     label={removeCharacter(props.name, '_')}
                     required={required}
                     placeholder={placeholder}
                     type={display?type:'hidden'}
                     onChange={onHandleChange}
                     fullWidth
                     />
                  
                </div>
        
              
            
        </>
    )

}

const SelectField =(props)=>{
    const[data,setData]=useState({
    })
    const [prodata,setProdata]=useState({
        valdata:props.attr.default.value
    })
    const { required, type, display,options} = props.attr;
    const apiCtrl = new Api;
    var url=props.attr.options['data-url']
   
     
      const productCategory=()=>{
        data-url     
        if(!options.static){
            apiCtrl.callAxios(url,[]).then(response => {
                setData(response.data)
            })
        }   
      }
    const onHandleChange = (e) =>{
    
         setProdata({valdata:e.target.value})
     
    }
    return(
        <>       
            
            {display? 
                <div className="col-md-3 mt-3" >
                    <MaterialSelect
                        fullWidth   
                        name={props.name}
                        label={removeCharacter(props.name, '_')}
                        data={options.static?options.list:data}
                        required={required}
                        // value={props.attr.default.value}    
                        value={setProdata.valdata}    
                        onMouseEnter={productCategory} 
                        onChange={onHandleChange}          
                    />
                </div>  
            :""}
            
        </>
    )
}

const Checkbox =(props)=>{
    //  console.log("Checkboxprops==>",props)
    const onHandleChange = (e) =>{
    
        props.func(e)
     
    }
    return(
        <>         
            {props.attr.display? 
                <div className="col-md-3 mt-3">  
                    <>
                        <Switch checked={props.attr.default} onChange={onHandleChange}    fullWidth /> 
                        <strong>   {removeCharacter(props.name, '_')}</strong> 
                    </>
                </div>             
            :""}          
              
        </>
    )
}

export const removeCharacter =  (text, character) =>{
    let reg = _
    if(character === '_'){
        reg = /_/g
    } else if(character === '-'){
        reg = /=/g
    }
    let temp =  text.replace(reg, " "); 
    var text = temp
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    return text;
}