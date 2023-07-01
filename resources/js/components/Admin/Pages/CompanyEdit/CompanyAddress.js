import React, { useState } from "react";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import { Box, Divider } from "@mui/material";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialButton from "../../../../Tags/MaterialButton";
import Api from "../../../../api";
import { useEffect } from "react";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";

export class ComapnyAddress extends React.Component {
    constructor(props){
      super(props);
      this.state = {      
         Addressmodel:[< Address  delbyidfunc={this.deletebyid.bind(this)}  handlefunc={this.handleChange.bind(this)}   value={{key:'', val:''}} key={0} id={0}/>],   
        address:{
            ...this.props.data
        }
      }
      this.apiCtrl = new Api;
    
     
    }

    componentDidUpdate = (prevProps, prevState) =>{
      if(prevState.address !== this.state.address){
          
        this.props.func({company_address:this.state.address})
        // if(typeof this.props.data !== 'undefined'){
        //     // console.log('Data', this.props.data)
        //     var Addressmodel = [];
        //     if(Object.entries(this.props.data).length > 0){
        //         Object.entries(this.props.data).map(([key, value])=>{
        //             Addressmodel = [...Addressmodel, < Address  delbyidfunc={this.deletebyid.bind(this)}  handlefunc={this.handleChange.bind(this)} data={{...value}}  value={{key:'', val:''}} key={key} id={key}/>];
        //         })

        //         this.setState((old)=>({...old, Addressmodel:[...Addressmodel]}))
        //     }
        // }
      }
     }

    componentDidMount(){
        if(typeof this.props.data !== 'undefined'){
            // console.log('Data', this.props.data)
            var Addressmodel = [];
            if(Object.entries(this.props.data).length > 0){
                Object.entries(this.props.data).map(([key, value])=>{
                    Addressmodel = [...Addressmodel, < Address  delbyidfunc={this.deletebyid.bind(this)}  handlefunc={this.handleChange.bind(this)} data={{...value}}  value={{key:'', val:''}} key={key} id={key}/>];
                })

                this.setState((old)=>({...old, Addressmodel:[...Addressmodel]}))
            }
        }
    }
    
    deletebyid=(delrowbyid)=>{
       
         const Keyvaluefield= this.state.Addressmodel
         delete Keyvaluefield[delrowbyid]
        // console.log("oflength=>",oflength)
          this.setState(old=>({...old,Keyvaluefield}))
          console.log("stateAfterdel=>",this.state)
     

    }
    handleChange=(e, position)=>{
       
        this.setState(old=>({ ...old,address:{...old.address,[position]:{...old.address[position],  [e.target.name]:e.target.value}}}))
      
        //this.props.func({company_address:this.state.address})
    }


    render(){
        let Addmore = (e) => {
              
            this.setState(old=>({...old,Addressmodel:[...old.Addressmodel,<Address handlefunc={this.handleChange.bind(this)}  delbyidfunc={this.deletebyid.bind(this)}  key={this.state.Addressmodel.length} id={this.state.Addressmodel.length}   />]}))
        }

        const submit=()=>{
           
            // this.props.funcsubmit({...this.state.address})
            this.props.funcsubmit()
        }

         console.log("propsaddress=====>",this.props)
         console.log("Stateaddress=====>",this.state)

      
        return(<>
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row">

                    {this.state.Addressmodel}

                </div>

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={submit} name="submit" text="Submit" />
                </div>
                

            </Box>

          
        </>)

        
    }


}

