import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ToastNotification from '../helpers/ToasNotify'
import UsersSourceAPI from '../../api/resources/UsersSource'
import SpinnerElement from '../helpers/SpinnerElement'

const FormUpdateProfile = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getUserById = async (idUser) => {
    try {
      const response = await UsersSourceAPI.getUserById(idUser)
      setFullname(response.fullname)
      setUsername(response.username)
      setPassword(response.password)
      setEmail(response.email)
      setPhoneNumber(response.phoneNumber)
      setAddress(response.address)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  const updateUserById = async (e) => {
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

      const response = await UsersSourceAPI.putUserById(id, data)
      ToastNotification.toastSuccess(response)
      navigate('/user')
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getUserById(id)
  }, [])

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div className='w-full bg-white shadow p-5'>
        <h1
          className='
            font-bold
            text-lg
            lg:text-3xl
          '
          >
            Profile Pengguna
          </h1>

          <form
            onSubmit={updateUserById}
            className='w-full mt-6'
          >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>

              <div className='flex flex-col gap-1'>
                <label
                  className='font-semibold'
                >
                  Nama Lengkap
                </label>
                <input
                  type='text'
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder='Nama Lengkap Anda'
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username Anda'
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password Anda'
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Password Anda'
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                  required
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email Anda'
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
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
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder='Nomor Handphone Anda'
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='Alamat Anda'
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                />
              </div>

              <div className='mt-4 lg:mt-7'>
                <button
                  className='h-[52px] text-white font-semibold shadow-md bg-blue-500 hover:bg-blue-300 active:bg-blue-400 rounded transition-all w-full ease-in-out duration-100'
                >
                  Update
                </button>
              </div>

            </div>
          </form>
      </div>
    </>
  )
}

export default FormUpdateProfile
