'use client'

import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    text: "We evaluate vendors on compliance, consistency, and performance. Sereene has proven to be a dependable partner, delivering hospital-grade linen products that meet the operational demands of critical care and general wards alike. Their professionalism reflects a clear understanding of institutional healthcare requirements.",
    author: "Mr. Amit Deshpande",
    position: "Group Head – Procurement, Sterling Multispeciality Hospitals, Mumbai"
  },
  {
    text: "In a high-occupancy hospital environment, reliability is everything. Sereene's products offer excellent absorbency and durability, helping us maintain hygiene protocols efficiently. Their team understands hospital requirements and delivers accordingly.",
    author: "Mr. Rajesh Kumar Sharma",
    position: "Procurement Head, Shanti Memorial Hospital, Bengaluru"
  },
  {
    text: "Sereene's hygiene solutions align seamlessly with our clinical standards and patient-care protocols. The absorbency performance, material quality, and consistency across batches have met our expectations in high-dependency and long-stay units. Their reliability supports both patient dignity and operational efficiency.",
    author: "Dr. Rohan Malhotra",
    position: "Chief Operating Officer, Apex Care Hospitals, Gurgaon"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef(null)
  const sectionRef = useRef(null)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextTestimonial, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsAutoPlaying(entries[0].isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handlePrev = () => {
    prevTestimonial()
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const handleNext = () => {
    nextTestimonial()
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="title-underline"></div>
        </div>
        <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10H7C7 8.93913 6.57857 7.92172 5.82843 7.17157C5.07828 6.42143 4.06087 6 3 6V4C4.5913 4 6.11742 4.63214 7.24264 5.75736C8.36786 6.88258 9 8.4087 9 10V18ZM21 18H17C16.4696 18 15.9609 17.7893 15.5858 17.4142C15.2107 17.0391 15 16.5304 15 16V12C15 11.4696 15.2107 10.9609 15.5858 10.5858C15.9609 10.2107 16.4696 10 17 10H19C19 8.93913 18.5786 7.92172 17.8284 7.17157C17.0783 6.42143 16.0609 6 15 6V4C16.5913 4 18.1174 4.63214 19.2426 5.75736C20.3679 6.88258 21 8.4087 21 10V18Z"/>
                  </svg>
                </div>
                <p className="testimonial-text">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-controls">
          <button 
            className="testimonial-btn prev" 
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button 
            className="testimonial-btn next" 
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
