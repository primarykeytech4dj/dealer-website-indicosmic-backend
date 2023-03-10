import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import { Button } from 'react-bootstrap';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialButton from '../../../../Tags/MaterialButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Swal from 'sweetalert2';
import Api from '../../../../api';
//import ProductAdd  from './Product';
import ProductAdd from './Product'
import TextEditor from '../TextEditor/Text_Editor';
import MaterialSelect from '../../../../Tags/MaterialSelect';




export default class ProductList extends React.Component {
  constructor(props){
    super(props)
    this.apiCtrl = new Api;

    this.state = {
      data : [],
      isLoading: false,
      page: 0,
      pageSize: 10,
      productData:[],
      product_type:this.props.title

  }

  }

  componentWillMount = () => {
    this.getProductList();
  }

  getProductList = () =>{

    this.setState(old => ({...old, isLoading:true}))
    this.apiCtrl.callAxios('product/list',this.state.product_type).then(response => {
        console.log(response);
        
        if(response.success == true){
            this.setState(old => ({...old, data:response.data, total:response.data.iTotalRecords}))

        } else {
        alert("No Data Available")
        }
        this.setState(old => ({...old, isLoading:false}))
        // sessionStorage.setItem('_token', response.data.)
        
    }).catch(function (error) {
        this.setState(old => ({...old, isLoading:false}))
        console.log(error);
    });
  }

  componentDidUpdate(prevProps, prevState){
    // console.log('update')
    if (prevState.page !== this.state.page) {
        this.getProductList();
    }
  }

  render() {


    const  handleClick = (data) => {
      // console.log("dataproduct===",data)
       this.setState({productData: data})
     }

    const columns = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'product', headerName: 'Product', width: 190 },
      { field: 'product_code', headerName: 'Product Code', width: 190 },
      { field: 'slug', headerName: 'Slug', width: 150 },
      { field: 'base_price', headerName: 'Base Price', width: 100 },
      // { field: 'gst', headerName: 'GST', width: 150 },
      { field: 'action', headerName: 'Action',  width: 190,  renderCell: (params) => <Action fun={handleClick} param={params.row} />, },
    ];


  return (
    <>
    <BreadCrumb breadcrumb="Product List" />
    <Button  type="button" style={{ backgroundColor: '#183883',width:"139px", marginBottom: "20px", marginLeft:"47rem",color:"#fff"}} href="#exampleModalToggle1" data-bs-toggle="modal" size='large' >Add {this.props.title}</Button>
    <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

    <div style={{ height: '100%', width: '100%' }}>
   
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
        checkboxSelection

        />
       
    </div>

     <Editproduct title={this.props.title} params={this.state.productData}/>
     <Model title={this.props.title}/>
    </Box>
    </>
  );
}
}
function Action(props){ 
  
  const editProductdata = (event)=>{
    props.fun(props.param)
  }

  const deleteProductdata=(event)=>{
    const data={
      id:event.id,
      is_active:event.is_active
    }
    console.log("productdeletedata",data)

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
        apiCtrl.callAxios("product/delete-product", data).then(response => {
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
            location.reload("/admin/product/product-list")
              } else {
                Swal.fire({
                  title: 'Deleted unsuccessfully!',
                  icon: "error",
                  showConfirmButton: false,
                  timer: 1200,
                });
              }
            
          console.log('deleted res', response);

       
        });
      }
    });
  }
     
  return(

    <>
    <Button type='button' data-bs-toggle="modal" size='small' href="#exampleModalToggle" onClick={editProductdata} >Edit</Button>&nbsp;
      <Button type='button'  size='small'  onClick={deleteProductdata} >Delete</Button>

    </>
      
  );
}

function Model(props){

//  console.log( "modelprops==>",props)
 
  return(
    <>
   
      <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered  modal-lg">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Create {props.title}</h5>
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body m-body">
            
          <div className="row">
            
            <ProductAdd title={props.title} data={props.params}    />

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




export  class Editproduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      btnVariant : "contained",
     
      data: [],
      ProductImage:[< ProductImage func={this.productImage.bind(this)} imgupld={this.productImageUpload.bind(this)} delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={0} id={0}/>],
      ProductImage:[],
      imageProduct: {
        "0": {
            "type": "youtube-video",
            "youtube_vdo": "1",
            "title": "1",
            "priority": "1",
            "featured_img": 1
        }
    }
      
    }
    this.apiCtrl = new Api;
    
  }
  


  componentDidUpdate(prevProps,prevState){
    if(prevProps.params.id !== this.props.params.id){
      console.log('Propps', this.props.data)
      this.setState(this.props.params)
    } 
  }



  componentDidMount(){
   
    // if(prevState.options != this.state.options){
    // }
}



