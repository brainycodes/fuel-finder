'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero - same as About page */}
      <section style={{
        position: 'relative',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        padding: '160px 0 120px',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.45) saturate(0.8)',
          transform: 'scale(1.02)'
        }} />

        {/* Purple Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(109,40,217,0.75) 0%, rgba(15,7,32,0.82) 100%)'
        }} />

        <div style={{
          padding: '0 clamp(20px, 5vw, 60px)',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          width: '100%'
        }}>
          <div style={{ maxWidth: '650px' }}>
            {/* Badge */} <br/>
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
                Get In Touch
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 4vw, 50px)',
              fontWeight: '900',
              color: 'white',
              lineHeight: '1.15',
              marginBottom: '14px',
              letterSpacing: '-1.2px'
            }}>
              We'd love to{' '}
              <span style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'shimmerText 2.5s linear infinite'
              }}> <br />
                hear from you
              </span>
            </h1>

            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.6',
              marginBottom: '34px',
              maxWidth: '480px'
            }}>
              Have questions, feedback, or need help finding the closest fuel station? Reach out and we'll get back to you within 24 hours.
            </p>
            <br/>
            {/* Trust Stats */}
            <div style={{ display: 'flex', gap: '36px' }}>
              {[
                { value: '50K+', label: 'Stations' },
                { value: '22+', label: 'Countries' },
                { value: '100K+', label: 'Drivers Helped' }
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
        </div>

        {/* Bottom Curve */}
        <div style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          height: '50px',
          background: '#ffffff',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          transform: 'scaleX(1.4)'
        }} />
      </section>

      {/* Contact Section */}
      <section style={{
        position: 'relative',
        background: '#ffffff',
        padding: '80px 0',
        marginTop: '-1px'
      }}>
        <div style={{
          padding: '0 clamp(20px, 5vw, 60px)',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: '#f3e8ff',
              color: '#7c3aed',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Contact Us
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              fontWeight: '800',
              color: '#1a1a2e',
              marginBottom: '10px',
              letterSpacing: '-0.5px'
            }}>
              Fill out the form{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                below
              </span>
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              maxWidth: '420px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              We respond to all inquiries within 24 hours.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'start'
          }} className="contact-grid">
            {/* Contact Info */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Email', value: 'hello@findfuel.com', icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  )},
                  { label: 'Phone', value: '+234 706 892 5562', icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  )},
                  { label: 'Office', value: 'Kogi, Nigeria', icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  )}
                ].map(item => (
                  <div key={item.label} style={{
                    padding: '20px',
                    background: '#faf5ff',
                    borderRadius: '14px',
                    border: '1px solid #ede9fe',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    transition: 'all 0.25s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(124,58,237,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #f3e8ff, #ede9fe)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7c3aed',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#7c3aed', marginBottom: '4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {item.label}
                      </div>
                      <div style={{ color: '#4b5563', fontSize: '14px', fontWeight: '500' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div style={{
                  padding: '48px',
                  background: '#faf5ff',
                  borderRadius: '16px',
                  border: '1px solid #ede9fe',
                  textAlign: 'center',
                  animation: 'fadeUp 0.4s ease-out forwards'
                }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    margin: '0 auto 20px',
                    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      background: '#fafafa',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a78bfa'
                      e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)'
                      e.target.style.background = '#ffffff'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                      e.target.style.background = '#fafafa'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      background: '#fafafa',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a78bfa'
                      e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)'
                      e.target.style.background = '#ffffff'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                      e.target.style.background = '#fafafa'
                    }}
                  />
                  <textarea
                    placeholder="Your Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      resize: 'vertical',
                      background: '#fafafa',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a78bfa'
                      e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)'
                      e.target.style.background = '#ffffff'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                      e.target.style.background = '#fafafa'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '14px 32px',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)'
                      e.target.style.boxShadow = '0 6px 20px rgba(124,58,237,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    Send Message
                  </button>
                </form>
              )}
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
          background: '#0a0418',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          transform: 'scaleX(1.4)'
        }} />
      </section>

      <style>{`
        @keyframes shimmerText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}