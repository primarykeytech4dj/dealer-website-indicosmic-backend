import React, { useState } from "react";
import Api from "../../../../api";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { Button } from "react-bootstrap";
import MaterialTextField from "../../../../Tags/MaterialTextField";


export  class InvoiceListing extends React.Component {
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
  
   componentWillMount(){
    
    this.getInvoiceList()
   }
  
   componentDidUpdate = (prevProps, prevState) =>{
   
      if ((prevState.page !== this.state.page)) {
          this.getInvoiceList(this.state.pageSize);
      }
      if ((prevState.pageSize !== this.state.pageSize)) {
        this.getInvoiceList(prevState.pageSize);
      }
      if((prevState.filter!==this.state.filter)){
        this.getInvoiceList()
      }
   }
   
  
    getInvoiceList = (pageSize) =>{
  
  
      //  console.log("urldata===>",data)
    //   alert()
  
      this.setState(old => ({...old, isLoading:true}))
      this.apiCtrl.callAxios("invoice",{filter:this.state.filter,length:this.state.pageSize, start:this.state.page*this.state.pageSize}).then(response => {
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
         // this.setState(old => ({...old, isLoading:false}))
          console.log(error);
      });
      
    }
  
  
  
  
   
    render() {
  
      const columns = [
        { field: 'id', headerName: 'Sr.No', width: 100 },
        { field: 'customer_name', headerName: 'Customer Name', width: 190 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'contact_no', headerName: 'Mobile', width: 190 },
        {field:'gst_no',headerName:"GST.No",width:190},
        {field:"invoice_no",headerName:"Invoice No", width:190},
        { field: 'print', headerName: 'Print',  width: 190,  renderCell: (params) => <Print  key={params.row.id} param={params.row} />, },
       
       
      ];
  
    //  console.log(this.state.role_name)
  
     // console.log(this.state.data.aaData.id)
    return (
      <>
      <BreadCrumb breadcrumb="Invoice List" />
  
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
          {/* <Link
          to={"/admin/create/user"} >
            <Button  type="button" style={{ backgroundColor: '#183883',width:"96px",color:"#fff"}}  size='large' >Add User</Button>
  
          </Link> */}
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
  
  
  
  
  
   
  
      
      
        
  
  
  
  
      </Box>
      </>
    );
  }
  }


  const Print =(props)=>{

    const apiCtrl=new Api
   


   const pdfprint =()=>{
      var invoice= btoa(props.param.invoice_no)
      

     apiCtrl.callAxiosGet(`invoice/report/${invoice}`).then(res=>{
      // console.log(res)
      // download(atob(res.data.data), `Invoivce-${props.param.invoice_no}.pdf`)
      window.open(atob(res.data.data))
     })
      
   }

  
    return(<>

     <Button  type='button' size='small'  onClick={pdfprint} >Print</Button>&nbsp;
      
    </>)
  }