'use client'

interface ErrorTextProps {
  error?: string
  small?: boolean
}

const ErrorText: React.FC<ErrorTextProps> = ({ error, small }) => {
  return (
    <div className={`h-3 ${small ? 'text-sm' : 'text-base'} text-rose-600 `}>
      {error}
    </div>
  )
}

export default ErrorText
