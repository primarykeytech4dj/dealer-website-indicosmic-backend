import { extend } from 'jquery'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SideBar.scss'

export default function SideBar() {

 
 
  return (
    <>


    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Dashboard">
        
        <Link className="nav-link" to="/admin">
            <i className="fa fa-fw fa-dashboard"></i>
            <span className="nav-link-text">&nbsp;Dashboard</span>
          </Link>
         
        </li>
   

        <Columns />

      </ul>

      
      <ul className="navbar-nav sidenav-toggler">
        <li className="nav-item">
          <a className="nav-link text-center" id="sidenavToggler">
            <i className="fa fa-fw fa-angle-left"></i>
          </a>
        </li>
      </ul>
    </>
  )
   
}

// export default function SideBar() {


  
//         useEffect(()=>{
  
//            $(function(){
//             $('.menu-toggle').click(function(e) {
//               e.preventDefault();
//               var toggleButton = $(this);
//               if (toggleButton.next().hasClass('active')) {
//                 toggleButton.next().removeClass('active');
//                 toggleButton.next().slideUp(400);
//                 toggleButton.removeClass('rotate');
//               } else {
//                 toggleButton.parent().parent().find('li .sub-menu').removeClass('active');
//                 toggleButton.parent().parent().find('li .sub-menu').slideUp(400);
//                 toggleButton.parent().parent().find('.menu-toggle').removeClass('rotate');
//                 toggleButton.next().toggleClass('active');
//                 toggleButton.next().slideToggle(400);
//                 toggleButton.toggleClass('rotate');
//               }
//             });
//           });
  
//         },[])
  
       
          
//     return(
//       <>
     
      
  
     
//         <ul className="navbar-nav navbar-sidenav " id="exampleAccordion"> 
//           <div class="nav">
         
//             <ul>
  
//                <Columns/>
             
//             </ul>
//           </div>
//         </ul> 
        
//         <ul className="navbar-nav sidenav-toggler">
//           <li className="nav-item">
//             <a className="nav-link text-center" id="sidenavToggler">
//               <i className="fa fa-fw fa-angle-left"></i>
//             </a>
//           </li>
//         </ul>
//       </>
  
  
  
       
//     )
//   }


