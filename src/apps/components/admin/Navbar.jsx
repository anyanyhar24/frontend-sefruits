/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Logo from '../../assets/images/mainLogo.png'
import AuthSourceAPI from '../../api/resources/AuthSource'
import { useNavigate, NavLink } from 'react-router-dom'
import ToastNotification from '../helpers/ToasNotify'
import Swal from 'sweetalert2'
import SpinnerElement from '../helpers/SpinnerElement'

const NavbarComponent = ({ fullname, id }) => {
  const [dropdown, setDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleDropdown = () => {
    setDropdown(!dropdown)
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await AuthSourceAPI.logout()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate('/')
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  const alerLogout = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Anda Ingin Logout?',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout()
      }
    })
  }

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div
        className='fixed inset-x-0 flex justify-between px-5 py-3 bg-white box-border shadow z-50'
      >
        <div
          className='
            flex
            gap-2
            justify-center
            items-center
            relative
          '
        >
          <img
            src={Logo}
            alt='seFruits'
            className='h-8 md:h-10'
          />

          <h1
            className='
              font-bold
              text-lg
              md:text-2xl
              inline-block
            '
          >
            SeFruits APP
          </h1>
        </div>

        <div
          className='
            flex
            gap-2
            justify-center
            items-center
          '
        >
          <h2 className='hidden md:inline-block'>Halo, { fullname ? fullname : <>Admin</> } |</h2>

          <div>
            <button
              onClick={handleDropdown}
              className='bg-blue-500 hover:bg-blue-200 active:bg-blue-300 rounded-lg px-2 py-1 text-white shadow'
            >
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>
        </div>
      </div>

      {
        dropdown &&
        <div
          onClick={() => setDropdown(false)}
          className='
            absolute
            inset-0
            z-40
          '
        >
          <div
            className='
              fixed
              top-16
              md:top-20
              right-4
              md:right-5
              border
              bg-white
              rounded
              shadow-md
              z-50
            '
          >
            <NavLink to={`/user/profile/${id}`}>
              <div className='p-3 pl-4 w-32 hover:bg-gray-100 border-b cursor-pointer'>
               <i className="fa-regular fa-address-card mr-2"></i>
                Profile
              </div>
            </NavLink>

            <div
              onClick={alerLogout}
              className='p-3 pl-4 w-32 hover:bg-gray-100 cursor-pointer'>
                <i className="fa-solid fa-power-off mr-2"></i>
                Logout
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default NavbarComponent
