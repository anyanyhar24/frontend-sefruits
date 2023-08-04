import React, { useState, useEffect } from 'react'
import AuthSourceAPI from '../../api/resources/AuthSource'
import UsersSourceAPI from '../../api/resources/UsersSource'
import jwtDecode from 'jwt-decode'
import { useNavigate, NavLink } from 'react-router-dom'
import Logo from '../../assets/images/mainLogo.png'
import SpinnerElement from '../../components/helpers/SpinnerElement'
import ToastNotification from '../../components/helpers/ToasNotify'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [role, setRole] = useState('')
  const [rotate, setRotate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = { email, password }
      const response = await AuthSourceAPI.login(data)
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)

      setAccessToken(response.accessToken)
      ToastNotification.toastSuccess('Berhasil Login')
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  const getUserById = async () => {
    if (accessToken) {
      const user = jwtDecode(accessToken)
      try {
        const response = await UsersSourceAPI.getUserById(user.id)
        setRole(response.role)
      } catch (error) {
        ToastNotification.toastError(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    getUserById()
  }, [accessToken])

  useEffect(() => {
    if (role === 'admin') {
      navigate('/dashboardAdmin')
    }

    if (role === 'user') {
      navigate('/homepageUsers')
    }
  }, [role])

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div className='bg-blue-600 md:bg-gray-50 w-full overflow-hidden h-screen flex justify-center items-center relative'>

        <div className='md:hidden bg-white rounded-t-full top-10 bottom-0 -inset-x-28 absolute'></div>

        <div
          className={`absolute md:w-[35rem] md:h-[30rem] rounded-lg bg-gradient-to-t from-blue-200 to-blue-500 transition-all ease-out duration-500 shadow-lg ${rotate ? 'rotate-6' : '-rotate-6'}`}
        ></div>

        <div
          onMouseEnter={() => setRotate(true)}
          onMouseLeave={() => setRotate(false)}
          className='md:bg-white w-96 md:w-[35rem] md:h-[30rem] rounded-lg md:shadow-md px-7 py-9 flex justify-center items-center md:border-t-4 md:border-blue-600 z-10'
        >
          <form
            onSubmit={handleLogin}
            className='w-96 flex flex-col justify-center items-center space-y-4'
          >
            <img
              src={Logo}
              alt='Logo'
              className='w-16 md:w-14 drop-shadow-md'
            />
            <h1
              className='font-bold text-3xl inline-block text-center text-gray-800'
            >
              Sefruits Apps
            </h1>

            <div
              className='flex flex-col gap-2 w-full'
            >
              <label
                className='font-semibold'
              >
                Email
              </label>
              <input
                type='email'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Masukkan Email anda'
                required
              />
            </div>

            <div
              className='flex flex-col gap-2 w-full'
            >
              <label
                className='font-semibold'
              >
                Password
              </label>
              <input
                type='password'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Masukkan Password anda'
              />
            </div>

            <div
              className='w-full'
            >
              <button
                className='p-3 text-white font-semibold shadow-md bg-blue-600 hover:bg-blue-300 active:bg-blue-400 rounded transition-all w-full ease-in-out duration-100'
              >
                Login
              </button>
            </div>

            <div className='border border-gray-100 w-full'>

            </div>

            <div>
              <span className='text-gray-400 text-sm text-center'>
                Engga punya akun?,
                <NavLink to='/register'>
                  <span className='text-blue-500 hover:text-blue-300 active:text-blue-500 cursor-pointer font-bold'> Daftar Sekarang</span>
                </NavLink>
              </span>
            </div>
          </form>
        </div>
        </div>
    </>
  )
}

export default LoginPage
