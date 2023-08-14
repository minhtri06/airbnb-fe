import Button from '@/components/buttons/Button'
import Link from 'next/link'

const NoTrip = () => {
  return (
    <>
      <div className="text-2xl font-semibold">No trips booked...yet!</div>
      <div className="text-lg mt-2">
        Time to dust off your bags and start planning your next adventure
      </div>
      <div className="mt-6 mb-9">
        <div className="w-44 text-sm font-semibold">
          <Link href="/">
            <Button outline label="Start searching" onClick={() => {}} />
          </Link>
        </div>
      </div>{' '}
      <hr />
      <div className="pt-6 pb-9">
        Can&apos;t find your reservation here?{' '}
        <span className="underline font-semibold">Visit the Help Center</span>
      </div>
    </>
  )
}

export default NoTrip
