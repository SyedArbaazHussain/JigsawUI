import React, {
  useState,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
} from 'react'
import { Button } from '@/components/Button'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonShape = 'square' | 'squircle' | 'circle'

interface AnimatedHamburgerIconProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

const AnimatedHamburgerIcon: React.FC<AnimatedHamburgerIconProps> = ({
  isOpen,
  setIsOpen,
  className = '',
}) => {
  const barClasses =
    'transform transition-all duration-300 ease-in-out fill-current'

  return (
    <Button
      onClick={() => setIsOpen(!isOpen)}
      className={`h-8 w-8 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg ${className}`}
      aria-label="Toggle menu"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <rect
          x={3}
          y={5}
          width={26}
          height={4}
          rx={2}
          ry={2}
          className={`${barClasses} origin-center ${
            isOpen ? '-translate-x-2 translate-y-1 rotate-45' : ''
          }`}
        />
        <rect
          x={3}
          y={13}
          width={17}
          height={4}
          rx={2}
          ry={2}
          className={`${barClasses} ${isOpen ? 'opacity-0' : 'opacity-100'}`}
        />
        <rect
          x={3}
          y={21}
          width={26}
          height={4}
          rx={2}
          ry={2}
          className={`${barClasses} origin-center ${
            isOpen ? '-translate-x-2 -translate-y-1.5 -rotate-45' : ''
          }`}
        />
      </svg>
    </Button>
  )
}

interface NavbarContextType {
  currentPath: string
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>
  isMenuOpen: boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export interface NavItemProps {
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: ButtonVariant
  shape?: ButtonShape
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const NavItem: React.FC<NavItemProps> = ({ onClick, children }) => {
  const context = useContext(NavbarContext)

  if (!context) {
    throw new Error('NavItem must be used within a Navbar component.')
  }

  const { currentPath } = context
  const isActive = currentPath === window.location.pathname

  const itemClasses = `
    flex items-center gap-2 text-md transition-colors duration-200 cursor-pointer
    ${isActive ? 'font-semibold text-blue-600' : 'text-slate-700 hover:text-blue-500'}
  `

  const handleClick = onClick
  return (
    <Button
      variant="primary"
      shape="circle"
      onClick={handleClick}
      className={itemClasses}
    >
      {children}
    </Button>
  )
}
;(NavItem as any).displayName = 'NavItem'

export interface NavbarProps {
  className?: string
  children: ReactNode
}

export const Navbar: React.FC<NavbarProps> = ({ children, className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type as React.FC<any>).displayName === 'NavItem',
  )

  const logoChild = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.type as React.FC<any>).displayName !== 'NavItem',
  )

  return (
    <NavbarContext.Provider
      value={{ currentPath, setCurrentPath, isMenuOpen, setIsMenuOpen }}
    >
      <header
        className={`sticky top-4 z-50 flex items-center justify-between py-3 px-5 bg-white/70 backdrop-blur-lg rounded-full shadow-md w-full max-w-md mx-auto ${className}`}
      >
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <AnimatedHamburgerIcon
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />
          </div>
          {logoChild}
        </div>
        <div className="hidden md:flex items-center gap-5">{navChildren}</div>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-24 z-40 bg-black/60 p-6 md:hidden overflow-y-auto"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex flex-col items-center gap-5">{navChildren}</div>
        </div>
      )}
    </NavbarContext.Provider>
  )
}
;(Navbar as any).displayName = 'Navbar'
