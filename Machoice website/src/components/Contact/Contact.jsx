import React from 'react'
import './Contact.css'
import mail_icon from '../../assets/mail_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'

const Contact = () => {
    return (
        <div id='contact' className='contact'>
            <div className="contact-title">
                <h1>How can we help you today ?</h1>
            </div>
            <div className="contact-section">
                <div className="contact-left">
                    <h1>MACHOICE <br />NIGERIA</h1>
                    <div className="contact-details">
                        <div className="contact-detail">
                            <img src={mail_icon} />
                            <p>Atolagbemaryam@gmail.com</p>
                        </div>
                        <div className="contact-detail">
                            <img src={call_icon} />
                            <p>+234-9031293646</p>
                        </div>
                        <div className="contact-detail">
                            <img src={location_icon} />
                            <p>Lagos, Nigeria</p>
                        </div>
                    </div>
                </div>
                <form action="https://formsubmit.co/atolagbemaryam@gmail.com" method="POST" className="contact-right">
                    <label htmlFor="">Your Name</label>
                    <input type="text" placeholder='Enter your name' name='name' />
                    <label htmlFor="">Your Email</label>
                    <input type="email" placeholder='Enter your email' name='email' />
                    <label htmlFor="">Write your message here</label>
                    <textarea name="message" row='8' placeholder='Enter your message'></textarea>
                    <button className="contact-submit" type='submit'>Submit</button>
                </form>
                
            </div>
        </div>
    )
}

export default Contact