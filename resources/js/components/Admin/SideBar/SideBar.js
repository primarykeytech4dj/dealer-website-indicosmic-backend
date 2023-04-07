import React from 'react'
import { Link } from 'react-router-dom'

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
   

        






        {/* <li className="nav-item" data-toggle="tooltip"  style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
          <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
            <i className="fa fa-fw fa-list"></i>
            <span className="nav-link-text">&nbsp;Master List</span>
          </a>
          <ul className="sidenav-second-level collapse" id="collapseMylistings">
            <li>
            <Link  to="/admin/user-list">User List</Link>
            </li>
            <li>
              <Link  to="/admin/claim-list">Claim List</Link> 
            </li>
            <li  >
              <Link  to="/admin/inspection-detail-list">Inspection Details</Link> 
            </li>
            <li>
              <Link  to="/admin/create-role">Role List</Link> 
            </li>
            <li>
            </li>
          </ul>
        </li> */}
    







        {/* <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Dashboard">
        
        <Link className="nav-link" to="/admin/user-list">
            <i className="fa fa-fw fa-list"></i>
            <span className="nav-link-text">&nbsp;Users List</span>
          </Link>
         
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Dashboard">
        
        <Link className="nav-link" to="/admin/claim-list">
            <i className="fa fa-fw fa-list"></i>
            <span className="nav-link-text">&nbsp;Claim List</span>
          </Link>
         
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Dashboard">
        
        <Link className="nav-link" to="/admin/inspection-detail-list">
            <i className="fa fa-fw fa-list"></i>
            <span className="nav-link-text">&nbsp;Inspection Detail List</span>
          </Link>
         
        </li>*/}
        {/* <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
          <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
            <i className="fa fa-fw fa-list"></i>
            <span className="nav-link-text">&nbsp;Roles</span>
          </a>
          <ul className="sidenav-second-level collapse" id="collapseMylistings">
            <li>
              <Link  to="/admin/create-role">Add Role</Link>
            </li>
            <li>
            <Link  to="/admin/role-list">Roles List</Link> 

            </li>
          </ul>
        </li>  */}
{/* 	<li className="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Bookings">
          <a className="nav-link" href="bookings.html">
            <i className="fa fa-fw fa-calendar-check-o"></i>
            <span className="nav-link-text">Bookings <span className="badge badge-pill badge-primary">6 New</span></span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Reviews">
          <a className="nav-link" href="reviews.html">
            <i className="fa fa-fw fa-star"></i>
            <span className="nav-link-text">Reviews</span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Bookmarks">
          <a className="nav-link" href="bookmarks.html">
            <i className="fa fa-fw fa-heart"></i>
            <span className="nav-link-text">Bookmarks</span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Add listing">
          <a className="nav-link" href="add-listing.html">
            <i className="fa fa-fw fa-plus-circle"></i>
            <span className="nav-link-text">Add listing</span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
          <a className="nav-link" href="user-profile.html">
            <i className="fa fa-fw fa-user"></i>
            <span className="nav-link-text">My Profile</span>
          </a>
        </li>
		<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
          <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseComponents">
            <i className="fa fa-fw fa-gear"></i>
            <span className="nav-link-text">Components</span>
          </a>
          <ul className="sidenav-second-level collapse" id="collapseComponents">
            <li>
              <a href="charts.html">Charts</a>
            </li>
			<li>
              <a href="tables.html">Tables</a>
            </li>
          </ul>
        </li> */}
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


class Columns extends React.Component {
  render() {
    var roles = JSON.parse(localStorage.getItem('user_roles'))
    
    if( (roles[0].role_code === "DA") || (roles[0].role_code === "WO" ) ){
      return (
        <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
          <i className="fa fa-fw fa-list"></i>
          <span className="nav-link-text">&nbsp;{roles[0].role_name} Bucket</span>
        </a>
        <ul className="sidenav-second-level collapse" id="collapseMylistings">
          
        {/* <li>
            <Link  to="/admin/claim-list">Claim List</Link>
          </li> */}
          <li>
            {/* <a >Expired <span className="badge badge-pill badge-danger">6</span></a> */}
          </li>
        </ul>
      </li>
      );

    // } else if( (roles[0].role_code === "AG")){
    //   return(
    //     <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Dashboard">
        
    //     <Link className="nav-link" to="/admin/claim-list">
    //         <i className="fa fa-fw fa-dashboard"></i>
    //         <span className="nav-link-text">&nbsp;Claim List</span>
    //       </Link>
         
    //     </li>
    //   )
     }
    else if((roles[0].role_code === "SA") || (roles[0].role_code === "AD") || (roles[0].role_code === "AS") || (roles[0].role_code === "CC")){
      return (
        <>

  



  <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
          <i className="fa fa-fw fa-list"></i>
          <span className="nav-link-text">&nbsp; Settings</span>
        </a>
        <ul className="sidenav-second-level collapse" id="collapseMylistings">
          
        <li><Link  to="/admin/setup/type/website">Website Setting</Link></li>
      <li><Link  to="/admin/setup/type/home">Home Setting</Link></li>
      <li><Link  to="/admin/setup/type/about">About US setting</Link></li>
      <li><Link  to="/admin/setup/type/services">Services Setting</Link></li>
      <li><Link  to="/admin/setup/type/products">Products Settings</Link></li>
      <li><Link  to="/admin/setup/type/gallery">Gallery Settings</Link></li>
      <li><Link  to="/admin/setup/type/services">Contact Us Settings</Link></li>
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


  <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
          <i className="fa fa-fw fa-list"></i>
          <span className="nav-link-text">&nbsp; Products</span>
        </a>
        <ul className="sidenav-second-level collapse" id="collapseMylistings">
        <li><Link  to="/admin/products/categories">Product Categories</Link></li>
      <li><Link  to="/admin/product/list">Products</Link></li>
        </ul>
  </li>

  <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
          <i className="fa fa-fw fa-list"></i>
          <span className="nav-link-text">&nbsp; Service </span>
        </a>
        <ul className="sidenav-second-level collapse" id="collapseMylistings">
        <li><Link  to="/admin/service/categories">Service Categories</Link></li>
      <li><Link  to="/admin/service/list">Services</Link></li>
        </ul>
  </li>

  <li className="nav-item" data-toggle="tooltip" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  data-placement="right" title="My listings">
        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings">
          <i className="fa fa-fw fa-list"></i>
          <span className="nav-link-text">&nbsp; Users</span>
        </a>
        <ul className="sidenav-second-level collapse" id="collapseMylistings">
        <li><Link  to="/admin/user-list">UserList</Link></li>
    
        </ul>
  </li>

  <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Testimonials">
  
    <Link className="nav-link" to="/admin/testimonials">
        <i className="fa fa-fw fa-dashboard"></i>
        <span className="nav-link-text">&nbsp;Testimonials</span>
    </Link>
        

  </li>
  <li className="nav-item" data-toggle="tooltip" data-placement="right" style={{borderBottomColor:"#183883", borderBottomWidth:"thin"}}  title="Invoice">
    
    <Link className="nav-link" to="/admin/invoice">
        <i className="fa fa-fw fa-dashboard"></i>
        <span className="nav-link-text">&nbsp;Invoice</span>
    </Link>
      

  </li>

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
    } else {
      return<></>
    }
  }
}