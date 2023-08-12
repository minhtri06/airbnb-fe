'use client'

import { property } from '@/types'
import { Icon } from 'leaflet'
import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

interface PropertyMapProps {
  property: property
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property }) => {
  const address = property.address
  const position = { lat: address.latitude, lng: address.longitude }

  const MarkerIcon = new Icon({
    iconUrl: '/img/pin.png',
    iconSize: [38, 38],
  })

  return (
    <div className="-z-10">
      <div className="text-2xl font-bold">Where you&apos;ll be</div>
      <div className="mt-2 font-semibold">{`${address.address}, ${address.districtName}, ${address.provinceName}`}</div>
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
