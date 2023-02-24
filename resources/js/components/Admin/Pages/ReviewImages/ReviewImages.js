import * as React from 'react';
import Box  from '@mui/material/Box';

import Zoomer from '../../../../Tags/Zoomer';

import Api from '../../../../api';
import { Alert } from 'react-bootstrap';
import Swal from "sweetalert2"

export default class ReviewImages extends React.Component{
    constructor(props) {
        super(props);
        this.apiCtrl = new Api;
        this.state = {
            claim_code : props.claim_code ? props.claim_code : 'n5xVhBYoBXbm',
            data : null,
            isLoading: false,
        

        }
    }

    componentWillMount = () => {
        this.getImages();
       

      }

      getImages = () =>{

        this.setState(old => ({...old, isLoading:true}))
        if(this.state.claim_code !== null){    
            this.apiCtrl.callAxios('accident_image_list', {claim_code : this.state.claim_code }).then(response => {
                console.log(response);
                
                if(response.success == true){
                    this.setState(old => ({...old, data:response.data}))
        
                } else {
                // alert("No Data Available")
                }
                this.setState(old => ({...old, isLoading:false}))
                // sessionStorage.setItem('_token', response.data.)
                
            }).catch(function (error) {
                this.setState(old => ({...old, isLoading:false}))
                console.log(error);
            });
        } else {
            alert('Claim Code not found')
        }
    
        
      }

    render(){

        if(this.state.isLoading)
        {
            Swal.fire({
                title: 'Loading...',
                didOpen: () => {
            Swal.showLoading()
                }
            })
        } else {
            Swal.close();
        }
        return (
        <>
            <div className="row ml-1">
                <label><b>{this.props.title}</b></label>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div className="row">
                {
              ( this.state.data !== null) ?
                    this.state.data.map((value, key)=>{
                        return(
                            <div className="col-md-3 mb-4 mr-2  "  key={key} >
                                <img src={value.image} style={{width:"150px", height:"100px"}} alt={value.imgTitle} />
                                
                            </div>

                        )
                    })
                    
                :
        
                    <div className="col-md-2 mb-4"  >
                       <span>No Images Found</span>
                        
                    </div>

          
                }
                    
                </div>
            </Box>
        </>
        )
    }

}
