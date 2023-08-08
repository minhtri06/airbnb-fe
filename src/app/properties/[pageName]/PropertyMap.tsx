import { Icon } from 'leaflet'
import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

interface PropertyMapProps {
  position: { lat: number; lng: number }
}

const PropertyMap: React.FC<PropertyMapProps> = ({ position }) => {
  const MarkerIcon = new Icon({
    iconUrl: '/img/pin.png',
    iconSize: [38, 38],
  })

  return (
    <div>
      <div className="text-2xl font-bold">Where you'll be</div>
      <div className="h-[450px] bg-black mt-5">
        <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
          <Marker icon={MarkerIcon} position={position} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  )
}

export default PropertyMap
