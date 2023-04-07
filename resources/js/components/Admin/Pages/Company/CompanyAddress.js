import React from "react";
import MaterialTextField from "../../../../Tags/MaterialTextField";
import { Box } from "@mui/material";
import MaterialSelect from "../../../../Tags/MaterialSelect";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialButton from "../../../../Tags/MaterialButton";
import Api from "../../../../api";
import { useEffect } from "react";
import MaterialTextArea from "../../../../Tags/MaterialTextArea";

export class ComapnyAddress extends React.Component {
    constructor(props){
      super(props);
      this.state = {      
         Address:[< Address  delbyidfunc={this.deletebyid} handlefunc={this.handleChange}   value={{key:'', val:''}} key={0} id={0}/>],       
      }
      this.apiCtrl = new Api;
    
     
    }
    
    deletebyid=(delrowbyid)=>{
        console.log("delrowbyid",delrowbyid)
      //  const adlngth=delrowbyid 
         const Keyvaluefield= this.state.Address
         console.log("oflength=>",Keyvaluefield)
         delete Keyvaluefield[delrowbyid]
        // console.log("oflength=>",oflength)
          this.setState(old=>({...old,Keyvaluefield}))
          console.log("stateAfterdel=>",this.state)
     

    }
    handleChange=(e)=>{

        
        
    }


    render(){
        let Addmore = (e) => {
              
            this.setState(old=>({...old,Address:[...old.Address,<Address handlefunc={this.handleChange}  delbyidfunc={this.deletebyid}   key={this.state.Address.length} id={this.state.Address.length}   />]}))
        }

      
        return(<>
            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
                <div className="row">
                    {this.state.Address}

                </div>

                <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>

            </Box>

          
        </>)

        
    }


}

function Address(props){
    const apiCtrl=new Api

    const remove=()=>{
       
        props.delbyidfunc(props.id)
      
    }

    useEffect(()=>{



    },[])
   
    
    return(<>

        <div className="row ">

            <div className="col-md-10">
                <div className="row">

                    <div className='col-md-6 mb-4'>        
                        <MaterialSelect  size="small"       data={""}  id="city_id" labelId="city-id" name="city"  label="City *" fullWidth
                        
                        />
                    </div>

                    <div className='col-md-6 mb-4'>        
                        <MaterialSelect size="small"     data={""}  id="state_id" labelId="state" name="state"  label="State *" fullWidth
                        
                        />
                    </div>
                    

                    <div className="col-md-6 mb-4">
                        <MaterialTextArea style={{height: "43px"}} label="Address" row={4} multiline placeholder="Enter Your Address" fullWidth name='address'
                            
                            
                        />

                        
                    </div>
                
                    <div className="col-md-6 mb-4">
                        <MaterialTextField  label="Pincode *" size="small" fullWidth name='pincode' 
                    
                        />
                    </div>


                </div>
               

            </div>

            
            <div className="col-md-2">
                <div className="col-md-1 mb-4 d-flex"style={{justifyContent:"center", marginTop:"23px" ,marginLeft:"29px",   marginBottom:"auto"}}>
                        <IconButton onClick={remove} aria-label="delete" size="large">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </div>


                </div>
        </div>




        
    </>)
}