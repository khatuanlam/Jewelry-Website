'use client'

import styled from "@emotion/styled"
import Link from "next/link"

const NavBar = () => {

    const links = [
        { id: 1, name: 'Direction', to: '/pages' },
        { id: 2, name: 'Account', to: '/account' },
        { id: 3, name: 'Cart', to: '/cart' }
    ]
    return (
        <StyleWrapper className='bg-[#ffcad4]'>
            <ul>
                {links.map((link) => (
                    <li key={link.id}>
                        <Link href={link.to}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </StyleWrapper>
    )
}


export default NavBar

const StyleWrapper = styled.div`
     flex-shrink: 0;
  ul {
    display: flex;
    flex-direction: row;
    li {
      display: block;
      margin-left: 1rem;
    }
  }
`