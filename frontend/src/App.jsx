import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import AdminPosts from './pages/AdminPosts'
import AddPost from './pages/AddPost'

import AdminComments from './pages/AdminComments'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/posts' element={<AdminPosts />} />
        <Route path="/admin/add-post" element={<AddPost />} />
         {/* <Route path="/admin/edit-post/:id" element={<EditPost />} />
          <Route path="/admin/delete-post/:id" element={<DeletePost />} /> */}
          <Route path="/admin/comments" element={<AdminComments />} />
      </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App
