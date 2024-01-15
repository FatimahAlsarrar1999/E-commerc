import React from 'react'
import '../styles/ShoppingCart.scss'
import { IoIosCart } from 'react-icons/io'

const ShoppingCart = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <IoIosCart />
      <span className="badge">{value}</span>
    </div>
  )
}

export default ShoppingCart