componentDidMount(){


  Object.entries(this.state.imageProduct).map(([index, value])=>{
    console.log("index",index,"value====>",value)
    this.setState(old=>({
        ...old, ProductImage: [...old.ProductImage,< ProductImage  func={this.productImage.bind(this)} imgupld={this.productImageUpload.bind(this)} delbyidfunc={this.deletebyid} value={{key:index, val:value}} key={index} id={index}/>]
    }))
    
})


  this.apiCtrl.callAxios('product/get-product-category').then(res => {
    // const array={}
     this.setState({data: res.data});
    
      
      })
}

productImage=({name,value,position})=>{
  // console.log("name",name,"value",value,"position",position)  
   this.setState(old=>({...old,imageProduct:{...old.imageProduct,[position]:{...old.imageProduct[position],[name]:value}}}))

 
   console.log("state--=>",this.state)     

}


 productImageUpload=(e,position)=>{
   const {name}=e.target

    const selectedFile=e.target.files[0]
   const formData = new FormData()
   formData.append("img_url", selectedFile, selectedFile.name);

   this.setState(old=>({...old,imageProduct:{...old.imageProduct,[position]:{...old.imageProduct[position],[name]:formData}}}))
 

}

deletebyid=(delrowbyid)=>{
   //console.log("delrowbyid",delrowbyid)
    const producimgfield= this.state.ProductImage
   // console.log("oflength=>",producimgfield)
    delete producimgfield[delrowbyid]
   // console.log("oflength=>",oflength)
     this.setState(old=>({...old,producimgfield}))


}

  render(){
    const product={
     '1' :'Product',
      '2':'service'
      
    };
    let Addmore = (e) => {
              
      this.setState(old=>({...old,ProductImage:[...old.ProductImage,<ProductImage func={this.productImage.bind(this)} imgupld={this.productImageUpload.bind(this)} delbyidfunc={this.deletebyid}  value={{key:'', val:''}} key={this.state.ProductImage.length} id={this.state.ProductImage.length}   />]}))
  }

 

    const productCategory = () => {
      
    }

  //  console.log("URL : "+process.env.MIX_API_URL);
    // alert(process.env.MIX_API_URL);
    const submituser= async (e) => {
      e.preventDefault();
        var data = {
                    id:this.state.id,
                    product: this.state.product,
                    base_price: this.state.base_price,
                    description: this.state.description,
                    gst: this.state.gst,                   
                    product_type: this.state.product_type,
                    product_category_id:  this.state.product_category_id,
                    imageProduct:this.state.imageProduct


                }


          console.log("dtaa==>",data)


        this.apiCtrl.callAxios('product/create-product', data).then(response => {
          //  location.reload('/user-list')

          if(response.success == true){
            Swal.fire({
                title: " Product",
                text: "Updated",
                icon: "success",
                showConfirmButton: false,
            })
        } else {
            Swal.fire({
                title: " Product",
                text: "Not Updated!",
                icon: "error",
                showConfirmButton: false,
            })
        }
            console.log("===>",response);
            location.reload("/admin/product/product-list")
          
        }).catch(function (error) {
          console.log(error);
        });
    } 

//  console.log( "product_id",this.state.product_category_id);

//    console.log( "props==>",this.props)

let  products =  this.props.title.replace(/-/g, " "); 
//let products ="product"
 
var productType =   products
.toLowerCase()
.split(' ')
.map(word => word.charAt(0).toUpperCase() + word.slice(1))
.join(' ');
  
 
    return (
      <>

        {/* <BreadCrumb breadcrumb="Product" breadcrumbItem1='Create' /> */}
         
         
      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered  modal-lg">
        <div className="modal-content">
        <div className="modal-header">
            {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <div className="row ml-1" style={{ paddingTop: '2%'}}>
                {/* <label><b>{props.params.any} Details</b></label> */}
                  <label><b>Update {this.props.title}</b></label>
                
            </div>
            <button type="button"   data-bs-dismiss="modal" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body m-body">
            
          <div className="row">
            
          <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

            

              <Divider sx={{ borderColor: '#dac4c4'}} />

              <div className="row ">

                  <div className='col-md-4'>
                    
                    <MaterialSelect value={this.state.product_category_id?this.state.product_category_id: ''} onChange={(e)=>this.setState({product_category_id : e.target.value})}     data={this.state.data}  id="product_category_id" labelId="product-category-id" name="product_category_id"  label={productType +" " +"Category"} fullWidth/>
                    </div>

                    <div className='col-md-4'>
                    
                    <MaterialSelect value={this.state.product_type?this.state.product_type: ''} onChange={(e)=>this.setState({product_type : e.target.value})}    data={product}  id="product_type" labelId="product-type" name="product_type"  label="Product Type" fullWidth/>
                    </div>


                  <div className="col-md-4 mb-4">
                      <MaterialTextField   label={productType +"*" } value={this.state.product?this.state.product:""} fullWidth name='product' onChange={(e)=>this.setState({product : e.target.value})}/>
                  </div>
                  <div className="col-md-4 mb-4">
                      <MaterialTextField label="Base Price *" value={this.state.base_price?this.state.base_price:""} fullWidth name='base_price' onChange={(e)=>this.setState({base_price : e.target.value})}/>
                  </div>
                  {/* <div className="col-md-4 mb-4">
                      <MaterialTextField label="Description *" value={this.state.description?this.state.description:""}  fullWidth name='description' onChange={(e)=>this.setState({description : e.target.value})}/>
                  </div> */}
                  {/* <div className="col-md-4 mb-4">
                      <MaterialTextField label="GST *" value={this.state.gst?this.state.gst:""}  fullWidth name='gst' onChange={(e)=>this.setState({gst : e.target.value})}/>
                  </div> */}
                  <strong>Description</strong>
                  <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                  
                  <TextEditor values={this.state.description?this.state.description:""}/>
                  
            
                  </div>
              
              </div>

              <div className='row'>
                <strong className='mt-5 mb-2'>{productType+" "+"Image"}</strong>
                
                {
                this.state.ProductImage.map((value, index)=>{
                  //      console.log("index",index)
                        return value;
                   
                    })  
                }
                  
                  
              </div>
              <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
                </div>
                <Divider sx={{ borderColor: '#dac4c4'}} />

              <div className='row'>
                  <div className="col-md-3">
                      <Button style={{ backgroundColor: '#183883' }} onClick={ submituser }>Update</Button>
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
} 


function ProductImage(props){
  const [value,setValue]=useState(props.value.val?props.value.val:"")
  const type={
    'image':"Image",
    "youtube-video":"Youtube Video"
}
  const handleChange = ({name,value,position})=>{
    console.log("name",name,"value",value,"position",position)
    setValue(old=>({...old,[name]:value}))
    //props.func({name:name,value:value,position:position})
   
  }
  const remove=()=>{
       
    props.delbyidfunc(props.id)
  
   }
console.log("props=>",props)

  return(<>

           <div className='col-md-2'>
          <MaterialSelect ismulti={true}  value={value.type?value.type:""}    data={type}   labelId="type" name="type" onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})} label="Type" fullWidth/>
          </div>
          {value.type==="image"?
          <div className="col-md-2 mb-4">
                <MaterialTextField label="Product Image 1*"value={value.img?value.img:""} type="file" fullWidth name='img_url' onChange={(e)=>props.imgupld(e,props.id)} />
          </div>:
          <div className="col-md-2 mb-4">
            <MaterialTextField label="YouTube URL*" value={value.youtube_vdo?value.youtube_vdo:""} fullWidth name='youtube_vdo' onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})} />
          </div>}
          <div className="col-md-2 mb-4">
                <MaterialTextField label="Title*" value={value.title?value.title:""} fullWidth name='title'onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})} />
          </div>
          <div className="col-md-2 mb-4">
                <MaterialTextField label="Priority *"value={value.priority?value.priority:""}  fullWidth name='priority' onChange={(e)=>handleChange({name:e.target.name,value:e.target.value,position:props.id})}/>
            </div>
            <div className="col-md-2 mb-4">
            <FormControlLabel control={<Checkbox  checked={value.featured_img == "1"?true:false}  onChange={(e)=>handleChange({name:e.target.name,value:e.target.checked?1:0,position:props.id})}/>} name="featured_img"label="Featured Image" />
            </div>
            <div className="col-md-1 mb-4">
            <FormControlLabel control={<Checkbox  checked={value.is_active=="1"?true:false} onChange={(e)=>handleChange({name:e.target.name,value:e.target.checked?1:0,position:props.id})}/>} name="is_active" label="Is Active" />
            </div>
            <div className="col-md-1 mb-4 d-flex"style={{justifyContent:"right", marginBottom:"auto"}}>
              <IconButton onClick={remove} aria-label="delete" size="large">
                  <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>

       
  </>)
}