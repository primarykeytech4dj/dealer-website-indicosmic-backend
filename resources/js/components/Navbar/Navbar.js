import React, { useState } from 'react'
import "../../../css/Style.css"


import logo from "../../../assets/img/logo.png";
import logo_sticky from "../../../assets/img/logo_sticky.png";
import { Link } from 'react-router-dom';
import Login from "../Login/Login";
import Modals from "../Modal/Modals";
function Navbar(){

	const [modal, setmodal] = useState(false)

	const [color, setColor] = useState(false);
	const changeColor = () => {
		if(window.scrollY >= 70){
			setColor(true)
		}else{
			setColor(false)
		}
	}

	window.addEventListener('scroll', changeColor);

  return (
    <header className={color ? 'header header-sticky' : 'header'}>
		<div id="logo">
			<a href="">
				<img src={logo} width="150" height="36" alt="" className="logo_normal" />
				<img src={logo_sticky} width="150" height="36" alt="" className="logo_sticky" />
			</a>
		</div>
    <ul id="top_menu">
			<li><a href="cart-1.html" className="cart-menu-btn" title="Cart"><strong>4</strong></a></li>
			<li><a className="login" id="sign-in"   onClick={() => setmodal(true)} >Sign In</a></li>
			<li><a href="wishlist.html" className="wishlist_bt_top" title="Your wishlist">Your wishlist</a></li>
		</ul>

    <a href="#menu" className="btn_mobile">
			<div className="hamburger hamburger--spin" id="hamburger">
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
		</a>
		<nav id="menu" className="main-menu">
			<ul>
				<li><span><a href="#0">Home</a></span>
					<ul>
						<li><Link to="/admin">Home Default</Link></li>
						<li>
							<span><a href="#0">Sliders - Parallax</a></span>
							<ul>
								<li><a href="index-11.html">Revolution Slider 1</a></li>
								<li><a href="index-18.html">Revolution Slider 2</a></li>
								<li><a href="index-2.html">Flex Slider</a></li>
								<li><a href="index-4.html">Layer Slider</a></li>
								<li><a href="index-12.html">Parallax Youtube</a></li>
								<li><a href="index-13.html">Parallax Vimeo</a></li>
								<li><a href="index-14.html">Parallax Mp4 Video</a></li>
								<li><a href="index-15.html">Parallax Video Fullscreen</a></li>
								<li><a href="index-16.html">Parallax Image</a></li>
							</ul>
						</li>
						<li><a href="index-17.html">Text Rotator</a></li>
						<li><a href="index-3.html">Video Fallback Mobile</a></li>
						<li><a href="index-5.html">Search 2</a></li>
						<li><a href="index-10.html">Search 3 <strong className="badge badge-danger">New!</strong></a></li>
						<li><a href="index-7.html">Search 4</a></li>
						<li><a href="index-6.html">GDPR (EU law)</a></li>
                        <li><a href="index-8.html">Address Autocomplete</a></li>
                        <li><a href="index-9.html">Home AirBnb</a></li>
					</ul>
				</li>
				<li><span><a href="#0">Tours</a></span>
					<ul>
						<li>
							<span><a href="#0">Tours Grid</a></span>
							<ul>
								<li><a href="tours-grid-isotope.html">Tours Grid Isotope</a></li>
								<li><a href="tours-grid-sidebar.html">Tours Grid Sidebar</a></li>
								<li><a href="tours-grid-sidebar-2.html">Tours Grid Sidebar 2</a></li>
								<li><a href="tours-grid.html">Tours Grid Simple</a></li>
							</ul>
						</li>
						<li>
							<span><a href="#0">Tours List</a></span>
							<ul>
								<li><a href="tours-list-isotope.html">Tours List Isotope</a></li>
								<li><a href="tours-list-sidebar.html">Tours List Sidebar</a></li>
								<li><a href="tours-list-sidebar-2.html">Tours List Sidebar 2</a></li>
								<li><a href="tours-list.html">Tours List Simple</a></li>
							</ul>
						</li>
						<li><a href="tours-half-screen-map.html">Tours Half Screen Map</a></li>
						<li><a href="tour-detail.html">Tour Detail</a></li>
						<li><a href="detail-working-contact-form.html">Detail Contact Form <strong className="badge badge-danger">New!</strong></a></li>
						<li>
							<span><a href="#0">Open Street Map</a></span>
							<ul>
								<li><a href="tours-half-screen-map-leaflet.html">Tours Half Screen Map</a></li>
								<li><a href="tours-list-isotope-leaflet.html">Tours Grid Isotope</a></li>
								<li><a href="tours-list-sidebar-leaflet.html">Tours Grid Sidebar</a></li>
								<li><a href="tours-list-sidebar-2-leaflet.html">Tours Grid Sidebar 2</a></li>
								<li><a href="tours-list-leaflet.html">Tours Grid Simple</a></li>
								<li><a href="tours-list-isotope-leaflet.html">Tours List Isotope</a></li>
								<li><a href="tours-list-sidebar-leaflet.html">Tours List Sidebar</a></li>
								<li><a href="tours-list-sidebar-2-leaflet.html">Tours List Sidebar 2</a></li>
								<li><a href="tours-list-leaflet.html">Tours List Simple</a></li>
								<li><a href="tour-detail-leaflet.html">Tour Detail</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li><span><a href="#0">Hotels</a></span>
					<ul>
						<li>
							<span><a href="#0">Hotel Grid</a></span>
							<ul>
								<li><a href="hotels-grid-isotope.html">Hotel Grid Isotope</a></li>
								<li><a href="hotels-grid-sidebar.html">Hotel Grid Sidebar</a></li>
								<li><a href="hotels-grid-sidebar-2.html">Hotel Grid Sidebar 2</a></li>
								<li><a href="hotels-grid.html">Hotel Grid Simple</a></li>
							</ul>
						</li>
						<li>
							<span><a href="#0">Hotel List</a></span>
							<ul>
								<li><a href="hotels-list-isotope.html">Hotel List Isotope</a></li>
								<li><a href="hotels-list-sidebar.html">Hotel List Sidebar</a></li>
								<li><a href="hotels-list-sidebar-2.html">Hotel List Sidebar 2</a></li>
								<li><a href="hotels-list.html">Hotel List Simple</a></li>
							</ul>
						</li>
						<li><a href="hotels-half-screen-map.html">Hotel Half Screen Map</a></li>
						<li><a href="hotel-detail.html">Hotel Detail</a></li>
					</ul>
				</li>
				<li><span><a href="#0">Eat &amp; Drink</a></span>
					<ul>
						<li>
							<span><a href="#0">Restaurant Grid</a></span>
							<ul>
								<li><a href="restaurants-grid-isotope.html">Restaurant Grid Isotope</a></li>
								<li><a href="restaurants-grid-sidebar.html">Restaurant Grid Sidebar</a></li>
								<li><a href="restaurants-grid-sidebar-2.html">Restaurant Grid Sidebar 2</a></li>
								<li><a href="restaurants-grid.html">Restaurant Grid simple</a></li>
							</ul>
						</li>
						<li>
							<span><a href="#0">Restaurant List</a></span>
							<ul>
								<li><a href="restaurants-list-isotope.html">Restaurant List Isotope</a></li>
								<li><a href="restaurants-list-sidebar.html">Restaurant List Sidebar</a></li>
								<li><a href="restaurants-list-sidebar-2.html">Restaurant List Sidebar 2</a></li>
								<li><a href="restaurants-list.html">Restaurant List Simple</a></li>
							</ul>
						</li>
						<li><a href="restaurants-half-screen-map.html">Half Screen Map</a></li>
						<li><a href="restaurant-detail.html">Restaurant Detail</a></li>
					</ul>
				</li>
				<li><span><Link to="/admin/adventure">Adventure</Link></span></li>
				<li><span><a href="#0">Pages</a></span>
					<ul>
						<li><Link to="/admin/about">About</Link></li>
						<li><a href="media-gallery.html">Media gallery</a></li>
						<li><a href="help.html">Help Section</a></li>
						<li><a href="faq.html">Faq Section</a></li>
						<li><a href="wishlist.html">Wishlist page</a></li>
						<li><a href="contacts.html">Contacts</a></li>
						<li><a href="">login</a></li>
						<li><Link to='/admin/signup'>Register</Link></li>
						<li><a href="blog.html">Blog</a></li>
						<li><a href="bootstrap-modal.html">Bootstrap Modal <strong className="badge badge-danger">New!</strong></a></li>
						<li><a href="modal-version-2.html">Another Modal <strong className="badge badge-danger">New!</strong></a></li>
						<li><a href="pricing-tables-2.html">Pricing Tables 1 <strong className="badge badge-danger">New!</strong></a></li>
						<li><a href="pricing-tables-3.html">Pricing Tables 2 <strong className="badge badge-danger">New!</strong></a></li>
					</ul>
				</li>
				<li><span><a href="#0">Extra</a></span>
					<ul>
                    	<li><a href="menu-options.html">Menu Position Options</a></li>
                    	<li><a href="tour-detail-singlemonth-datepicker.html">Single month Datepicker</a></li>
						<li><a href="404.html">404 Error page</a></li>
						<li><a href="cart-1.html">Cart page 1</a></li>
						<li><a href="cart-2.html">Cart page 2</a></li>
						<li><a href="cart-3.html">Cart page 3</a></li>
						<li><a href="pricing-tables.html">Responsive pricing tables</a></li>
						<li><a href="coming_soon/index.html">Coming soon</a></li>
						<li><a href="invoice.html">Invoice</a></li>
						<li><a href="icon-pack-1.html">Icon pack 1</a></li>
						<li><a href="icon-pack-2.html">Icon pack 2</a></li>
						<li><a href="icon-pack-3.html">Icon pack 3</a></li>
						<li><a href="icon-pack-4.html">Icon pack 4</a></li>
                        <li><a href="hamburgers.html">Animated Hamburgers</a></li>
					</ul>
				</li>
				<li><span><a href="#0">Buy template</a></span></li>
			</ul>
		</nav>
		<Modals toggle={() => setmodal(!modal)} isOpen={modal} content={<Login />}></Modals>
		
	</header>

  )
}

export default Navbar