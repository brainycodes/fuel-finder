'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import heroImage from '../assets/bg.png'

export default function Hero() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSearchInput = async (value) => {
    setSearch(value)
    if (value.length > 2) {
      try {
        const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(value)}`)
        const data = await res.json()
        setSuggestions(data.suggestions || [])
        setShowSuggestions(true)
      } catch {
        setSuggestions([])
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSearch = (query) => {
    const searchQuery = query || search
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '160px 0 120px',
      overflow: 'hidden'
    }}>
      {/* Background Image - More Visible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.45) saturate(0.8)',
        transform: 'scale(1.02)'
      }} />

      {/* Lighter Purple Overlay - Let background show through */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, rgba(109,40,217,0.75) 0%, rgba(15,7,32,0.82) 100%)'
      }} />

      {/* Subtle Glow */}
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '15%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />

      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        padding: '0 60px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* ============ LEFT CONTENT ============ */}
          <div style={{
            animation: 'heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '40px',
              marginBottom: '28px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                background: '#10b981',
                borderRadius: '50%',
                boxShadow: '0 0 8px rgba(16,185,129,0.5)'
              }} />
              <span style={{
                color: '#d1fae5',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                Live Prices • 22+ Countries
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(32px, 4vw, 50px)',
              fontWeight: '900',
              color: 'white',
              lineHeight: '1.15',
              marginBottom: '14px',
              letterSpacing: '-1.2px'
            }}>
              Find the{' '}
              <span style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'shimmerText 2.5s linear infinite'
              }}>
                Closest
              </span>
              <br />
              Fuel Near You
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.6',
              marginBottom: '34px',
              maxWidth: '420px'
            }}>
              Compare real-time fuel prices across thousands of stations.
              Save money on every fill-up.
            </p>

            {/* Search Box */}
            <div style={{ position: 'relative', maxWidth: '460px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(25px)',
                border: isFocused 
                  ? '1.5px solid rgba(168,139,250,0.4)' 
                  : '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '4px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isFocused 
                  ? '0 0 0 4px rgba(124,58,237,0.1), 0 12px 35px rgba(0,0,0,0.2)' 
                  : '0 6px 25px rgba(0,0,0,0.15)'
              }}>
                <div style={{
                  padding: '0 4px 0 16px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
                    stroke={isFocused ? '#a78bfa' : 'rgba(255,255,255,0.4)'} 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search city, address, or station..."
                  value={search}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  onFocus={() => {
                    setIsFocused(true)
                    if (suggestions.length > 0) setShowSuggestions(true)
                  }}
                  onBlur={() => {
                    setIsFocused(false)
                    setTimeout(() => setShowSuggestions(false), 200)
                  }}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    padding: '14px 6px',
                    background: 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    color: 'white'
                  }}
                />
                <button
                  onClick={() => handleSearch()}
                  style={{
                    padding: '12px 22px',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.03)'
                    e.target.style.boxShadow = '0 6px 20px rgba(124,58,237,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  Search
                </button>
              </div>

              {/* Autocomplete */}
              {showSuggestions && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  background: 'rgba(15,7,32,0.97)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '14px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                  zIndex: 100
                }}>
                  {suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      onMouseDown={() => handleSearch(suggestion)}
                      style={{
                        padding: '12px 18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        borderBottom: i < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        transition: 'all 0.15s ease',
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: '13px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(124,58,237,0.18)'
                        e.target.style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent'
                        e.target.style.color = 'rgba(255,255,255,0.75)'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span style={{ fontWeight: '500' }}>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trust Stats */}
            <div style={{
              display: 'flex',
              gap: '36px',
              marginTop: '38px'
            }}>
              {[
                { value: '50K+', label: 'Stations' },
                { value: '22+', label: 'Countries' },
                { value: '100K+', label: 'Users' }
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.1'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.45)',
                    fontWeight: '500',
                    letterSpacing: '0.3px',
                    marginTop: '2px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============ RIGHT CONTENT ============ */}
          <div className="hero-right" style={{
            animation: 'heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            animationDelay: '0.15s',
            opacity: 0,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px'
            }}>
              {/* Main Image Card */}
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.08)',
                maxHeight: '360px'
              }}>
                <Image
                  src={heroImage}
                  alt="Fuel station"
                  style={{
                    width: '100%',
                    height: '360px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              {/* Floating Price Card */}
              <div style={{
                position: 'absolute',
                bottom: '-16px',
                left: '-16px',
                background: 'rgba(255,255,255,0.96)',
                borderRadius: '14px',
                padding: '12px 18px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.22)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'floatCard 5s ease-in-out infinite'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                    Best Price
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e', lineHeight: '1.1' }}>
                    $3.49
                  </div>
                </div>
              </div>

              {/* Floating Station Badge */}
              <div style={{
                position: 'absolute',
                top: '22px',
                right: '-14px',
                background: 'rgba(255,255,255,0.96)',
                borderRadius: '12px',
                padding: '10px 16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                animation: 'floatCard 5s ease-in-out infinite',
                animationDelay: '1.5s'
              }}>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600', letterSpacing: '0.3px' }}>
                  NEARBY
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#7c3aed' }}>
                  12 <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>stations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div style={{
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: '50px',
        background: '#faf5ff',
        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        transform: 'scaleX(1.4)'
      }} />

      <style>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmerText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}