import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import UserDashboard from '../pages/user/UserDashboard'
import Home from '../pages/Home'
import NavBar from '../components/NavBar'
// import { ProductsManager } from '../components/product/ProductsManager'
import Categories from '../components/adminCompanents/Categories'
import ProductsAdmin from '../components/adminCompanents/ProductsAdmin'
import Products from '../components/product/Products'
import ManageUsers from '../components/adminCompanents/ManageUsers'
import SignIn from '../pages/SignIn'
import UserRouting from './UserRouting'
import AdminRouting from './AdminRouting'
import ProductDetails from '../components/product/ProductDetails'
import SignUp from '../pages/SignUp'
import Cart from '../pages/user/Cart'
import Orders from '../components/adminCompanents/Orders'
import ActivatePage from '../pages/ActivatePage'

const Routing = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/user/activate/:token" element={<ActivatePage />} />
        <Route path="user" element={<UserDashboard />} />
        <Route path="user/cart" element={<Cart />} />

        {/* <Route path="dashboard" element={<UserRouting />}> */}
        {/* <Route path="user" element={<UserDashboard />} /> */}
        {/* <Route path="user/cart" element={<Cart />} /> */}
        {/* </Route> */}

        {/* <Route path="dashboard" element={<AdminRouting />}> */}
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/category" element={<Categories />} />
        <Route path="admin/users" element={<ManageUsers />} />
        <Route path="admin/products" element={<ProductsAdmin />} />
        <Route path="admin/orders" element={<Orders />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
