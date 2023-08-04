import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ToastNotification from '../../components/helpers/ToasNotify'
import UsersSourceAPI from '../../api/resources/UsersSource'
import SpinnerElement from '../helpers/SpinnerElement'

const FormAddUser = () => {
  const navigate = useNavigate()

  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [address, setAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddNewUser = async (e) => {
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
      navigate('/user')
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

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
          Tambah Penguna Baru
        </h1>

        <form
          onSubmit={handleAddNewUser}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Password Anda'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
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
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Alamat Anda'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='mt-4 lg:mt-7'>
              <button
                className='h-[52px] text-white font-semibold shadow-md bg-blue-500 hover:bg-blue-300 active:bg-blue-400 rounded transition-all w-full ease-in-out duration-100'
              >
                Tambah
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default FormAddUser