function Address(props){

 console.log("propsinneraddress=>",props)
    const apiCtrl=new Api
    const [statedata,setStateData]=useState({})
    const [city,setCity]=useState({})
    const [errors,setErrors]=useState({})
    const [state,setState]=useState({
       ...props.data
      
        
       
    })
    useEffect(()=>{
        if(props.data!==undefined){
            const {state}=props.data
        console.log("props===>address==>",state)
        setState({...props.data})
      //  alert()
        citydata(state)

        }
       
     
    },[props.data])
    console.log("state address=>,",state)
     var validation={
        state:{required:true,}, 
        city:{required:true, }, 
        pincode:{required:true,min:6,max:6, type:'numeric'},
        
       
       
       

     }

    const remove=()=>{
       
        props.delbyidfunc(props.id)
      
    }

    useEffect(()=>{
        getstatedata()
       // citydata(state.state)
        
    },[])
    // useEffect(()=>{

    //     // citydata(state.state)
      
    // },[state.state])

    const getstatedata = () => {
        apiCtrl.callAxios('states/list',{search:{country_id:1}}).then(res => {
           var data={}
            if(res.success ==true){
                res.data.map((value)=>{                  
                    //console.log("STATE==>",value)
                    //setState(old => ({...old, statedata:{ ...old.statedata, [value.id]:value.state_name}}))  
                  // setStateData(old=>({...old,[value.id]:value.state_name}))  
                 data={...data,[value.id]:value.state_name}  
                            
                }) 
              setCity({})  
             setStateData({...data})
            }
            
            
        })
    }

    const citydata=(value)=>{


      
            apiCtrl.callAxios('cities/list',{search:{state_id:value}}).then(res => {
                var data ={}
                if(res.success==true){
                
                    res.data.map((value)=>{                  
                        //    console.log("city==>",value)
                                //setState(old => ({...old, citydata:{ ...old.citydata, [value.id]:value.city_name}}))    
                                data={...data,[value.id]:value.city_name}              
                    })  
                }
                setCity({...data})
               // console.log("data=>",data)
                    
            })
       

    }


    const validations = (fieldName, fieldValue) => {
            
        let error={}
        let isValid = true;
        let isMax = 1000;
        if(typeof validation[fieldName] !== "undefined"){
            Object.entries(validation[fieldName]).map(([key,value])=>{
         
                let temp =  fieldName.replace(/_/g, " "); 
                var name = temp
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
          
                if(key === 'required'){
                    if((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null)){
                        error[fieldName] = `${name} Field is required`
                        isValid = false;
                    } 
                } else if(key === 'min'){
                    if(fieldValue.length < value){
                        error[fieldName] = `${name} Is Valid`
                        isValid = false;
                    }
                } else if(key === 'max'){
                    if(fieldValue.length > value){
                        error[fieldName] = `${name} Is Valid`
                        isMax = value;
                        isValid = false;
                    }
                } else if(key === 'type'){
                    if(value === 'alpha'){
                        if(!fieldValue.match(/^[A-Za-z\s]*$/)){
                            error[fieldName] = `${name} Is Valid`
                            isValid = false;
                        }
                    } else if(value === 'AlphaNumeric'){
                        if(!fieldValue.match(/^[A-Za-z0-9,-.\s]*$/)){
                            error[fieldName] = `${name} Is Valid`
                            isValid = false;
                        }
                    } else if(value === 'Numeric'){
                        if(!fieldValue.match(/^[0-9]*$/)){
                            error[fieldName] = `${name} Is Valid`
                            isValid = false;
                        }
                    } else if(value === 'email'){
                        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                        if(!fieldValue.match(reg) ){
                            error[fieldName] = `${name} Is Valid`
                            isValid = false;
                        }
                    } 
                    else if(value === 'pan'){
                        let reg = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
                        if(!fieldValue.match(reg) ){
                            error[fieldName] = `${name} Is Valid`
                            isValid = false;
                        }
                    }else if(value == "aadhar"){
                        let reg =/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/
                        if(!fieldValue.match(reg) ){
                            error[fieldName] = `${name} Is Valid`
                            isValid = false;
                        }

                    }else if(value == "gst"){
                        let reg =/^[0-9]{2}[a-zA-Z]{3}[cphfatbljgCPHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1}$/;
                        if(!fieldValue.match(reg) ){
                            error[fieldName] = `${name} Is Valid`
                            isValid = false;
                        }

                    }


                       
                }
                if(isValid == true) {
                    
                    error[fieldName] = '';
                }
            })
            setErrors({...error}) 
        }
        if(isMax >= fieldValue.length){
            if(fieldName=="state"){
                citydata(fieldValue)
            }
            setState(old => ({...old,[fieldName]: fieldValue} ) ) 
             
        }
    }

  



    const handleChange=(e)=>{
        validations(e.target.name,e.target.value)
        props.handlefunc(e, props.id)
         //setState(old=>({...old,[e.target.name]:e.target.value}))
        
    }

   
   // console.log("data=>",statedata)
    return(<>

        <div className="row ">

            <div className="col-md-10">
                <div className="row">
                    <div className='col-md-6 mb-4'>        
                        <MaterialSelect size="small"     data={statedata}  id="state_id" labelId="state" name="state"  label="State *" fullWidth
                          onChange={handleChange}  value={state.state?state.state:""}
                          helperText={
                            errors.state
                            ? errors.state
                            : ''
                           }
                           error={errors.state?true:false}
                        />
                    </div>
                    

                    <div className='col-md-6 mb-4'>        
                        <MaterialSelect  size="small"       data={city}  id="city_id" labelId="city-id" name="city"  label="City *" fullWidth
                          onChange={handleChange} value={state.city?state.city:''}
                          helperText={
                            errors.city
                            ? errors.city
                            : ''
                           }
                           error={errors.city?true:false}
                        />
                    </div>

                   

                    <div className="col-md-6 mb-4">
                        <MaterialTextArea style={{height: "43px"}} label="Address" row={4} multiline placeholder="Enter Your Address" fullWidth name='address'
                         onChange={handleChange} value={state.address?state.address:''}

                            
                        />

                        
                    </div>
                
                    <div className="col-md-6 mb-4">
                        <MaterialTextField type={"number"}  label="Pincode *" size="small" fullWidth name='pincode' 
                          onChange={handleChange} value={state.pincode?state.pincode:""}
                          helperText={
                            errors.pincode
                            ? errors.pincode : ''
                           }
                           error={errors.pincode?true:false}
                        />
                    </div>


                </div>
               

            </div>

            
            <div className="col-md-2">
                <div className="col-md-1 mb-4 d-flex"style={{justifyContent:"center", marginTop:"23px" ,marginLeft:"29px",   marginBottom:"auto"}}>
                        <IconButton onClick={remove} aria-label="delete" size="large">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </div>


                </div>
        </div>




        
    </>)
}