import React, {useState, useEffect} from 'react'
import Button  from '@mui/material/Button';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import MaterialButton from '../../../../Tags/MaterialButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Api from '../../../../api';
import { useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Swal from "sweetalert2";
import TextEditor from '../TextEditor/Text_Editor';

import MaterialSelect from '../../../../Tags/MaterialSelect';


 export  class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      btnVariant : "contained",
      product : null,
      base_price : null,
      description : null,
      gst : null,
      data: [],
      product_type:"",
      product_category_id:"",
      ProductImage:[< ProductImage func={this.productImage.bind(this)} imgupld={this.productImageUpload.bind(this)} delbyidfunc={this.deletebyid} value={{key:'', val:''}} key={0} id={0}/>],
      ProductImage:[],
      product_images:{}

      
    }
    this.apiCtrl = new Api;
    
  }

  productImage=({name,value,position})=>{
   // console.log("name",name,"value",value,"position",position)
    
   
         
    
    this.setState(old=>({...old,product_images:{...old.product_images,[position]:{...old.product_images[position],[name]:value}}}))

  
    console.log("state--=>",this.state)     

 }


  productImageUpload=(e,position)=>{
    const {name}=e.target

     const selectedFile=e.target.files[0]
    const formData = new FormData()
    formData.append("img_url", selectedFile, selectedFile.name);

    this.setState(old=>({...old,product_images:{...old.product_images,[position]:{...old.product_images[position],[name]:formData}}}))
  

}

deletebyid=(delrowbyid)=>{

    console.log("delrowbyid",delrowbyid)
     const producimgfield= this.state.ProductImage
     console.log("oflength=>",producimgfield)
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
              
      this.setState(old=>({...old,ProductImage:[...old.ProductImage,<ProductImage func={this.productImage.bind(this)} imgupld={this.productImageUpload.bind(this)} delbyidfunc={this.deletebyid} key={this.state.ProductImage.length} id={this.state.ProductImage.length}/>]}))
  }

    


    const productCategory = () => {
      this.apiCtrl.callAxios('product/get-product-category').then(res => {
        // const array={}
         this.setState({data: res.data});
        
          
          })
    }

    // const textediter =(data)={
    //   this.st
    // }

    const onhandlechange =({val})=>{
     // console.log("val=>",val)
      this.setState(old=>({...old,description:val}))
    }

    console.log("URL : "+process.env.MIX_API_URL);
    // alert(process.env.MIX_API_URL);
    const submituser= async (e) => {
      e.preventDefault();
      e.persist();
  
        var data = {product: this.state.product,
                    base_price: this.state.base_price,
                    description: this.state.description,           
                    product: this.state.product,
                    product_type:this.props.title,
                    product_category_id:this.state.product_category_id,
                    product_images:this.state.product_images

                }

      


        this.apiCtrl.callAxios('product/create-product', data).then(response => {
          //  location.reload('/user-list')

          if(response.success == true){
            Swal.fire({
                title: "Create Product",
                text: "Created!",
                icon: "success",
                showConfirmButton: false,
            })
        } else {
            Swal.fire({
                title: "Create Product",
                text: "Not Created!",
                icon: "error",
                showConfirmButton: false,
            })
        }
            console.log("===>",response);
          //  location.reload("/product/product-list")
          
        }).catch(function (error) {
          console.log(error);
        });
    } 

//  console.log(this.state.product_category_id);
 // console.log(this.state);

