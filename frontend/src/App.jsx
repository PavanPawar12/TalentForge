import React from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Brows from './components/Brows'
import  Profile  from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import EditJob from './components/admin/EditJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Brows/>
  },
  {
    path:'/profile',
    element:(<ProtectedRoute allowedRoles={['student']}><Profile/></ProtectedRoute>)
  },


  // admin start from here: admin yethun chalu hoil
  {
    path:"/admin/companies",
    element:(<ProtectedRoute allowedRoles={['recruiter']}><Companies/></ProtectedRoute>)
  },
  {
    path:"/admin/companies/create",
    element:(<ProtectedRoute allowedRoles={['recruiter']}><CompanyCreate/></ProtectedRoute>)
  },
  {
    path:"/admin/companies/:id",
    element:(<ProtectedRoute allowedRoles={['recruiter']}><CompanySetup/></ProtectedRoute>)
  },
  {
    path:"/admin/jobs",
    element:(<ProtectedRoute allowedRoles={['recruiter']}><AdminJobs/></ProtectedRoute>)
  },
  {
    path:"/admin/jobs/create",
    element:(<ProtectedRoute allowedRoles={['recruiter']}><PostJob/></ProtectedRoute>)
  },
  {
    path:"/admin/jobs/:id/edit",
    element:(<ProtectedRoute allowedRoles={['recruiter']}><EditJob/></ProtectedRoute>)
  },
  {
    path:"/admin/jobs/:id/applicant",
    element:(<ProtectedRoute allowedRoles={['recruiter']}><Applicants/></ProtectedRoute>)
  }

])

const App = () => {
  return (
    <>
      <RouterProvider router = { appRouter }/>
    </>
  )
}

export default App
