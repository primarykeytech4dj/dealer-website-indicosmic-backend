import React from "react";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";
import "./Template.css"
import { Box, Divider } from '@mui/material';
import { Button } from 'react-bootstrap';

  const GandhiTemplate=()=>{


    return(<>

<Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

          <div className="row">
            <h3 className="text-center heading mb-5" >BOOK ONLINE</h3>

          </div>

            <div className="row">
                <div className="col-md-6">

                    <img  src="https://akgandhi.in/img/book-online.jpg" /><br></br>
                    <img src="https://akgandhi.in/img/tvs-credit-new.jpg"/>
                

                </div>
                <div className="col-md-6">

                    <div className="colmd-2 mb-3">
                    <input type="text" class="form-control"  placeholder="NAME" id="exampleInputPassword1"/>
                   
                    </div>
                    <div className="colmd-2 mb-3">
                    
                     <input type="text" placeholder="MOBILE NO"  class="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="colmd-2 mb-3">
                    <input type="text" placeholder="STATE" class="form-control" id="exampleInputPassword1"/>
                     
                    </div>
                    <div className="colmd-2 mb-3">
                    <input type="text"  placeholder="CITY" class="form-control" id="exampleInputPassword1"/>
                     
                    </div>
                    <div className="colmd-2 mb-3">
                    <input type="text" placeholder="EMAIL" class="form-control" id="exampleInputPassword1"/>
                   
                    </div>
                    <div className="colmd-2 mb-3">
                    <input type="text" placeholder="PINCODE" class="form-control" id="exampleInputPassword1"/>
                    
                    </div>
                    <div className="colmd-2 mb-3">
                    <input type="text" placeholder="VEHICLE" class="form-control" id="exampleInputPassword1"/>
                   
                    </div>
                    <div className="colmd-2 mb-3">
                    <input type="text" placeholder="VARIANT" class="form-control" id="exampleInputPassword1"/>
                    
                    </div>
                    <div className="colmd-2 mb-3">
                    <textarea class="form-control" placeholder="ADDRESS" id="floatingTextarea"></textarea>
                   
                    </div>
                   
                    <div className="colmd-2 mb-3">
                    <Button type="submit" className="button" style={{ backgroundColor: '#183883',width:"96px",color:"#fff", fontSize:"15px", marginTop: "14px", marginLeft: "191px", height: "48px"}}   size='medium'>Submit</Button>
              
                    </div>
                   
              


                </div>

            </div>
            </Box>

         
    </>)
}

export default GandhiTemplate