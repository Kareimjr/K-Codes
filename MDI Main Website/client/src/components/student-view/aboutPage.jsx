import { RocketLaunchIcon, BeakerIcon, AcademicCapIcon, UserGroupIcon, CalendarIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';

const AboutPage =()=> {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-[#2A3571] py-24 px-6 sm:px-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Empowering Tomorrow's Tech Leaders
          </h1>
          <p className="text-xl text-indigo-200">Where Innovation Meets Education</p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 px-6 sm:px-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Welcome to MDI Hub</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8 text-center">
              At MDI Hub, we're redefining technology education for the digital age. Born from a passion 
              for bridging the gap between industry demands and tech education, we've grown into a premier 
              destination for cutting-edge learning experiences.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <RocketLaunchIcon className="h-12 w-12 text-[#2A3571] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Future-Focused Curriculum</h3>
                <p className="text-gray-600">Courses designed with input from industry leaders at Google, Microsoft, and top tech startups</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-lg">
                <BeakerIcon className="h-12 w-12 text-[#2A3571] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hands-On Learning</h3>
                <p className="text-gray-600">Interactive labs, real-world projects, and hackathons that mirror professional challenges</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-lg">
                <AcademicCapIcon className="h-12 w-12 text-[#2A3571] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">Learn from seasoned professionals with 10+ years of industry experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 sm:px-14">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-blue-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-[#2A3571] mb-4">Our Mission</h2>
              <blockquote className="text-gray-700 text-lg italic">
                "To democratize access to world-class tech education, empowering individuals and 
                organizations to thrive in the Fourth Industrial Revolution."
              </blockquote>
            </div>

            <div className="bg-indigo-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg">
                We envision a world where anyone, anywhere can master digital skills needed to shape 
                tomorrow's technological landscape. By 2030, we aim to become the primary career 
                launchpad for 1 million tech professionals globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 sm:px-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Tech Career?</h2>
          <p className="text-xl mb-8">Start your learning journey today with MDI Hub</p>
          <div className="flex justify-center gap-4">
            <Link to={"/student/courses"}><button className="bg-[#2A3571] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3c4472] transition-colors">
              Explore Courses
            </button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage;