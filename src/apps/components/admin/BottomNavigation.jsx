/* eslint-disable react/prop-types */
import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomNavigation = () => {
  return (
    <>
      <div
        className='
          fixed
          bottom-0
          inset-x-0
          h-[66px]
          lg:hidden
          bg-white
          flex
          justify-evenly
          items-center
          shadow-lg
          border
        '
      >
        <NavLink
          to='/user'
          className='
            bottomNavigation
            active:text-blue-500
          '
        >
          <div className='
              flex
              flex-col
              gap-2
              items-center
            '
          >
            <i className="fa-solid fa-user-group"></i>
            <span className='text-xs'>Users</span>
          </div>
        </NavLink>

        <NavLink
          to='/dashboardAdmin'
          className='
            bottomNavigation
            active:text-blue-500
          '
        >
          <div
            className='
              flex
              flex-col
              gap-2
              items-center
            '
          >
            <i className="fa-solid fa-house"></i>
            <span className='text-xs'>Home</span>
          </div>
        </NavLink>

        <NavLink
          to='/fruits'
          className='
            bottomNavigation
            active:text-blue-500
          '
        >
          <div
            className='
              flex
              flex-col
              gap-2
              items-center
            '
          >
            <i className="fa-brands fa-apple"></i>
            <span className='text-xs'>Buah</span>
          </div>
        </NavLink>

      </div>
    </>
  )
}

export default BottomNavigation
