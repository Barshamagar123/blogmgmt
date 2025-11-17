import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminPosts from './pages/AdminPosts';
import AddPost from './pages/AddPost';
import AdminComments from './pages/AdminComments';
import ProtectedRoute from './components/ProtectedRoute'; // ProtectedRoute component
import Post from './pages/Post';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
    <Route path='/posts/:id' element={<Post />} />
        {/* Protected Admin Routes */}
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute adminOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/admin/posts' 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPosts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/admin/add-post' 
          element={
            <ProtectedRoute adminOnly={true}>
              <AddPost />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/admin/comments' 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminComments />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
