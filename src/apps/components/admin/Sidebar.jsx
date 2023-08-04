import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-gray-700 w-72 min-h-screen pt-[64px] hidden lg:block'>
      <div
        className='
          text-white
          font-semibold
          flex flex-col
        '
      >

        <NavLink to='/dashboardAdmin' className='sidebar py-3 px-5 active:bg-gray-500 hover:bg-gray-600'>
          <div className='flex gap-3 items-center'>
            <i className="fa-solid fa-house-chimney"></i>
            <h1>Dashboard</h1>
          </div>
        </NavLink>

        <NavLink to='/user' className='sidebar py-3 px-5 active:bg-gray-500 hover:bg-gray-600'>
          <div className='flex gap-3 items-center'>
            <i className="fa-solid fa-user"></i>
            <h1>Pengguna</h1>
          </div>
        </NavLink>

        <NavLink to='/fruits' className='sidebar py-3 px-5 active:bg-gray-500 hover:bg-gray-600'>
          <div className='flex gap-3 items-center'>
            <i className="fa-brands fa-apple"></i>
            <h1>Manage Buah</h1>
          </div>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
