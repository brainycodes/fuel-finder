'use client'
import Image from 'next/image'
import aboutImage from '../../assets/about.png'

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
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
          <div style={{ maxWidth: '600px' }}>
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
                Our Mission
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
              Locate the{' '}
              <span style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'shimmerText 2.5s linear infinite'
              }}>
                nearest
              </span>
              {' '}fuel station when you're stranded
            </h1>

            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.6',
              marginBottom: '34px',
              maxWidth: '420px'
            }}>
              Running low on fuel in an unfamiliar area? We help you find the closest station instantly — with real pricing so you know what to expect.
            </p>

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
          background: '#faf5ff',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          transform: 'scaleX(1.4)'
        }} />
      </section>

      {/* Why We Exist */}
      <section style={{
        position: 'relative',
        background: '#ffffff',
        padding: '100px 0 80px',
        marginTop: '-1px'
      }}>
        <div style={{
          padding: '0 clamp(20px, 5vw, 60px)',
          maxWidth: '1200px',
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
              Why We Exist
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              fontWeight: '800',
              color: '#1a1a2e',
              marginBottom: '10px',
              letterSpacing: '-0.5px'
            }}>
              Nobody should be stranded with an{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                empty tank
              </span>
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              maxWidth: '420px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              We make finding the closest station simple and fast.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'center'
          }} className="about-grid">
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7', marginBottom: '12px' }}>
                Whether you're in a new city, on a road trip, or just unfamiliar with your surroundings — running low on fuel is stressful. The fuel gauge drops below empty, the warning light flickers on, and suddenly you're scanning every corner for a station. Your heart races as you wonder if you'll make it or end up stuck on the side of the road.
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7', marginBottom: '12px' }}>
                We show you the nearest stations instantly, along with real prices, so you can get back on the road without worry. No more guessing which direction to go. No more wondering how much you'll pay when you finally find a pump. No more anxiety about being stranded in an unfamiliar place with no help in sight.
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7' }}>
                No guesswork. No driving in circles. No panic. Just the closest fuel at the best price, right when you need it most. Because everyone deserves to feel safe and in control behind the wheel — even when the tank is running low.
              </p>
            </div>
            <div>
              <Image
                src={aboutImage}
                alt="Our mission"
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  height: 'auto',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{
        position: 'relative',
        background: '#faf5ff',
        padding: '80px 0'
      }}>
        <div style={{
          padding: '0 clamp(20px, 5vw, 60px)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
              Our Values
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              fontWeight: '800',
              color: '#1a1a2e',
              letterSpacing: '-0.5px'
            }}>
              Built to help when it{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                matters most
              </span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {[
              { title: 'Fast & Reliable', desc: 'Find the nearest station in seconds. Real-time data you can count on when you need it.' },
              { title: 'Real Prices', desc: 'See actual pump prices before you arrive. No surprises, just transparent pricing.' },
              { title: 'Always Available', desc: '22 countries, 50K+ stations. Wherever you are, we help you find fuel fast.' }
            ].map((value, index) => (
              <div key={value.title} style={{
                padding: '28px',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #ede9fe',
                textAlign: 'center',
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
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>
                  {value.desc}
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
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}