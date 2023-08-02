'use client'

import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  big?: boolean
  icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  big,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed 
        rounded-lg hover:opacity-80 transition w-full flex items-center 
        justify-center
        ${
          outline
            ? 'bg-white border-gray-400 shadow-sm text-gray-900'
            : 'bg-gradient-to-r from-rose-500 to-pink-700 text-white'
        }
        ${
          small
            ? 'text-base font-semibold border-[1px]'
            : big
            ? 'py-2 text-xl font-bold border-[1px]'
            : 'py-1 text-lg font-semibold border-[1px]'
        }
      `}
    >
      {Icon && (
        <Icon
          size={small ? 22 : 24}
          className={`absolute ${small ? 'left-1' : 'left-3'}`}
        />
      )}
      <span>{label}</span>
    </button>
  )
}

export default Button