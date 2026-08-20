'use client'

export default function Stats() {
  const stats = [
    { value: '50,000+', label: 'Fuel Stations Tracked' },
    { value: '22', label: 'Countries Covered' },
    { value: '100,000+', label: 'Active Users' },
    { value: '$2.5M+', label: 'Saved by Users' }
  ]

  return (
    <section style={{
      position: 'relative',
      padding: '80px 0',
      background: 'linear-gradient(160deg, rgba(15,7,32,0.92) 0%, rgba(124,58,237,0.82) 100%), url(https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80) center/cover no-repeat',
      overflow: 'hidden'
    }}>
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
        zIndex: 1,
        width: '100%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          textAlign: 'center',
          width: '100%'
        }} className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} style={{
              padding: '28px 16px',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              animation: `fadeUp 0.4s ease-out forwards`,
              animationDelay: `${index * 0.08}s`,
              opacity: 0
            }}>
              <div style={{
                fontSize: 'clamp(28px, 4vw, 38px)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '6px',
                lineHeight: '1.1'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: '500',
                lineHeight: '1.3'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

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
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}