import { property } from '@/types'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

interface SearchMapProps {
  properties: property[]
}

const SearchMap: React.FC<SearchMapProps> = ({ properties }) => {
  const geoCodes = properties.map((p) => ({
    lat: p.address.latitude,
    lng: p.address.longitude,
  }))

  const center = {
    lat:
      geoCodes.reduce((total, gCode) => total + gCode.lat, 0) / geoCodes.length,
    lng:
      geoCodes.reduce((total, gCode) => total + gCode.lng, 0) / geoCodes.length,
  }

  console.log(center)

  return (
    <div className="flex-1 sticky top-40 h-[calc(100vh-10rem)] bottom-0">
      <MapContainer center={center} zoom={13} className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}

export default SearchMap
