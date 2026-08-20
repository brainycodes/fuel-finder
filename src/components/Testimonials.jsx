'use client'

export default function Testimonials() {
  const testimonials = [
    {
      quote: "FindFuel saved me over $200 last month! I never realized how much prices vary between stations just a few blocks apart.",
      name: "Sarah Johnson",
      role: "Daily Commuter",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
    },
    {
      quote: "As a fleet manager, FindFuel helps me route my drivers to the cheapest stations. It's become an essential tool.",
      name: "Michael Chen",
      role: "Fleet Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      quote: "I travel across Nigeria for work, and FindFuel helps me find the best prices wherever I am.",
      name: "Amina Ibrahim",
      role: "Business Traveler",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
    }
  ]

  return (
    <section style={{
      position: 'relative',
      background: '#ffffff',
      padding: '80px 0',
      marginTop: '-1px'
    }}>
      {/* Top curve */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, -60%)',
        width: '150vw',
        paddingBottom: '15%',
        borderRadius: '50%'
      }} />

      <div style={{
        padding: '0 40px',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
            Testimonials
          </span>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 36px)',
            fontWeight: '800',
            color: '#1a1a2e',
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            What our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              users say
            </span>
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            maxWidth: '380px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Join thousands of drivers saving on every fill-up.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{
              background: '#faf5ff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #ede9fe',
              animation: `fadeUp 0.4s ease-out forwards`,
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              transition: 'all 0.25s ease'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(124,58,237,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p style={{
                fontSize: '13px',
                color: '#4b5563',
                lineHeight: '1.7',
                marginBottom: '18px',
                fontStyle: 'italic'
              }}>
                "{testimonial.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#1a1a2e' }}>
                    {testimonial.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom curve */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 60%)',
        width: '150vw',
        paddingBottom: '15%',
        borderRadius: '50%'
      }} />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}