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
import { UserCreation } from '../Pages/User_Creation/User_Creation';
import { VehicleImageUpload } from '../Pages/Vehicle_Image_Upload/Vehicle_Image_Upload';
import { VehicleCreation } from '../Pages/Vehicle_Listing/Vehicle_Creation';
import VehicleTabs from '../Pages/Vehicle_Listing/Vehicle_Tabs';












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
              <Route path='/login' element={<Login />} />
              <Route exact path="/" element={<Dashboard />} />
              <Route path='/forgotpassword' element={<ForgotPassword/>}/>
              </Routes> 
              :''}
              
          { roles[0].role_code === "WO" || roles[0].role_code === "IN" || roles[0].role_code === "DA" || roles[0].role_code === "AG" ? 
              <Routes>
                 <Route exact path="/" element={<Dashboard />} />
                {/* <Route path="/claim-list" element={<ClaimList />} />  */}
                {/* <Route path="/assessor/claim-assessment" element={<ClaimAssesment />} /> */}
              </Routes> 
              :''}


              { roles[0].role_code === "SA" || roles[0].role_code === "AD" || roles[0].role_code === "AS"  || roles[0].role_code === "CC" ?  
              <Routes>
              <Route exact path="/" element={<Dashboard />} />

             
              
            
            
              {/* <Route path="/create/:any" element={<AddUsers />} /> */}
              <Route path="/create/user" element={<AddUsers />} />
       
              {/* <Route path="/user-list/:any" element={<UserList />} />  */}
              <Route path="/user-list" element={<UserList />} /> 
              <Route path="/create-role" element={<AddRoles />} /> 
              <Route path="/role-list" element={<RolesList />} /> 
               <Route path="/products" element={<Product title={'Product'} />} />
              <Route path="/service" element={<Product title={'service'} />} /> 
              <Route path="/products-list" element={<ProductList title={'Product'}/>} /> 
              <Route path="/service-list" element={<ProductList title={'service'}/>} /> 
              {/* <Route path="/products/categories" element={<ProductCategory title={'Product'}/>}/>
              <Route path="/service/categories" element={<ProductCategory title={'service'}/>}/> */}
              <Route path="/:any/categories" element={<ProductCategory />}/>
              <Route path="/:any/categories" element={<ProductCategory />}/>
              <Route path="/setup" element={<Setup/>}/>
              {/* <Route path="/setup/type/website" element={<Setting/>}/> */}
              <Route path="/website" element={<Setting/>}/>
              <Route path="/productCreation" element={<ProducCreation/>}/>
              <Route path="/setup/type/products" element={<SetupProductSetting/>}/>
              <Route path="/setup-list" element={< SetupList/>}/>
              <Route path="/setting" element={<ProductSetting/>}/>
              <Route path="/setup/type/website" element ={<WebsiteSetting/>}/>
              <Route path ="/setup/type/home" element={<HomeSetting/>}/>
              <Route path ="/slider/creation" element={<SliderCreation/>}/>
              <Route path ="/Sliders/list" element={<SliderList/>}/>
              <Route path ="/text-editor" element={<TextEditor/>}/>
              <Route path="/testimonial/creation" element={<TestiMonial/>}/>
              <Route path='/testimonials' element={<TestiMonialList/>}/>
              <Route path='/product' element={<Products/>}/>
              {/* <Route path='/product/list' element={<ProductsList title={'Product'}/>}/>
              <Route path='/service/list' element={<ProductsList title={'Service'}/>}/> */}
                 <Route path='/:any/list' element={<ProductsList/>}/>
              {/* <Route path='/service/list' element={<ProductsList />}/> */}
              <Route path='/product/edit' element={<ProductEdit title={'product'}/>}/>
              <Route path='/service/edit' element={<ProductEdit title={'service'}/>}/>
              {/* <Route path='/file-upload' element={<FileUpload/>}/> */}
              {<Route path="/file-upload" element={<FileUploadCampaign/>}/>}
              {<Route path ="/vehicle-excel/export" element={<VehicleExcelExport/>}/>}
              {<Route path ="/template" element={<GandhiTemplate/>}/>}
              {<Route path="/vehicle-list" element={<VehicleList/>}/>}
              {<Route path='/vehicle-upload' element={<VehicleImageUpload/>}/>}
              {<Route path='/vehicle-create' element={<VehicleCreation/>}/>}
              {<Route path ="/template" element={<GandhiTemplate/>}/>}
              {<Route path="/enquiry-list" element={<EnquiryList/>}/>}
              {<Route path='/create-user' element={<UserCreation/>}/>}
              {<Route path='/vehicletab' element={<VehicleTabs/>}/>}
             
             
             
            

              
              
           
             
            
              

           
          
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
