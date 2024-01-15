import React from 'react'
import '../styles/Hero.scss'
import { Link } from 'react-router-dom'

const Hero = () => {
  const handleClick = () => {
    const productSection = document.getElementById('product-wraper')
    productSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="card">
      <div className="wrap">
        <div className="card-text">
          <h2>Welcom to my Online shop </h2>
          <p>You can get discounts of up to 50%</p>
          <button onClick={handleClick}>Start Now</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
