import React from 'react'
import './Testimonial.css'
import refill from '../../assets/refilling.png'
import no_waste from '../../assets/no-plastic-bottles.png'
import happy_customer from '../../assets/customer-service.png'

const Testimonial = () => {

     const testimonials = [
        
        {
          id: 3,
          quote:
            "I'm so glad I found machoice. Their Eco-Top-Up has helped me reduce my plastic waste significantly. It's a small change that makes a big difference!  I really love it!",
          name: 'Adeola A.',
          image: 'https://via.placeholder.com/150',
          rating: 5,
        },
        {
          id: 4,
          quote:
            "Machoice's Eco-Top-Up is a win-win for me. It's good for the environment and my wallet. I highly recommend it to anyone looking for a sustainable dishwashing solution.",
          name: 'Chidi K.',
          image: 'https://via.placeholder.com/150',
          rating: 5,
        },
        {
          id: 5,
          quote:
            "The quality of machoice's dish soap is excellent, and I love that I can refill my existing bottle. It's a simple and convenient way to be more eco-friendly. I highly recommend it!",
          name: 'Bisi I.',
          image: 'https://via.placeholder.com/150',
          rating: 4,
        },
      ];

  return (
    <div >
        <h1 className='our-impact'>Our Impact So Far</h1>
        <hr />
        <section className='impact'>
            
            <div className='impacts'>
                <div><img src={refill} className='refill-img'/></div>
                <div>
                    <h1>300+</h1>
                    <p>Bottles refilled</p>
                </div>
            </div>

            <div className='impacts'>
                <div><img src={no_waste} className='waste-img'/></div>
                <div>
                    <h1>2tons</h1>
                    <p>Plastic waste reduced</p>
                </div>
            </div>

            <div className='impacts'>
                <div><img src={happy_customer} className='customer-img'/></div>
                <div>
                    <h1>500+</h1>
                    <p>Customer served</p>
                </div>
            </div>
        </section>


        <section className="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="profile">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="profile-image"
                />
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
              <p className="quote">"{testimonial.quote}"</p>
              <p className="name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

export default Testimonial