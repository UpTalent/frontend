import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'



const AppLayout = () => {
  return (
    <>
      <Header />
      <div className='appContainer'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default AppLayout
