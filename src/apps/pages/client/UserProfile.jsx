import React from 'react'
import Layout from './Layout'
import FormUserProfile from '../../components/client/FormUserProfile'

const UserProfile = () => {
  return (
    <Layout>
    <div className='bg-slate-50 px-6 py-6 lg:px-12'>
      <h1 className='font-bold text-2xl text-sky-900 mb-6 text-center'>
        Profil Pengguna
      </h1>
      <FormUserProfile/>
    </div>
    </Layout>
  )
}

export default UserProfile
