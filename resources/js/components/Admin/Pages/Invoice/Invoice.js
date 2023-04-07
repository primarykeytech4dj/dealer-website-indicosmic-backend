import React from "react";
import { Box, Divider } from '@mui/material';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { SearchDropdown } from "../../../../Tags/Searchabledropdown";
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import MaterialButton from "../../../../Tags/MaterialButton";
import TextEditor from "../TextEditor/Text_Editor";
import { useState } from "react";
import { Button } from "react-bootstrap";

import './Invoice.css'
import DatePickers from "../../../../Tags/DatePicker";
import { object } from "prop-types";

export default class Invoice extends React.Component{
    constructor(props){
        super(props);
        this.state = {    
           item:[< Items fun={this.handleitem.bind(this)}     value={{key:'', val:''}} namekey={0} key={0} id={0}/>],
           items_details:{
           
           }
      }
    }

    
     handleitem=({name,value,position,total})=>{

        //const {name,value}=e.target

        console.log("total=>",total)
             
        if((typeof name!=="undefined")&& (typeof value!=="undefined")){
            this.setState(old=>({...old,items_details:{...old.items_details,[position]:{...old.items_details[position],[name]:value}}}))
           
        }
        if(typeof total!=="undefined"){
            var totals = parseFloat(total)
            this.setState(old=>({...old,items_details:{...old.items_details,[position]:{...old.items_details[position],total: parseFloat(total)}}}))
        }
      
         console.log("state--=>",this.state)     
    
     }
    




    render(){
        let Addmore = (e) => {
           
              
            this.setState(old=>({...old,item:[...old.item,<Items fun={this.handleitem.bind(this)}   namekey={this.state.item.length}   key={this.state.item.length} id={this.state.item.length}   />]}))
        }

        const handleDatePicker = (value, name) => {}
        var subtotal=0
         if(Object.keys(this.state.items_details).length >0){

            Object.entries(this.state.items_details).map(([key,value])=>{

                return Object.entries(value).map(([key1,val2])=>{
                    if(key1=="total" &&!isNaN(val2)){
                       
                        subtotal+=val2
                    }
                      
                })
            })

             console.log("subtotal=>",subtotal)
         }

      
        return(<>
      
             <BreadCrumb breadcrumb={"Invoice"} breadcrumbItem1='Create' />

             <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row">

                    <div className="col-md-4 mb-3">

                        <SearchDropdown style={{width:"100%"}}
                          data={""}
                          label={"Customer name"}
                          size={"small"}
                          name="customer_name"
                           fullWidth
                        />


                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} name="invoice" label="Invoice" fullWidth 
                            
                        />
                            
                    </div>
                    <div className="col-md-4 mb-3">
                        <DatePickers  
                     
                            maxDate={new Date()}
                            label=" Date" 
                            onChange={(e)=>handleDatePicker(e, "date")} 
                            size={"small"}
                            name="date" fullWidth
                        />
                            
                    
                            
                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} name="email" label="Email" fullWidth 
                            
