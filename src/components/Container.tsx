'use client'

import { usePathname } from 'next/navigation'

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const pathname = usePathname()

  return (
    <>
      {pathname?.startsWith('/search') ? (
        <div className="max-w-[2520px] px-5">{children}</div>
      ) : (
        <div className=" max-w-[2520px] mx-auto xl:px-20 md:px-16 sm:px-2 px-4">
          {children}
        </div>
      )}
    </>
  )
}

export default Container
