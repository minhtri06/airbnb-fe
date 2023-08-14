'use client'

import useAppSideStore from '@/stores/useAppSideStore'
import Container from '../Container'
import Logo from './Logo'
import Search from './search/Search'
import UserMenu from './user-menu/UserMenu'
import Categories from '../categories/Categories'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const { appSide } = useAppSideStore()
  const pathname = usePathname()

  const isSearchShowed =
    appSide === 'traveling' && pathname !== '/messages' && pathname !== '/trips'

  const isCategoriesShowed =
    appSide === 'traveling' && pathname !== '/messages' && pathname !== '/trips'

  return (
    <>
      <div className="w-ful h-20">
        <div className="fixed w-full h-20 border-b-[1px] bg-white z-20 shadow-sm">
          <Container>
            <div
              className=" h-20 flex flex-row  items-center  justify-center gap-3 
              md:gap-0 relative"
            >
              <div className="absolute left-0 z-20">
                <Logo />
              </div>

              {isSearchShowed && <Search />}

              <div className="absolute right-0 z-20">
                <UserMenu />
              </div>
            </div>
          </Container>
        </div>
      </div>
      {isCategoriesShowed && <Categories />}
    </>
  )
}

export default Navbar
