'use client'

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import { CATEGORIES } from '@/constants/categories'
import CategoryBox from './CategoryBox'
import Container from '../Container'
import { useEffect, useState } from 'react'
import useSearch from '@/hooks/contexts/useSearch'

const Categories = () => {
  const [isLeftBtnShowed, setIsLeftBtnShowed] = useState(false)
  const [isRightBtnShowed, setIsRightBtnShowed] = useState(true)
  const [isWindowOnTop, setIsWindowOnTop] = useState(true)
  const { params } = useSearch()

  useEffect(() => {
    window.onscroll = () => {
      const body = document.body
      if (window.scrollY === 0) {
        setIsWindowOnTop(true)
      } else if (isWindowOnTop === true) {
        setIsWindowOnTop(false)
      }
    }
  }, [])

  const slideLeft = () => {
    const slider = document.getElementById('slider')
    if (slider) {
      slider.scrollLeft -= 500
      setIsRightBtnShowed(true)
      if (slider.scrollLeft <= 500) {
        setIsLeftBtnShowed(false)
      }
    }
  }

  const slideRight = () => {
    const slider = document.getElementById('slider')
    if (slider) {
      slider.scrollLeft += 500
      setIsLeftBtnShowed(true)
      if (slider.scrollLeft >= 3720) {
        setIsRightBtnShowed(false)
      }
    }
  }

  return (
    <div
      className={`z-10 sticky top-14 w-full pt-6 h-26 ${
        !isWindowOnTop && 'border-b-[1px] bg-white shadow-sm'
      }`}
    >
      <Container>
        <div className="h-20 w-full overflow-hidden relative">
          {isLeftBtnShowed && (
            <div
              className="h-full flex items-center w-10 absolute z-10 
              bg-gradient-to-r from-white to-transparent"
            >
              <div
                className=" absolute p-[5px] bg-white rounded-full border-gray-400 
                  border-[1px] cursor-pointer"
                onClick={() => slideLeft()}
              >
                <FaAngleLeft />
              </div>
            </div>
          )}

          {isRightBtnShowed && (
            <div
              className="h-full flex items-center w-10 absolute right-0 z-10
          bg-gradient-to-l from-white to-transparent"
            >
              <div
                className="p-[5px] bg-white rounded-full border-gray-400
              border-[1px] z-20 cursor-pointer absolute right-0"
                onClick={() => slideRight()}
              >
                <FaAngleRight />
              </div>
            </div>
          )}
          <div
            id="slider"
            className=" h-20 flex flex-row gap-7 items-center w-full
              overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {CATEGORIES.map((category, index) => (
              <CategoryBox
                key={index}
                label={category.label}
                icon={category.imageSrc}
                selected={category.code === params.categoryCode}
                code={category.code}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Categories
