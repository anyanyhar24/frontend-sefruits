import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from './utils/RequireAuth'
import PrivateRoute from './utils/privateRoute'
import {
  // Common Pages
  LoginPage,
  RegisterPages,

  // adminPages
  DashboardAdmin,
  Users,
  UpdateUsers,
  AddNewUsers,
  Fruits,
  UpdateFruits,
  AddNewFruits,

  // User Pages
  HomePageUsers,
  UserProfile,

  // Error
  UnAuthorizedPages
} from '../pages'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPages/>} />
        <Route path='/unAuthorized' element={<UnAuthorizedPages/>}/>

        {/* Parent Routes Auth Requirement */}
        <Route element={<RequireAuth redirectPath='/' />}>

          {/* Private Routes For Admin */}
          <Route
            path='/dashboardAdmin'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='admin'
              >
                <DashboardAdmin/>
              </PrivateRoute>
            }
          />

          <Route
            path='/user'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='admin'
              >
                <Users/>
              </PrivateRoute>
            }
          />

          <Route
            path='/user/addNewUser'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='admin'
              >
                <AddNewUsers/>
              </PrivateRoute>
            }
          />

          <Route
            path='/user/profile/:id'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='admin'
              >
                <UpdateUsers/>
              </PrivateRoute>
            }
          />

          <Route
            path='/fruits'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='admin'
              >
                <Fruits/>
              </PrivateRoute>
            }
          />

          <Route
            path='/fruits/addNewFruits'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='admin'
              >
                <AddNewFruits/>
              </PrivateRoute>
            }
          />

          <Route
            path='/fruits/detail/:id'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='admin'
              >
                <UpdateFruits/>
              </PrivateRoute>
            }
          />

          {/* Private Routes For Users */}
          <Route
            path='/homepageUsers'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='user'
              >
                <HomePageUsers/>
              </PrivateRoute>
            }
          />

          <Route
            path='/user/myProfile/:id'
            element={
              <PrivateRoute
                redirectPath='/unAuthorized'
                role='user'
              >
                <UserProfile/>
              </PrivateRoute>
            }
          >
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
