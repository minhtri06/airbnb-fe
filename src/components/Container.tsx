'use client'

import { usePathname } from 'next/navigation'

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const pathname = usePathname()

  const style =
    pathname?.startsWith('/search') ||
    pathname?.startsWith('/messages') ||
    pathname?.startsWith('/my-properties')
      ? 'max-w-[2520px] px-5'
      : 'max-w-[2520px] mx-auto xl:px-20 md:px-16 sm:px-2 px-4'

  return (
    <>
      <div className={style}>{children}</div>
    </>
  )
}

export default Container
