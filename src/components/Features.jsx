'use client'

export default function Features() {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      title: 'Real-Time Prices',
      description: 'Live fuel prices updated by the community and official government sources across all stations.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ),
      title: '22+ Countries',
      description: 'Access stations worldwide with local currency, pricing, and country-specific fuel types.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
      ),
      title: 'One-Click Navigation',
      description: 'Get instant directions to any station. Opens directly in Google Maps for turn-by-turn guidance.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      ),
      title: 'Full Station Details',
      description: 'See amenities, fuel types, payment methods, and operating hours before you arrive.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      title: 'Community Reports',
      description: 'Contribute by reporting pump prices. Help other drivers find the best deals near them.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      title: 'Price Trends',
      description: 'Track fuel price history. Know when prices drop so you can fill up at the right time.'
    }
  ]

  return (
    <section style={{
      position: 'relative',
      background: '#faf5ff',
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
        background: '#faf5ff',
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
            background: '#ede9fe',
            color: '#7c3aed',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Why Choose Us
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 38px)',
            fontWeight: '800',
            color: '#1a1a2e',
            marginBottom: '10px',
            letterSpacing: '-0.5px'
          }}>
            Everything you need to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              find fuel fast
            </span>
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#6b7280',
            maxWidth: '420px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            All the tools you need to locate the closest station at the best price.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                padding: '28px',
                borderRadius: '16px',
                border: '1px solid #ede9fe',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
                animation: `fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay: `${index * 0.08}s`,
                opacity: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(124,58,237,0.1)'
                e.currentTarget.style.borderColor = '#c4b5fd'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = '#ede9fe'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, #f3e8ff, #ede9fe)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7c3aed',
                marginBottom: '18px'
              }}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1a1a2e',
                marginBottom: '8px'
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
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
        background: '#ffffff',
        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        transform: 'scaleX(1.4)'
      }} />

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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