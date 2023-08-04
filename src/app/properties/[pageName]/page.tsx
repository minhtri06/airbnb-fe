'use client'

import Container from '@/components/Container'
import usePropertyAction from '@/hooks/usePropertyAction'
import { ownerObj, property } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar'
import { BiShare } from '@react-icons/all-files/bi/BiShare'
import { BiUserPin } from '@react-icons/all-files/bi/BiUserPin'
import { BsHeart } from '@react-icons/all-files/bs/BsHeart'

const Properties = ({ params }: { params: { pageName: string } }) => {
  const propertyAction = usePropertyAction()
  const router = useRouter()

  const [property, setProperty] = useState<property | null>(null)

  useEffect(() => {
    propertyAction
      .getPropertyByPageName(params.pageName)
      .then((data) => {
        setProperty(data.property)
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            router.push('/404')
            return
          }
        }
        router.push('/500')
      })
  }, [])

  console.log(property)

  if (!property) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Container>
        <div className="py-5 font-bold">
          <div className="text-3xl">{property.title}</div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-3">
              <span className="flex items-center gap-1">
                <AiFillStar /> {property.score || 'New'}
              </span>
              <span className="underline">{property.reviewCount} reviews</span>
              <div className="flex gap-1 items-center">
                <BiUserPin />
                {(property.owner as ownerObj).name}
              </div>
              <div className="underline">
                {`${property.address.address}, ${property.address.districtName}, ${property.address.provinceName}`}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <BiShare />
                <span className="underline">Share</span>
              </div>
              <div className="flex items-center gap-2">
                <BsHeart />
                <span className="underline">save</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 h-96 rounded-lg overflow-hidden">
          <div className="h-full w-full relative">
            <Image
              src={property.thumbnail || '/img/home-icon.png'}
              alt="Property image"
              style={{ objectFit: 'cover' }}
              fill
            />
          </div>
          <div className="h-full w-full grid grid-cols-2 gap-3">
            {!property.images &&
              [1, 2, 3, 4].map(() => (
                <div className="relative">
                  <Image
                    src={'/img/home-icon.png'}
                    alt="Property image"
                    style={{ objectFit: 'cover' }}
                    fill
                  />
                </div>
              ))}
            {property.images &&
              property.images?.slice(0, 4).map((img) => (
                <div className="relative">
                  <Image
                    src={img}
                    alt="Property image"
                    style={{ objectFit: 'cover' }}
                    fill
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="pt-14">
          <div className="text-2xl font-bold">
            Hosted by {(property.owner as ownerObj).name}
          </div>
          <div className="relative">
            adfasdf
            <Image
              src={
                (property.owner as ownerObj).avatar ||
                '/img/avatar-placeholder.svg'
              }
              alt="Host avatar"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Properties
