'use client'

import { property } from '@/types'
import pickFields from '@/utils/pickFields'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, LatLngBounds } from 'leaflet'

interface SearchMapProps {
  properties: property[] | null
}

const SearchMap: React.FC<SearchMapProps> = ({ properties }) => {
  const searchParams = useSearchParams()

  const MarkerIcon = new Icon({
    iconUrl: '/img/pin.png',
    iconSize: [38, 38],
  })

  return (
    <div className="flex-1 sticky top-40 h-[calc(100vh-10rem)] bottom-0">
      <MapContainer
        ref={(map) => {
          const markerBounds = new LatLngBounds(
            properties && properties.length !== 0
              ? properties.map((p) => [p.address.latitude, p.address.longitude])
              : [
                  [10.791692129493027, 100.46889011903893],
                  [18, 110.46889011903893],
                ],
          )

          map?.fitBounds(markerBounds)
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties &&
          properties.map((p) => {
            const pricePerNight = p.accommodations[0].pricePerNight as number

            const query = new URLSearchParams(
              pickFields(
                {
                  bookIn: searchParams?.get('bookIn'),
                  bookOut: searchParams?.get('bookOut'),
                },
                'bookIn',
                'bookOut',
              ),
            )
            const linkHref = `/properties/${p.pageName}?${query.toString()}`

            return (
              <Marker
                key={p._id}
                position={{ lat: p.address.latitude, lng: p.address.longitude }}
                icon={MarkerIcon}
              >
                <Popup className="request-popup">
                  <Link href={linkHref}>
                    <div className="w-60">
                      <div className="w-full h-36 relative overflow-hidden rounded-t-xl">
                        <Image
                          // className="rounded-xl"
                          src={p.thumbnail as string}
                          style={{ objectFit: 'cover' }}
                          fill
                          sizes="300px"
                          alt=""
                        />
                      </div>
                      <div className="px-2 ">
                        <div className="mt-2 mb-1 flex justify-between text-sm font-semibold ">
                          <span className="overflow-hidden whitespace-nowrap truncate">
                            {p.title}
                          </span>
                          <span className="text-rose-600">
                            ${pricePerNight}
                          </span>
                        </div>
                        <div className="text-gray-500">{`${p.address.districtName}, ${p.address.provinceName}`}</div>
                      </div>
                    </div>
                  </Link>
                </Popup>
              </Marker>
            )
          })}
      </MapContainer>
    </div>
  )
}

export default SearchMap
