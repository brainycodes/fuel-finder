'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [stations, setStations] = useState([])
  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState('NG')
  const [radius, setRadius] = useState(20)
  const [countries, setCountries] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [locationLoading, setLocationLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(query)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Get user's precise location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
          setLocationLoading(false)
        },
        async () => {
          // Fallback to IP detection via backend
          try {
            const res = await fetch(`${API_URL}/geolocation/detect`)
            const data = await res.json()
            if (data.success && data.data.latitude) {
              setUserLocation({
                lat: data.data.latitude,
                lng: data.data.longitude
              })
              if (data.data.country_code) setCountry(data.data.country_code)
            }
          } catch (e) {
            console.error('Location detection failed')
          }
          setLocationLoading(false)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } else {
      setLocationLoading(false)
    }
  }, [])

  // Fetch countries
  useEffect(() => {
    fetch(`${API_URL}/countries`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setCountries(data.data)
          if (!country && data.data.length > 0) {
            setCountry(data.data[0].code)
          }
        }
      })
      .catch(console.error)
  }, [])

  // Fetch stations when location is ready
  useEffect(() => {
    if (userLocation && country) {
      fetchStations()
    }
  }, [userLocation, country, radius])

  const fetchStations = async () => {
    if (!userLocation) return
    setLoading(true)
    try {
      const [stationsRes, pricesRes] = await Promise.all([
        fetch(`${API_URL}/stations/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}&country=${country}`),
        fetch(`${API_URL}/prices/official/${country}`)
      ])

      const stationsData = await stationsRes.json()
      const pricesData = await pricesRes.json()

      if (stationsData.success) {
        const filtered = searchInput 
          ? stationsData.data.stations.filter(s => 
              s.name.toLowerCase().includes(searchInput.toLowerCase()) ||
              (s.address && s.address.toLowerCase().includes(searchInput.toLowerCase()))
            )
          : stationsData.data.stations
        setStations(filtered)
      }
      if (pricesData.success) setPrices(pricesData.data.prices)
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchInput = async (value) => {
    setSearchInput(value)
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

  const handleSearch = (q) => {
    const searchQuery = q || searchInput
    setSearchInput(searchQuery)
    setShowSuggestions(false)
    fetchStations()
  }

  const currentCountry = countries.find(c => c.code === country)

  const getFuelUnit = () => {
    const countryUnits = {
      NG: 'litre', GH: 'litre', KE: 'litre', ZA: 'litre', EG: 'litre',
      US: 'gallon', GB: 'litre', DE: 'litre', FR: 'litre', IN: 'litre',
      JP: 'litre', AE: 'litre', AU: 'litre'
    }
    return countryUnits[country] || 'litre'
  }

  const getDisplayPrice = (price) => {
    if (!price) return 0
    return price.currency === 'NGN' ? (price.price * 2) : price.price
  }

  const isOpenNow = (station) => {
    if (station?.is_24_hours) return true
    const hour = new Date().getHours()
    return hour >= 6 && hour <= 22
  }

  const formatAddress = (addr) => {
    if (!addr) return 'Address unavailable — use directions for exact location'
    return addr
  }

  if (locationLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0418' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px', height: '40px',
            border: '3px solid rgba(124,58,237,0.2)',
            borderTopColor: '#7c3aed',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Getting your location...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '140px 0 60px',
        background: 'linear-gradient(160deg, rgba(15,7,32,0.95) 0%, rgba(124,58,237,0.85) 100%), url(https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80) center/cover no-repeat',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '0 clamp(20px, 5vw, 60px)',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(255,255,255,0.08)',
            color: '#c4b5fd',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            {stations.length} Stations Found
          </span>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '900',
            color: 'white',
            marginBottom: '12px',
            letterSpacing: '-1px'
          }}>
            Find the{' '}
            <span style={{ color: '#fbbf24' }}>closest fuel</span>
            {' '}near you
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '32px'
          }}>
            Showing stations near <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{currentCountry?.name || 'you'}</strong> • {stations.length} found within {radius}km
          </p>

          {/* Search + Filters */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <div style={{ position: 'relative', flex: '1', maxWidth: '400px', minWidth: '250px' }}>
              <div style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '14px',
                overflow: 'hidden'
              }}>
                <input
                  type="text"
                  placeholder="Search stations..."
                  value={searchInput}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  style={{
                    flex: 1, padding: '12px 16px', background: 'transparent',
                    border: 'none', outline: 'none', color: 'white',
                    fontSize: '14px', fontFamily: 'Inter, sans-serif'
                  }}
                />
                <button onClick={() => handleSearch()} style={{
                  padding: '12px 20px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  color: 'white', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: '600', fontFamily: 'Inter, sans-serif'
                }}>
                  Search
                </button>
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0,
                  background: 'rgba(15,7,32,0.98)', border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '12px', marginTop: '6px', overflow: 'hidden', zIndex: 100
                }}>
                  {suggestions.map((s, i) => (
                    <div key={i} onMouseDown={() => handleSearch(s)} style={{
                      padding: '12px 16px', cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
                      fontSize: '13px', borderBottom: i < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                    }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(124,58,237,0.2)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select value={country} onChange={(e) => setCountry(e.target.value)} style={{
              padding: '12px 14px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', color: 'white',
              fontSize: '13px', fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer'
            }}>
              {countries.map(c => (
                <option key={c.code} value={c.code} style={{ color: '#1a1a2e' }}>{c.name}</option>
              ))}
            </select>

            <select value={radius} onChange={(e) => setRadius(Number(e.target.value))} style={{
              padding: '12px 14px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', color: 'white',
              fontSize: '13px', fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer'
            }}>
              <option value={5} style={{ color: '#1a1a2e' }}>5 km</option>
              <option value={10} style={{ color: '#1a1a2e' }}>10 km</option>
              <option value={20} style={{ color: '#1a1a2e' }}>20 km</option>
              <option value={50} style={{ color: '#1a1a2e' }}>50 km</option>
            </select>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: '40px',
          background: '#faf5ff', borderRadius: '50% 50% 0 0 / 100% 100% 0 0', transform: 'scaleX(1.4)'
        }} />
      </section>

      {/* Price Cards */}
      {prices && (
        <section style={{ background: '#faf5ff', padding: '40px 0 0' }}>
          <div style={{ padding: '0 clamp(20px, 5vw, 60px)', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {Object.entries(prices).map(([name, price]) => {
                const dp = getDisplayPrice(price)
                return (
                  <div key={name} style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #ede9fe', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>{name}</div>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a2e' }}>{price.symbol}{dp.toFixed(2)}</div>
                    <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>per {price.unit || getFuelUnit()}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Station Cards */}
      <section style={{ background: '#faf5ff', padding: '0 0 60px' }}>
        <div style={{ padding: '0 clamp(20px, 5vw, 60px)', maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ width: '36px', height: '36px', border: '3px solid #ede9fe', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
              <p style={{ color: '#6b7280', fontSize: '13px' }}>Finding stations near you...</p>
            </div>
          ) : stations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: '#6b7280', fontSize: '15px', fontWeight: '600' }}>No stations found</p>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>Try adjusting your search or increasing the radius</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stations.map(station => (
                <div key={station.id} style={{
                  background: 'white', borderRadius: '16px', border: '1px solid #ede9fe',
                  overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', transition: 'all 0.25s ease'
                }} className="station-card">
                  {/* Map Placeholder */}
                  <div style={{ minHeight: '300px', background: '#e8f0fe', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                      <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', margin: '0 auto 8px', boxShadow: '0 4px 15px rgba(124,58,237,0.4)' }}>
                        <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' }} />
                      </div>
                      <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '600' }}>{station.coordinates.lat.toFixed(4)}, {station.coordinates.lng.toFixed(4)}</p>
                    </div>
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'white', padding: '8px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', color: '#7c3aed', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {station.distance_km} km away
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '6px' }}>{station.name}</h3>
                        {station.brand && <span style={{ background: '#f3e8ff', color: '#7c3aed', padding: '4px 12px', borderRadius: '14px', fontSize: '11px', fontWeight: '600' }}>{station.brand}</span>}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '14px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>{formatAddress(station.address)}</p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOpenNow(station) ? '#10b981' : '#ef4444', boxShadow: isOpenNow(station) ? '0 0 8px rgba(16,185,129,0.4)' : 'none' }} />
                        <span style={{ fontSize: '12px', color: isOpenNow(station) ? '#10b981' : '#ef4444', fontWeight: '600' }}>{isOpenNow(station) ? 'Open Now' : 'Closed'}</span>
                        {station.opening_hours && station.opening_hours !== '24/7' && station.opening_hours !== 'Not specified' && <span style={{ fontSize: '12px', color: '#9ca3af' }}>• {station.opening_hours}</span>}
                      </div>

                      {prices && (
                        <div style={{ background: '#faf5ff', padding: '12px', borderRadius: '10px', marginBottom: '14px', border: '1px solid #ede9fe' }}>
                          <div style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>Official Price</div>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            {Object.entries(prices).slice(0, 2).map(([name, price]) => {
                              const dp = getDisplayPrice(price)
                              return (
                                <div key={name} style={{ fontSize: '13px', color: '#4b5563' }}><strong>{name}:</strong> {price.symbol}{dp.toFixed(2)}/{price.unit || getFuelUnit()}</div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {station.fuel_types?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                          {station.fuel_types.map(fuel => <span key={fuel} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', color: '#4b5563', fontWeight: '500' }}>{fuel}</span>)}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid #f3f4f6' }}>
                      <button onClick={() => window.open(`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${station.coordinates.lat},${station.coordinates.lng}`, '_blank')} style={{ flex: 1, padding: '10px 16px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>Navigate
                      </button>
                      <Link href={`/station/${station.id}?lat=${station.coordinates.lat}&lng=${station.coordinates.lng}&country=${country}&distance=${station.distance_km}`} style={{ padding: '10px 16px', border: '1px solid #c4b5fd', color: '#7c3aed', borderRadius: '10px', fontSize: '12px', fontWeight: '600', textDecoration: 'none', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .station-card { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0418' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}