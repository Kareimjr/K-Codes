import React from 'react';
import './Footer.css';
import footer_logo from '../../assets/footer-logo.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-top">
        <div className="footer-top-left">
          <img src={footer_logo} alt="Machoice Logo" />
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p className="footer-bottom-left">© 2024 Machoice Nigeria. All rights reserved.</p>
        <div className='footer-bottom-right'>
          <p>Terms of Services</p>
          <p>Privacy Policy</p>
          <div className='social-icons'>
            <a href="https://www.facebook.com/profile.php?id=100081302916321&mibextid=LQQJ4d"><i className="fa-brands fa-square-facebook" style={{color: '#6c757d'}}></i></a>
            <a href="https://www.instagram.com/machoice_nigeria?igsh=MXNtemIzZ2V4M3Fqbw=="><i className="fa-brands fa-square-instagram" style={{color: '#6c757d'}}></i></a>
            <a href="https://x.com/machoicenigeria?s=11"><i className="fa-brands fa-square-x-twitter" style={{color: '#6c757d'}}></i></a>
            <a href="#"><i className="fa-brands fa-square-whatsapp" style={{color: '#6c757d'}}></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;