                        />
                            
                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} name="contact" label="Contact" fullWidth 
                            
                        />
                            
                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField size={"small"} name="gst" label="GST No" fullWidth 
                            
                        />
                            
                    </div>

                    <div className="col-md-2 mb-3">

                        <label>Address</label>

                    </div>
                    <div className="col-md-1"> 
                        
                        <button href="#exampleModalToggle190" data-bs-toggle="modal" >
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </button>

                    </div>
                     
                    
                    
                    
                    <ModelAreaText/>
                    
                </div>

                <Divider sx={{ borderColor: '#dac4c4',marginTop:'10px'}} />

                <div className="row ml-1 mb-3">
                    <label><b>{"Item"}</b></label>
                </div>
                <div className="row mb-2">

                    <div className="col-md-12">
                        <div className="row">

                        <div className="col-md-2"><strong>Product</strong></div>
                        <div className="col-md-2"><strong>Description</strong></div>
                        <div className="col-md-2"><strong>Hsn Code</strong></div>
                        <div className="col-md-2"><strong>Qty</strong></div>
                        <div className="col-md-2"><strong>Rate</strong></div>
                        <div className="col-md-1"><strong>gst</strong></div>
                        <div className="col-md-1"><strong>Total</strong></div>


                        </div>

                    </div>

                   


                </div>
                 
                <div className="row mt-3">

                    <div className="col-md-12">
                        <div className="row">

                          {this.state.item}
                        </div>

                    </div>
                </div>

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>

                <Divider sx={{ borderColor: '#dac4c4',marginTop:'10px', marginBottom:"10px"}} />

                <div className="row">
                    <div className="col-md-12 mb-3 d-flex justify-content-end ">

                       <MaterialTextField className="textfield" value={subtotal} disabled={true} size={"small"}label="Sub Total"/> 
                        
                    </div>
                    <div className="col-md-12 mb-3 d-flex justify-content-end ">
                        <MaterialTextField size={"small"} label="Discount"/>
                    
                    </div>

                    <div className="col-md-12 mb-3 d-flex justify-content-end ">
                     <MaterialTextField size={"small"} label="Adjustment"/>
                    </div>

                    <div className="col-md-12 mb-3 d-flex justify-content-end ">
                      <MaterialTextField size={"small"} label="Total"/>


                    </div>



                </div>

                <Divider sx={{ borderColor: '#dac4c4',marginTop:'10px', marginBottom:"10px"}} />

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                  <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  name="submit" text="Submit" />
                </div>

            </Box>

              

        </>)
    }
}

 const ModelAreaText =()=>{


    return(<>
          
          <div className="modal fade" id="exampleModalToggle190" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered  modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Adresss</h5>
                <div className="row ml-1" style={{ paddingTop: '2%'}}>
                    {/* <label><b>{props.params.any} Details</b></label> */}
                </div>
                <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div className="modal-body m-body">
                
              <div className="row">
                
              <MaterialTextArea style={{height: "123px"}}label="Address" row={4} multiline placeholder="Enter Your Address" fullWidth name='address' 
              />

    
              </div>
                
              {/* <div className="modal-footer">
                      
    
                      <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                    
              
                      {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={ submituser }>Submit</Button> 
                    
                    </div>*/}
              </div>  
    
              
            </div>
          </div>
          </div>
    
    </>)

 }
 const GstModel =(props)=>{

    const  [state,setState]=useState({})

    //   const submitdata =()=>{
    //      props.func({...state})
    //   }


    return(<>
          
          <div className="modal fade" id={`exampleModalToggle${props.namekey}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered  modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                {/* <h5 className="modal-title" id="exampleModalLongTitle">GST</h5> */}
                <div className="row ml-1" style={{ paddingTop: '2%'}}>
                    {/* <label><b>{props.params.any} Details</b></label> */}
                </div>
                <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div className="modal-body m-body">
                
              <div className="row" key={props.key}>
                
               <div className="col-md-4">
                 <MaterialTextField name="sgst"  label=" SGST" onChange={(e)=>props.func({name:e.target.name,value:e.target.value,position:props.id})} />

               </div>
               <div className="col-md-4">
                 <MaterialTextField name="cgst" type="number" label=" CGST" onChange={(e)=>props.func({name:e.target.name,value:e.target.value,position:props.id})} />


               </div>
               <div className="col-md-4">
                 <MaterialTextField  name="igst" type="number" label=" IGST" onChange={(e)=>props.func({name:e.target.name,value:e.target.value,position:props.id})} />


               </div>
    
              </div>
                
              <div className="modal-footer">
                      
    
                      {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                    
               */}
                       <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}}>Submit</Button> 
                    
                    </div>
              </div>  
    
              
            </div>
          </div>
          </div>
    
    </>)

 }


function Items (props){
    const [total,setTotal]=useState()
    // const [qty,setQty]=useState()
    // const [gst,setGst]=useState()
    const [state,setState]=useState({})

    
    const HandleChange = ({name,value,position})=>{
        //console.log("name",name,"value",value,"position",position)
        setState(old=>({...old,[name]:value}))
        props.fun({name:name,value:value,position:position})
       
      }
       
   
    React.useEffect(()=>{
        handleCalculate()
    },[state])

    const handleCalculate  = async () => {

        var Amnt = parseFloat(state.rate).toFixed(2);
        var qty = 1;
        if((state.qty !== '') && (typeof state.qty !== 'undefined'))
        {
            qty =  parseFloat(state.qty).toFixed(2)
        }
        var amt = Amnt*qty;
        var tax = 0.00;
        if((state.sgst !== '') && (typeof state.sgst !== 'undefined'))
        {
            tax = parseFloat(state.sgst).toFixed(2);
        }
        var totals = amt+(amt*tax/100.00);
        //setProductAmt(total);
         setTotal(totals)

         console.log("totalsss=>",totals)
         props.fun({total:totals,position:props.id})
       
          


        
        
    }

    // console.log("state=>",state)



    return(<>

        <div className="col-md-2 mb-2">
            <SearchDropdown
            data={""}
            onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})} 
            
            />

        </div>
        <div className="col-md-2 mb-2">
        <MaterialTextArea style={{height: "55px"}} row={4}
         multiline placeholder=""  name='description' 
         onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})} 
         />
        </div>
        <div className="col-md-2 mb-2">
            <MaterialTextField />

        </div>
        <div className="col-md-2 mb-2">
            <MaterialTextField name="qty" onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})}   />


        </div>
        <div className="col-md-2 mb-2">
            <MaterialTextField name="rate"   onChange={(e)=>HandleChange({name:e.target.name,value:e.target.value,position:props.id})}  />


        </div>

        <div className="col-md-1 mb-2" >

            <button href={`#exampleModalToggle${props.namekey}`} data-bs-toggle="modal" >
                <Avatar>
                    <AddIcon />
                </Avatar>
            </button>

            <GstModel namekey={props.namekey} id={props.id} key={props.namekey} func={HandleChange}/>



        </div>

        <div className="col-md-1 mb-2">
            <MaterialTextField value={!isNaN(total)?total:"0"} disabled={true}/>


        </div>
      


    </>)
}