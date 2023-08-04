/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import NavbarComponent from '../../components/client/Navbar'
import jwtDecode from 'jwt-decode'
import UsersSourceAPI from '../../api/resources/UsersSource'
import ToastNotification from '../../components/helpers/ToasNotify'
import FooterComponent from '../../components/client/Footer'

const Layout = ({ children }) => {
  const [userId, setUserId] = useState('')
  const [fullname, setFullname] = useState('')

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
    <>
      <div className='bg-blue-50 min-h-screen h-full'>
        <NavbarComponent
          fullname={fullname}
          id={userId}
        />
        {children}
        <FooterComponent/>
      </div>
    </>
  )
}

export default Layout
