/* eslint-disable @next/next/no-img-element */
import React from 'react'

const page = () => {
    return (
        <div className="bg-gray-900 text-slate-100 min-h-screen">
          {/* Hero Section */}
          <div className="relative py-16">
            <div className="container mx-auto px-6 md:px-12 text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-6">
                About Us
              </h1>
              <p className="text-lg md:text-xl font-light max-w-3xl mx-auto">
                We are dedicated to delivering exceptional solutions to help our
                clients achieve their goals. Passionate, innovative, and committed
                to excellence.
              </p>
            </div>
          </div>
    
          {/* About Content Section */}
          <div className="container mx-auto px-6 md:px-12 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <div>
                <img
                  src="https://th.bing.com/th/id/OIP.IJSbYkvH4rRZNh9bFr-MRgAAAA?rs=1&pid=ImgDetMain"
                  alt="About Us"
                  className="rounded-lg shadow-lg"
                />
              </div>
    
              {/* Text Section */}
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Who We Are
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  We are a team of passionate developers, designers, and creators
                  who thrive on crafting exceptional digital experiences. Our goal
                  is to make your vision a reality with seamless and user-friendly
                  designs.
                </p>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-300 mb-6">
                  To provide innovative and efficient solutions that empower our
                  clients and create meaningful impacts in their industries.
                </p>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Why Choose Us?
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Expertise in cutting-edge technologies</li>
                  <li>Customer-centric approach</li>
                  <li>Commitment to quality and innovation</li>
                  <li>Transparent and reliable communication</li>
                </ul>
              </div>
            </div>
          </div>
    
          {/* Call to Action Section */}
          <div className="bg-blue-800 py-12">
            <div className="container mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Ready to Work with Us?
              </h3>
              <p className="text-lg text-gray-200 mb-6">
                Let us help you bring your ideas to life with our expertise and
                dedication.
              </p>
              <button className="px-6 py-3 bg-white text-blue-800 rounded-lg shadow-lg font-semibold hover:bg-gray-100">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      );
}

export default page
