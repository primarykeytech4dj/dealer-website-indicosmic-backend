import React from "react";
import Api from "../../../../api";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Button  from '@mui/material/Button';
import MaterialSelect from "../../../../Tags/MaterialSelect"
import MaterialButton from "../../../../Tags/MaterialButton";
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import DatePickers from '../../../../Tags/DatePicker'



export class VehicleDetails extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      
       
      
        
      }
      this.apiCtrl = new Api;
    
     
    }

    componentDidMount(){
        this.setState(this.props.data)
    }

    render(){
        
       const used={
        "used":"Used",
        "new":"New"
    }
    const model={
       "tvs":" TVS"

    }
    const make={
       "Tvs Sport Bsiv Es Spl": "Tvs Sport Bsiv Es Spl",
       "Jupiter Classic":"Jupiter Classic",
       "Apache Rtr160 White Spl Edition Fd":" Apache Rtr160 White Spl Edition Fd"
    }
    const transMission={
       "automatic": "Automatic",
       "manual":"Manual"
    }
    const fuelType={
        "diesel":"Diesel",
        "petrol":"Petrol"
    }

    const onHandleChange=({name,value,index,fieldName,index2})=>{
       
        this.setState(old=>({...old,[index]:{...old[index], [fieldName]:{...old[index][fieldName],[index2]:{...old[index][fieldName][index2],[name]:value}}}}))
        this.props.func({...this.state},{title:this.props.title})
      

    }

    const onhandleChang=({name,value,index})=>{
      //  console.log("name",name,"value",value,"index",index)

       this.setState(old=>({...old,[index]:{...old[index],[name]:value}}))
        //    console.log("state=>",this.state)
        this.props.func({...this.state},{title:this.props.title})

    


    }

    const next=()=>{

        this.props.nextfunc({value:this.props.value})
        
    }
    const submit=()=>{
        this.props.submit()
    }


   

       // console.log("detailsstate=>",this.state)
     ///   console.log("vehiclecreationprops=>",this.props)
        return(<>

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                {/* <Divider sx={{ borderColor: '#dac4c4'}} /> */}

                <div className="row">

                {Object.entries(this.state).map(([key,value])=>{

                  return(<>

                        <label><b>{key}</b></label>

                        {
                                
                            Object.entries(value).map(([key2,val2])=>{
                                // console.log("key2",key2,"val2",val2)

                                if(typeof val2=="string"){
                                        //console.log("key2",key2,"val2",val2)

                                    return(
                                        <>
                                            <div className="col-md-4 mb-3">
                                        <MaterialTextField label={key2} value={val2} name={key2} fullWidth onChange={(e)=>onhandleChang({name:e.target.name,value:e.target.value,index:key})}/>
                                        </div>
                                        </>
                                        
                                    )

                                    


                                }else{

                                    return(<>
                                        <div className="row mb-3 ml-1">
                                            <label><b>{key2}</b></label>
                                        </div>
                                                                    

                                    {

                                        
                                            Object.entries(val2).map(([key3,val3])=>{

                                               // console.log("key3",key3,"val3",val3)

                                            return(<>

                                                {/* <label>{val3}</label> */}

                                                {
                                                    Object.entries(val3).map(([key4,val4])=>{
                                                     

                                                        return(
                                                            <>
                                                            <div className="col-md-4 mb-3">
                                                                <MaterialTextField label={key4} value={val4}  name={key4} fullWidth onChange={(e)=>onHandleChange({name:e.target.name, value:e.target.value,index:key,fieldName:key2,index2:key3})}/>
                                                            </div>
                                                            </>
                                                    
                                                        )
                        
                                                    })
                                                }

                                                
                                            </>)

                                            
                                            

                                            })
                                        
                                    }
                                    </>)


                                }

                            })

                        }
                  </>)
          
              
                       

                    





    
                })}

                </div>

               

               <Divider sx={{ borderColor: '#dac4c4', marginBottom:"2%"}} />


                <div className='row'>
                    {this.props.value=="3"?
                       <div className="col-md-12 d-flex justify-content-end">
                       <Button style={{ backgroundColor: '#183883'}} onClick={submit}>Submit</Button>
                       </div>
                    
                       :
                        <div className="col-md-12 d-flex justify-content-end">
                            <Button style={{ backgroundColor: '#183883'}} onClick={next}>Next</Button>
                        </div>
                        
                    }
                </div>
    

                
              
               
                   
                                

            
            </Box>

              
        </>)
    }
}