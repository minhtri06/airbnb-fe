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
          : 'bg-rose-500 border-rose-500 text-white'
      }
      ${
        small
          ? 'py-1 text-base font-semibold border-[1px]'
          : 'py-3 text-lg font-bold border-2'
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