class Columns extends React.Component {
  render() {
    var roles = JSON.parse(localStorage.getItem('user_roles'))

    var detail=JSON.parse(localStorage.getItem('user_details'))
   // console.log("detailsUser==>",detail)

    
    // if( (roles[0].role_code === "DA") || (roles[0].role_code === "WO" ) ){
    //   return (
    //     <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
    //     <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
    //       <i className="fa fa-fw fa-list"></i>
    //       <span className="nav-link-text">&nbsp;{roles[0].role_name} Bucket</span>
    //     </a>
    //     <ul className="sidenav-second-level collapse" id="collapseMylistings">
          
    //     {/* <li>
    //         <Link  to="/admin/claim-list">Claim List</Link>
    //       </li> */}
    //       <li>
    //         {/* <a >Expired <span className="badge badge-pill badge-danger">6</span></a> */}
    //       </li>
    //     </ul>
    //   </li>
    //   );

    // // } else if( (roles[0].role_code === "AG")){
    // //   return(
    // //     <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Dashboard">
        
    // //     <Link className="nav-link" to="/admin/claim-list">
    // //         <i className="fa fa-fw fa-dashboard"></i>
    // //         <span className="nav-link-text">&nbsp;Claim List</span>
    // //       </Link>
         
    // //     </li>
    // //   )
    //  }
    // else if((roles[0].role_code === "SA") || (roles[0].role_code === "AD") || (roles[0].role_code === "AS") || (roles[0].role_code === "CC")){
    //   return (
    //     <>


    




   

    //  if(detail.is_admin==1 ){
      
    // } else {
    //   return<></>
    // }


    return (
      <>
  





<li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
      <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
        <i className="fa fa-fw fa-list"></i>
        <span className="nav-link-text">&nbsp; Settings</span>
      </a>
      <ul className="sidenav-second-level collapse" id="collapseMylistings">
      {/* <i className="fa fa-fw fa-globe"></i> */}
      <li><Link  to="/admin/setup/type/website"><i className="fa fa-fw fa-globe"></i>Website Setting</Link></li>
    {/* <li><Link  to="/admin/setup/type/home">Home Setting</Link></li>
    <li><Link  to="/admin/setup/type/about">About US setting</Link></li>
    <li><Link  to="/admin/setup/type/services">Services Setting</Link></li>
    <li><Link  to="/admin/setup/type/products">Products Settings</Link></li>
    <li><Link  to="/admin/setup/type/gallery">Gallery Settings</Link></li>
    <li><Link  to="/admin/setup/type/services">Contact Us Settings</Link></li> */}
      </ul>
</li>


<li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
      <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
        <i className="fa fa-fw fa-list"></i>
        <span className="nav-link-text">&nbsp; Setup</span>
      </a>
      <ul className="sidenav-second-level collapse" id="collapseMylistings">
        
      <li><Link  to="/admin/setup-list">Setup List</Link></li>
  
      </ul>
</li>
<li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Company Profile">

  <Link className="nav-link" to="/admin/company/edit">
      <i className="fa fa-fw fa-dashboard"></i>
      <span className="nav-link-text">&nbsp;Company Profile</span>
    </Link>
    

</li>
{detail.is_admin==undefined?
  <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
          <i className="fa fa-fw fa-list"></i>
          <span className="nav-link-text">&nbsp; Company </span>
        </a>
        <ul className="sidenav-second-level collapse" id="collapseMylistings">
        <li><Link  to="/admin/company/create">Company Create</Link></li>
      <li><Link  to="/admin/company/list">CompanyList</Link></li>
        </ul>
  </li>:detail.is_admin==1?
  <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
  <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
    <i className="fa fa-fw fa-list"></i>
    <span className="nav-link-text">&nbsp; Company </span>
  </a>
  <ul className="sidenav-second-level collapse" id="collapseMylistings">
  <li><Link  to="/admin/company/create">Company Create</Link></li>
  <li><Link  to="/admin/company/list">CompanyList</Link></li>
  </ul>
  </li>:""
  }


<li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
      <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
        <i className="fa fa-fw fa-list"></i>
        <span className="nav-link-text">&nbsp; Products</span>
      </a>
      <ul className="sidenav-second-level collapse" id="collapseMylistings">
      <li><Link  to="/admin/product-category/list">Product Categories</Link></li>
    <li><Link  to="/admin/product/list">Products</Link></li>
      </ul>
</li>

<li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
      <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
        <i className="fa fa-fw fa-list"></i>
        <span className="nav-link-text">&nbsp; Service </span>
      </a>
      <ul className="sidenav-second-level collapse" id="collapseMylistings">
      <li><Link  to="/admin/service-category/list">Service Categories</Link></li>
    <li><Link  to="/admin/service/list">Services</Link></li>
      </ul>
</li>
{detail.is_admin==undefined?
  <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
          <i className="fa fa-fw fa-list"></i>
          <span className="nav-link-text">&nbsp; Users</span>
        </a>
        <ul className="sidenav-second-level collapse" id="collapseMylistings">
        <li><Link  to="/admin/user-list">UserList</Link></li>
    
        </ul>
  </li>:detail.is_admin==1?
  <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
  <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
    <i className="fa fa-fw fa-list"></i>
    <span className="nav-link-text">&nbsp; Users</span>
  </a>
  <ul className="sidenav-second-level collapse" id="collapseMylistings">
  <li><Link  to="/admin/user-list">UserList</Link></li>

  </ul>
  </li>:""
}

<li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Testimonials">

  <Link className="nav-link" to="/admin/testimonials">
      <i className="fa fa-fw fa-dashboard"></i>
      <span className="nav-link-text">&nbsp;Testimonials</span>
  </Link>
      

</li>
<li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Branch">

  <Link className="nav-link" to="/admin/branch">
      <i className="fa fa-fw fa-dashboard"></i>
      <span className="nav-link-text">&nbsp;Branch</span>
  </Link>
      

</li>

{/* <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
      <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
        <i className="fa fa-fw fa-list"></i>
        <span className="nav-link-text">&nbsp; Invoice Master</span>
      </a>
      <ul className="sidenav-second-level collapse" id="collapseMylistings">
      <li><Link  to="/admin/invoice">Invoice</Link></li>
       <li><Link  to="/admin/invoice-list">Invoice List</Link></li>
      </ul>
</li> */}


<li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
      <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
        <i className="fa fa-fw fa-list"></i>
        <span className="nav-link-text">&nbsp; Excel Master</span>
      </a>
      <ul className="sidenav-second-level collapse" id="collapseMylistings">
      <li><Link  to="/admin/vehicle-excel/export">Vehicle Upload Format</Link></li>
   {/* <li><Link  to="/admin/vehicle-list">Vehicle List</Link></li>*/}
      </ul>
</li>

<li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
      <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
        <i className="fa fa-fw fa-list"></i>
        <span className="nav-link-text">&nbsp;Vehicle</span>
      </a>
      <ul className="sidenav-second-level collapse" id="collapseMylistings">
      {/* <li><Link  to="/admin/variation-create">Variation</Link></li> */}

      <li><Link  to="/admin/variation-list">Variation </Link></li>
      <li><Link  to="/admin/featured-list">Features</Link></li>
    <li><Link  to="/admin/vehicle-list">Vehicle List</Link></li>
      </ul>
</li>

<li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
      <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapsegallerylistings">
        <i className="fa fa-fw fa-list"></i>
        <span className="nav-link-text">&nbsp;Gallery</span>
      </a>
      <ul className="sidenav-second-level collapse" id="collapsegallerylistings">
      {/* <li><Link  to="/variation-create">Variation</Link></li> */}

      <li><Link  to="/admin/gallery">Gallery Image Upload </Link></li>
      <li><Link  to="/admin/gallery-list">Gallery List</Link></li>
   
      </ul>
</li>


<li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Sliders">

<Link className="nav-link" to="/admin/Sliders/list">
    <i className="fa fa-fw fa-dashboard"></i>
    <span className="nav-link-text">&nbsp;Sliders</span>
  </Link>
  

</li>

<li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Testimonials">

<Link className="nav-link" to="/admin/enquiry-list">
    <i className="fa fa-fw fa-dashboard"></i>
    <span className="nav-link-text">&nbsp;Enquiry List</span>
  </Link>
  

</li>




 



  
      </>
    )
  }
}













