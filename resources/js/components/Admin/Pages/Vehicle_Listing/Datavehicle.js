import React from "react";
import Api from "../../../../api";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import Button  from '@mui/material/Button';
import MaterialSelect from "../../../../Tags/MaterialSelect"
import MaterialButton from "../../../../Tags/MaterialButton";
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import DatePickers from '../../../../Tags/DatePicker'



export class Detailvehicle extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      
       
      
        
      }
      this.apiCtrl = new Api;
    
     
    }

    componentDidMount(){
        this.setState({...this.props.data})
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data)
        this.setState({...this.props.data})
        if(prevState!==this.state){
                this.props.func({...this.state},{title:""})
        }


    }
    
    // this.setState(old=>({...old,...this.props.data}))
    render(){
       // console.log('Vehicle Edit',this.props)
        
       const used={
        "used":"Used",
        "new":"New"
    }
    const make={
       "tvs":" TVS"

    }
    const model={
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

    const onHandleChange=(e)=>{

        console.log("name",e.target.name,"value",e.target.value)


          this.setState(old=>({...old,[e.target.name]:e.target.value}))
           

        //   this.props.func({...this.state},{title:""})

    }

    if(this.state==""){
           this.props.func({...this.state},{title:""})

    }

    const next=()=>{

        this.props.nextfunc({value:this.props.value})
        
    }

        console.log("Vehicledetailsstate=>",this.state)
        console.log("vehiclecreationprops=>",this.props)
        return(<>

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                {/* <Divider sx={{ borderColor: '#dac4c4'}} /> */}

                <div className="row">


                    <div className="col-md-4 mb-3"> 
                    <MaterialSelect value={this.state.vehicle_make} label={"Make"} name={"vehicle_make"}  data={this.props.vehiclemake?this.props.vehiclemake:""} fullWidth onChange={(e)=>onHandleChange(e)} />

                    </div>
                    <div className="col-md-4 mb-3"> 
                    <MaterialSelect value={this.state.vehicle_model}  label={"Model"} name={"vehicle_model"}  data={this.props.vehiclemodel?this.props.vehiclemodel:""} fullWidth onChange={(e)=>onHandleChange(e)} />

                    </div>
                    <div className="col-md-4 mb-3"> 
                    <MaterialSelect value={this.state.fuel_type}  label={"Fuel Type"} name={"fuel_type"}  data={fuelType} fullWidth onChange={(e)=>onHandleChange(e)} />

                    </div>
                    <div className="col-md-4 mb-3"> 
                    <MaterialSelect  value={this.state.vehicle_status}  label={"Vehicle Status"} name={"vehicle_status"}  data={used} fullWidth onChange={(e)=>onHandleChange(e)} />

                    </div>
                    <div className="col-md-4 mb-3"> 
                    <MaterialSelect label={"Transmission"} value={this.state.transmission} name={"transmission"}  data={transMission} fullWidth onChange={(e)=>onHandleChange(e)} />

                    </div>
                    <div className="col-md-4 mb-3">
                        <MaterialTextField label={"System Code"} name={"system_code"} onChange={(e)=>onHandleChange(e)}/>

                    </div>

          

                </div>

               

               <Divider sx={{ borderColor: '#dac4c4', marginBottom:"2%"}} />


                <div className='row'>
                    <div className="col-md-12 d-flex justify-content-end">
                        <Button style={{ backgroundColor: '#183883'}} onClick={next}>Next</Button>
                    </div>
                </div>
    

                
              
               
                   
                                

            
            </Box>

              
        </>)
    }
}