//  console.log( "props==>",this.props)
     
       let  products =  this.props.title.replace(/-/g, " "); 
      //let products ="product"
       
  var productType =   products
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
        
        
    return (
      <>

        <BreadCrumb breadcrumb={productType} breadcrumbItem1='Create' />

        <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

        <div className="row ml-1">
            <label><b>{"Add"+" "+ productType}</b></label>
        </div>

        <Divider sx={{ borderColor: '#dac4c4'}} />

        <div className="row ">

             {/* <div className='col-md-4'>
              
              <MaterialSelect isMulti={true} onMouseEnter={productCategory} value={this.state.product_category_id?this.state.product_category_id: ''} onChange={(e)=>this.setState({product_category_id : e.target.value})}     data={this.state.data}  id="product_category_id" labelId="product-category-id" name="product_category_id"  label={productType +" " +"Category"} fullWidth/>
              </div> */}
              <div className='col-md-4'>
              
              <MaterialSelect  onMouseEnter={productCategory} value={this.state.product_category_id?this.state.product_category_id: ''} onChange={(e)=>this.setState({product_category_id : e.target.value})}     data={this.state.data}  id="product_category_id" labelId="product-category-id" name="product_category_id"  label={productType +" " +"Category"} fullWidth/>
              </div>
           

            <div className="col-md-4 mb-4">
                <MaterialTextField label={productType +"*" }   fullWidth name='product' onChange={(e)=>this.setState({product : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
                <MaterialTextField label="Base Price *"  fullWidth name='base_price' onChange={(e)=>this.setState({base_price : e.target.value})}/>
            </div>
           
            {/* <div className="col-md-4 mb-4">
                <MaterialTextField label="GST *"   fullWidth name='gst' onChange={(e)=>this.setState({gst : e.target.value})}/>
            </div>
            <div className="col-md-4 mb-4">
            <FormControlLabel control={<Checkbox    onChange={(e)=>this.setState({is_New:e.target.checked?1:0})}/>} label="Is New" />
            </div>
            <div className="col-md-4 mb-4">
            <FormControlLabel control={<Checkbox    onChange={(e)=>this.setState({is_New:e.target.checked?1:0})}/>} label={"Is Pack " +" "+productType} />
            </div> */}
            <strong>Description</strong>
            <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
            
            <TextEditor func={onhandlechange}/>
            
       
            </div>
            
         
        </div>
         
       
        <div className='row'>
        <strong className='mt-5 mb-2'>{productType+" "+"Image"}</strong>
        
        {this.state.ProductImage}
           
           
        </div>

        <div className="col-md-12 mb-4 d-flex"style={{justifyContent:"right",marginBottom:"auto"}}>
          <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}} onClick={Addmore} name="update" text="Add More" />
        </div>
         
        <Divider sx={{ borderColor: '#dac4c4'}} />
        <div className='row mt-3'>
         
            <div className="col-md-3">
                <Button style={{ backgroundColor: '#183883' }} onClick={ submituser }>Submit</Button>
            </div>
        </div>

        
        </Box>

      </>
    )
  }
} 


export default (props) => {
  return <Product {...props}   params={useParams()}/>
  
}

function ProductImage(props){
  const [state,setState]=useState({
    type:""
  })
  const type={
    'image':"Image",
    "youtube-video":"Youtube Video"
}
  const handleChange = (e)=>{
    setState({type:e.target.value})
    props.func({name:e.target.name,value:e.target.value,position:props.id})
   
  }
  const remove=()=>{
       
    props.delbyidfunc(props.id)
  
   }

   console.log("props",props)


  return(<>

           <div className='col-md-2'>
          <MaterialSelect ismulti={true}  value={state.type}    data={type}   labelId="type" name="type" onChange={(e)=>handleChange(e)} label="Type" fullWidth/>
          </div>
          {state.type==="image"?
          <div className="col-md-2 mb-4">
                <MaterialTextField label="Product Image 1*" type="file" fullWidth name='image_name_1' onChange={(e)=>props.imgupld(e,props.id)} />
          </div>:
          <div className="col-md-2 mb-4">
            <MaterialTextField label="YouTube URL*"  fullWidth name='link' onChange={(e)=>props.func({name:e.target.name,value:e.target.value,position:props.id})} />
          </div>}
          <div className="col-md-2 mb-4">
                <MaterialTextField label="Title*"  fullWidth name='title'onChange={(e)=>props.func({name:e.target.name,value:e.target.value,position:props.id})} />
          </div>
          <div className="col-md-2 mb-4">
                <MaterialTextField label="Priority *"  fullWidth name='priority' onChange={(e)=>props.func({name:e.target.name,value:e.target.value,position:props.id})}/>
            </div>
            <div className="col-md-2 mb-4">
            <FormControlLabel control={<Checkbox   onChange={(e)=>props.func({name:e.target.name,value:e.target.checked?1:0,position:props.id})}/>} name="featured_image"label="Featured Image" />
            </div>
            <div className="col-md-1 mb-4">
            <FormControlLabel control={<Checkbox   onChange={(e)=>props.func({name:e.target.name,value:e.target.checked?1:0,position:props.id})}/>} name="is_active" label="Is Active" />
            </div>
            <div className="col-md-1 mb-4 d-flex"style={{justifyContent:"right", marginBottom:"auto"}}>
              <IconButton onClick={remove} aria-label="delete" size="large">
                  <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>

       
  </>)
}





