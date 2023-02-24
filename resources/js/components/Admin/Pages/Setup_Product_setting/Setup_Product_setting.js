import React, { useEffect, useState } from "react";

import MaterialSelect from '../../../../Tags/MaterialSelect';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Button } from 'react-bootstrap';
import Switch from '@mui/material/Switch';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from "../../../../api";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Col, ToggleButton } from "react-bootstrap";
import { removeCharacter } from "../Product_Creation/Product_creation";
import { remove, size, slice } from "lodash";
import  dataOfproduct from "../Product_Json/Product_json"
import { object } from "prop-types";

import Swal from "sweetalert2";
export  const SetupProductSetting=(props)=>{
    const [setup,setSetup]=React.useState({
       
           
    })

    const [bodydata,setBoadydata]=useState({
        // type:"application",
        // modulename:"Product"
        type:"frontend",
        modulename:"website"
    })
   

    const apiCtrl = new Api;
    
 
    useEffect(() => {
       
       
        
        const dataJson = dataOfproduct
         console.log("dataJson==>",dataOfproduct)
      
        setSetup({basic_settings:dataJson.basic_settings,product_setting:dataJson.product_setting.fields,category_setting:dataJson.category_setting.fields
                  });
    //  apiCtrl.callAxios("setup/list",{type:bodydata.type,module_name:bodydata.modulename}).then(response => {
    //     // console.log("prosetting==>",response.data)
    //     Object.entries(response.data).map(([key,value])=>{
    //         const obj = JSON.parse(value.config);
    //         console.log("onkj=>",obj)
            
    //         setSetup(obj)
         
    //     })
        //  setSetup({product_setting:response.data.product_setting.fields,category_setting:response.data.category_setting.fields
        //  });

    //})


      
   },[]);

   var data = {"2.0":"2.0"};

   var jsonProduct= Object.entries(setup)
//   console.log("jsnpro==>",jsonProduct)
//    console.log("stup",setup)

const onHandleChange =({key, name, val})=>{
    // console.log('Key '+key, 'Value', val, 'name' ,name)   
    setSetup((old) => ({...old, [key]:{ ...old[key], [name]:val}}))
  //   console.log("onHandle ==>",rowData[key])


  }


    const submission =(e)=>{
     e.preventDefault();
   
   
        var config = {
            basic_settings: setup.basic_settings,
            product_setting: setup.product_setting,
            category_setting: setup.category_setting,
        }

     // console.log("data=>",config)


       apiCtrl.callAxios("setup/create",{config:config,type:bodydata.type,module_name:bodydata.modulename}).then(response => {
        
            console.log ("response==>",response)

            if(response.success == true){
                Swal.fire({
                    title: " Product",
                    text: "Updated",
                    icon: "success",
                    showConfirmButton: false,
                })
            } else {
                Swal.fire({
                    title: "Product",
                    text: "Not Updated",
                    icon: "error",
                    showConfirmButton: false,
                })
            }

        }).catch(function (error) {
         console.log(error);
        });   
    }
     

    
    const rowdata=({fieldName,key,atrrname,value})=>{
        //setRowData((old) => ({...old, [key]:{ ...old[key], [name]:val}}))
     console.log(  {[fieldName]:{["fields"]:{  [key]:{[atrrname]:value}}}})

        setSetup(old=>({...old,[fieldName]:{...old[fieldName],[key]:{...old[fieldName][key],[atrrname]:value}}}))
       // console.log("==>","fieldName",fieldName,"key",key ,"atrrname",atrrname,"value",value)

    }
    console.log("setup=>",setup)
    return(
        <>
          <BreadCrumb breadcrumb={"Product Setting"} breadcrumbItem1='Create' />

          <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

          { jsonProduct.map(([key, val])=>                       
                    {  
                     //  console.log('Value',val, 'Key '+key)
                        
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

                                    {key === 'basic_settings'
                                    
                                        ?
                                        Object.entries(val).map(([index, value])=>{
                                        // console.log("index",index,"value",value)
                                                
                                                    switch (typeof value){
                                                        case 'number':
                                                            return(
                                                                <VersionField key={index}  fieldName={key} func={onHandleChange}  type={typeof value} name={index} attrval={value}/>
                                                            )
 
                                                        case 'string':
                                                            return(
                                                                 <TextField key={index}  fieldName={key} func={onHandleChange} type={typeof value} name={index} attrval={value}/>
                                                                 )

                                                        case 'boolean':
                                                            return (
                                                                <Checkboxs key={index}   type={typeof value} fieldName={key} func={onHandleChange}  name={index} attrval={value}/>
                                                                )

                                                    
                                                }
                                                <MakeDefault name={index} key={index}  />;
                                                
                                        })
                                        :
                                        <FieldMaker  func={rowdata} param={val} key={key} title={key} />
                                    }

                                            
                                    <div style={{width:"auto",display:"flex",justifyContent:"right"}}>

                                    <Button type="submit" onClick={submission} style={{ backgroundColor: '#183883',width:"96px",color:"#fff", fontSize:"15px", marginTop: "14px", height: "48px"}}   size='medium'>Submit</Button>

                                    </div>
                                    
                                        
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
 //console.log( "==>",props)
    const [state,setState] =useState([])
    const [module, setModule] = useState({"-1":`Select ${removeCharacter(props.title, '_')}`});
    const [value, setValue] = useState("-1");
    
    const [rowData, setRowData] = useState(props.param);
   
    

    const onHandleChange =({key, name, val})=>{
      //  console.log('Key '+key, 'Value', val, 'name' ,name)   
      setRowData((old) => ({...old, [key]:{ ...old[key], [name]:val}}))
      // console.log("onHandle ==>",rowData[key])

       props.func( {fieldName:props.title, key:key ,atrrname:name ,value:val})



    }

   

    // const onHandleChange = ({key,name,val}) => {
    //     // props.param[value].type=val;

    // console.log('Key '+key, 'Value', val)
    //     setRowData((old) => ({...old, [key]:{ ...old[key], [name]:val}}))
    //     console.log('Type ',rowData[key]    )
    // }

    // const onhandleChange =({ name, val})=>{
    //     //console.log( 'Value', val, 'name' ,name)
     
    //   setRowData((old) => ({...old, [name]:val}))
   
    //  //  console.log("onHandle ==>",rowData[key])


    // }
    
        var data = {"2.0":"2.0"};
        useEffect(()=>{
            Object.entries(props.param).map(([key, val])=>{
            //       console.log('Value',val, 'Key '+key)
                data = {...data, [key]:removeCharacter(key, '_')};
            
            })
    
            setModule(old=> ({...old, ...data}));
        },[])

        
     
      

    return(

            <div className="row">
                
                    {
                    
                    Object.entries(rowData).map(([key, val])=>{
                       //  console.log('Value',val, 'Key '+key)
                        return(

                            
                            
                            <div className="col-md-12 mt-3 "  >            
                                <fieldset className="form-group border p-3">
                                <div className="row " >
                                  <legend className="col-form-label col-sm-2  pt-0" >{ removeCharacter(key, '_')}</legend>
                                    <div className="col-sm-10">

                                         

                                        <div className="row">
                                                                   

                                            {
                                               

                                                Object.entries(val).map(([attr, values])=>{
                                                    //console.log('Value',val, 'Key '+key)

                                                    switch (`${attr}`){  
                                                                        
                                                        case "default":
                                                        // console.log('default case')
                                                            return <MakeDefault values={val} fieldName={key} key={attr} func={onHandleChange}  type={val.type} name={attr} attrval={values}/>
                                                        
                                                        case "display":
                                                        //  console.log('display case')
                                                            return (
                                                            <Checkboxs key={attr}  fieldName={key} func={onHandleChange} name={attr} attrval={values}/>
                                                            )
                                                        case "placeholder":
                                                            return (
                                                            <Placeholdersfield key={attr}  fieldName={key} func={onHandleChange} type={val.type} name={attr} attrval={values}/>
                                                            )
                                                        case "required":
                                                            return (
                                                            <Checkboxs key={attr} options={val.options?val.options:""}  type={val.type} fieldName={key} func={onHandleChange} name={attr} attrval={values}/>
                                                            )
                                                        case "type":
                                                            return (
                                                                <SelectField key={attr} options={val.options} fieldName={key} func={onHandleChange} name={attr} attrval={values}/>
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
                        )

                    
                    })
                
                }

                </div>       
    )
  
}
const MakeDefault = (props) => {
    
 //    console.log("MakeDefault==>",props)
    
    switch (`${props.type}`){                      
        case "dropdown":
            return(
                <Static key={props.name}  type={props.type} options={props.values.options}  fieldName={props.fieldName} func={props.func} name={props.name} attrval={props.attrval}/>
            );
        
        case "numeric":
            return (
                <TextField key={props.name}  fieldName={props.fieldName} func={props.func} type={props.type} name={props.name} attrval={props.attrval}/>
            )
            
        case "text":
            return (
                <TextField key={props.name}  fieldName={props.fieldName} func={props.func} type={props.type} name={props.name} attrval={props.attrval}/>
            )
        case "toggle":
            return (
                <Checkboxs key={props.name}  fieldName={props.fieldName} func={props.func} name={props.name} attrval={props.attrval}/>
            )
            
            default:
        return <></>;
                        
    
    }
     
      
     
 }
 


 class Static extends React.Component{

    constructor(props){
        super(props);

        this.state = 
        {    
            // static:this.props.options.static,
            // dataurl:this.props.options,
            options:this.props.options,
           Keyvaluefield:[< Keyvaluefield func={this.Keyvalue.bind(this)} delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={0} id={0}/>],
          //    Keyvaluefield:[],
            // defaultfieldsfield:[<Defaultfield func={this.deFaultvalue.bind(this)} key={0} id={0}/>]

        }
    }
     setKeyvalue=()=>{
        this.setState(old=>({...old,options:{...old.options,list:{...old.options.list,[this.state.key]:this.state.values}}}))
        
    }
    Keyvalue=(e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
    
        this.setState(
            old => ({
                ...old, [e.target.name]:e.target.value
            })
        
        )
        this.setKeyvalue()
    
    }
    
    deletebyid=(delrowbyid)=>{
        // console.log("delrowbyid",delrowbyid)

        // var optionslist=this.state.options.list
        //  console.log("optionslist",optionslist)
        //    delete optionslist[delrowbyid]
        //   this.setState(old=>({...old,options:{...old.options,optionslist}}))
        console.log("delrowbyid",delrowbyid)
      //  const adlngth=delrowbyid 
         const Keyvaluefield= this.state.Keyvaluefield
         console.log("oflength=>",Keyvaluefield)
         delete Keyvaluefield[delrowbyid]
        // console.log("oflength=>",oflength)
          this.setState(old=>({...old,Keyvaluefield}))
     

    }
     
    
    componentDidMount(){
        Object.entries(this.state.options.list).map(([index, value])=>{
            //console.log("index",index,"value====>",value)
            this.setState(old=>({
                ...old, Keyvaluefield: [...old.Keyvaluefield,< Keyvaluefield func={this.Keyvalue.bind(this)} delbyidfunc={this.deletebyid} value={{key:index, val:value}} key={index} id={index}/>]
            }))
            
        })
        // if(prevState.options != this.state.options){
        // }
    }
    
        
        render(){
          
            let Addmore = (e) => {
              //  e.preventDefault()
                
                // alert(console.log(e.target.value))
                
                this.setState(old=>({...old,Keyvaluefield:[...old.Keyvaluefield,<Keyvaluefield func={this.Keyvalue.bind(this)}  delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={this.state.Keyvaluefield.length} id={this.state.Keyvaluefield.length}   />]}))
            }

           

        const handleChangeDefault = () => {

            var defaults = {
                text: this.state.text,
                value: this.state.value,
            };

            this.props.func({
                key:this.props.fieldName, 
                name: 'default',
                val: defaults
            });
        }

        const handleChange = (e) => {
            console.log('name ', e.target.name, 'Value',e.target.value,this.props.fieldName)
            this.setState(
                old => ({
                    ...old, [e.target.name]:[e.target.value]
                })
            )
        }

        // const deletelist=(delval)=>{          
        //  var optionslist=this.state.options.list
        //    delete optionslist[delval]
        //   this.setState(old=>({...old,options:{...old.options,optionslist}}))
         
        // }

    
     //   console.log("===", Object.keys(this.state.options.list).length)
     // console.log("Stae==>",this.state)
        return(<>
           
              <div className="col-md-4 mb-3">
                <Switch checked={this.state.options.static} onChange={(e)=>this.setState(old=>({...old,options:{...old.options,static:e.target.checked}}))} name={"static"}  fullWidth /> 
                 {/* <strong>   {removeCharacter(this.props.options.static, '_')}</strong>            */}

                { <strong> {"Static"} </strong>         }
                    
            </div> 
        
            <div className="col-md-8 mb-3">
            
            <div className="row " >
                <label>Default</label>
            <div className="col-md-6 mb-3">
            <MaterialTextField  name="text" value={this.state.text}  onChange={(e)=>{handleChange(e),handleChangeDefault()}} placeholder="Title" fullwidth/>
           </div>
           <div className="col-md-6 mb-3">
           <MaterialTextField name="value" value={this.state.value}  onChange={(e)=>{handleChange(e),handleChangeDefault()}} placeholder="Value" fullwidth/>
           </div>

            </div>
    
    
            </div> 
          
           
            {this.state.options.static ?
            <>
            {
              
                   
                    this.state.Keyvaluefield.map((value, index)=>{
                  //      console.log("index",index)
                        return value;
                    // return <Keyvaluefield func={this.Keyvalue.bind(this)} delfunc={deletelist} value={{['key']:index,  ['val']: value}}  key={(index)} id={index}   />
                    })            
            }
           
           {/* {this.state.Keyvaluefield} */}
            {/* <div className="col-md-12 mb-4 d-flex" style={{justifyContent:"right",marginTop:"-4rem",marginBottom:"auto"}}>
                 <Button  onClick={Addmore}style={{ backgroundColor: '#183883',width:"96px",color:"#fff", fontSize:"15px", marginTop: "14px", height: "48px"}}   size='medium'>Add More</Button>
             </div> */}
               <div className="col-md-1">
                <IconButton onClick={Addmore} aria-label="delete" size="large">
                    <AddIcon fontSize="large" />
                </IconButton>
              </div>
             </>
            :
                <div className="col-md-6 mb-3">
                    <MaterialTextField placeholder="Url" onChange={(e)=>this.setState(old=>({...old,options:{...old.options,[e.target.name]:e.target.value}}))}name="data-url" label="url" />
                    </div>
                    
                    
            } 


           
     
             
                
        </>)
    }


    
  
  }
 
 
 const Keyvaluefield =(props)=>{
   // console.log("propskey==>",props)
        const remove=()=>{
            // {props.value.key!==""?props.delfunc(props.value.key):props.delbyidfunc(props.id)}
            props.delbyidfunc(props.id)
            // console.log("deleteval==>",props.value.key,)

        }
    return(<>
     
        <label>List</label>
        <div className="col-md-4 mb-3">
        <MaterialTextField name="key" value={props.value.key?props.value.key:""} onChange={(e)=>props.func(e)} placeholder="Key" fullwidth/>
       </div>
       <div className="col-md-4 mb-3">
       <MaterialTextField name="values" value={props.value.val?props.value.key:""} onChange={(e)=>props.func(e)} placeholder="Value" fullwidth/>
       </div> 
       {/* <div className="col-md-1">
       <Button  onClick={remove}style={{ backgroundColor: '#183883',width:"96px",color:"#fff", fontSize:"15px", marginTop: "14px", height: "48px"}}   size='medium'>Delete</Button>
       </div> */}
        <div className="col-md-1">
        <IconButton onClick={remove} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
        </IconButton>
       </div>

    
      
    </>)
 }
 
 const TextField =  (props)=>{
    //console.log("props=>",props)
     return(<> 
           
          
            <div className="col-md-4 mt-3">
              <MaterialTextField type={props.type==="numeric"?"number":props.type}name={props.name} onChange={(e)=>props.func({key:props.fieldName, name:e.target.name, val:e.target.value})} label={props.name} placeholder={props.name} />
            </div>
         
            
     </>)
 }
 
 const Checkboxs =(props)=>{
      // console.log("Checkboxprops==>",props)
     
     return(
         <>  
          
          <div className="col-md-4 mt-3">
          <Switch checked={props.attrval} onChange={(e)=>props.func({key:props.fieldName, name:e.target.name, val:e.target.checked})} name={props.name}  fullWidth /> 
          <strong>   {removeCharacter(props.name, '_')}</strong>         
               
          </div> 

          
           
         </>
     )
 }


 
 const Placeholdersfield =(props)=>{
       // console.log("placeholder=>",props)
    return(<>
            {props.type!=="toggle"?
            <TextField key={props.key} fieldName={props.fieldName} func={props.func} name={props.name} attrval={props.attrval}/>
            :""
            }
    </>)
    
 }


 
 const SelectField =(props)=>{
   //  console.log("selectprops=>",props)
 const [value, setValue] = useState(props.attrval);
 const [options,setOptions]= useState({
        "static": false,
        "list": {
            
        },
 })


 
    var types={
     "numeric":"Number",
     "text":"Text",
     "toggle":"Toggle",
     "dropdown":"Dropdown"
    }
    const onHandleChange = (e) =>{
     
     props.func({key:props.fieldName, name: e.target.name, val:e.target.value});
     if("dropdown" === e.target.value) {
        props.func({key:props.fieldName, name: 'options', val:options});
     } else {
        props.func({key:props.fieldName, name: 'options', val:{}});
     }
     setValue(e.target.value)
  
 }
 
 
   
     return(
         <>
             <div className="col-md-4 mt-3">
                 <MaterialSelect
                   //   style={{width: "184% " }}  
                    fullWidth
                     name={props.name} 
                     label={props.name}
                     placeholder={props.name}
                     data={types}  
                     value={value}
                     onChange={onHandleChange}
                 />
             </div>

             {/* {props.options?<Checkboxs static={props.options}/>:""


             } */}
         </>
     )
 } 

 const VersionField=(props)=>{
    const [value, setValue] = useState(props.attrval);
    var data = {"2.0":"2.0"};

    const onHandleChange = (e) =>{
     
        props.func({key:props.fieldName, name: e.target.name, val:e.target.value});
     
        setValue(e.target.value)
     
    }

    return(
        <>
            <div className="col-md-3 mt-3">
                <MaterialSelect
                 fullWidth
                    name={props.name} 
                    label={props.name}
                    placeholder={props.name}
                    data={data}  
                    value={value}
                    onChange={onHandleChange}
                   
                />
            </div>

        </>
    )

 }




