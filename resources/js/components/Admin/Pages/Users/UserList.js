import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box,Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import AddUsers from './AddUsers';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import Api from '../../../../api';
import { param } from 'jquery';
import Swal from 'sweetalert2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


export  class UserList extends React.Component {
  constructor(props){
    super(props)
  

    this.state = {
      data : [],
      isLoading: false,
      filter:"",
      page: 0,
      pageSize: 10,  
      paramsdata:[],
      userData:[],
      
  }
  this.apiCtrl = new Api;
  //console.log("===>",data)
  }

  componentWillMount = () => {
    this.getUserList();
    
  }

 componentDidUpdate = (prevProps, prevState) =>{
  if(prevProps.params.any !== this.props.params.any){
    this.getUserList();
  }
    // if ((prevState.page !== this.state.page)||(prevState.pageSize !== this.state.pageSize)) {
    //   this.getUserList();
    // }
    if ((prevState.page !== this.state.page)) {
        this.getUserList(this.state.pageSize);
    }
    if ((prevState.pageSize !== this.state.pageSize)) {
      this.getUserList(prevState.pageSize);
    }
    if((prevState.filter!==this.state.filter)){
      this.getUserList()
    }
 }
 

  getUserList = (pageSize) =>{


    //  console.log("urldata===>",data)

    this.setState(old => ({...old, isLoading:true}))
    this.apiCtrl.callAxios('users/list',{filter:this.state.filter,role_name:this.props.params.any,length:this.state.pageSize, start:this.state.page*this.state.pageSize}).then(response => {
        console.log(response);
        
        if(response.success == true){
           // this.setState(old => ({...old, data:response.data.aaData, total:response.data.iTotalRecords}))
          // this.setState(old => ({...old, data:[...old.data, ...response.data.aaData], total:response.data.iTotalRecords}))
          const {aaData}=response.data
            
          if(pageSize == this.state.pageSize){
            this.setState(old => ({...old, data:[...old.data,...aaData], total:response.data.iTotalRecords}))
          } else {
            this.setState(old => ({...old, data:aaData, total:response.data.iTotalRecords}))
          }

        } else {
        alert("No Data Available")
        }
        this.setState(old => ({...old, isLoading:false}))
        // sessionStorage.setItem('_token', response.data.)
        
    }).catch(function (error) {
        this.setState(old => ({...old, isLoading:false}))
        console.log(error);
    });
    // this.apiCtrl.callAxios('users/admin', []).then(response => {
      
    //   console.log(response);
    //   this.setState({ data: response.data});
    //   if(response.success){

    //   } else {
    //     alert("No Data Available")
    //   }
    //   // sessionStorage.setItem('_token', response.data.)
      
    // }).catch(function (error) {
    //   console.log(error);
    // });
  }




 
  render() {

   const  handleClick = (data) => {
     //console.log("userdata",data)
      this.setState({userData: data})
    }
    const columns = [
      { field: 'sr_no', headerName: 'Sr.No', width: 100 },
      { field: 'name', headerName: 'Name', width: 190 },
      { field: 'email', headerName: 'Email', width: 300 },
      { field: 'mobile', headerName: 'Mobile', width: 190 },
      { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Action func={handleClick}  key={params.row.id} param={params.row} />, },
    ];

  //  console.log(this.state.role_name)

   // console.log(this.state.data.aaData.id)
  return (
    <>
    <BreadCrumb breadcrumb="Users List" />

    <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>
     
     <div className='row'>
     <div className="col-md-3"></div>   
        <div className="col-md-3"></div>
        <div className="col-md-3 mb-2">
          <MaterialTextField size="small" name='search'  placeholder="Search"
          onChange={(e)=>this.setState(old => ({...old, filter: e.target.value}))}
          />
        </div>
      
      <div className='col-md-3 mb-3'>

        {/* <Button  type="button" style={{ backgroundColor: '#183883',width:"96px", marginLeft:"47rem",color:"#fff"}}  size='large' >Add User</Button> */}
        <Link
        to={"/admin/create/user"} >
          <Button  type="button" style={{ backgroundColor: '#183883',width:"96px",color:"#fff"}}  size='large' >Add User</Button>

        </Link>
      </div>
     </div>
   
    <div style={{ height: 400, width: '100%' }}>
  
    <DataGrid
        autoHeight
        rows={this.state.data}
        rowCount={this.state.total}
        page={this.state.page}
        
        loading={this.state.isLoading}
        columns={columns}
        pagination
        paginationMode='server'

        pageSize={this.state.pageSize}
        rowsPerPageOptions={[10, 30, 50, 70, 100]}
       

        onPageChange={(newPage) => this.setState(old=>({...old, page: newPage}))}
        onPageSizeChange={(newPageSize) => this.setState(old=>({...old, pageSize: newPageSize}))}
        />
        {/* {rows.map((item) => {
            return <Action id={item.id} item={item.action} />
            // return <Button name='Edit'>Edit</Button>
          })} */}
    </div>





    {/* <Model />

   <EditUser  params={this.state.userData}/> */}
   




    
    
      




    </Box>
    </>
  );
}
}

