'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import station1 from '../../../assets/station1.jpg'
import station2 from '../../../assets/station2.png'
import station3 from '../../../assets/station3.jpg'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

export default function StationDetailPage() {
  const params = useParams()
  const [station, setStation] = useState(null)
  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState(null)
  const [displayDistance, setDisplayDistance] = useState(null) 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      )
    }
    fetchStationDetails()
  }, [params.id])

  const fetchStationDetails = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      let lat = urlParams.get('lat')
      let lng = urlParams.get('lng')
      let countryCode = urlParams.get('country') || 'NG'
      setDisplayDistance(urlParams.get('distance'))

      if (!lat || !lng) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 })
          })
          lat = position.coords.latitude
          lng = position.coords.longitude
        } catch (e) {
          try {
            const geoRes = await fetch(`${API_URL}/geolocation/detect`)
            const geoData = await geoRes.json()
            if (geoData.success && geoData.data.latitude) {
              lat = geoData.data.latitude
              lng = geoData.data.longitude
              countryCode = geoData.data.country_code || 'NG'
            }
          } catch (e2) { lat = 9.0579; lng = 7.4951 }
        }
      }

      const res = await fetch(`${API_URL}/stations/nearby?lat=${lat}&lng=${lng}&radius=50&country=${countryCode}`)
      const data = await res.json()
      if (data.success) {
        const found = data.data.stations.find(s => s.id === params.id)
        if (found) setStation(found)
      }
      const pricesRes = await fetch(`${API_URL}/prices/official/${countryCode}`)
      const pricesData = await pricesRes.json()
      if (pricesData.success) setPrices(pricesData.data.prices)
    } catch (error) { console.error('Failed:', error) }
    finally { setLoading(false) }
  }

  const getDisplayPrice = (price) => {
    if (!price) return 0
    return price.currency === 'NGN' ? (price.price * 2) : price.price
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0418' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Loading station...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!station) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0418' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(124,58,237,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>Station Not Found</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '24px' }}>This station may have been removed or the link is invalid.</p>
          <Link href="/search" style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Back to Search</Link>
        </div>
      </div>
    )
  }

  const googleMapsUrl = userLocation 
    ? `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${station.coordinates.lat},${station.coordinates.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.lat},${station.coordinates.lng}`

  const mapImageUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${station.coordinates.lat},${station.coordinates.lng}&zoom=15&size=600x350&markers=${station.coordinates.lat},${station.coordinates.lng},red-pushpin`

  return (
    <div style={{ background: '#faf5ff', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', padding: '140px 0 80px', background: 'linear-gradient(160deg, rgba(15,7,32,0.95) 0%, rgba(124,58,237,0.85) 100%), url(https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1920&q=80) center/cover no-repeat', overflow: 'hidden' }}>
        <div style={{ padding: '0 clamp(20px, 5vw, 60px)', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', marginBottom: '24px', color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link><span>/</span>
            <Link href="/search" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Search</Link><span>/</span>
            <span style={{ color: '#c4b5fd' }}>{station.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              {station.brand && <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.1)', color: '#c4b5fd', borderRadius: '20px', fontSize: '11px', fontWeight: '600', marginBottom: '12px' }}>{station.brand}</span>}
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', color: 'white', marginBottom: '8px', letterSpacing: '-0.5px' }}>{station.name}</h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {station.address || 'Address unavailable'}
              </p>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '16px 24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#fbbf24', lineHeight: '1' }}>{displayDistance || station.distance_km || '?'}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>km away</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '40px', background: '#faf5ff', borderRadius: '50% 50% 0 0 / 100% 100% 0 0', transform: 'scaleX(1.4)' }} />
      </section>

      {/* Content */}
      <section style={{ padding: '40px 0 60px' }}>
        <div style={{ padding: '0 clamp(20px, 5vw, 60px)', maxWidth: '1100px', margin: '0 auto' }}>
          {/* Price Cards */}
          {prices && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {Object.entries(prices).map(([name, price]) => {
                const dp = getDisplayPrice(price)
                return (
                  <div key={name} style={{ background: 'white', padding: '18px', borderRadius: '14px', border: '1px solid #ede9fe', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>{name}</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a2e' }}>{price.symbol}{dp.toFixed(2)}</div>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>per {price.unit || 'litre'}</div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Map + Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }} className="detail-grid">
            {/* Map with real image */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '350px', border: '1px solid #ede9fe', position: 'relative' }}>
              <img src={mapImageUrl} alt={`Map of ${station.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none' }} />
              <a href={googleMapsUrl} target="_blank" style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'white', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', color: '#7c3aed', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>Open in Google Maps</a>
            </div>

            {/* Info */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #ede9fe' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a2e', marginBottom: '16px' }}>Station Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Open Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: station.is_24_hours ? '#10b981' : '#ef4444' }} />
                  <span style={{ fontSize: '13px', color: '#4b5563' }}>{station.is_24_hours ? 'Open 24 Hours' : station.opening_hours || 'Hours not specified'}</span>
                </div>

                {/* Distance */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {displayDistance || station.distance_km || '?'} km from your location
                </div>

                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#4b5563' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{station.address || 'Address unavailable'}</span>
                </div>

                {/* Coordinates */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                  {station.coordinates?.lat?.toFixed(6)}, {station.coordinates?.lng?.toFixed(6)}
                </div>

                {station.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>{station.phone}</div>}

                {station.fuel_types?.length > 0 && <div><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase' }}>Fuels</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{station.fuel_types.map(fuel => <span key={fuel} style={{ background: '#f3e8ff', color: '#7c3aed', padding: '4px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '500' }}>{fuel}</span>)}</div></div>}

                {station.payment_methods?.length > 0 && <div><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase' }}>Payment</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{station.payment_methods.map(m => <span key={m} style={{ background: '#f0fdf4', color: '#059669', padding: '4px 10px', borderRadius: '10px', fontSize: '11px' }}>{m}</span>)}</div></div>}

                {station.amenities?.length > 0 && <div><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase' }}>Amenities</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{station.amenities.map(a => <span key={a} style={{ fontSize: '11px', color: '#6b7280' }}>• {a}</span>)}</div></div>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button onClick={() => window.open(googleMapsUrl, '_blank')} style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter, sans-serif' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Get Directions
            </button>
            <button onClick={() => window.open(`https://www.google.com/maps?q=${station.coordinates.lat},${station.coordinates.lng}`, '_blank')} style={{ padding: '14px 20px', border: '1px solid #c4b5fd', color: '#7c3aed', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', background: 'white' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10"/></svg>
              View on Map
            </button>
          </div>

          {/* Images */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
            {[station1, station2, station3].map((img, i) => (
              <div key={i} style={{ borderRadius: '14px', overflow: 'hidden', height: '200px' }}>
                <Image src={img} alt={`Station ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 768px) { .detail-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}