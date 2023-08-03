'use client'

import ErrorText from '../ErrorText'

interface InputProps {
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  type?: string
  label?: string
  error?: string
  disabled?: boolean
  size?: 'small' | 'base' | 'big'
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type,
  label,
  error,
  disabled,
  size,
}) => {
  const sizeStyle =
    size === 'big'
      ? 'py-2 px-3 text-lg border-[2px]'
      : size === 'small'
      ? 'p-1 text-sm border-[1px]'
      : 'py-2 px-2 text-base border-[1px]'

  return (
    <div>
      <div
        className={`
          w-full relative border-2 border-gray-600 rounded-lg ${sizeStyle} 
          ${error && 'border-rose-600'}`}
      >
        {label && (
          <label
            className={`
            absolute left-2 text-gray-500 transform px-1
            ${
              value !== '' ? 'text-sm -top-[10px] bg-white' : 'bg-transparent'
            }`}
          >
            {label}
          </label>
        )}
        <input
          disabled={disabled}
          value={value}
          onChange={onChange}
          type={type}
          className={`
            w-full outline-none h-5 
            disabled:opacity-70 disabled:cursor-not-allowed
            ${disabled && 'text-gray-500'}
            `}
          autoComplete="off"
        />
      </div>
      <ErrorText error={error} size="small" />
    </div>
  )
}

export default Input