export default (props) => {
  return <UserList {...props} params={useParams()} />
}

function Action(props){ 
  const apiCtrl = new Api;

    const editUserdata = (event)=>{
     props.func(props.param)
         
    }

    const deleteUser=(event)=>{
      const  data={
        role:event.role
      }
      
      console.log("data",event)
  
  
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00B96F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!',
      }).then((result) => {
        if (result.value) {
          apiCtrl.callAxios(`users/delete-role/${event.id}`, data).then(response => {
            // Swal.fire({
            //   title: 'Deleted successfully',
            //   showConfirmButton: false,
            //   timer: 1200,
            // });
  
  
            if(response.success == true){
              Swal.fire({
                title: 'Deleted successfully',
                icon: "success",
                showConfirmButton: false,
                timer: 1200,
              });
                } else {
                  Swal.fire({
                    title: 'Deleted unsuccessfully!',
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1200,
                  });
                }
              
            console.log('deleted res', response);
  
           // this.getAllproduct();
          });
        }
      });
  
  

      
   }
    
    return (  
      <>
            
               {/* <Button  type="button"  data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editUserdata}>Edit</Button>&nbsp;&nbsp; */}
               <Link key={props.key}  to={`/admin/create/user`} state={{param:props.param}}><Button>Edit</Button></Link>  &nbsp;
               <Button  type="button"  size='small' onClick={()=>deleteUser(props.param)}>Delete</Button>
               
             
  </>
                       

  );

}

