import React from 'react'
import '../styles/Dashboard.scss'
import Products from '../components/product/Products'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="wrapper">
      <div className="main-content">
        <Hero />
        <Products />
        <Footer />
      </div>
    </div>
  )
}

export default Home
