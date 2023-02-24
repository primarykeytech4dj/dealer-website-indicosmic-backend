import React from "react";
import Api from "../../../../api";
import MaterialSelect from '../../../../Tags/MaterialSelect';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import { Button } from 'react-bootstrap';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { DataGrid } from '@mui/x-data-grid';
import {TextField} from '@mui/material';
import { object } from "prop-types";
export default class SetupList extends React.Component {
    constructor(props){
      super(props)
      this.apiCtrl = new Api;
  
        this.state = {
            data : [],
            isLoading: false,
            page: 0,
            pageSize: 10,
            typeData:{},
            type:'',
            filter:null
        
        }
  
    }

    componentWillMount = () => {
        this.getSetupList();
      }
    

    componentDidUpdate(prevProps,prevState){
        if(prevState.type !== this.state.type){
            this.getSetupList();
          
        } 
         if ((prevState.page !== this.state.page) || (prevState.filter !== this.state.filter)) {
            this.getSetupList();
        } 
      }
  
    
      getSetupList = () =>{
         
        this.setState(old => ({...old, isLoading:true}))
        var data = {length:this.state.pageSize, start:this.state.page*this.state.pageSize};

        if(this.state.filter !== null){
          data = {...data, filter: this.state.filter};
        }
        this.apiCtrl.callAxios('setup/list', {type:this.state.type ,data}).then(response => {
            console.log("responselist=>",response.data);
          Object.entries(response.data).map(([index,value])=>{
           // console.log("index",index ,"value",value)
               let  types =  value.type.replace(/-/g, " "); 
                
                var moduleType =   types
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              
                this.setState(old => ({...old, typeData:{...old.typeData,[value.type]:moduleType}}))
            

          })
            
            if(response.success == true){
                this.setState(old => ({...old, data:response.data}))
    
            } else {
            alert("No Data Available")
            }
            this.setState(old => ({...old, isLoading:false}))
            
        }).catch(function (error) {
            this.setState(old => ({...old, isLoading:false}))
            console.log(error);
        });
      }
    

    render(){
        // const types={
        //     "frontend":"Frontend",
        //     "application":"Application",
        //     "website":"Website"
        // }
        const columns = [
            { field:'id', headerName: 'Sr No', width: 120 },
            { field:'type', headerName: 'Type', width: 190 },
            { field:'module_name', headerName: 'Module Name', width: 190 },
            { field:'config', headerName: 'Config', width: 150 },
            { field:'action', headerName: 'Action',  width: 220,renderCell: (params) => <Action  param={params.row} /> },
          ];

        // const columns = [
        //     { field:'id', headerName: 'Sr No' },
        //     { field:'type', headerName: 'Type' },
        //     { field:'module_name', headerName: 'Module Name' },
        //     { field:'config', headerName: 'Config' },
        //     { field:'action', headerName: 'Action',renderCell: (params) => <Action  param={params.row} /> },
        //   ];


          const onHandleChange=(e)=>{
             this.setState(old =>({...old,type:e.target.value}))
            

          }


        //  console.log("state=>",this.state)
        return(
            <>


                <BreadCrumb breadcrumb={"Setup"} breadcrumbItem1='List' />

                <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                    {/* <div className="row ml-1">
                        <label><b>{"Setup List"}</b></label>
                    </div> */}

                    <div className="row mb-2 ml-1">
                        <div className="col-md-5">
                            <MaterialSelect
                            //   style={{width: "184% " }}  
                                fullWidth
                                name={"select type"} 
                                label={"Select Type"}
                                placeholder={"select type"}
                                data={this.state.typeData}  
                                value={this.state.type}
                                onChange={onHandleChange}                                
                            />

                        </div>
                        <div className="col-md-4">
                        
                        
                            <MaterialTextField size="large" name='search'  placeholder="Search"
                            onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}
                            />
                           
                           
          

                        </div>
                        <div className="col-md-3">

                           <Button  
                           onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}
                           style={{ backgroundColor: '#183883',width:"100px",color:"#fff", fontSize:"15px", marginTop: "0", height: "48px"}}  
                           size='medium'>Filter</Button>

                        </div>

                    </div>

                    <Divider sx={{ borderColor: '#dac4c4'}} />

                  

                    <div style={{ height: 650, width: '100%' }}>
   
                        <DataGrid
                            autoHeight
                            sx={{width:"100%", overflowX:"auto"}}
                            rows={this.state.data}
                            // rowCount={this.state.total}
                            page={this.state.page}
                            
                            loading={this.state.isLoading}
                            columns={columns}
                            pagination

                            pageSize={this.state.pageSize}
                            rowsPerPageOptions={[10, 30, 50, 70, 100]}
                            checkboxSelection

                            onPageChange={(newPage) => this.setState(old=>({...old, page: newPage}))}
                            onPageSizeChange={(newPageSize) => this.setState(old=>({...old, pageSize: newPageSize}))}
                        

                        />
      
                    </div>
                </Box>



            </>
        )
    }
}


function Action(props){ 
  
    
    return(
  
      <>
      <Button type='button'  size='small' >Edit</Button>
      
  
      </>
        
    );
  }
  