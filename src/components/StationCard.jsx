'use client'

import Link from 'next/link'

export default function StationCard({ station, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        background: isSelected ? '#faf5ff' : '#ffffff',
        borderRadius: '14px',
        padding: '18px',
        marginBottom: '10px',
        cursor: 'pointer',
        border: isSelected ? '1.5px solid #7c3aed' : '1px solid #ede9fe',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isSelected 
          ? '0 8px 30px rgba(124,58,237,0.12)' 
          : '0 1px 3px rgba(0,0,0,0.04)'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.borderColor = '#c4b5fd'
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.borderColor = '#ede9fe'
        }
      }}
    >
      {/* Top Row: Name + Distance */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '10px',
        gap: '12px'
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: '700',
            color: '#1a1a2e',
            marginBottom: '4px',
            lineHeight: '1.3',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {station.name}
          </h3>
          {station.brand && (
            <span style={{
              display: 'inline-block',
              background: '#f3e8ff',
              color: '#7c3aed',
              padding: '3px 9px',
              borderRadius: '14px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              {station.brand}
            </span>
          )}
        </div>
        <span style={{
          background: '#f3e8ff',
          color: '#7c3aed',
          padding: '5px 10px',
          borderRadius: '14px',
          fontSize: '13px',
          fontWeight: '700',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          {station.distance_km} km
        </span>
      </div>

      {/* Address */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '6px',
        marginBottom: '10px'
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          lineHeight: '1.4',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {station.address || 'Address not available'}
        </p>
      </div>

      {/* Fuel Types */}
      {station.fuel_types?.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          marginBottom: '10px'
        }}>
          {station.fuel_types.map(fuel => (
            <span key={fuel} style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              color: '#4b5563',
              fontWeight: '500'
            }}>
              {fuel}
            </span>
          ))}
        </div>
      )}

      {/* Amenities */}
      {station.amenities?.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '14px'
        }}>
          {station.amenities.slice(0, 3).map(amenity => (
            <span key={amenity} style={{
              fontSize: '11px',
              color: '#9ca3af'
            }}>
              {amenity}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '7px' }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.lat},${station.coordinates.lng}`,
              '_blank'
            )
          }}
          style={{
            flex: 1,
            padding: '9px 0',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.02)'
            e.target.style.boxShadow = '0 4px 15px rgba(124,58,237,0.3)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = 'none'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          Navigate
        </button>
        <Link
          href={`/station/${station.id}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            padding: '9px 14px',
            border: '1.5px solid #c4b5fd',
            color: '#7c3aed',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#faf5ff'
            e.target.style.borderColor = '#7c3aed'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent'
            e.target.style.borderColor = '#c4b5fd'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Details
        </Link>
      </div>
    </div>
  )
}