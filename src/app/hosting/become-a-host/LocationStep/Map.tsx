'use client'

import { Icon } from 'leaflet'
import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

interface MapProps {
  position: { lat: number; lng: number }
  setPosition: (value: { lat: number; lng: number }) => void
}

const CenteredMarker = ({
  position,
  setPosition,
}: {
  position: { lat: number; lng: number }
  setPosition: (value: { lat: number; lng: number }) => void
}) => {
  const markerRef = useRef<null | any>(null)

  const map = useMapEvents({
    move() {
      const marker = markerRef.current
      if (marker) {
        marker.setLatLng(map.getCenter())
      }
    },
    moveend() {
      setPosition(map.getCenter())
    },
    locationfound(e) {
      console.log(e)
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    const center = map.getCenter()
    if (position.lat !== center.lat) {
      map.flyTo(position)
    }
  }, [position, map])

  const MarkerIcon = new Icon({
    iconUrl: '/img/location-pin.png',
    iconSize: [38, 38],
  })

  return <Marker position={position} ref={markerRef} icon={MarkerIcon} />
}

const Map: React.FC<MapProps> = ({ position, setPosition }) => {
  const mapRef = useRef<null | any>(null)

  return (
    <>
      <div className="mt-7 flex justify-between">
        Drag to your property&apos;s location
        <div
          className="font-bold underline cursor-pointer select-none"
          onClick={() => mapRef.current.locate()}
        >
          Use my current location
        </div>
      </div>
      <div className="h-96 rounded-lg overflow-hidden mt-3">
        <MapContainer
          center={position}
          zoom={16}
          className="z-0"
          id="map"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CenteredMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
    </>
  )
}

export default Map
