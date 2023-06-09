import React from "react";
import Button  from '@mui/material/Button';
import MaterialTextField from '../../../../Tags/MaterialTextField'
import MaterialButton from '../../../../Tags/MaterialButton';
import MaterialSelect from "../../../../Tags/MaterialSelect";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Divider } from '@mui/material';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from "react-slick";
import DatePickers from '../../../../Tags/DatePicker'
import MaterialTextArea from '../../../../Tags/MaterialTextArea'
import Api from '../../../../api';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import '../Products/Products.css'
import { FileUploader } from "react-drag-drop-files";
import { object } from "prop-types";

export  class Products extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        
        data: [],
        product_category_id:null,     
        product:null, 
        tally_name:null,
        description:null,
        base_price:null, 
        base_uom:null,
        meta_keyword:null, 
        meta_title:null,
        meta_description:null, 
        priority:null,
        banner_image:null,
        bannerImageshow:null,
        featured_image:null,
        featuredImageshow:null,
        is_pack:0,
        show_on_website:0,
        is_sale:0,
        is_new:0,
        is_gift:0,
        is_featured:0,
        product_images:[],
        showproductimages:[],
        product_type:this.props.title,


        errors:{},
        validation:{
        
            product_category_id:{required:true},     
            product:{required:true}, 
            tally_name:{required:true},
            description:{required:false},
            base_price:{required:true}, 
            base_uom:{required:false},
            meta_keyword:{required:false}, 
            meta_title:{required:true},
            meta_description:{required:false}, 
            priority:{required:true},
            banner_image:{required:true},
            featured_image:{required:true},
            
        
        },
          isValid:false,
      }
      this.apiCtrl = new Api;
      
    }
    render(){
        // let  products =  this.props.params.any.replace(/-/g, " "); 
        //let products ="product"
        let  products =  this.props.title.replace(/-/g, " "); 
        
        var productType =   products
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        // console.log("propsproduct=>",this.props)
        const type={
            "1":"Product",
            "2":"Service",
             "0":"Both"
        }
        // var settings = {
        //     dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 3,
        //     slidesToScroll: 3
        //   };

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

        const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
         
        const validation = (fieldName, fieldValue) => {
            
            let error={}
            let isValid = true;
            let isMax = 1000;
            if(typeof this.state.validation[fieldName] !== "undefined"){
                Object.entries(this.state.validation[fieldName]).map(([key,value])=>{
             
                    let temp =  fieldName.replace(/_/g, " "); 
                    var name = temp
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
              
                    if(key === 'required'){
                        if((fieldValue.length < 0) || (fieldValue === '') || (fieldValue === null)){
                            error[fieldName] = `${name} Field is required`
                            isValid = false;
                        } 
                    } else if(key === 'min'){
                        if(fieldValue.length < value){
                            error[fieldName] = `${name} must be more than ${value} characters`
                            isValid = false;
                        }
                    } else if(key === 'max'){
                        if(fieldValue.length > value){
                            error[fieldName] = `${name} must be less than ${value} characters`
                            isMax = value;
                            isValid = false;
                        }
                    } else if(key === 'type'){
                        if(value === 'alpha'){
                            if(!fieldValue.match(/^[A-Za-z\s]*$/)){
                                error[fieldName] = `${name} must be String characters`
                                isValid = false;
                            }
                        } else if(value === 'AlphaNumeric'){
                            if(!fieldValue.match(/^[A-Za-z0-9,-.\s]*$/)){
                                error[fieldName] = `${name} must be String Alpha Numeric`
                                isValid = false;
                            }
                        } else if(value === 'Numeric'){
                            if(!fieldValue.match(/^[0-9]*$/)){
                                error[fieldName] = `${name} must be String Numeric`
                                isValid = false;
                            }
                        } else if(value === 'email'){
                            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                            if(!fieldValue.match(reg) ){
                                error[fieldName] = `${name} must be in Email format`
                                isValid = false;
                            }
                        } 
                           
                    }
                    if(isValid == true) {
                        
                        error[fieldName] = '';
                    }
                })
                this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
            }

            if(fieldName=="banner_image"){
                 
                var reader = new FileReader();
                //Read the contents of Image File.
                reader.readAsDataURL(fieldValue);
               
                reader.onload = (e) => {
                    //Initiate the JavaScript Image object.
                    var image = new Image();
                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;
                    image.onload = (e) => {
                        //Determine the Height and Width.
                        var height = image.height;
                        var width = image.width;
                        console.log("height=>",height,"width=>",height)
                        var res = true;
                        error[fieldName] = '';
                        if (height<600 && width<640) {
                            error[fieldName] = "Height and Width must  exceed 600px."
                            // alert("Height and Width must not exceed 600px.");
  
                           // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
                            // return false;
                            res =  false;
  
                        }
                
                        // alert("Uploaded image has valid Height and Width.");
                      
                        // alert("validation")
                   
                        // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
                        this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
                        if(res){
                              this.setState(old=>({...old,[fieldName]: fieldValue } ))
                        }
                        return res;
                        
                    };
                   
                }
  
               
               
              }
              if(fieldName=="featured_image"){
                 
                var reader = new FileReader();
                //Read the contents of Image File.
                reader.readAsDataURL(fieldValue);
               
                reader.onload = (e) => {
                    //Initiate the JavaScript Image object.
                    var image = new Image();
                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;
                    image.onload = (e) => {
                        //Determine the Height and Width.
                        var height = image.height;
                        var width = image.width;
                        console.log("height=>",height,"width=>",height)
                        var res = true;
                        error[fieldName] = '';
                        if (height>400 && width>400) {
                            error[fieldName] = "Height and Width must not exceed 400px."
                            // alert("Height and Width must not exceed 600px.");
  
                           // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
                            // return false;
                            res =  false;
  
                        }
                
                        // alert("Uploaded image has valid Height and Width.");
                      
                        // alert("validation")
                   
                        // this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
                        this.setState(old=>({...old,errors:{ ...old.errors, ...error}})) 
                        if(res){
                              this.setState(old=>({...old,[fieldName]: fieldValue } ))
                        }
                        return res;
                        
                    };
                   
                }
  
               
               
              }
            if(isMax >= fieldValue.length){
               this.setState(old=>({...old,[fieldName]: fieldValue } ))
            }
        }
        
       
    
        const submitdata=(e)=>{
            e.preventDefault();


            let errors = {};
            let isValid = this.state.isValid;
            Object.entries(this.state.validation).map(([key,value])=>{
     
                
              if((typeof this.state[key] === 'undefined') || (this.state[key] === null) ||(this.state[key] === "")) {
                    let temp =  key.replace(/_/g, " "); 
                    var name = temp
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
     
                    if(value.required === true){
                        errors[key] = `${name} Field is Required`;
                        isValid = false;
                    }
                } else {
                    errors[key] = '';
                    isValid = true;
                }
                this.setState(old=>({
                    ...old,
                    errors:errors
                })) 
            })
     
            var count = 0;
            Object.entries(errors).map(([key, value])=>{
                if(value !== ''){
                    count += 1;
                }
            })
            
            if(count>0){
                return false;
            }
     
                      var data = new FormData();
                      if(Object.keys(this.state).length > 0){

                        Object.entries(this.state).map(([index, value])=>{
                            if((index !== "data")&&(index !== "errors")&&(index !== "validation")&&(index !== "isValid")&&(index !== "bannerImageshow")&&(index !== "featuredImageshow")&&(index!=="showproductimages")){
                                if(index === 'product_images'){

                                    value.map((val1, key1)=>{

                                        data.append(`${index}`, value[key1]);
                                    })
                                } else {
                                    data.append(`${index}`, value);
                                }
                            }
                        })
                    }

                    this.apiCtrl.callAxiosFile("product/create-product",data,true).then((response)=>{
        
            if(response.success === true){
                // console.log("response=>",response)
                 Swal.fire({
                  title: productType,
                  text:"Created",
                  icon: "success",
                  showConfirmButton: false,
              })
              setTimeout(() => {
                Swal.close()
            this.setState({
                product_category_id:null,     
                product:null, 
                tally_name:null,
                description:null,
                base_price:null, 
                base_uom:null,
                meta_keyword:null, 
                meta_title:null,
                meta_description:null, 
                priority:null,
                banner_image:null,
                bannerImageshow:null,
                featured_image:null,
                featuredImageshow:null,
                is_pack:0,
                show_on_website:0,
                is_sale:0,
                is_new:0,
                is_gift:0,
                is_featured:0,
                product_images:[],
                showproductimages:[],

            })
          }, 3000);
              
      
              } else {
                  Swal.fire({
                                title: productType,
                                text: "Not Created!",
                                icon: "error",
                                showConfirmButton: false,
                            })
                            setTimeout(() => {
                                Swal.close()
                               
                          }, 3000);
                              
              }
        })
       
    
      


      
          
      } 
          
      

        const productCategory = () => {
            var data = {
                is_service: (this.props.title === 'service')?1:0
              }
            this.apiCtrl.callAxios('product/get-product-category',data).then(res => {
              // const array={}
               this.setState({data: res.data});
              
                
                })
        }
        

        const handleChange = (e) => {

            
            console.log(e.target.value)
  
            if((e.target.name==="banner_image")||(e.target.name==="featured_image")){
                validation(e.target.name, e.target.files[0])
                if(e.target.name==="banner_image"){
                    this.setState(old=>({...old,bannerImageshow : URL.createObjectURL(e.target.files[0])}))
                }else{
                    this.setState(old=>({...old,featuredImageshow : URL.createObjectURL(e.target.files[0])}))
                }
               
            //   this.setState(old=>({...old,[e.target.name] : e.target.files[0]}))
            }else{
                validation(e.target.name, e.target.value)
            }
          }


        const handleChan = (file) => {
        console.log(file)
        Object.entries(file).map(([index, value])=>{

            this.setState(old=>({...old,product_images:[...old.product_images,value]}))
            this.setState(old=>({...old,showproductimages:[...old.showproductimages,URL.createObjectURL(value)]}))
        })
            console.log("stae=>",this.state)
        };


           
      

          
        return(<>

            {/* <BreadCrumb breadcrumb={productType} breadcrumbItem1='Create' /> */}

            <Box sx={{ width: '100%', height: '100%', typography: 'body1', backgroundColor:'white', borderRadius:"6px", padding: '2%' }}>

                <div className="row mb-3 ml-1">
                    <label><b>{ productType+" "+"Basic Info"}</b></label>
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />

                <div className="row ">

                    <div className='col-md-4 mb-4'>
                
                    <MaterialSelect  
                    onMouseEnter={productCategory} 
                    value={this.state.product_category_id?this.state.product_category_id: ''} 
                  
                    onChange={(e)=>{handleChange(e)}}   
                    data={this.state.data}  id="product_category_id" labelId="product-category-id" 
                    name="product_category_id"  label={ productType+" " +"Category"} fullWidth
                    helperText={
                        this.state.errors.product_category_id
                        ? this.state.errors.product_category_id
                        : ''
                       }
                       error={this.state.errors.product_category_id?true:false}
                    />
                    </div>

                    {/* <div className="col-md-4">
                    <MaterialSelect
                     name={"product_type"}
                     label={"Product Type"}                    
                     value={this.state.product_type?this.state.product_type: ''} 
                     onChange={(e)=>this.setState({product_type : e.target.value})}   
                     data={type}
                     fullWidth
                     />

                    </div> */}

                    <div className="col-md-4 mb-4">
                    <MaterialTextField label={productType} placeholder={productType}  fullWidth name='product'    onChange={(e)=>{handleChange(e)}} 
                      value={this.state.product?this.state.product: ''} 
                      helperText={
                        this.state.errors.product
                        ? this.state.errors.product
                        : ''
                       }
                       error={this.state.errors.product?true:false}
                    />
                    </div>
                    <div className="col-md-4 mb-4">
                    <MaterialTextField label={"Tally Name"} placeholder="Tally Name"  fullWidth name='tally_name'   onChange={(e)=>{handleChange(e)}} 
                       value={this.state.tally_name?this.state.tally_name: ''}   
                       helperText={
                        
                        this.state.errors.tally_name
                        ? this.state.errors.tally_name
                        : ''
                       }
                       error={this.state.errors.tally_name?true:false} 
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                    <MaterialTextArea multiline label={"Description" } placeholder=" Description" fullWidth name='description'  onChange={(e)=>{handleChange(e)}}   
                       value={this.state.description?this.state.description: ''}     
                      helperText={
                        this.state.errors.description
                        ? this.state.errors.description
                        : ''
                       }
                       error={this.state.errors.description?true:false}  
                    />
                    </div>
                    <div className="col-md-4 mb-4">
                    <MaterialTextField label={"Base Price"} type={'number'} placeholder="Base Price"  fullWidth name='base_price'   onChange={(e)=>{handleChange(e)}}   
                       value={this.state.base_price?this.state.base_price: ''}      
                    helperText={
                    this.state.errors.base_price
                    ? this.state.errors.base_price
                    : ''
                    }
                    error={this.state.errors.base_price?true:false}    
                    />
                    </div>

                    <div className="col-md-4 mb-4">
                    <MaterialTextField label={"Base Uom" }  placeholder="Base Uom"  fullWidth name='base_uom'   onChange={(e)=>{handleChange(e)}}   
                       value={this.state.base_uom?this.state.base_uom: ''}      
                       helperText={
                        this.state.errors.base_uom
                        ? this.state.errors.base_uom
                        : ''
                        }
                        error={this.state.errors.base_uom?true:false}      
                     />
                    </div>
                    <div className="col-md-4 mb-4">
                    <MaterialTextField label={"Meta Keyword" }  placeholder="Meta Keyword" fullWidth name='meta_keyword'   onChange={(e)=>{handleChange(e)}} 
                     value={this.state.meta_keyword?this.state.meta_keyword: ''}        
                      helperText={
                        this.state.errors.meta_keyword
                        ? this.state.errors.meta_keyword
                        : ''
                        }
                        error={this.state.errors.meta_keyword?true:false}      
                     />
                    </div>
                    <div className="col-md-4 mb-4">
                    <MaterialTextField label={"Meta Title" } placeholder="Meta Title"  fullWidth name='meta_title'   onChange={(e)=>{handleChange(e)}}  
                      value={this.state.meta_title?this.state.meta_title: ''}    
                     helperText={
                        this.state.errors.meta_title
                        ? this.state.errors.meta_title
                        : ''
                        }
                        error={this.state.errors.meta_title?true:false}        
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                    <MaterialTextArea multiline label={"Meta Description" } placeholder="Meta Description" fullWidth name='meta_description'  onChange={(e)=>{handleChange(e)}}
                      value={this.state.meta_description?this.state.meta_description: ''}    
                     helperText={
                        this.state.errors.meta_description
                        ? this.state.errors.meta_description
                        : ''
                        }
                        error={this.state.errors.meta_description?true:false}             
                     />
                    </div>
                    <div className="col-md-4 mb-4">
                    <MaterialTextField label={"Priority" } type={"number"} placeholder="Priority" fullWidth name='priority'   onChange={(e)=>{handleChange(e)}} 
                      value={this.state.priority?this.state.priority: ''}    
                     helperText={
                        this.state.errors.priority
                        ? this.state.errors.priority
                        : ''
                        }
                        error={this.state.errors.priority?true:false}           
                     />
                    </div>
                  
                   
                    
                    <div className="col-md-4 mb-4">
                            <FormControlLabel control={<Checkbox checked={this.state.is_pack==1?true:false}   onChange={(e)=>this.setState({is_pack:e.target.checked?1:0})}/>} label={"Is Pack"} />
                    </div>
                    <div className="col-md-4 mb-4">
                            <FormControlLabel control={<Checkbox  checked={this.state.show_on_website==1?true:false}  onChange={(e)=>this.setState({show_on_website:e.target.checked?1:0})}/>} label={"Show On Website"} />
                    </div>
                    <div className="col-md-4 mb-4">
                    <FormControlLabel control={<Checkbox checked={this.state.is_sale==1?true:false}   onChange={(e)=>this.setState({is_sale:e.target.checked?1:0})}/>} label={"Is Sale"} />
                    </div>
                    <div className="col-md-4 mb-4">
                    <FormControlLabel control={<Checkbox  checked={this.state.is_new==1?true:false}   onChange={(e)=>this.setState({is_new:e.target.checked?1:0})}/>} label={"Is New"} />
                    </div>
                    <div className="col-md-4 mb-4">
                    <FormControlLabel control={<Checkbox    checked={this.state.is_gift==1?true:false}  onChange={(e)=>this.setState({is_gift:e.target.checked?1:0})}/>} label={"Is Gift"} />
                    </div>
                    <div className="col-md-4 mb-4">
                    <FormControlLabel control={<Checkbox    checked={this.state.overall_stock_mgmt==1?true:false}  onChange={(e)=>this.setState({overall_stock_mgmt:e.target.checked?1:0})}/>} label={"Overall Stock Mgmt"} />
                    </div>
                    <div className="col-md-4 mb-4">
                    <FormControlLabel control={<Checkbox  checked={this.state.is_featured==1?true:false}   onChange={(e)=>this.setState({is_featured:e.target.checked?1:0})}/>} label={"Is Featured"} />
                    </div>
                   
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className="row mb-4 ml-1">
                    <label><b>{productType+" "+"Image"}</b></label>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <MaterialTextField type={"file"}   onChange={(e)=>{handleChange(e)}}      name="banner_image" label="Banner Image (600px X 600px)" 
                        helperText={
                            this.state.errors.banner_image
                            ? this.state.errors.banner_image
                            : ''
                            }
                            error={this.state.errors.banner_image?true:false}           
                        />

                    </div>
                    <div className="col-md-6 mb-4">
                        <MaterialTextField type={"file"}   onChange={(e)=>{handleChange(e)}}     name="featured_image" label="Featured Image (400px X 400px)"
                         helperText={
                            this.state.errors.featured_image
                            ? this.state.errors.featured_image
                            : ''
                            }
                            error={this.state.errors.featured_image?true:false}       
                        />

                    </div>

                    {this.state.bannerImageshow!==null?
                        <div className="col-md-6 mb-3">
                        <img  className="image"  src={this.state.bannerImageshow?this.state.bannerImageshow:""} />
                        </div>:""
                            }
                            {this.state.featuredImageshow!==null?
                        <div className="col-md-6 mb-3">
                        <img  className="image"  src={this.state.featuredImageshow?this.state.featuredImageshow:""} />
                        </div>:""
                    }

                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div className="row mt-3 ml-1">
                    <label><b>{"Other Images"}</b></label>
                </div>
                  
                <div className="row mb-3">
                    <div className="col-md-12">
                    <FileUploader handleChange={handleChan}  multiple={true} name="product_images" types={fileTypes} />
                    </div>
               
                </div>

                <Divider sx={{ borderColor: '#dac4c4'}} />
                <div  className="row mb-2">
                    <div className="container">
                    <Slider {...settings}>
                     {Object.entries(this.state.showproductimages).map(([key,image])=>{
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
                <MaterialButton style={{ backgroundColor: '#183883' , marginTop: "14px", border: '1px solid #183883',height:55}}  onClick={submitdata}name="submit" text="Submit" />
                </div>
            </Box>

            
        </>)
    }
}  


