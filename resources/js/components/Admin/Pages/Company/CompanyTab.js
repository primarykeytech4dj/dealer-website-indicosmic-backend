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
import swal from 'sweetalert';



export  class CompanyTab extends React.Component {

    constructor(props){
      super(props);
      
      this.state = {
        value:"1",
        companydetails:{
           
        }
          
    
        
      }
      this.apiCtrl = new Api;
      
    }


    // componentDidUpdate(prevProps, prevState){
    //     // console.log('update')
    //     // alert("companyfunc1")
       
    //     if ((prevProps.location.state!==this.props.location.state)||(prevState.pageSize !== this.state.pageSize)) {
    //         alert("companyfunc")
    //       this.companydata();
    //     }
        

         
    //   }
      



    componentDidMount(){

        
        this.companydata()
     



        // if(this.props.location.state!==null){
        //     const{param}=this.props.location.state


        //     Object.entries(param).map(([key,value])=>{
        //         //console.log("key=>",key,"value=>",value)
        //         if(key=="company_address"){
        //         this.setState(old=>({...old,company_address:{...value}}))
                
        //         }else{
        //         this.setState(old=>({...old,companydetails:{...old.companydetails,[key]:value}}))
        //         }
        //     })
        //  }
      
    
        //   if(param=="company_address"){
        //     this.setState(old=>({...old,company_address:{...param}}))
            
        //   }else{
        //     this.setState(old=>({...old,companydetails:{...param}}))
        //   }
    }


    companydata(){

        if(this.props.location.state!==null){
            const{param}=this.props.location.state
         //   console.log("params=>",param)
            this.apiCtrl.callAxiosGet(`company/view/${param.company_code}`).then((response)=>{
                console.log('companydetails Response', response)
                

                if(response.success == false){

                    

                    const res = response.data.data;
                    var detailscompany={}
                        Object.entries(res).map(([key,value])=>{
                            //console.log("key=>",key,"value=>",value)
                            if(key=="company_address"){
                            this.setState(old=>({...old,company_address:{...value}}))
                            
                            }else{
                                detailscompany={...detailscompany,[key]:value}
                            // this.setState(old=>({...old,companydetails:{...old.companydetails,[key]:value}}))
                            }

                        })

                           this.setState(old=>({...old,companydetails:{...detailscompany}}))

                       // console.log("deails--->",detailscompany)
                }
      
            
                
            })
           
        }
     
    }
    render(){  

        const HandleChange=(data)=>{
           // console.log("data=>",data)
            if(data){
               
                console.log("data=>",data)
                    
                this.setState(old=>({...old,companydetails:{...old.companydetails,...data}}))
               

            }
           

        }

        const addresschange=(address)=>{
            if(address){
               
                console.log('Onchangeaddress==>',address)
                this.setState(old=>({...old,...address}))
                   
            }
            

        }

        const handleChangenext = (value) => {
            // console.log("value ",value,"Eval",event.target.value)
              this.setState(old => ({...old, value: value}));
        };

        const handleChange = (event, value) => {
            // console.log("value ",value,"Eval",event.target.value)
                this.setState(old => ({...old, value: value}));
            };

        const submitdata=()=>{

            const companyData={...this.state.companydetails,company_address:{...this.state.company_address}}
            var data=new FormData()

            data.append("template","dealer");
                              
    
            Object.entries(companyData).map(([key,val])=>{
             
               console.log("key=>",key)
                
                if(key=="company_address"){
                    Object.entries(val).map(([key1,val1])=>{
                        Object.entries(val1).map(([key2,val2])=>{
                     data.append(`company_address[${key1}][${key2}]`,val2);
                        })
                        // console.log()
                       
                          

                    })

                }else{
                    data.append(`${key}`,val)
                
                }

                   

                
            })
            // console.log("data===>",data)
           
            this.apiCtrl.callAxiosFile("company/create",data).then(res=>{

                
                if(res.success==true){
                    Swal.fire({
                        title: "Company",
                        text: res.message,
                        icon: "success",
                        showConfirmButton: false,
                    })
                    setTimeout(() => {
                        Swal.close()
                    }, 5000);
                } else {
                    Swal.fire({
                        title: "Company",
                        text:  res.message,
                        icon: "error",
                        showConfirmButton: false,
                    })
                  
                }
            })

        }

           console.log("tab state=>",this.state)
        //    console.log("prams==>",this.props.location.state.param)
        
           

        return(<>

            <BreadCrumb breadcrumb={"CompanyTabs"} />
            <Box sx={{ width: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px" }}>


                <TabContext value={this.state.value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.value} onChange={handleChange}  aria-label="Vehicle"  variant={"scrollable"}
                        scrollButtons={"auto"} >
                             <Tab label={<b>Company Details</b>} value="1" /> 
                            <Tab label={<b>Admin Login</b>} value="2" /> 
                            <Tab label={<b>Adress Details</b>} value="3" /> 
                        </Tabs>
                        
                        <TabPanel  value={"1"}><ComapnyDetails  func={HandleChange}  value={"1"} data={this.state.companydetails} funcnext={handleChangenext} /></TabPanel> 
                        <TabPanel  value={"2"}><OwnerDetails  func={HandleChange}  value={"2"} data={this.state.companydetails} funcnext={handleChangenext}/></TabPanel> 
                        <TabPanel  value={"3"}><ComapnyAddress  func={addresschange} funcsubmit={submitdata} value={"3"} data={this.state.company_address} funcnext={handleChangenext} /></TabPanel> 

                    </Box>

                </TabContext>
            </Box>


        </>)
    }
}
export default withRouter(CompanyTab)