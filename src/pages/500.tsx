import Link from 'next/link'
import Image from 'next/image'

import '@/app/globals.css'
import Navbar from '@/components/navbar/Navbar'

const SomethingWentWrong = () => {
  return (
    <>
      <Navbar hideSearch hideUserMenu />
      <div className="pl-10 pr-32 pt-20">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-semibold pb-5">
              Oh no!! Something went wrong
            </div>

            <div className=" text-lg pb-3">
              Go to{' '}
              <Link className="font-semibold underline" href="/">
                Home
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
