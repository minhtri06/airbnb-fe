'use client'

import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import Categories from '../categories/Categories'
import UserMenu from './user-menu/UserMenu'

interface NavbarProps {
  hideSearch?: boolean
  hideUserMenu?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ hideSearch, hideUserMenu }) => {
  return (
    <div className="w-ful h-20">
      <div className="fixed w-full h-20 border-b-[1px] bg-white z-10 shadow-sm">
        <Container>
          <div
            className="
              h-20
              flex
              flex-row 
              items-center 
              justify-center
              gap-3
              md:gap-0
              relative"
          >
            <div className="absolute left-0">
              <Logo />
            </div>
            {!hideSearch && <Search />}
            <div className="absolute right-0">
              {!hideUserMenu && <UserMenu />}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
