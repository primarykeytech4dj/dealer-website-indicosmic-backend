import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Slider from "react-slick";
import { Box,Divider } from "@mui/material";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import MaterialButton from "../../../../Tags/MaterialButton";
import Api from "../../../../api";
import Swal from "sweetalert2";
import { SearchDropdown } from "../../../../Tags/Searchabledropdown";
const GalleryImage=()=>{
    const [state,setState]=useState({
        images:[],
        showgalleryimages:[],

    })
    const [title,setTitle]=useState()
    const apiCtrl=new Api
    const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };


    const handleChan = (file) => {
        // console.log(file)
        Object.entries(file).map(([index, value])=>{

            setState(old=>({...old,images:[...old.images,value]}))
            setState(old=>({...old,showgalleryimages:[...old.showgalleryimages,URL.createObjectURL(value)]}))
        })
            //console.log("stae=>",this.state)
    };

    const handleChange=(e)=>{

        setTitle(e.target.value)

    }

    const submit=(e)=>{
        e.preventDefault();


        const data=new FormData

            Object.entries(state.images).map(([key,value])=>{

                // console.log("key",key,"value",value)      

                    data.append("images",value)
                    
            
            })
            data.append("is_active",1)
            data.append("title",title)
        apiCtrl.callAxiosFile("gallery/create",data).then(res=>{

            

            if(response.success == true){
                Swal.fire({
                    title: "Gallery",
                    text: res.message,
                    icon: "success",
                    showConfirmButton: false,
                })
            } else {
                Swal.fire({
                    title: "Gallery",
                    text:  res.message,
                    icon: "error",
                    showConfirmButton: false,
                })
            }
        })


    }
         
    return(<>
       <BreadCrumb breadcrumb={"Gallery Image"} breadcrumbItem1='Upload' />

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row mb-3 ml-1">
                    <label><b>{"Gallery Image Upload"}</b></label>
                </div>

                <Divider sx={{ borderColor: '#dac4c4', marginBottom:"36px"}} />


            <div className="row mb-3">
                <div className="col-md-12 mb-3">
                    <SearchDropdown
                        placeholder="Search" label={"Title"} size={"small"} name={"title"} value={title&&title} 
                        onChange={handleChange}
                        fullWidth

                    />
                </div>
                <div className="col-md-12 mb-3 ">
                <FileUploader handleChange={handleChan}  multiple={true} name="images" types={fileTypes} />
                </div>
            
            </div>

            <Divider sx={{ borderColor: '#dac4c4',marginBottom:"36px"}} />
            <div  className="row mb-2">
                <div className="container">
                <Slider {...settings}>
                    {Object.entries(state.showgalleryimages).map(([key,image])=>{
                    return(<>
                        <div className="card" style={{width:"180px"}}>
                        <img className="sliderimage" src={image}  alt="..."/>
                        
                        </div>
                        {/* <img className="image" src={image}/> */}
                    </>)  

                    })}
                
                    
                        
                </Slider> 
                    
                </div>

            </div>
            <Divider sx={{ borderColor: '#dac4c4'}} />
            <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  name="submit" text="Submit" onClick={submit}/>
            </div>


        </Box>
    </>)

}
export default GalleryImage