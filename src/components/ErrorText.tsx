'use client'

interface ErrorTextProps {
  error?: string
  size?: 'small' | 'base' | 'big'
}

const ErrorText: React.FC<ErrorTextProps> = ({ error, size }) => {
  const sizeStyle =
    size === 'small'
      ? 'h-3 text-sm'
      : size === 'big'
      ? 'h-6 text-lg'
      : 'h-3 text-base'

  return <div className={`${sizeStyle} text-rose-600 `}>{error}</div>
}

export default ErrorText
