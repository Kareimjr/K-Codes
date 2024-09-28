import React from 'react'
import './Hero.css'
import Banner from '../../assets/banner.png'

const Hero = () => {
  return (
    <div id='hero' className='hero'>
        <div className='sections'>
        <div className='left-section'>
            <h1>Machoice Nigeria: <br />Cleaner Dishes, Greener Earth.</h1>
            <h3>Nigeria’s Trusted Dishwashing Liquid For Spotless Dishes and a Cleaner Environment.</h3>
            <p>At Machoice, we are committed to producing safe and effective dishwashing liquids that leave your dishes sparkling clean while being gentle on your skin. Whether you're a household consumer or a business, our dishwashing solutions offer an unbeatable balance of affordability and quality.</p>
        </div>
        <div className='right-section'>
                <img src={Banner} />
        </div>
        </div>

    </div>
  )
}

export default Hero