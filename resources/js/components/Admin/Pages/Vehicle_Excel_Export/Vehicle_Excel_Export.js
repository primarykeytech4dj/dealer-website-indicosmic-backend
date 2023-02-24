import React from "react";
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import MaterialButton from "../../../../Tags/MaterialButton";
import MaterialTextField from '../../../../Tags/MaterialTextField'
import Swal from "sweetalert2";

import Api from "../../../../api";
import { useState } from "react";

export  const  VehicleExcelExport =()=>{
  const  [state,setState]=useState()
  const  [data,setData]=useState([])

    const apiCtrl = new Api;

    const submit =(e)=>{
      e.preventDefault();
       const data = new FormData()
       data.append("excel_file", state.excel_file);
      apiCtrl.callAxiosFile("vehicle/import-excel",data,true).then((response)=>{
        console.log("response=>",response)


        if(response.success === true){
          setData(response.data)
        
           Swal.fire({
            title: "Excel file",
            text:"Import!",
            icon: "success",
            showConfirmButton: false,
        })

        } else {
            Swal.fire({
              title: "Excel File",
              text:"Not Import!",
              icon: "error",
              showConfirmButton: false,
            })
        }

      })

    }
    const filedownload = (vehicle_type, vehicle_status) => {

        var data = {
            vehicle_type:vehicle_type,
            vehicle_status: vehicle_status
        }
        apiCtrl.callAxios('vehicle/export-vehicle-format', data).then((res)=>{
          console.log(res);
          if(res.success == true){
            window.open(res.message)
          }
        })
      }

     // console.log("data=>",data)
    return(<>

        <BreadCrumb breadcrumb={"Vehicle Excel"} breadcrumbItem1='Export' />

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

            <div className="row mb-3 ml-1">
                <label><b>{"Excel Download"}</b></label>
            </div>

            <Divider sx={{ borderColor: '#dac4c4'}} />


            <div className="row mb-2">
                <div className="col-md-3 md-2">
                  <MaterialButton onClick={()=>filedownload(2,'used')} 
                  style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}   
                  name="" text="Used Two wheeler"  />

                </div>
                <div className="col-md-3 md-2">
               
                {/* <i className="fa fa-fw fa-file-excel-o"></i> */}
                  <MaterialButton 
                  onClick={()=>filedownload(2,'new')} 
                  style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  
                  name="" text=" New Two wheeler" />

                </div>
                <div className="col-md-3 md-2">
                  <MaterialButton 
                  onClick={()=>filedownload(1,'used')} 
                  style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} 
                   name="" text="Used Four wheeler " />

                </div>
                <div className="col-md-3 md-2">
                  <MaterialButton 
                  onClick={()=>filedownload(1,'new')} 
                  style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  
                  name="" text="New Four wheeler" />

                </div>

            </div>


         
            <div className="row mb-3 mt-3 ml-1">
          
                <label><b>{"Excel Upload"}</b></label>

            </div>

            <Divider sx={{ borderColor: '#dac4c4'}} />

            <div className="row mt-2 mb-3 ">
              <div className="col-md-6"> 
              <MaterialTextField label={"File Import"} type="file" onChange={(e)=>setState({excel_file:e.target.files[0]})}/>

              </div>

              <div className="col-md-3 md-2">
                  <MaterialButton 
                  onClick={submit} 
                  style={{ backgroundColor: '#183883' ,  border: '1px solid #183883',height:55}}  
                  name="upload" text="Upload" />

                </div>

            </div>

            <Divider sx={{ borderColor: '#dac4c4'}} />

                      {(data.length >0 )&&
            <div className="row mb-2">
                  <div className="col-md-12">

                    <fieldset className="form-group border p-3">
                      <div className="row " >
                        <legend className="col-form-label col-sm-2  pt-0" ></legend>
                        <table className="table">


                        <thead>
                          <tr>
                          <th className="col-md-2">ID</th>
                          <th className="col-md-6">Message</th>
                          <th className="col-md-2">Status</th>
                          </tr>
                        </thead>

                        <tbody>


                          {Object.entries(data).map(([key,value])=>{

                             const  adkey=[key]
                              const addnum= adkey + 1
                             console.log("adkey=>",addnum)

                            console.log("key",key,"value",value)
                            return(
                              <tr id ={key}  style={value.status==="success"?{background:"#ADE792", color:"#fff"}:{background:"#D2001A",color:"#fff"}}>

                                <td className="col-md-2">
                                  <span>{(parseInt(key)+1)}</span>   

                                </td>

                                <td className="col-md-6">
                                  <span>{value.message}</span>   

                                </td>
                                <td>
                                  <span>{value.status}</span>   

                                </td>

                                 

                                  


                              </tr>
                                  )


                          })}
                        
                      
                                
                        </tbody>
                          
                          
                          
                          </table>  

                      




                              
                          
                      </div>
                    </fieldset>

                  </div>

                </div>
         
            
        
        }
            
        </Box>



    </>)

}