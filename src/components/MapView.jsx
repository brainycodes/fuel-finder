'use client'

import { useEffect, useRef } from 'react'

export default function MapView({ stations, selectedStation, onStationSelect }) {
  const mapRef = useRef(null)

  useEffect(() => {
    // Load Leaflet dynamically to avoid SSR issues
    const loadMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      if (!mapRef.current || mapRef.current._leaflet_id) return

      const map = L.map(mapRef.current).setView([6.5244, 3.3792], 13)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      // Add markers
      stations.forEach(station => {
        if (station.coordinates?.lat && station.coordinates?.lng) {
          const marker = L.marker([station.coordinates.lat, station.coordinates.lng])
            .addTo(map)
            .bindPopup(`
              <div style="min-width:200px">
                <strong>${station.name}</strong><br/>
                ${station.brand || ''}<br/>
                <small>${station.address || ''}</small><br/>
                <small>Distance: ${station.distance_km} km</small>
              </div>
            `)
          
          marker.on('click', () => onStationSelect?.(station))
        }
      })

      // User location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          L.marker([pos.coords.latitude, pos.coords.longitude], {
            icon: L.divIcon({
              className: 'user-marker',
              html: '<div style="width:16px;height:16px;background:#7c3aed;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(124,58,237,0.5)"></div>',
              iconSize: [16, 16]
            })
          }).addTo(map).bindPopup('Your Location')
        })
      }
    }

    loadMap()
  }, [stations])

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '100%', minHeight: '400px', borderRadius: 'inherit' }}
    />
  )
}