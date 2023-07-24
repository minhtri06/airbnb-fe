'use client'

import { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import Button from '../Button'

interface ModelProps {
  isOpen: boolean
  onClose: () => void
  action: () => void
  actionLabel: string
  secondaryAction?: () => void
  secondaryActionLabel?: string
  disabled?: boolean
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
}

const Modal: React.FC<ModelProps> = ({
  isOpen,
  onClose,
  action,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled,
  title,
  body,
  footer,
}) => {
  const [_isOpen, setIsOpen] = useState(isOpen)

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    if (disabled) {
      return
    }
    setIsOpen(false)

    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleSubmit = () => {
    if (disabled) {
      return
    }
    action()
  }

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) {
      return
    }
    secondaryAction()
  }

  if (!_isOpen) {
    return <></>
  }

  return (
    <>
      <div
        className="
          flex
          justify-center
          items-center
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
          "
        >
          <div
            className={`
              translate
              duration-300
              h-full
              ${_isOpen ? 'translate-y-0' : 'translate-y-full'}  
              ${_isOpen ? 'opacity-100' : 'opacity-0'}  
          `}
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              "
            >
              {/* HEADER */}
              <div
                className="
                  flex
                  items-center
                  p-6
                  rounded-t
                  justify-center
                  relative
                  border-b-[1px]
                "
              >
                <div className="text-lg font-bold">{title}</div>
                <button
                  onClick={handleClose}
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                  "
                >
                  <IoMdClose />
                </button>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                    />
                  )}
                  <Button
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
