'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight'
import { FaAngleLeft } from '@react-icons/all-files/fa/FaAngleLeft'

interface PaginationControllerProps {
  currentPage?: number | string | null
  maxPage: number
}

const PaginationController: React.FC<PaginationControllerProps> = ({
  currentPage,
  maxPage,
}) => {
  const pathname = usePathname()
  const params = useSearchParams()

  const router = useRouter()

  currentPage = Number(currentPage) || 1
  let renderNumbers
  if (maxPage - 1 < 5) {
    renderNumbers = Array.from({ length: maxPage }, (_, i) => i + 1)
  } else {
    renderNumbers = [1, maxPage]

    switch (currentPage) {
      case 1:
      case 2:
      case 3:
        renderNumbers.push(2, 3, 4)
        break
      case maxPage:
      case maxPage - 1:
      case maxPage - 2:
        renderNumbers.push(maxPage - 1, maxPage - 2, maxPage - 3)
        break
      default:
        renderNumbers.push(currentPage, currentPage - 1, currentPage + 1)
    }
    renderNumbers.sort((a, b) => a - b)
  }

  const handleOnSwitchPage = (num: number) => {
    const currentParams = new URLSearchParams(
      Array.from(params?.entries() || []),
    )

    currentParams.delete('page')
    currentParams.set('page', num.toString())

    const search = currentParams.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return (
    <div
      className="w-full flex justify-center gap-4 items-center text-base font-semibold
        py-5"
    >
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full 
          cursor-pointer hover:bg-gray-200 select-none"
      >
        <FaAngleLeft />
      </div>
      {renderNumbers.map((num, i, arr) => {
        return (
          <>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full 
              cursor-pointer ${
                currentPage === num
                  ? 'bg-gray-900 text-white'
                  : 'hover:bg-gray-200'
              } select-none`}
              onClick={() => {
                handleOnSwitchPage(num)
              }}
            >
              {num}
            </div>
            {arr[i + 1] && arr[i] + 1 !== arr[i + 1] && (
              <div className="w-8 h-8 flex items-center justify-center">
                ...
              </div>
            )}
          </>
        )
      })}
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full 
      cursor-pointer hover:bg-gray-200 select-none"
      >
        <FaAngleRight />
      </div>
    </div>
  )
}

export default PaginationController
