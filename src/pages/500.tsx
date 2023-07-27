import '@/app/globals.css'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

const SomethingWentWrong = () => {
  const router = useRouter()

  return (
    <div className="h-screen pl-20 pt-16">
      <div className="w-1/2">
        <div className="text-4xl pb-5">Oh no! Something went wrong 😓</div>
        <div className="w-1/2">
          <Button
            label="Go back to dashboard"
            onClick={() => {
              router.push('/')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SomethingWentWrong
