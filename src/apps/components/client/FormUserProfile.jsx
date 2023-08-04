import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ToastNotification from '../helpers/ToasNotify'
import UsersSourceAPI from '../../api/resources/UsersSource'
import SpinnerElement from '../helpers/SpinnerElement'

const FormUserProfile = () => {
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
      <form onSubmit={updateUserById}>
        <div className='bg-white shadow p-5 h-full rounded-lg flex flex-col md:flex-row mb-20'>
          <div className='px-6 py-8 lg:px-12 flex flex-col gap-6 basis-1/2 '>
            <h2 className='font-bold text-xl mb-2'>Informasi Akun</h2>
            <div
              className='flex flex-col gap-4 border-2 p-6 rounded-lg'
              onSubmit={updateUserById}
            >
              <div className='flex flex-col gap-1'>
                <label className='font-semibold'>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                  placeholder='Username Anda'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold'>
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                  placeholder='Email Anda'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold'>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                  placeholder='Password Anda'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold'>
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                  placeholder='Konfirmasi Password Anda'
                  required
                />
              </div>
            </div>
          </div>

          <div className='px-6 py-8 lg:px-12 flex flex-col gap-6 basis-1/2'>
            <h2 className='font-bold text-xl mb-2'>Informasi Personal</h2>
            <div className='flex flex-col gap-4 border-2 p-6 rounded-lg'>
              <div className='flex flex-col gap-1'>
                <label className='font-semibold'>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                  placeholder='Nama Lengkap Anda'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold'>
                  Nomor Handphone
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                  placeholder='Nomor Handphone Anda'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold'>
                  Alamat
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                  placeholder='Alamat Anda'
                />
              </div>
            </div>

            <div className='mt-4 lg:mt-5'>
              <button className='h-[52px] text-white font-semibold shadow-md bg-blue-500 hover:bg-blue-300 active:bg-blue-400 rounded transition-all w-full ease-in-out duration-100'>
                Update Profil
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default FormUserProfile
