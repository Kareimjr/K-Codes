import React, { useRef } from 'react'
import './Navbar.css'
import Logo from '../../assets/logo.png'
import menu_open from '../../assets/bars_solid.svg'
import menu_close from '../../assets/xmark-solid.svg'

const Navbar = () => {

    const menuRef = useRef();

    const openMenu = () => {
        menuRef.current.style.right = "0"
    }
    const closeMenu = () => {
        menuRef.current.style.right = "-350px"
    }

    return (
        <div className='navbar'>
            <img src={Logo} className='nav-logo' />
            <img src={menu_open} onClick={openMenu} className='nav-mob-open'/>
            <div className='nav-menu'>
                <ul ref={menuRef}>
                <img src={menu_close} onClick={closeMenu} className="nav-mob-close" />
                    <a href="#hero"><li>Home</li></a>
                    <a href="#about-us"><li>About Us</li></a>
                    <a href="#services"><li>Services</li></a>
                    <a href="#products"><li>Products</li></a>
                    <a href="#eco-top-up"><li>Eco-Top-Up</li></a>
                    <a href="#contact"><button>Contact Us</button></a>
                </ul>

            </div>
        </div>
    )
}

export default Navbar