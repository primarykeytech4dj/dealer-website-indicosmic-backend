import React, { useEffect } from 'react';

import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import NavBar from '../NavBar/NavBar';

import  Login  from '../Pages/Login/Login';
import { ForgotPassword } from '../Pages/Login/ForgotPassword';
import UserList from '../Pages/Users/UserList'; 
import AddUsers from '../Pages/Users/AddUsers';

import AddRoles from '../Pages/Roles/AddRoles'
import RolesList from '../Pages/Roles/RolesList';


import Product from '../Pages/Product/Product';
 import ProductList from '../Pages/Product/ProductList';
import Setup from '../Pages/setup/Setup';
import ProductCategory from '../Pages/ProductCategory/ProductCategory';
import { Setting } from '../Pages/Settings/Settings';

import {  SetupProductSetting } from '../Pages/Setup_Product_setting/Setup_Product_setting';
import SetupList from '../Pages/Setup_list/Setup_list';
import { ProductSetting } from '../Pages/Product_Setting/Product_setting';
import WebsiteSetting from '../Pages/Website_settings/Website_settings';
import HomeSetting from '../Pages/Setup_Home/Setup_Home';
import SliderCreation from '../Pages/Slider_Setup/Slider_Creation';
import SliderList from '../Pages/Slider_Setup/Slider_list';
import TextEditor from '../Pages/TextEditor/Text_Editor';
import TestiMonial from '../Pages/TestiMonial/TestiMonial_Creation';
import TestiMonialList from '../Pages/TestiMonial/TestiMonial_Listing';
import { Products } from '../Pages/Products/Products';
import { ProducCreation } from '../Pages/Product_Creation/Product_creation';
import ProductsList from '../Pages/Products/Products_List';
import ProductEdit from '../Pages/Products/Products_Edit';
import { FileUpload } from '../Pages/File_Upload/File_Upload';
import { FileUploadCampaign } from '../Pages/File_upload_Campaign/File_Upload_Campaign';
import { VehicleExcelExport } from '../Pages/Vehicle_Excel_Export/Vehicle_Excel_Export';
import GandhiTemplate from '../Pages/Ak_ghandi_template/GandhiTemplate';
import { VehicleList } from '../Pages/Vehicle_Listing/Vehicle_listing';
import { EnquiryList } from '../Pages/Enquiry_List/Enquiry_List';

import { VehicleImageUpload } from '../Pages/Vehicle_Image_Upload/Vehicle_Image_Upload';

import VehicleTabs from '../Pages/Vehicle_Listing/Vehicle_Tabs';
import { VariationCreate } from '../Pages/Vehicle/Variation_Create';
import VariationList from '../Pages/Vehicle/Variation_List';
import { FeatureCreation } from '../Pages/Vehicle/Feature';
import FeatureList from '../Pages/Vehicle/Feature_list';
import VehicleCreation from '../Pages/Vehicle_Listing/Vehicle_Creation';
import GalleryImage from '../Pages/Gallery_Image/Gallery_Image';
import { GalleryTabs } from '../Pages/Gallery_Image/GalleryImage_Tab';
// import UserCreation


