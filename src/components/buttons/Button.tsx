'use client'

import { IconType } from '@react-icons/all-files'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  big?: boolean
  icon?: IconType
  black?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  big,
  icon: Icon,
  black,
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
            : !black
            ? 'bg-gradient-to-r from-rose-500 to-pink-700 text-white'
            : 'text-white bg-gray-800'
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
