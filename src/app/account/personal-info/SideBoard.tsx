'use client'

import icon1 from '@/../public/img/pi-page-icon-1.svg'
import icon2 from '@/../public/img/pi-page-icon-2.svg'
import icon3 from '@/../public/img/pi-page-icon-3.svg'
import Image from 'next/image'

const SideBoard = () => {
  return (
    <div className="w-80 border-[1px] rounded-xl p-5">
      <div className="flex flex-col gap-4">
        <Image src={icon1} alt="" />
        <div className="text-xl font-extrabold">
          Why isn&apos;t my info shown here?
        </div>
        <div className="text-gray-500">
          We&apos;re hiding some account details to protect your identity.
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex flex-col gap-4">
        <Image src={icon2} alt="" />
        <div className="text-xl font-extrabold">
          Which details can be edited?
        </div>
        <div className="text-gray-500">
          Contact info and personal details can be edited. If this info was used
          to verify your identity, you&apos;ll need to get verified again the
          next time you book—or to continue hosting.
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex flex-col gap-4">
        <Image src={icon3} alt="" />
        <div className="text-xl font-extrabold">
          Which details can be edited?
        </div>
        <div className="text-gray-500">
          Airbnb only releases contact information for Hosts and guests after a
          reservation is confirmed.
        </div>
      </div>
    </div>
  )
}

export default SideBoard
