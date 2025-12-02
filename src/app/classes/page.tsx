"use client"

import { useEffect } from 'react'

export default function ClassesPage() {
  useEffect(() => {
    // Wait for DOM to be ready, then inject script into vagaro container
    const timer = setTimeout(() => {
      const vagaroDiv = document.querySelector('#vagaro-widget-container .vagaro')
      if (!vagaroDiv) {
        console.error('Vagaro container not found')
        return
      }

      // Check if script already exists
      const existingScript = vagaroDiv.querySelector('script[src*="WidgetEmbeddedLoader"]')
      if (existingScript) {
        console.log('Vagaro script already loaded')
        return
      }

      // Create and inject the script INSIDE the vagaro div (as per Vagaro's requirements)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://www.vagaro.com//resources/WidgetEmbeddedLoader/OZqqCJ0sC38cT3qmV35y6huRFXoSlXYO61Cq7fYO61WO4pUUeJUtjP0ijxgv426sCBcva2StkvCxdfkJE1wZCBOvifCs7feJEPwMc8?v=PMWAG2WLW2ryFtpyv6v64Q9yAPkCQQZ6lw1ryhYrKPtG#'
      script.async = true
      
      script.onload = () => {
        console.log('Vagaro script loaded successfully')
      }
      
      script.onerror = () => {
        console.error('Failed to load Vagaro script')
      }
      
      // Append script INSIDE the vagaro container
      vagaroDiv.appendChild(script)
      console.log('Vagaro script injected into container')
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-16">
        <div className="container flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Explore Dance Classes
          </h1>
          <p className="mt-6 max-w-2xl text-lg mb-8">
            Discover dance classes from studios across the nation for all levels and styles
          </p>
        </div>
      </section>

      {/* Vagaro Booking Widget */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <div 
              id="frameTitle" 
              className="embedded-widget-title"
              style={{
                fontSize: '23px',
                color: '#333',
                fontFamily: 'Arial, Helvetica, sans-serif',
                lineHeight: '24px',
                padding: '18px 10px 8px',
                textAlign: 'center',
                boxSizing: 'border-box'
              }}
            >
              Book Your Class Now
            </div>

            {/* Vagaro Widget Container - Using exact HTML structure from Vagaro */}
            <div 
              id="vagaro-widget-container"
              style={{
                width: '100%',
                minHeight: '600px',
                position: 'relative'
              }}
            >
              <div 
                className="vagaro" 
                style={{
                  width: '100%',
                  padding: '0',
                  border: '0',
                  margin: '0 auto',
                  textAlign: 'center'
                }}
              >
                <style dangerouslySetInnerHTML={{
                  __html: `.vagaro a {font-size:14px; color:#AAA; text-decoration:none;}`
                }} />
                <a href="https://www.vagaro.com/pro/">Powered by Vagaro</a>
                &nbsp;
                <a href="https://www.vagaro.com/pro/salon-software">Salon Software</a>
                ,&nbsp;
                <a href="https://www.vagaro.com/pro/spa-software">Spa Software</a>
                &nbsp;&amp;&nbsp;
                <a href="https://www.vagaro.com/pro/fitness-software">Fitness Software</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}