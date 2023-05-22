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
      //   var data = [];
    
      //   Object.entries(this.props.data).map(([ind, val])=>{
          

      //           data = [...data, {src:val.images, desc:ind, sub:val.title}]
           
      //   })

     
      //  this.setState({images:[...data]})

      this.setState({images:[...this.props.data]})
       

      }
    }
    componentDidMount(){

      // var data = [];
    
      //     Object.entries(this.props.data).map(([ind, val])=>{
            

      //       data = [...data, {src:val.images, desc:val.title, sub:val.title}]
             
      //     })

      // this.setState({images:[...data]})
      this.setState({images:[...this.props.data]})
       
    }
   
  
    render(){
        
        console.log("state=>",this.state)
        console.log("props=>",this.props)

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

      const deleteimage=(key,slug)=>{

        console.log("key=>",key)
        console.log("slug=>",slug)
  
        var arr=this.state.images     
        //console.log(index); // 👉️ 1
        
        arr[key] ={};
        console.log("arr=>",arr)
        this.apiCtrl.callAxios("gallery/delete",{slug:slug,is_active: '0'}).then(res=>{

          if(res.success==true){
            Swal.fire({
                title: "Image",
                text: res.message,
                icon: "success",
                showConfirmButton: false,
            })
            setTimeout(() => {
              Swal.close()
              this.props.gallfunc()
              // location.reload("/admin/testimonial-list")
            }, 3000);
          } else {
            Swal.fire({
                title: "Image",
                text:  res.message,
                icon: "error",
                showConfirmButton: false,
            })
            setTimeout(() => {
              Swal.close()
              this.props.gallfunc()
              // location.reload("/admin/testimonial-list")
            }, 3000);
          }
        
        })

        this.setState(old=>({...old,images:[...arr]}))
        //console.log("stateAfterdel=>",this.state)
       


      }
      
      return(
        <>

          {/* <div className="lightbox" data-mdb-zoom-level="0.25">
            <div className="row">
              {this.state.images.length >0&&this.state.images.map((val,key)=>{
           
                if(Object.keys(this.state.images[key]).length >0){
                  return(<>

                    <div class="col-lg-4">
                      <img
                        src={val.images}
                        data-mdb-img={val.images}
                        alt="Table Full of Spices"
                        className="w-100"
                      />
                    </div>
                  </>)
                  
                }
             
              })}
             
            </div>
          </div> */}

          <div className="row">

            {this.state.images.length >0&&this.state.images.map((val,key)=>{
           
              if(Object.keys(this.state.images[key]).length >0){
                return(<>

                  <div className="col-md-3 profile-pic  mb-2 d-flex justify-content-between">
                  
                    <a href={val.images}>
                      <img  className="gallery-img" src={val.images}/>
                    </a>
                    <div class="edit">
                     
                      <button  type="submit" onClick={()=>deleteimage(key,val.slug)}> <i className="fa fa-fw fa-trash" ></i></button>

                    </div>
                                    
                  </div>              
                </>)
              }
             
            })}
          
          </div>
    
          

          {/* <div>

            <Lightroom images={this.state.images} settings={settings} />
            </div>
         */}


            
          
    
          
        </>
      )
  
    
    }
    
  }

  