interface LoadingTestProps {
  text: string
  isLoading: boolean
  length: number
}

const LoadingText: React.FC<LoadingTestProps> = ({
  text,
  isLoading,
  length,
}) => {
  return (
    <span
      className={`${isLoading && 'text-slate-200 bg-slate-200 rounded-md'}`}
    >
      {isLoading ? [...Array(length).fill('x')] : text}
    </span>
  )
}

export default LoadingText
