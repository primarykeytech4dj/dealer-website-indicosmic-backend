import React from 'react';
import Box  from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { Tabs, Tab } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Api from '../../../../api';


import Swal from "sweetalert2";
import withRouter from "../../../../withRouter";
import { OwnerDetails } from "./OwnerDetails";
import { ComapnyDetails } from "./CompanyDetails";
import { ComapnyAddress } from "./CompanyAddress";


export  class CompanyTab extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        value:"1"
       
          
    
        
      }
      this.apiCtrl = new Api;
      
    }
    render(){  

        const HandleChange=(data)=>{
            if(data){
                console.log("data=>",data)

            }
           

        }

        const handleChange = (event, value) => {
            // console.log("value ",value,"Eval",event.target.value)
              this.setState(old => ({...old, value: value}));
        };
        
           

        return(<>

            <BreadCrumb breadcrumb={"CompanyTabs"} />
            <Box sx={{ width: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px" }}>


                <TabContext value={this.state.value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.value} onChange={handleChange} aria-label="Vehicle"  variant={"scrollable"}
                        scrollButtons={"auto"} >
                             <Tab label={<b>Company Details</b>} value="1" /> 
                            <Tab label={<b>Owner Details</b>} value="2" /> 
                            <Tab label={<b>Adress Details</b>} value="3" /> 
                        </Tabs>
                        
                        <TabPanel  value={"1"}><ComapnyDetails  func={HandleChange}  value={"1"} /></TabPanel> 
                        <TabPanel  value={"2"}><OwnerDetails  func={HandleChange}  value={"2"} /></TabPanel> 
                        <TabPanel  value={"3"}><ComapnyAddress  func={HandleChange}  value={"3"} /></TabPanel> 

                    </Box>

                </TabContext>
            </Box>


        </>)
    }
}
export default withRouter(CompanyTab)