'use client'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section style={{
      padding: '100px 0',
      background: 'var(--gradient-dark)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.05
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: '900',
          color: 'white',
          marginBottom: '16px',
          letterSpacing: '-0.5px'
        }}>
          Ready to{' '}
          <span style={{ color: '#fbbf24' }}>Find the Closest</span>
          {' '}Fuel Near You?
        </h2>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '500px',
          margin: '0 auto 40px',
          lineHeight: '1.7'
        }}>
          Join thousands of smart drivers who save money on every fill-up with FindFuel.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/search" className="btn-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            Find Stations Now
          </Link>
          <Link href="/about" className="btn-outline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}