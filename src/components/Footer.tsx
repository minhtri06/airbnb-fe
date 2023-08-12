'use client'

import { usePathname } from 'next/navigation'
import Container from './Container'

const Footer = () => {
  const pathname = usePathname()

  if (
    pathname?.startsWith('/hosting/become-a-host') ||
    pathname?.startsWith('/messages')
  )
    return <></>

  return (
    <div className="bg-neutral-100">
      <Container>
        <div className="flex gap-5 py-12">
          <div className="flex-1 flex flex-col gap-4">
            <div className="font-bold text-base">Support</div>
            <div className="hover:underline cursor-pointer text-base">
              Help Center
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Get help with a safety issue
            </div>
            <div className="hover:underline cursor-pointer text-base">
              AirCover
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Supporting people with disabilities
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Cancellation options
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Our COVID-19 Response
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Report a neighborhood concern
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="font-bold text-base">Community</div>
            <div className="hover:underline cursor-pointer text-base">
              Airbnb.org: disaster relief housing
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Combating discrimination
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="font-bold text-base">Hosting</div>
            <div className="hover:underline cursor-pointer text-base">
              Airbnb your home
            </div>
            <div className="hover:underline cursor-pointer text-base">
              AirCover for Hosts
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Explore hosting resources
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Visit our community forum
            </div>
            <div className="hover:underline cursor-pointer text-base">
              How to host responsibly
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Airbnb-friendly apartments
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="font-bold text-base">Airbnb</div>
            <div className="hover:underline cursor-pointer text-base">
              Newsroom
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Learn about new features
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Letter from our founders
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Careers
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Investors
            </div>
            <div className="hover:underline cursor-pointer text-base">
              Gift cards
            </div>
          </div>
        </div>
        <hr />
        <div className="h-16 flex items-center gap-2">
          <span>© 2023 Airbnb, Inc.</span>
          <span>.</span>
          <span className="cursor-pointer hover:underline">Terms</span>
          <span>.</span>
          <span className="cursor-pointer hover:underline">Sitemap</span>
          <span>.</span>
          <span className="cursor-pointer hover:underline">Privacy</span>
          <span>.</span>
          <span className="cursor-pointer hover:underline">Your</span>
          <span>.</span>
          <span className="cursor-pointer hover:underline">Privacy</span>
          <span>.</span>
          <span className="cursor-pointer hover:underline">Choices</span>
        </div>
      </Container>
    </div>
  )
}

export default Footer
