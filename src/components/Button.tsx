'use client'

import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      w-full
      flex items-center justify-center
      ${
        outline
          ? 'bg-white border-black text-gray-900'
          : 'bg-rose-600 border-rose-600 text-white'
      }
      ${
        small
          ? 'text-base font-semibold border-[1px]'
          : 'py-1 text-lg font-semibold border-[2px]'
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
