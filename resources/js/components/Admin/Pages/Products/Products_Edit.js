import React from 'react';
import Box  from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { Tabs, Tab } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Api from '../../../../api';
import { BasicInfo } from './Basic_Info';
import withRouter from '../../../../withRouter';


class ProductEdit extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        
        value:"1",
        param:this.props.location.state ? this.props.location.state.param:""
        
      }
      this.apiCtrl = new Api;
      
    }
   
    // componentDidUpdate(prevProps,prevState){
    //   alert()
    //   if(prevProps.location.state.params.id !== this.props.location.state.params.id){
    //     console.log('Propps', this.props.params)
    //     this.setState(this.props.location.state.params)
    //   } 
    //   //console.log("props=>",this.props)
    // }
    // componentDidMount(){
    //   alert()
    //   this.setState(this.props.location.state.param)
    // }
  
    
   
    render(){
        console.log("Location ",this.props.location)

        return(<>


      <BreadCrumb breadcrumb={this.props.title} breadcrumbItem1={this.props.title+" "+'Update'} />
      <Box sx={{ width: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px" }}>


        <TabContext value={this.state.value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={this.state.value} aria-label="Add Claim"  variant={"scrollable"}
            scrollButtons={"auto"} >
 
                    <Tab label={<b>Basic Info</b>} value="1" />
                    <Tab label={<b>Images</b>} value="2" />
                    <Tab label={<b>Pack Product</b>} value="3" />
                    <Tab label={<b>Product Attribute</b>} value="4" />
                    <Tab label={<b>Variant</b>} value="5" />
                    
                </Tabs>
                <TabPanel value="1"><BasicInfo title={this.props.title} data={this.state.param}  /></TabPanel>
                <TabPanel value="2"><BasicInfo  /></TabPanel>
                <TabPanel value="3"><BasicInfo  /></TabPanel>
                <TabPanel value="4"><BasicInfo  /></TabPanel>
          </Box>
       
        </TabContext>

      </Box>
      
        </>)
    }
}


export default withRouter(ProductEdit)