import { BrowserRouter, Navigate, Route,  Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home.jsx'
import { Login } from './Pages/Login.jsx'
import { Order } from './Pages/Order.jsx'
import { Cart } from './Pages/Cart.jsx'
import { Product } from './Pages/Product.jsx'
import { Content } from './Pages/Content.jsx'
import { Navbar } from './Components/Navbar.jsx'
import { SearchBar } from './Components/SearchBar.jsx'
import {Toaster} from "react-hot-toast";
import { Signup } from './Pages/Signup.jsx'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from './Context/ShopContext.jsx'
import { MyOrders } from './Pages/MyOrders.jsx'

function App() {
  const {user,fetchUser,loading}=useContext(ShopContext);
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  return (
    <>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/order' element={user?<Order/>:<Navigate to="/login"/>}/>
        <Route path='/cart' element={user?<Cart/>:<Navigate to="/login"/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/content' element={<Content/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/my-orders' element={user?<MyOrders/>:<Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
