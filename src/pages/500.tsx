import Link from 'next/link'
import Image from 'next/image'

import '@/app/globals.css'

const SomethingWentWrong = () => {
  return (
    <>
      <div className="w-ful h-20 px-10 flex items-center border-b-[1px]">
        <Link href="/">
          <Image
            priority
            alt="Logo"
            src="/img/airbnb-logo.svg"
            className="hidden md:block cursor-pointer"
            style={{ height: 'auto' }}
            height={0}
            width={100}
          />
        </Link>
      </div>
      <div className="pl-10 pr-32 pt-20">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-semibold pb-5">
              Oh no!! Something went wrong
            </div>

            <div className=" text-lg pb-3">
              <Link className="font-semibold underline" href="/">
                Go to Home
              </Link>
            </div>
            <div className=" text-lg pb-3">
              <Link className="font-semibold underline" href="/">
                Visit our 404 page
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/img/404.gif"
              alt="not found image"
              height={200}
              width={200}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SomethingWentWrong
