/* eslint-disable react/prop-types */
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import UsersSourceAPI from '../../api/resources/UsersSource'

const PrivateRoute = ({ redirectPath, role, children }) => {
  const [roleLogged, setRoleLogged] = useState('')
  const accessToken = localStorage.getItem('accessToken')

  const getRole = async () => {
    if (accessToken) {
      const user = jwtDecode(accessToken)
      const { id } = user
      try {
        const response = await UsersSourceAPI.getUserById(id)
        setRoleLogged(response.role)
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    getRole()
  }, [accessToken])

  if (roleLogged && roleLogged !== role) {
    return <Navigate to={redirectPath} />
  }

  return children
}

export default PrivateRoute
