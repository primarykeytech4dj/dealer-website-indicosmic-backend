import React, { useState } from "react";
import Button  from '@mui/material/Button';

import MaterialButton from '../../../../Tags/MaterialButton'

import MaterialTextField from '../../../../Tags/MaterialTextField'
import MaterialSelect from '../../../../Tags/MaterialSelect'
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from '../../../../api';

class Setup extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //       btnVariant : "contained",
    //       role_name : null,
    //       role_code : null,
    //       slug : null
    //     }
    //     this.apiCtrl = new Api;
    //   }

    constructor(props){
        super(props);

        this.state = 
        {
            data : null
        }
        this.apiCtrl = new Api;
    }

  componentDidMount(){
    this.apiCtrl.callAxios('setup-list', []).then(response => {
       // location.reload('/')

     this.setState({data: response.data})
        console.log(response );
        // sessionStorage.setItem('_token', response.data.)
        
      }).catch(function (error) {
        console.log(error);
      });
    }

    render(){
        console.log(this.state.data)
        return(
            <>
            <BreadCrumb breadcrumb="Roles" breadcrumbItem1='Create' />
              
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

            <div className="row ml-1">
                <label><b>Setup</b></label>
            </div>
            <SetupRow data={this.state.data}/>
        
            <Divider sx={{ borderColor: '#dac4c4'}}    />
           </Box>
           </>
        )
    }
}

export default Setup



function SetupRow(props){
    
    const [crnval,setCrnvalue] = useState(
       {
           module_name: "",
           parameter: "",
           value: "",
           datatype: "",
           priority: "",
          
    }
    )
   
   
       const YesNo = {"1":"Yes","0":"No"};
       // const handleChange = (e)=>{
       //     setCrnvalue(e.target.value)
       
       // }
       
       const inputEvent =(e)=>{
         const{name,value}=e.target
         setCrnvalue(old => ({...old, [name]: value}))
         
       }
       
       const update =(e)=>{
          console.log( e.preventDefault());
   
       }
   
   
   
       return (
           <>
              
            <form onSubmit={update}>
             <table className="table">
      
                 
                <thead>
                <tr>
                <th className="col-md-2">Module Name</th>
                <th className="col-md-2">Parameter</th>
                <th className="col-md-2">Datatype</th>
                <th className="col-md-2">Description</th>
                {/* <th className="col-md-2">Tips</th> */}
                <th className="col-md-2">Priority</th>
                <th className="col-md-2">Action</th>
                </tr>
                </thead>

                <tbody>
                {props.data ? props.data.map((value, key)=> {
                 
                 return(
                <tr id ={key}>
            
                    <td >   
                        <MaterialSelect name="module_name"  value={value.module_name == '1' ? 'Yes' : 'No'}  data={YesNo} onChange={inputEvent}  id="driver-involved-in-any-accident-past-two-year" labelId="driver-involved-in-any-accident-past-two-yearlabel"   label="Diver Involved in any other accident in last two years" fullWidth />
                    </td>
                    <td >

                    <MaterialTextField   name="parameter"   value={value.parameter} label="Policy No" onChange={inputEvent}  fullWidth />

                    </td>

                    <td>
                    <MaterialSelect  name="value"   value={value.value == '1' ? 'Yes' : 'No'}  data={YesNo} onChange={inputEvent}  id="driver-involved-in-any-accident-past-two-year" labelId="driver-involved-in-any-accident-past-two-yearlabel"   label="Diver Involved in any other accident in last two years" fullWidth />
                        
                    </td>
                    <td>
                    <MaterialSelect  name="datatype"   value={value.datatype == '1' ? 'Yes' : 'No'}  data={YesNo} onChange={inputEvent}   id="driver-involved-in-any-accident-past-two-year" labelId="driver-involved-in-any-accident-past-two-yearlabel"   label="Diver Involved in any other accident in last two years" fullWidth />
                    </td> 

                    <td>
                    <MaterialTextField   name="priority" value={value.priority} label="Policy No" onChange={inputEvent}  fullWidth  />
                    </td>
                    <td>
                    <MaterialButton style={{ backgroundColor: '#183883' , border: '1px solid #183883',height:55}} name="update" text="Update" />

                    </td>
                </tr>
                    )
                })
                :
                'Loading....'
                }

                                
                </tbody>
                         
                       
              </table>
            </form>
              
           </> 
       
      )
     
   }
   