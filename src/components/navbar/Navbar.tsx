'use client'

import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <div className="h-20 w-ful">
      <div className="fixed w-full py-4 border-b-[1px] bg-white z-10 shadow-sm">
        <Container>
          <div
            className="
              flex
              flex-row 
              items-center 
              justify-between 
              gap-3
              md:gap-0"
          >
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
