import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/Logo.png'

const Footer = () => {
  return (
    <div className='footer '>
        <div className="footer-top">
            <div className="footer-top-left">
            <img src={footer_logo} />
            <p>I am a full-stack developer from Nigeria with over two years of experience</p>
            </div>
        </div>
        <hr />
        <div className="footer-bottom">
            <p className="footer-bottom-left">© 2024 Musa Abdulkareem. All rights reserved.</p>
            <div className='footer-bottom-right'>
                <p>Term of Services</p>
                <p>Privacy Policy</p>
                <p>Connect with me</p>
            </div>
        </div>
    </div>
  )
}

export default Footer