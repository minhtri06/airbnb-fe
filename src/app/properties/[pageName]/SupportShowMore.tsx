import React from 'react'

interface SupportShowMoreProps {
  title?: string | React.ReactNode
  body?: React.ReactNode
  onClose: () => void
  onScroll?: (e: React.UIEvent) => void
}

const SupportShowMore: React.FC<SupportShowMoreProps> = ({
  body,
  onClose,
  onScroll = () => {},
}) => {
  return (
    <div
      className="z-20 flex justify-center items-center overflow-x-hidden overflow-y-auto 
        fixed inset-0 outline-none focus:outline-none bg-neutral-800/70"
      onClick={() => onClose()}
      autoFocus
    >
      <div
        className="w-[800px] px-8 pb-10 bg-white rounded-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-20 flex items-center">
          <span
            className="cursor-pointer select-none"
            onClick={() => onClose()}
          >
            X
          </span>
        </div>
        <div
          className="w-full h-fit max-h-[500px] overflow-y-auto overflow-hidden"
          onScroll={(e) => onScroll(e)}
        >
          {body}
        </div>
      </div>
    </div>
  )
}

export default SupportShowMore
