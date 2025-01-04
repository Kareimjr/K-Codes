import React from 'react'
import './Services.css'
import One_liter from '../../assets/one-liter.png'
import Five_ml from '../../assets/500ml.png'
import Sponge from '../../assets/sponge.png'
import Dish_towel from '../../assets/dish-towel.png'

const Services = () => {

  return (
    <div id='services' className='services'>
      <h1>Services & Products</h1>
      <hr />
      <div className='retail'>
        <b>Retail Services:</b>
        <p>Our retail services are designed to make Machoice dishwashing liquids accessible to individual consumers through various retail outlets. We offer a range of product sizes to fit any shelf, ensuring that your customers can enjoy the same effective, skin-friendly, and affordable cleaning solutions we are known for. By stocking Machoice, retailers can provide customers with sustainable, eco-conscious options that reduce plastic waste through refillable packaging, promoting green habits in everyday cleaning.</p>
      </div>
      <div className='wholesales'>
        <b>Wholesale Services:</b>
        <p>At Machoice, we provide tailored wholesale services to businesses looking to offer their customers high-quality dishwashing solutions in bulk. Our products are designed to meet the needs of both households and businesses, delivering effective cleaning power while being gentle on the skin. With our competitive pricing and commitment to sustainability through refill options and eco-friendly packaging, partnering with Machoice allows your business to offer customers affordable, environmentally conscious products in larger quantities.</p>
      </div>
      <div className="products">
        <b id='products'>Products:</b>
        <div className='product-items'>
          <div className="card">
            <img src={One_liter} />
            <h4>Machoice <br />1 Liter Dishwashing Liquid</h4>
          </div>

          <div className="card">
            <img src={Five_ml} />
            <h4>Machoice <br />500ml Dishwashing Liquid</h4>
          </div>

          <div className="card">
            <img src={Sponge} />
            <h4>Machoice <br />Natural Dish Sponge</h4>
          </div>

          <div className="card">
            <img src={Dish_towel} />
            <h4>Machoice <br />4in1 Dish Towels</h4>
          </div>
        </div>
      </div>

      <section id='eco-top-up'>
        <h1>Eco Top Up</h1>
        <hr />
        <div>
          <h2>Refill. Reuse. Reduce Waste.</h2>
          <p>Our Eco-Top-Up Stations make sustainable dishwashing solutions accessible and affordable for everyone. By refilling your bottles instead of buying new ones, you help reduce plastic waste and enjoy your favorite Machoice dishwashing liquid at a lower price.</p>
        </div>
              
        <div className='how-it-works'>
          <h2>How Does It Work?</h2>
          <ul>
          <li><p><span>Bring Your Bottle: </span>Bring any empty bottle, preferably your previous Machoice container.</p></li>
          <li><p><span>Refill: </span>Visit an Eco-Top-Up Station near you and refill with the same quality Machoice liquid at a discounted price.</p></li>
          <li><p><span>Save More: </span>Enjoy reduced costs while helping the environment by reusing your plastic bottles.</p></li>
          </ul>
        </div>

        <div className='why-refill'>
          <h2>Why Refill?</h2>
          <ul>
            <li><p><span>Affordability:</span> Refills cost less than buying new bottles.</p></li>
            <li><p><span>Eco-Friendly:</span> Helps reduce single-use plastics, saving up to 6,000 bottles every 6 months.</p></li>
            <li><p><span>Convenient:</span> Multiple refill stations across Lagos for easy access.</p></li>
            <li><p><span>Skin-Safe: </span>Same gentle, plant-based formula you trust.</p></li>      
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Services