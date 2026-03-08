'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [openDropdowns, setOpenDropdowns] = useState({})
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      const sections = document.querySelectorAll('section')
      let current = ''

      sections.forEach(section => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= (sectionTop - 100)) {
          current = section.getAttribute('id')
        }
      })

      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false)
        setOpenDropdowns({})
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false)
        setOpenDropdowns({})
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
      setOpenDropdowns({})
    }
  }

  const toggleDropdown = useCallback((key, e) => {
    // Only toggle on mobile
    if (window.innerWidth <= 768) {
      e.preventDefault()
      e.stopPropagation()
      setOpenDropdowns(prev => ({
        ...prev,
        [key]: !prev[key]
      }))
    }
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdowns({})
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar" ref={navRef}>
      <div className="container">
        <div className="nav-wrapper">
          <Link href="/" className="logo">
            <Image
              src="/textLogo.png"
              alt="Sereene Healthcare"
              width={180}
              height={60}
              priority
            />
          </Link>
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen)
              if (isMobileMenuOpen) setOpenDropdowns({})
            }}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li>
              <a
                href="#home"
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('home')
                }}
              >
                Home
              </a>
            </li>
            <li className="dropdown">
              <a
                href="#products"
                className={`dropdown-toggle ${openDropdowns['products'] ? 'open' : ''}`}
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    toggleDropdown('products', e)
                  } else {
                    e.preventDefault()
                    scrollToSection('products')
                  }
                }}
              >
                Products
                <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <ul className={`dropdown-menu ${openDropdowns['products'] ? 'mobile-open' : ''}`}>
                <li className="dropdown-submenu">
                  <a href="#scrubs" className={`submenu-toggle ${openDropdowns['scrubs'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('scrubs', e)}>
                    Scrubs
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <ul className={`sub-dropdown-menu ${openDropdowns['scrubs'] ? 'mobile-open' : ''}`}>
                    <li>
                      <Link href="/products/sereene-flex-2way" onClick={closeMobileMenu}>
                        2-Way Stretch
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/sereene-flex-4way" onClick={closeMobileMenu}>
                        4-Way Stretch
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/executive-scrubs" onClick={closeMobileMenu}>
                        Executive Scrubs
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/essential-scrubs" onClick={closeMobileMenu}>
                        Essential Scrubs
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/everyday-scrubs" onClick={closeMobileMenu}>
                        Everyday Scrubs
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/premium-scrubs" onClick={closeMobileMenu}>
                        Premium Scrubs
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#aprons" className={`submenu-toggle ${openDropdowns['aprons'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('aprons', e)}>
                    Sereene Stitch Aprons
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <ul className={`sub-dropdown-menu ${openDropdowns['aprons'] ? 'mobile-open' : ''}`}>
                    <li>
                      <Link href="/products/long-length-doctors-coat" onClick={closeMobileMenu}>
                        Long Length Doctor's Coat
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/mid-length-doctor-coats" onClick={closeMobileMenu}>
                        Mid-Length Doctor Coats
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/consultation-doctor-jacket" onClick={closeMobileMenu}>
                        Consultation Doctor Jacket
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#staff-uniforms" className={`submenu-toggle ${openDropdowns['staff'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('staff', e)}>
                    Staff Uniforms
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <ul className={`sub-dropdown-menu ${openDropdowns['staff'] ? 'mobile-open' : ''}`}>
                    <li>
                      <Link href="/products/nursing-staff-uniforms" onClick={closeMobileMenu}>
                        Nursing Staff Uniforms
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/ward-boy-uniforms" onClick={closeMobileMenu}>
                        Ward Boy Uniforms
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/sanitation-staff-uniforms" onClick={closeMobileMenu}>
                        Sanitation Staff Uniforms
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#patient-apparel" className={`submenu-toggle ${openDropdowns['patient'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('patient', e)}>
                    Patient Apparel
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <ul className={`sub-dropdown-menu ${openDropdowns['patient'] ? 'mobile-open' : ''}`}>
                    <li>
                      <Link href="/products/patient-dresses" onClick={closeMobileMenu}>
                        Patient Dress (Pyjama & Shirt)
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/patient-gown" onClick={closeMobileMenu}>
                        Patient Gown
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#medical-bedding" className={`submenu-toggle ${openDropdowns['bedding'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('bedding', e)}>
                    Medical Bedding
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <ul className={`sub-dropdown-menu ${openDropdowns['bedding'] ? 'mobile-open' : ''}`}>
                    <li>
                      <Link href="/products/bedsheet" onClick={closeMobileMenu}>
                        Bedsheet
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/pillow-pillow-covers" onClick={closeMobileMenu}>
                        Pillow & Pillow Covers
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/blankets" onClick={closeMobileMenu}>
                        Blankets
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#surgical-supplies" className={`submenu-toggle ${openDropdowns['surgical'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('surgical', e)}>
                    Surgical Supplies
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <ul className={`sub-dropdown-menu ${openDropdowns['surgical'] ? 'mobile-open' : ''}`}>
                    <li className="dropdown-submenu">
                      <a href="#surgeon-gowns" className={`submenu-toggle ${openDropdowns['gowns'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('gowns', e)}>
                        Surgeon Gowns
                        <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <ul className={`sub-dropdown-menu nested ${openDropdowns['gowns'] ? 'mobile-open' : ''}`}>
                        <li>
                          <Link href="/products/classical-surgical-gown" onClick={closeMobileMenu}>
                            Classical Surgeon Gown
                          </Link>
                        </li>
                        <li>
                          <Link href="/products/overlap-surgical-gown" onClick={closeMobileMenu}>
                            Overlap Surgeon Gown
                          </Link>
                        </li>
                        <li>
                          <Link href="/products/orthopedic-surgeon-gown" onClick={closeMobileMenu}>
                            Orthopedic Surgeon Gown
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/products/drape-sheets" onClick={closeMobileMenu}>
                        Drape Sheets
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/cut-sheets-hole-sheets" onClick={closeMobileMenu}>
                        Cut Sheets
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/fenestrated-sheets" onClick={closeMobileMenu}>
                        Fenestrated Sheets
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#hospital-accessories" className={`submenu-toggle ${openDropdowns['accessories'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('accessories', e)}>
                    Hospital Accessories
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <ul className={`sub-dropdown-menu ${openDropdowns['accessories'] ? 'mobile-open' : ''}`}>
                    <li>
                      <Link href="/products/door-curtain" onClick={closeMobileMenu}>
                        Door Curtain
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/window-curtain" onClick={closeMobileMenu}>
                        Window Curtain
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/cubical-side-screen-curtain" onClick={closeMobileMenu}>
                        Cubical Curtain
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/slide-screen-curtain" onClick={closeMobileMenu}>
                        Slide Screen Curtain
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#corporate-uniforms" className={`submenu-toggle ${openDropdowns['corporate'] ? 'open' : ''}`} onClick={(e) => toggleDropdown('corporate', e)}>
                    Administration/Corporate Staff Uniforms
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <ul className={`sub-dropdown-menu ${openDropdowns['corporate'] ? 'mobile-open' : ''}`}>
                    <li>
                      <Link href="/products/corporate-pants" onClick={closeMobileMenu}>
                        Pants
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/corporate-shirts" onClick={closeMobileMenu}>
                        Shirts
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a
                href="#about"
                className={`dropdown-toggle ${openDropdowns['about'] ? 'open' : ''}`}
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    toggleDropdown('about', e)
                  } else {
                    e.preventDefault()
                    scrollToSection('about')
                  }
                }}
              >
                About Us
                <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <ul className={`dropdown-menu ${openDropdowns['about'] ? 'mobile-open' : ''}`}>
                <li><a href="#company">Our Company</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#mission">Mission & Vision</a></li>
              </ul>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
