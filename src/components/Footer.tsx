import React from 'react'
import '../styles/Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faXTwitter, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons'
import ShoppingCart from './ShoppingCart'

const Footer = () => {
  return (
    //footer-container
    <div className="footer-container">
      <div className="section">
        <div className="footer-social">
          <ul>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Join Us</a>
            </li>
          </ul>
        </div>

        <hr />
        <div className="section">
          <div className="aboutUs">
            <h4>About Us</h4>
            <p>
              Welcome to my website. It is a remote store that provides you with all your
              requirements and electronic devices. Prices are reasonable and low. Free delivery. The
              best products and devices we have.
            </p>
          </div>
          <div className="section">
            <div className="contact">
              <h4>Contact Us</h4>
              <p>Phone: 05522222222222</p>
              <p>Email: fatimashop@gmail.com </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
