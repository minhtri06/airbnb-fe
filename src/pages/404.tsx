import '@/app/globals.css'

import Image from 'next/image'
import Link from 'next/link'

import Navbar from '@/components/navbar/Navbar'

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="pl-10 pr-32 pt-20">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-semibold pb-5">
              We can't seem to find the page you're looking for
            </div>
            <div className="text-lg pb-5">
              Here are some helpful links instead:
            </div>
            <div className="underline text-lg pb-3 font-semibold">
              <Link href="/">Home</Link>
            </div>
            <div className="underline text-lg pb-3 font-semibold">
              <Link href="/">Traveling on Airbnb</Link>
            </div>
            <div className="underline text-lg pb-3 font-semibold">
              <Link href="/500">Go to 500 error page</Link>
            </div>
            <div className="underline text-lg pb-3 font-semibold">
              <Link href="/">Site map</Link>
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

export default NotFound
