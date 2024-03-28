import React from 'react'
import '../Header/header.scss'
import Header from '../Header/Header'
import {Outlet} from 'react-router-dom'
import Footer from '../Footer/Footer'
function Layout() {
  return (
    <div className='layout'>
     <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout