import React from 'react'
import './Hero.css'
import profile_img from '../../assets/picture.png'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Resume from '../../assets/Resume.pdf'

const Hero = () => {
  return (
    <div id='home' className='hero'>
        <img src={profile_img} alt="profile_img" />
        <h1><span>I'm Musa Abdulkareem,</span> Full-Stack Developer based in Nigeria</h1>
        <p>I am a full-stack developer from Lagos, Nigeria with a 2 years experience</p>
        <div className="hero-action">
            <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect with me</AnchorLink></div>
            <div className="hero-resume"><a href={Resume} target='_blank'>My resume</a></div>
        </div>
    </div>
  ) 
}

export default Hero