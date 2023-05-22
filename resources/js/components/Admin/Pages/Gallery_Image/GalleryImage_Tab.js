import React from "react";

import Box  from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { Tabs, Tab } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Api from "../../../../api";


import Swal from "sweetalert2";
import { Suspense } from "react";
const GalleryList = React.lazy(() => import('./Gallery_List'));
//import GalleryList from "./Gallery_List";

export  class GalleryTabs extends React.Component {

    constructor(props){
      super(props);
      this.state = {
      
        value:"1",
        isLoading:true,
        fields:{}
      
      }
      this.apiCtrl = new Api;
      
    }
   

  

    componentDidMount(){
        this.gallerlist()
       
    }


    gallerlist=()=>{

        this.apiCtrl.callAxios("gallery/list").then(res=>{

            //this.setState(old=>({...old,isLoading:true}))

            if(res.success == true){

                console.log("response=>",res)

                this.setState(old=>({...old,isLoading:false,fields:{...res.data}}))

            }



           
          
            // Object.entries(res.data).map(([key,value])=>{
            //     // console.log("key",key,"value",value)


            //    this.setState(old=>({...old,fields:{...old.fields, [key]:{...old.fields[key],title:value.title,image:value.images}}}))

            // })
          //  console.log("response=>",res)
           
        })

    }

    
   
  
    
   
    render(){
        var i =0;
        var a=0;
        //console.log("Location ",this.props.location)

       
       
        const handleChange = (event, value) => {
          // console.log("value ",value,"Eval",event.target.value)
            this.setState(old => ({...old, value: value}));
          };

        const next=({value})=>{
            
         this.setState(old=>({...old,value:String(parseInt(value)+1)}))
         

        }
       

      

          

           console.log("tabstate=>",this.state)
        // console.log("props=>",this.props)
    
        return(<>


      <BreadCrumb breadcrumb={"Gallery List"} />
      <Box sx={{ width: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px" }}>


        <TabContext value={this.state.value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                {!this.state.isLoading?
                    <>
                        <Tabs value={this.state.value} onChange={handleChange} aria-label="Vehicle"  variant={"scrollable"}
                        scrollButtons={"auto"} >
        
                        
                            
                            {                 
                            Object.entries(this.state.fields).map(([key,value])=>{
                                

                                i = String(parseInt(i)+1);
                        
                                return(
                                    <Tab key={key} label={<b>{key}</b>} value={`${i}`} />
        
                                )
                                                            
                            
                            })}

                        
                            
                        </Tabs>

                        

                    
                        
                        {
                        Object.entries(this.state.fields).map(([key,value])=>{

                            console.log("value=>",value)         
                                
                            a = String(parseInt(a)+1);
                           
                            return(

                            
                                <TabPanel  key={key} value={`${a}`}><Suspense fallback={<div>Loading...</div>}><GalleryList nextfunc={next} gallfunc={this.gallerlist.bind(this)}  data={value} value={`${a}`} /></Suspense></TabPanel> 

                            )

                          
                        })}
                     </>
                    
                 :
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
              
                
            </Box>
       
        </TabContext>

      </Box>
      
        </>)
    }
}