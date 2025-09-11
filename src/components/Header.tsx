import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from './Button'

export default function Header() {
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState(location.pathname)

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname])

  return (
    <header className="sticky top-10 py-2 px-4 flex gap-3 bg-white text-black justify-between rounded-4xl shadow-md w-fit">
      <nav className="flex flex-row gap-4">
        <Button variant="outline" shape="squircle">
        <svg className="h-7 w-7 rounded-xl"
          viewBox='0 0 30 30' xmlns="http://www.w3.org/2000/svg"
        >
          <rect x={3} y={7} width={21} height={4} rx={2} ry={2} className='fill-black'></rect>
          <rect x={3} y={14} width={17} height={4} rx={2} ry={2} className='fill-black'></rect>
          <rect x={3} y={21} width={21} height={4} rx={2} ry={2} className='fill-black'></rect>
        </svg>
        </Button>
        <Link
          to="/"
          className={`transition ${
            currentPath === '/' ? 'font-bold text-blue-600' : 'text-slate-600'
          }`}
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className={`transition ${
            currentPath === '/about-us' ? 'font-bold text-blue-600' : 'text-slate-600'
          }`}
        >
          About
        </Link>
      </nav>
    </header>
  )
}
