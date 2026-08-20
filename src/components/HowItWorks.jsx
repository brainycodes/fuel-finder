'use client'
import Image from 'next/image'
import Image1 from '../assets/1.png'
import Image2 from '../assets/2.png'
import Image3 from '../assets/3.png'

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Enter Your Location',
      description: 'Type your city, address, or allow GPS to find stations near you instantly.',
      image: Image1
    },
    {
      step: '02',
      title: 'Find the Closest Station',
      description: 'Browse stations sorted by distance. See real-time fuel prices at each one.',
      image: Image2
    },
    {
      step: '03',
      title: 'Navigate & Fill Up',
      description: 'Get turn-by-turn directions to your chosen station and save on every fill-up.',
      image: Image3
    }
  ]

  return (
    <section style={{
      position: 'relative',
      background: '#ffffff',
      padding: '100px 0 80px',
      marginTop: '-1px'
    }}>
      {/* Top Curve */}
      <div style={{
        position: 'absolute',
        top: -1,
        left: 0,
        right: 0,
        height: '50px',
        background: '#ffffff',
        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        transform: 'scaleX(1.4)',
        zIndex: 2
      }} />

      <div style={{
        padding: '0 60px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Section Header */}
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
            How It Works
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 38px)',
            fontWeight: '800',
            color: '#1a1a2e',
            marginBottom: '10px',
            letterSpacing: '-0.5px'
          }}>
            Find the{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Closest
            </span>
            {' '}Fuel Near You
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#6b7280',
            maxWidth: '420px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Three simple steps to locate, compare, and navigate to the nearest station.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px'
        }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                animation: `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay: `${index * 0.15}s`,
                opacity: 0
              }}
            >
              {/* Image Card */}
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '24px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'
                }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {/* Step Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'white',
                  color: '#7c3aed',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '800',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.12)'
                }}>
                  {step.step}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '0 4px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1a1a2e',
                  marginBottom: '8px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  maxWidth: '280px'
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
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
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}