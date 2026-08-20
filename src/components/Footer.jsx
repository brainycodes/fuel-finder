'use client'
import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    Product: ['Search Stations', 'Price Reports', 'Mobile App', 'API'],
    Company: ['About Us', 'Careers', 'Press', 'Contact'],
    Support: ['Help Center', 'Safety', 'Terms of Service', 'Privacy Policy'],
    Countries: ['Nigeria', 'United States', 'United Kingdom', 'India', 'View All']
  }

  return (
    <footer style={{
      background: '#0a0418',
      color: 'white',
      padding: '60px 0 30px'
    }}>
      <div style={{
        padding: '0 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '800' }}>
                Find<span style={{ color: '#a78bfa' }}>Fuel</span>
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '1.6' }}>
              Find the closest fuel near you. Real-time prices, live navigation, and community-driven data.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontWeight: '700', marginBottom: '14px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {links.map(link => (
                  <li key={link}>
                    <Link href="#" style={{
                      color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'none',
                      fontSize: '12px',
                      transition: 'color 0.2s'
                    }}
                      onMouseEnter={(e) => e.target.style.color = '#a78bfa'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
            &copy; {new Date().getFullYear()} FindFuel. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Twitter', 'Facebook', 'Instagram'].map(social => (
              <a key={social} href="#" style={{
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                fontSize: '12px',
                transition: 'color 0.2s'
              }}
                onMouseEnter={(e) => e.target.style.color = '#a78bfa'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.3)'}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}