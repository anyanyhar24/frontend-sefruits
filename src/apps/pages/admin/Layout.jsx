/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import NavbarComponent from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import UsersSourceAPI from '../../api/resources/UsersSource'
import jwtDecode from 'jwt-decode'
import ToastNotification from '../../components/helpers/ToasNotify'
import BottomNavigation from '../../components/admin/BottomNavigation'

const Layout = ({ children }) => {
  const [fullname, setFullname] = useState('')
  const [userId, setUserId] = useState('')

  const getUserById = async () => {
    try {
      const { id } = jwtDecode(localStorage.getItem('accessToken'))
      const response = await UsersSourceAPI.getUserById(id)
      setUserId(id)
      setFullname(response.fullname)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  useEffect(() => {
    getUserById()
  }, [])

  return (
    <div
      className='bg-gray-50 min-h-screen h-full'
    >
      <NavbarComponent
        fullname={fullname}
        id={userId}
      />
      <div className='flex'>
        <Sidebar/>
        <div
          className='pt-20 p-4 w-full overflow-hidden mb-[72px] md:mb-0'
        >
          {children}
        </div>
      </div>
      <BottomNavigation id={userId} />
    </div>
  )
}

export default Layout
