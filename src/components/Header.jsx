'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled ? '14px 0' : '22px 0',
      background: scrolled ? 'rgba(10,4,24,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(124,58,237,0.12)' : '1px solid transparent',
      transition: 'all 0.35s ease'
    }}>
      <div style={{
        padding: '0 clamp(20px, 5vw, 60px)',
        maxWidth: '1320px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span style={{
              fontSize: '19px',
              fontWeight: '800',
              color: 'white',
              letterSpacing: '-0.5px'
            }}>
              Find<span style={{ color: '#a78bfa' }}>Fuel</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '13px',
                  letterSpacing: '0.2px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#c4b5fd'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              style={{
                padding: '9px 20px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '9px',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.2px',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(124,58,237,0.25)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 6px 18px rgba(124,58,237,0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 12px rgba(124,58,237,0.25)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Find Stations
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav style={{
            marginTop: '14px',
            padding: '16px',
            background: 'rgba(10,4,24,0.98)',
            border: '1px solid rgba(124,58,237,0.15)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            backdropFilter: 'blur(30px)'
          }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setIsOpen(false)}
              style={{
                padding: '11px 14px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '9px',
                fontSize: '13px',
                fontWeight: '600',
                textAlign: 'center',
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Find Stations
            </Link>
          </nav>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}