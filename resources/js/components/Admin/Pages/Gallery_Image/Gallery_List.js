import React from "react";
import { DataGrid } from '@mui/x-data-grid';

import { Box } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import Switch from '@mui/material/Switch';
import Api from "../../../../api";
import '../Gallery_Image/Gallerry.css'
import Lightroom from 'react-lightbox-gallery'



export default class GalleryList extends React.Component{
    constructor(props){
      super(props);
      this.state = {

        images:[]
       
  
    }
      this.apiCtrl = new Api;
      
    }

    componentDidUpdate = (prevProps, prevState) =>{
      if(prevProps.data!==this.props.data){
        var data = [];
    
        Object.entries(this.props.data).map(([ind, val])=>{
          

                data = [...data, {src:val.images, desc:ind, sub:val.title}]
           
        })

     
       this.setState({images:[...data]})
       // this.setState(this.props.data)

      }
    }
    componentDidMount(){

      var data = [];
    
          Object.entries(this.props.data).map(([ind, val])=>{
            

            data = [...data, {src:val.images, desc:ind, sub:val.title}]
             
          })

        //  console.log("data=>",data)
        
    
      //this.setState(this.props.data)
      this.setState({images:[...data]})
    }
   
  
    render(){
        
        console.log("state=>",this.state)
      //  console.log("props=>",this.props)

      const next=()=>{

        this.props.nextfunc({value:this.props.value})
        
      }
      var settings = {
        columnCount: {
            default: 5,
            mobile: 1,
            tab: 2
        },
        mode: 'dark'
    }
      
      return(
        <>
    
          

            <div>

            <Lightroom images={this.state.images} settings={settings} />
            </div>
               
            
          
    
          
        </>
      )
  
    
    }
    
  }

  