function Model(props){
  // var id=props.userid.id
  // console.log("id=====>",id)
  console.log("propsinmodel----->",props)
 //console.log(props.eventid)
  return(
    <>
   
      <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body m-body">
            
          <div className="row">
            {/* <AddUsers  params={this.props.params}  /> */}
            {/* <AddUsers    /> */}

          </div>
            
          {/* <div className="modal-footer">
                  

                  <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                
          
                  {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={ submituser }>Submit</Button> 
                
                </div>*/}
          </div>  

          
        </div>
      </div>
      </div>


    </>
  )
}







 class EditUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      btnVariant : "contained",
    

       errors:{},
  
      
    }
    this.apiCtrl = new Api;
 
   
  }

 
  componentDidUpdate(prevProps,prevState){
    if(prevProps.params.id !== this.props.params.id){
      console.log('Propps', this.props.data)
      this.setState(this.props.params)
    } 
  }

  
 
  
  render(){
  const submituser= async (e) => {
      e.preventDefault();
   
     

   
    
        
      
      var data = {
        
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
          // password: this.state.password,
          // c_password: this.state.c_password,
          role: this.state.role,
          address: this.state.address,
          // district: this.state.district,
          city: this.state.city,
          state: this.state.state,
          pincode: this.state.pincode,
          is_

      
      }
      
    
          this.apiCtrl.callAxios(`users/edit/${this.props.params.id}`, data).then(response => {

              if(response.success == true){
                  Swal.fire({
                      title: "User",
                      text: "Updated",
                      icon: "success",
                      showConfirmButton: false,
                  })
                  setTimeout(() => {
                    Swal.close()
                    $('.close').trigger('click');
                    
                }, 3000);
              } else {
                  Swal.fire({
                      title: "user",
                      text: "Not Updated!",
                      icon: "error",
                      showConfirmButton: false,
                  })
                  setTimeout(() => {
                    Swal.close()
                    $('.close').trigger('click');
                    
                }, 3000);
              }
             // location.reload('/admin/user-list')
              console.log("Updateuser===>",response);
              // sessionStorage.setItem('_token', response.data.)
              
            }).catch(function (error) {
              console.log("Updateuser===>",error);
            });
     
   
        
   
    } 






   //     console.log("dataprps--",this.props.data.id)

  //  let user = '';
            // let user = '';
            // if(this.props.params.role){

            //   user =  this.props.params.role.replace(/-/g, " ");
            // }

            // var userType = user
            // .toLowerCase()
            // .split(' ')
            // .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            // .join(' ');
        return (
          <>   


      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
        <div className="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle"> Update {"User"} Details</h5>
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body m-body">
            
          <div className="row">

          {/* <BreadCrumb breadcrumb="Users" breadcrumbItem1={'Create ' +   userType} /> */}

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

            <div className="row ml-1 mb-3">
               
                <label><b>Personal Information</b></label>
            </div>

            {/* <Button style={{ backgroundColor: '#183883'}} onClick={ getdatabyid }>getdatabyid</Button> */}

            <Divider sx={{ borderColor: '#dac4c4'}} />

            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>Personal Information</b></label> */}
            </div>
            <div className="row ">

                <div className="col-md-4 mb-4">
                    <MaterialTextField 
                    value={this.state.name?this.state.name:""}
                    label={  "User Name *"} 
                    size="small"
                  
                      fullWidth name='name' onChange={(e)=>this.setState({name : e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.email?this.state.email:""}   label={  "User Email *"} size="small" fullWidth name='email' onChange={(e)=>this.setState({email : e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.mobile?this.state.mobile:""} label={  "User Mobile *"} size="small" fullWidth name='mobile' onChange={(e)=>this.setState({mobile : e.target.value})}/>
                </div>
                {/* <div className="col-md-4 mb-4">
                    <MaterialTextField    onKeyUp={submituser} value={this.state.password?this.state.password:""} type={"password"} label={  userType + " Password *"} size="small" fullWidth name='password' onChange={(e)=>this.setState({password : e.target.value})}/>
                </div>
               
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.c_password?this.state.c_password:""} type={"password"} label="Confirm Password *" size="small" fullWidth name='c_password' onChange={(e)=>this.setState({c_password : e.target.value})}/>
                </div> */}
                
                
            </div>

            <Divider sx={{ borderColor: '#dac4c4'}} />

            <div className="row ml-1 mb-3" style={{ paddingTop: '2%'}}>
                <label><b>Address</b></label>
            </div>
            <div className="row ">

                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.address?this.state.address:""} label="Address *" size="small" fullWidth name='address' onChange={(e)=>this.setState({address : e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.city?this.state.city:""}label="City *" size="small" fullWidth name='city' onChange={(e)=>this.setState({city : e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.state?this.state.state:""} label="State *" size="small" fullWidth name='state' onChange={(e)=>this.setState({state : e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <MaterialTextField value={this.state.pincode?this.state.pincode:""} label="Pincode *" size="small" fullWidth name='pincode' onChange={(e)=>this.setState({pincode : e.target.value})}/>
                </div>
                
            </div>

            <div className='row'>
                <div className="col-md-3">
                    <Button style={{ backgroundColor: '#183883'}} onClick={ submituser }>Update</Button>
                </div>
            </div>
            </Box>
         

          </div>
            
          {/* <div className="modal-footer">
                  

                  <Button data-bs-dismiss="modal" style={{ backgroundColor: 'rgb(108 110 116)',color:"#fff"}}>Close</Button>&nbsp;&nbsp;
                
          
                  {/* <Button data-bs-dismiss="modal" style={{ backgroundColor: '#183883',color:"#fff"}} onClick={ submituser }>Submit</Button> 
                
                </div>*/}
          </div>  

          
        </div>
      </div>
      </div>
            
          </>
        )
}
};

  (props) => {
  return (<EditUser {...props}   params={useParams()}/>)
}
