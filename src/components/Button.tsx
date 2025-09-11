import React from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonShape = 'square' | 'squircle' | 'circle'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  shape?: ButtonShape
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  color?: string // custom color class
  children: React.ReactNode
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 px-2 py-2 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600',
  outline:
    'border border-gray-400 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800',
  ghost: 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700',
}

const shapeStyles: Record<ButtonShape, string> = {
  square: 'rounded-none',
  squircle: 'rounded-xl',
  circle: 'rounded-full',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  shape = 'squircle',
  loading = false,
  disabled,
  icon,
  iconPosition = 'left',
  color,
  children,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading

  const customColorStyles = color
    ? `${color} text-white hover:opacity-90 dark:hover:opacity-80`
    : variantStyles[variant]

  return (
    <button
      className={clsx(baseStyles, customColorStyles, shapeStyles[shape], className)}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  )
}
