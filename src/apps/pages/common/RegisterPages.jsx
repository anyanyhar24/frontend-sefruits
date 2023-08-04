/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Logo from '../../assets/images/mainLogo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import UsersSourceAPI from '../../api/resources/UsersSource'
import SpinnerElement from '../../components/helpers/SpinnerElement'
import ToastNotification from '../../components/helpers/ToasNotify'

const RegisterPages = () => {
  const navigate = useNavigate()

  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [address, setAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = {
        fullname,
        username,
        password,
        confirmPassword,
        email,
        phoneNumber,
        address
      }

      const response = await UsersSourceAPI.register(data)
      ToastNotification.toastSuccess(response)
      navigate('/')
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      { isLoading && <SpinnerElement/> }
      <div className='bg-blue-600 md:bg-gray-50 w-full overflow-hidden md:h-screen flex justify-center items-center'>

      <div className='w-full md:w-5/6 md:h-[85%] md:shadow-xl flex justify-center items-center md:rounded-lg'>

        <div
          className='w-1/2 h-full bg-gradient-to-br from-sky-300 to-blue-600 text-white rounded-tl-lg rounded-bl-lg hidden md:flex flex-col justify-center items-center relative'
        >

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className='absolute top-0 right-0 w-64 blur-3xl'
          >
            <path fill="#A7F0BA" d="M47.4,-54C56.5,-48.9,55.4,-29.3,54.9,-12.6C54.3,4,54.2,17.7,50.1,32.6C45.9,47.6,37.5,64,24.9,68.6C12.3,73.3,-4.7,66.3,-15.6,56.4C-26.5,46.6,-31.5,33.8,-44.3,21C-57.1,8.2,-77.8,-4.6,-81.8,-20.1C-85.8,-35.6,-73.2,-53.9,-56.7,-57.6C-40.3,-61.4,-20.2,-50.7,-0.5,-50.1C19.2,-49.6,38.4,-59.1,47.4,-54Z" transform="translate(100 100)" />
          </svg>

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className='absolute top-14 right-16 w-56 blur-3xl'
          >
            <path fill="#F1C21B" d="M33.3,-33C44.9,-29.9,57.4,-21.1,62.9,-8.4C68.3,4.3,66.7,21,57.4,29.3C48,37.7,30.9,37.8,15.5,44.2C0,50.6,-13.8,63.3,-19.1,58.7C-24.3,54.1,-21,32.1,-25.3,17.9C-29.6,3.6,-41.6,-2.9,-45.9,-13.3C-50.3,-23.6,-46.9,-37.8,-38,-41.4C-29.1,-45,-14.5,-38.1,-1.9,-35.9C10.8,-33.6,21.6,-36.2,33.3,-33Z" transform="translate(100 100)" />
          </svg>

          <div className='w-4/5 flex flex-col gap-4'>
            <div className='flex items-end gap-2'>
              <img
                src={Logo}
                alt='Logo'
                className='w-14 h-14 drop-shadow-lg'
              />
              <h1
                className='font-bold text-6xl'
              >
                SeFruits
              </h1>
            </div>

            <p
              className='text-2xl font-semibold inline-block'
            >
              "Ungkap keindahan dan keanekaragaman buah dengan sefruits."
            </p>

            <div>
              <p className='font-semibold'>Sudah punya akun? <NavLink className='underline hover:text-blue-200 active:text-white' to='/'>Login</NavLink></p>
            </div>

          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className='w-full md:w-1/2 mt-6 md:mt-0 h-full bg-white rounded-t-[3rem] md:rounded-tl-none md:rounded-tr-lg md:rounded-br-lg p-7 md:p-9'
        >
          <div
            className='flex flex-col gap-4 justify-center items-center'
          >
            <img
              src={Logo}
              alt='Logo'
              className='w-14 h-14 drop-shadow-lg'
            />

            <h1
              className='font-bold text-gray-800 text-3xl'
            >
              Registrasi Akun
            </h1>
          </div>

          <div className='border my-3'></div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Nama Lengkap
              </label>
              <input
                type='text'
                placeholder='Nama Lengkap Anda'
                onChange={(e) => setFullname(e.target.value)}
                className='p-2 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Username
              </label>
              <input
                type='text'
                placeholder='Username Anda'
                onChange={(e) => setUsername(e.target.value)}
                className='p-2 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Password
              </label>
              <input
                type='password'
                placeholder='Password Anda'
                onChange={(e) => setPassword(e.target.value)}
                className='p-2 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Konfirmasi Password
              </label>
              <input
                type='password'
                placeholder='Password Anda'
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='p-2 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Email
              </label>
              <input
                type='email'
                placeholder='Email Anda'
                onChange={(e) => setEmail(e.target.value)}
                className='p-2 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Nomor Handphone
              </label>
              <input
                type='text'
                placeholder='Nomor Handphone Anda'
                onChange={(e) => setPhoneNumber(e.target.value)}
                className='p-2 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Alamat
              </label>
              <input
                type='text'
                placeholder='Alamat Anda'
                onChange={(e) => setAddress(e.target.value)}
                className='p-2 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='mt-4 lg:mt-7'>
              <button
                className='h-11 text-white font-semibold shadow-md bg-blue-600 hover:bg-blue-300 active:bg-blue-400 rounded transition-all w-full ease-in-out duration-100'
              >
                Daftar
              </button>

              <div className='md:hidden text-center mt-4 font-semibold'>
                <div className='border my-4'></div>
                <span>Sudah punya akun? <NavLink className='text-blue-600' to='/'>Login</NavLink></span>
              </div>
            </div>

          </div>
        </form>
      </div>
      </div>
    </React.Fragment>
  )
}

export default RegisterPages
