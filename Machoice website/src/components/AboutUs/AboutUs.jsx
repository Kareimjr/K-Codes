import React from 'react'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div id='about-us' className='about-us'>
        <h1>About Us</h1>
        <hr />
        <p>At Machoice, our mission is to provide safe and effective dishwashing solutions that not only leave your dishes spotless but also care for your skin. We are dedicated to creating eco-friendly products that prioritize your health without compromising on quality or affordability. Whether you're a household consumer or a business, Machoice offers reliable and gentle dishwashing liquids that strike the perfect balance between effectiveness and cost, making clean living accessible for all.</p>
        <div className="mission">
            <h3>Our Mission:</h3>
            <p>At Machoice, our mission is to provide safe and effective dishwashing liquids that deliver outstanding cleaning results while being gentle on your skin. We are dedicated to promoting eco-friendly practices, such as reducing plastic waste through refill options, to ensure that our products benefit both our customers and the environment.</p>
        </div>
        <div className="value">
            <h3>Our Values:</h3>
            <p><b>Innovation: </b> Continuously enhancing our products to cater to the evolving needs of Nigerian households and businesses.</p>
            <p><b>Customer Satisfaction:</b> Guaranteeing that every bottle of Machoice Dishwashing Liquid upholds our commitment to quality and care.</p>
            <p><b>Sustainability:</b> Minimizing plastic waste through refill options and encouraging environmentally friendly habits among our consumers.</p>
        </div>
    </div>
  )
}

export default AboutUs