// const data=[
//   {
//       "name": "Dashboard",
//       "slug": "/",
//       "sub_menu": false
//   },
//   {
//     "name":"Web Setting",
//     "slug":"website",
//     "sub_menu":false
//   },
//   {
//       "name": "Products",
//       "slug": "product",
//       "sub_menu": [
//           {
//               "name": "List",
//               "slug": "list",
//               "sub_menu": []
//           },
//           {
//               "name": "Create",
//               "slug": "create",
//               "sub_menu": []
//           }
//       ]
//   },
//   {
//     "name": "Service",
//     "slug": "service",
//     "sub_menu": [
//         {
//             "name": "List",
//             "slug": "list",
//             "sub_menu": []
//         },
//         {
//             "name": "Create",
//             "slug": "create",
//             "sub_menu": []
//         }
//     ]
//   },
//   {
//       "name": "Product Category",
//       "slug": "product-category",
//       "sub_menu": [
//           {
//               "name": "List",
//               "slug": "list",
//               "sub_menu":[]
//           },
//           {
//               "name": "Create",
//               "slug": "create",
//               "sub_menu": []
//           }
//       ]
//   },
//   {
//     "name": "Service Category",
//     "slug": "service-category",
//     "sub_menu": [
//         {
//             "name": "List",
//             "slug": "list",
//             "sub_menu":[]
//         },
//         {
//             "name": "Create",
//             "slug": "create",
//             "sub_menu": []
//         }
//     ]
//   },
//   {
//       "name": "Vehicles",
//       "slug": "vehicle",
//       "sub_menu": [
//         {
//           "name": "Make",
//           "slug": "make",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         },
//         {
//           "name": "Model",
//           "slug": "model",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         },
//         {
//           "name": "Variant",
//           "slug": "variant",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         },
//         {
//           "name": "Vehicle List",
//           "slug": "vehicle-list",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         },
//         {
//           "name": "Features",
//           "slug": "feature",
//           "sub_menu": [
//             {
//               "name": "list",
//               "slug": "list",
//               "sub_menu": []
//             },
//             {
//               "name": "create",
//               "slug": "create",
//               "sub_menu": []
//             }
//           ]
//         }
//       ]
//   },
//   {
//       "name": "Gallery",
//       "slug": "gallery",
//       "sub_menu": [
//         {
//           "name": "list",
//           "slug": "list",
//           "sub_menu": []
//         },
//         {
//           "name": "create",
//           "slug": "create",
//           "sub_menu": []
//         }
//       ]
//   },
//   {
//     "name": "Testimonials",
//     "slug": "testimonial",
//     "sub_menu": [
//       {
//           "name": "List",
//           "slug": "list",
//           "sub_menu": []
//       },
//       {
//           "name": "Create",
//           "slug": "create",
//           "sub_menu": []
//       }
//     ]
//   },
//   {
//     "name": "Slider",
//     "slug": "slider",
//     "sub_menu": [
//       {
//           "name": "List",
//           "slug": "list",
//           "sub_menu": []
//       },
//       {
//           "name": "Create",
//           "slug": "create",
//           "sub_menu": []
//       }
//     ]
//   },
//   {
//     "name": "Enquiry",
//     "slug": "enquiry-list",
//     "sub_menu": false
//   },
//   {
//     "name": "Navigation",
//     "slug": "navigation",
//     "sub_menu": [
//         {
//             "name": "List",
//             "slug": "list",
//             "sub_menu": []
//         },
//         {
//             "name": "Create",
//             "slug": "create",
//             "sub_menu": []
//         }
//     ]
// },