export default function Layout() {

  var roles = JSON.parse(localStorage.getItem('user_roles'))
     

  return (
    <Router>
      <div  className=" body fixed-nav sticky-footer" id="page-top">

        <NavBar />
        <div className="content-wrapper" style={{backgroundColor: "#EEF5FF"}}>
          <div className="container-fluid" style={{backgroundColor: "#EEF5FF"}}>
            
          { roles === "" ? 
             <Routes>
              <Route path='/admin/login' element={<Login />} />
              <Route exact path="/admin" element={<Dashboard />} />
              <Route path='/admin/forgotpassword' element={<ForgotPassword/>}/>
              </Routes> 
              :''}
              
          { roles[0].role_code === "WO" || roles[0].role_code === "IN" || roles[0].role_code === "DA" || roles[0].role_code === "AG" ? 
              <Routes>
                 <Route exact path="/admin" element={<Dashboard />} />
                {/* <Route path="/admin/claim-list" element={<ClaimList />} />  */}
                {/* <Route path="/admin/assessor/claim-assessment" element={<ClaimAssesment />} /> */}
              </Routes> 
              :''}


              { roles[0].role_code === "SA" || roles[0].role_code === "AD" || roles[0].role_code === "AS"  || roles[0].role_code === "CC" ?  
              <Routes>
                <Route  path="/admin" element={<Dashboard />} />
                    {/* <Route path="/admin/create/:any" element={<AddUsers />} /> */}
                 <Route path="/admin/create/user" element={<AddUsers />} />
       
                  {/* <Route path="/admin/user-list/:any" element={<UserList />} />  */}
                  <Route path="/admin/user-list" element={<UserList />} /> 
                  <Route path="/admin/create-role" element={<AddRoles />} /> 
                  <Route path="/admin/role-list" element={<RolesList />} /> 
                    <Route path="/admin/products" element={<Product title={'Product'} />} />
                  <Route path="/admin/service" element={<Product title={'service'} />} /> 
                  <Route path="/admin/products-list" element={<ProductList title={'Product'}/>} /> 
                  <Route path="/admin/service-list" element={<ProductList title={'service'}/>} /> 
                  {/* <Route path="/admin/products/categories" element={<ProductCategory title={'Product'}/>}/>
                  <Route path="/admin/service/categories" element={<ProductCategory title={'service'}/>}/> */}
                  <Route path="/admin/:any/categories" element={<ProductCategory />}/>
                  <Route path="/admin/:any/categories" element={<ProductCategory />}/>
                  <Route path="/admin/setup" element={<Setup/>}/>
                  {/* <Route path="/admin/setup/type/website" element={<Setting/>}/> */}
                  <Route path="/admin/website" element={<Setting/>}/>
                  <Route path="/admin/productCreation" element={<ProducCreation/>}/>
                  <Route path="/admin/setup/type/products" element={<SetupProductSetting/>}/>
                  <Route path="/admin/setup-list" element={< SetupList/>}/>
                  <Route path="/admin/setting" element={<ProductSetting/>}/>
                  <Route path="/admin/setup/type/website" element ={<WebsiteSetting/>}/>
                  <Route path ="/admin/setup/type/home" element={<HomeSetting/>}/>
                  <Route path ="/admin/slider/creation" element={<SliderCreation/>}/>
                  <Route path ="/admin/Sliders/list" element={<SliderList/>}/>
                  <Route path ="/admin/text-editor" element={<TextEditor/>}/>
                  <Route path="/admin/testimonial/creation" element={<TestiMonial/>}/>
                  <Route path='/admin/testimonials' element={<TestiMonialList/>}/>
                  <Route path='/admin/product' element={<Products/>}/>
                  {/* <Route path='/admin/product/list' element={<ProductsList title={'Product'}/>}/>
                  <Route path='/admin/service/list' element={<ProductsList title={'Service'}/>}/> */}
                      <Route path='/admin/:any/list' element={<ProductsList/>}/>
                  {/* <Route path='/admin/service/list' element={<ProductsList />}/> */}
                  <Route path='/admin/product/edit' element={<ProductEdit title={'product'}/>}/>
                  <Route path='/admin/service/edit' element={<ProductEdit title={'service'}/>}/>
                  {/* <Route path='/admin/file-upload' element={<FileUpload/>}/> */}
                  {<Route path="/admin/file-upload" element={<FileUploadCampaign/>}/>}
                  {<Route path ="/admin/vehicle-excel/export" element={<VehicleExcelExport/>}/>}
                  {<Route path ="/admin/template" element={<GandhiTemplate/>}/>}
                  {<Route path="/admin/vehicle-list" element={<VehicleList/>}/>}
                  {<Route path='/admin/vehicle-upload' element={<VehicleImageUpload/>}/>}
                  {<Route path='/admin/vehicle-creation' element={<VehicleCreation/>}/>}
                  {<Route path ="/admin/template" element={<GandhiTemplate/>}/>}
                  {<Route path="/admin/enquiry-list" element={<EnquiryList/>}/>}
                  {<Route path='/admin/vehicletab' element={<VehicleTabs/>}/>}
                
              {<Route path='/admin/variation-create' element={<VariationCreate/>}/>}
              {<Route path='/admin/variation-list' element={<VariationList/>}/>}
              {/* {<Route path='/featured-list' element={<FeatureCreation/>}/>} */}
              {<Route path='/admin/featured-list' element={<FeatureList/>}/>}
              {<Route path='/admin/gallery' element={<GalleryImage/>}/>}
              {<Route path='/admin/gallery-list' element={<GalleryTabs/>}/>}
              </Routes>
               :""}
                
               
              
               
              
        
           

            
            
          </div>
        </div>
    
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fa fa-angle-up"></i>
        </a>
      
      </div>
    </Router>
  )
}
