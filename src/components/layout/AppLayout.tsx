import React from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='dashboard'>
        <Sidebar/>
        <main className='dashboard-content'>
            <Header/>

            <Outlet/>

            <footer className='dashboard-footer'>
                WorkForce Employee Dashboard
            </footer>

        </main>
    </div>
  )
}

export default AppLayout