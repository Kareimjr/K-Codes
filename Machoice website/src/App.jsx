import AboutUs from './components/AboutUs/AboutUs'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import Services from './components/Services/Services'

function App() {

  return (
    <div>
      <Navbar/>
      <Hero/>
      <AboutUs/>
      <Services/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
