import React from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import About_us from '../Pages/About'
import MainHomePage from '../Pages/Main_home_page'
import Adventure from '../Pages/Adventure'

import Form from '../Pages/Form'
import SiderBar from '../components/SiderBar/SiderBar'

import SignUp from '../components/SignUp/SignUp';
import Layout from '../components/Admin/Layout/Layout'

import Login  from '../components/Admin/Pages/Login/Login'

const isLoggedIn = () => {
  if(localStorage.getItem('dealer_token')){

    return true
  } else {
    return false
  }
}
const Routerss = () => {
  return (
    <div>
      {isLoggedIn()
      
        ? 

        <Layout/>
          
        :
        <Router>
          <Routes>
          <Route path='/' element={<Login/>} ></Route> 
        <Route path='/admin' element={<Login/>} ></Route> 
          {/* <Login /> */}

          </Routes>
        </Router>
        //   <Navbar/>
        //     <Routes>       
        //         {/* <Route path='/' element={<About_us/>} exact></Route>
        //         <Route path='/about' element={<Our_hotels/>} ></Route> */}
        //         <Route exact path="/" element={<MainHomePage />} />
        //         <Route path="/adventure" element={<Adventure />} />
        //         <Route path="/about" element={<About_us />} />
        //         {/* <Route path="/login" element={<Login />} /> */}
        //     </Routes>
        
        }
    </div>
  )
}

export default Routerss