// ]


// class Columns extends React.Component{
//   constructor(props){
//     super(props);
//   }

//   render(){
//     function Menus(menu, slug){
//             var slugs ='';
//             if(typeof menu.sub_menu === 'undefined'){
//                 if((menu.length > 0)){
//                     return(
//                         menu.map((val, ind)=>{
                          
//                             if(val.sub_menu.length > 0){
//                               val.slug = `${slug}/${val.slug}`
//                                 return(
//                                   <li style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}} >
//                                     <a href="#">{val.name}</a><a class="menu-toggle" href="#"></a>
//                                     <ul class="sub-menu">

//                                       { Menus(val.sub_menu, val.slug)}
                                      
//                                       {/* <li><a href="#">Link 2</a></li> */}
//                                     </ul>
//                                   </li>
                                  
//                                 )
//                             } else {
//                                 // return  <NavDropdown.Item href={`/${slug}/${val.slug}`}>{val.name}</NavDropdown.Item>
//                                return <li style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}} ><Link  to={`/admin/${slug}/${val.slug}`}>{val.name}</Link></li>
//                             }
//                         })
//                     )
//                 } else{
//                     // <NavDropdown.Item href={`/${slug}`}>{menu.name}</NavDropdown.Item>
//                     // return <li><Link  to={`/admin/${slug}`}>{menu.name}</Link></li>
//                    return <li><Link to={`/admin/${slug}/${menu.slug}`}>{menu.name}</Link></li>
//                 }
//             } else {
//                 return(
//                   // <li><Link  to={`/admin/${slug}`}>{menu.name}</Link></li>
                 
//                   <li style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}} ><Link to={`/admin/${slug}`}>{menu.name}</Link></li>
//                 )
//             }
//         }
//     return(
//       <>
//       {
//         data.map((value, index)=>{
//          // console.log("value",value,"index",index)
//           if(value.sub_menu.length > 0){
//             return(
              
//               <li style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}} >
//                 <a href="#">{value.name}</a><a class="menu-toggle" href="#"></a>
//                 <ul class="sub-menu">

//                   {Menus(value.sub_menu,value.slug)}
                  
//                   {/* <li><a href="#">Link 2</a></li> */}
//                 </ul>
//               </li>
//             )
//           } else {

//             return(
//               <li style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}} ><Link to={value.name=="Dashboard"?`${value.slug}`:`/admin/${value.slug}`}>{value.name}</Link></li>
              
//             )
//           }
//         })
//       }
//       </>
//     )
//   }
// }





