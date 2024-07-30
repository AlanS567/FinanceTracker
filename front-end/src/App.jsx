import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import Addexp from './components/Addexp'
import Admin_Panel from './components/Admin_Panel'


function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/addexp' element={<Addexp/>}/>
        <Route path='/admin' element={<Admin_Panel/>}/>
      </Routes>      
    </>
  )
}

export default App
