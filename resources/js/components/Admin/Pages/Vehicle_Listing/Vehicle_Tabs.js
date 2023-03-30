import React from "react";

import Box  from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { Tabs, Tab } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Api from '../../../../api';
import { VehicleDetails } from "./Vehicle_Details";
import { Detailvehicle } from "./Datavehicle";
import Swal from "sweetalert2";
import withRouter from "../../../../withRouter";

export  class VehicleTabs extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        vehicledata:{},
       
        value:"1",
    //    id:this.props.location.state.param.id,


        fields:{

          
            "system_code":"",
            "vehicle_make":"",
            "vehicle_model":"",
            "transmission":"",
            "fuel_type":"",
            "vehicle_status":"",

    
            "used_vehicle":[{
                "History":"",
                "Km Driven":"",
                "Last Serviced On":"",
                "Registration No":"",
                "Registered In":"",
                "Owner":"",
                "Insurance Validity":""

            }] ,
            "specification":[{
               " Engine & Transmission":[{
                 "Engine Type":"",
                 "Fuel System":"",
                 "Displacement":"",
                 "Power":"",
                 "Torque":"",
                 "Bore/Stroke":"",
                  "Start Method":""
               }]
            }],
            "features":[{
                "Safety":[{
                    "No Airbags":"",
                    "No Middle":"",
                  
    
                }],
                "Braking & Traction":[{
                    "No Electronic Brake-force Distribution (EBD)":"",
                    "No Four-Wheel-Drive":"",
                  
                }],
                "Locks & Security":[{
                    "Engine immobilizer":"",
                    "No Speed Sensing Door Lock":"",
                   
                }],
                "Comfort & Convenience":[{
                " No Rear AC":"",
                "Steering Adjustment":"",
              
                }],
                "Telematics":[{
                    "Find My Car":"",
                    "Geo-Fence":"",
                  
                }],
                "Seats & Upholstery":[{
                    "No Leather-wrapped Steering Wheel":"",
                    "No Front Passenger Seat Adjustment":"",
                   
                }]
            }]


         
        },

        errors:{},
        validation:{
            name:{required:true},
           
            "system_code":{required:true},
            "make":{required:true},
            "type":{required:true},
            "model":{required:true},
            "transmission":{required:true},
            "fuel_type":{required:true},
            "vehicle_status":{required:true},
            "History":{required:true},
            "Km Driven":{required:true},
            "Last Serviced On":{required:true},
            "Registration No":{required:true},
            "Registered In":{required:true},
            "Owner":{required:true},
            "Insurance Validity":{required:true},
            "Engine Type":{required:true},
            "Fuel System":{required:true},
            "Displacement":{required:true},
            "Power":{required:true},
            "Torque":{required:true},
            "Bore/Stroke":{required:true},
            "Start Method":{required:true},
            "No Airbags":{required:true},
            "No Middle":{required:true},

    
        },
    isValid:false,
        
      }
      this.apiCtrl = new Api;
      
    }
   

    componentDidUpdate = (prevProps, prevState) =>{

        if(prevState.fields.vehicle_status !== this.state.fields.vehicle_status){
            // alert()

            if((this.props.location!==null)&&( typeof this.props.location.state!=="undefined")&&(this.props.location.state!=="")&&(this.props.location.state!==null)){
                const {vehicle_model,vehicle_make,vehicle_status,transmission,system_code,fuel_type,specification,used_vehicle,features}=this.props.location.state

                if(this.state.fields.vehicle_status=="new"){

                    this.setState(old=>({...old,fields:{...old.fields,used_vehicle}}))

                }else{
                    this.setState(old=>({...old,fields:{...old.fields,used_vehicle:""}}))
                }

            }else{

            if(this.state.fields.vehicle_status=="new"){

                this.setState(old=>({...old,fields:{...old.fields,  "used_vehicle":[{
                    "History":"",
                    "Km Driven":"",
                    "Last Serviced On":"",
                    "Registration No":"",
                    "Registered In":"",
                    "Owner":"",
                    "Insurance Validity":""
    
                }]  }}))

            }else{
                this.setState(old=>({...old,fields:{...old.fields,used_vehicle:""}}))
            }
             }
        //   this.getUserList();
        }
       }
    

    componentDidMount(){

        console.log("props=>",this.props)

        
        
        if((this.props.location!==null)&&( typeof this.props.location.state!=="undefined")&&(this.props.location.state!=="")&&(this.props.location.state!==null)){
            // alert()
            const {vehicle_model,vehicle_make,vehicle_status,transmission,system_code,fuel_type,specification,used_vehicle,features}=this.props.location.state

            this.setState(old=>({
                ...old,fields:{
                    ...old.fields,
                     vehicle_make,
                     vehicle_model,
                    vehicle_status,
                    transmission,
                    system_code,
                    fuel_type,
                    used_vehicle:used_vehicle,
                    specification:specification,
                    features:features
            }}))

            this.setState(old=>({...old,vehicledata:{
                vehicle_make:vehicle_make,
                vehicle_model,
                vehicle_status,
                transmission,
                system_code,
                fuel_type,}}))

        }

      

    }

    // setUsevehicle=()=>{

    //     if(this.state.fields.vehicle_status=="used"){

    //         this.setState(old=>({...old,fields:{...old.fields,used_vehicle:""}}))

    //     }else{
    //         this.setState(old=>({...old,fields:{...old.fields,used_vehicle:[{
    //             "History":"",
    //             "Km Driven":"",
    //             "Last Serviced On":"",
    //             "Registration No":"",
    //             "Registered In":"",
    //             "Owner":"",
    //             "Insurance Validity":""

    //         }]}}))
           

    //     }
        

    // }
   
  
    
   
    render(){
        var i =1;
        var a=1;
        //console.log("Location ",this.props.location)

        const  onHandleChange=(state,{title})=>{

            
            var titlename=title
             //console.log("title=>",titlename)
             // console.log("state=>",state)
            
            if(titlename==""){
               // console.log("state=>",state)
             
                  this.setState(old=>({...old,fields:{...old.fields,...state}}))
                 

               
                  

            }else{
                this.setState(old=>({...old,fields:{...old.fields,[title]:{...old.fields[title],...state}}}))


            }


        }
       
        const handleChange = (event, value) => {
          // console.log("value ",value,"Eval",event.target.value)
            this.setState(old => ({...old, value: value}));
          };

        const next=({value})=>{
            
         this.setState(old=>({...old,value:String(parseInt(value)+1)}))
         

        }

        const onSubmit=()=>{


            const data={
               ...this.state.fields
            }

            // if(userType=="Posp"){
            //     data.reportingManager = this.state.reportingManager;
            //     data.category=this.state.category;
            //  }

            if((this.props.location!==null)&&( typeof this.props.location.state!=="undefined")&&(this.props.location.state!=="")&&(this.props.location.state!==null)){
                const{id}=this.props.location.state
                data.id=id



            }

           // console.log("data=>",data)


            
           

            this.apiCtrl.callAxios("vehicle/create",data).then((response)=>{
                if(response.success == true){
                    Swal.fire({
                        title: "Vehicle",
                        text: response.message,
                        icon: "success",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                        Swal.close()
                        
                  }, 3000);
                } else {
                    Swal.fire({
                        title: "Vehicle",
                        text:response.message,
                        icon: "error",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                        Swal.close()
                  }, 3000);
                }
            })
            
        }

          

           console.log("tabstate=>",this.state)
        // console.log("props=>",this.props)
    
        return(<>


      <BreadCrumb breadcrumb={"vehicletabs"} />
      <Box sx={{ width: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px" }}>


        <TabContext value={this.state.value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={this.state.value} onChange={handleChange} aria-label="Vehicle"  variant={"scrollable"}
                   scrollButtons={"auto"} >
 
                    <Tab label={<b>Vehicle Details</b>} value="1" /> 
          
                    
                    {                 
                    Object.entries(this.state.fields).map(([key,value])=>{
                        // console.log("key",key,"value",value)
                        //console.log("types",typeof value)
                       
                        // i = parseInt(i)+1;
                        // i = Number(i)+1;
                        
                        // console.log("i=>", i)
                        
                        if(typeof value!=="string" &&value!==null){

                          i = String(parseInt(i)+1);
                       
                        return(
                            <Tab key={key} label={<b>{key}</b>} value={`${i}`} />

                        )
                      

                      }

                       
                    })}

                 
                    
                </Tabs>

                

                 <TabPanel  value={"1"}><Detailvehicle func={onHandleChange} nextfunc={next} value={"1"} data={this.state.vehicledata}/></TabPanel> 

                
                {
                Object.entries(this.state.fields).map(([key,value])=>{
                    //  a = String(parseInt(a)+1);
                         //a = parseInt(a)+1;
                        //a=Number(a)+1
                    // console.log("key",key,"value",value)
                       
                    //  console.log("a=>", a)

                   if(typeof value!=="string" &&value!==null){
                   //  console.log("value=>",value)
                    a = String(parseInt(a)+1);
                   
                    return(

                      
                        <TabPanel key={key} value={`${a}`}><VehicleDetails title={key} nextfunc={next} submit={onSubmit} func={onHandleChange} data={value} value={`${a}`} /></TabPanel> 

                    )

                    }
                  
                    
                })}
              
                
            </Box>
       
        </TabContext>

      </Box>
      
        </>)
    }
}


// export default withRouter(AddUsers)
export default withRouter(VehicleTabs)