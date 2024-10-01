'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Links() {
    const pathname = usePathname()

    return (
        <nav className='bg-white rounded-md w-[12rem] p-4  '>
            <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
                Home
            </Link>

            <Link
                className={`link ${pathname === '/about' ? 'active' : ''}`}
                href="/about"
            >
                About
            </Link>

            <Link
                className={`link ${pathname === '/dashboard' ? 'active' : ''}`}
                href="/dashboard"
            >
                Dashboard
            </Link>
        </nav>
    )
}