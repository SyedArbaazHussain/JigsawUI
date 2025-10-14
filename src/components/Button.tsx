import React, { forwardRef } from 'react'

const cn = (...classes: (string | boolean)[]) => {
  return classes.filter(Boolean).join(' ')
}

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'simple'
  | 'neutral'
  | 'disabled'
type ButtonShape = 'square' | 'squircle' | 'circle'
type ButtonColor =
  | 'orange'
  | 'red'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'

interface BaseProps {
  variant?: ButtonVariant
  shape?: ButtonShape
  loading?: boolean
  icon?: string | React.ReactNode
  iconPosition?: 'left' | 'right'
  color?: ButtonColor
  className?: string
  disabled?: boolean
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  href?: string
}

export type ButtonProps = BaseProps

const baseStyles =
  'inline-flex items-center justify-center gap-2 px-4 py-2 font-medium transition duration-200'

const tailwindColorMap: Record<
  ButtonColor,
  Record<Exclude<ButtonVariant, 'simple' | 'neutral' | 'disabled'>, string>
> = {
  orange: {
    primary:
      'bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
    secondary:
      'bg-orange-100 hover:bg-orange-200 text-orange-800 dark:bg-orange-900 dark:hover:bg-orange-800 dark:text-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-orange-600 text-orange-600 hover:bg-orange-100 dark:ring-orange-400 dark:text-orange-400 dark:hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
    ghost:
      'bg-transparent hover:bg-orange-600/30 text-orange-600 hover:text-white dark:hover:bg-orange-500/30 dark:text-orange-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
    link: 'text-orange-600 hover:underline dark:text-orange-400',
  },
  red: {
    primary:
      'bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
    secondary:
      'bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-red-600 text-red-600 hover:bg-red-100 dark:ring-red-400 dark:text-red-400 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
    ghost:
      'bg-transparent hover:bg-red-600/30 text-red-600 hover:text-white dark:hover:bg-red-500/30 dark:text-red-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
    link: 'text-red-600 hover:underline dark:text-red-400',
  },
  amber: {
    primary:
      'bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500',
    secondary:
      'bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-900 dark:hover:bg-amber-800 dark:text-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-amber-600 text-amber-600 hover:bg-amber-100 dark:ring-amber-400 dark:text-amber-400 dark:hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500',
    ghost:
      'bg-transparent hover:bg-amber-600/30 text-amber-600 hover:text-white dark:hover:bg-amber-500/30 dark:text-amber-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500',
    link: 'text-amber-600 hover:underline dark:text-amber-400',
  },
  yellow: {
    primary:
      'bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500',
    secondary:
      'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-yellow-600 text-yellow-600 hover:bg-yellow-100 dark:ring-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500',
    ghost:
      'bg-transparent hover:bg-yellow-600/30 text-yellow-600 hover:text-white dark:hover:bg-yellow-500/30 dark:text-yellow-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500',
    link: 'text-yellow-600 hover:underline dark:text-yellow-400',
  },
  lime: {
    primary:
      'bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-500 dark:hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500',
    secondary:
      'bg-lime-100 hover:bg-lime-200 text-lime-800 dark:bg-lime-900 dark:hover:bg-lime-800 dark:text-lime-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-lime-600 text-lime-600 hover:bg-lime-100 dark:ring-lime-400 dark:text-lime-400 dark:hover:bg-lime-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500',
    ghost:
      'bg-transparent hover:bg-lime-600/30 text-lime-600 hover:text-white dark:hover:bg-lime-500/30 dark:text-lime-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500',
    link: 'text-lime-600 hover:underline dark:text-lime-400',
  },
  green: {
    primary:
      'bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
    secondary:
      'bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-green-600 text-green-600 hover:bg-green-100 dark:ring-green-400 dark:text-green-400 dark:hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
    ghost:
      'bg-transparent hover:bg-green-600/30 text-green-600 hover:text-white dark:hover:bg-green-500/30 dark:text-green-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
    link: 'text-green-600 hover:underline dark:text-green-400',
  },
  emerald: {
    primary:
      'bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
    secondary:
      'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:hover:bg-emerald-800 dark:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-emerald-600 text-emerald-600 hover:bg-emerald-100 dark:ring-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
    ghost:
      'bg-transparent hover:bg-emerald-600/30 text-emerald-600 hover:text-white dark:hover:bg-emerald-500/30 dark:text-emerald-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
    link: 'text-emerald-600 hover:underline dark:text-emerald-400',
  },
  teal: {
    primary:
      'bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500',
    secondary:
      'bg-teal-100 hover:bg-teal-200 text-teal-800 dark:bg-teal-900 dark:hover:bg-teal-800 dark:text-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-teal-600 text-teal-600 hover:bg-teal-100 dark:ring-teal-400 dark:text-teal-400 dark:hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500',
    ghost:
      'bg-transparent hover:bg-teal-600/30 text-teal-600 hover:text-white dark:hover:bg-teal-500/30 dark:text-teal-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500',
    link: 'text-teal-600 hover:underline dark:text-teal-400',
  },
  cyan: {
    primary:
      'bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500',
    secondary:
      'bg-cyan-100 hover:bg-cyan-200 text-cyan-800 dark:bg-cyan-900 dark:hover:bg-cyan-800 dark:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-cyan-600 text-cyan-600 hover:bg-cyan-100 dark:ring-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500',
    ghost:
      'bg-transparent hover:bg-cyan-600/30 text-cyan-600 hover:text-white dark:hover:bg-cyan-500/30 dark:text-cyan-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500',
    link: 'text-cyan-600 hover:underline dark:text-cyan-400',
  },
  sky: {
    primary:
      'bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-500 dark:hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
    secondary:
      'bg-sky-100 hover:bg-sky-200 text-sky-800 dark:bg-sky-900 dark:hover:bg-sky-800 dark:text-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-sky-600 text-sky-600 hover:bg-sky-100 dark:ring-sky-400 dark:text-sky-400 dark:hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
    ghost:
      'bg-transparent hover:bg-sky-600/30 text-sky-600 hover:text-white dark:hover:bg-sky-500/30 dark:text-sky-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
    link: 'text-sky-600 hover:underline dark:text-sky-400',
  },
  blue: {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    secondary:
      'bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-blue-600 text-blue-600 hover:bg-blue-100 dark:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    ghost:
      'bg-transparent hover:bg-blue-600/30 text-blue-600 hover:text-white dark:hover:bg-blue-500/30 dark:text-blue-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    link: 'text-blue-600 hover:underline dark:text-blue-400',
  },
  indigo: {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    secondary:
      'bg-indigo-100 hover:bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-indigo-600 text-indigo-600 hover:bg-indigo-100 dark:ring-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    ghost:
      'bg-transparent hover:bg-indigo-600/30 text-indigo-600 hover:text-white dark:hover:bg-indigo-500/30 dark:text-indigo-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    link: 'text-indigo-600 hover:underline dark:text-indigo-400',
  },
  violet: {
    primary:
      'bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-500 dark:hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500',
    secondary:
      'bg-violet-100 hover:bg-violet-200 text-violet-800 dark:bg-violet-900 dark:hover:bg-violet-800 dark:text-violet-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-violet-600 text-violet-600 hover:bg-violet-100 dark:ring-violet-400 dark:text-violet-400 dark:hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500',
    ghost:
      'bg-transparent hover:bg-violet-600/30 text-violet-600 hover:text-white dark:hover:bg-violet-500/30 dark:text-violet-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500',
    link: 'text-violet-600 hover:underline dark:text-violet-400',
  },
  purple: {
    primary:
      'bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
    secondary:
      'bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900 dark:hover:bg-purple-800 dark:text-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-purple-600 text-purple-600 hover:bg-purple-100 dark:ring-purple-400 dark:text-purple-400 dark:hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
    ghost:
      'bg-transparent hover:bg-purple-600/30 text-purple-600 hover:text-white dark:hover:bg-purple-500/30 dark:text-purple-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
    link: 'text-purple-600 hover:underline dark:text-purple-400',
  },
  fuchsia: {
    primary:
      'bg-fuchsia-600 hover:bg-fuchsia-700 text-white dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500',
    secondary:
      'bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-800 dark:bg-fuchsia-900 dark:hover:bg-fuchsia-800 dark:text-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-100 dark:ring-fuchsia-400 dark:text-fuchsia-400 dark:hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500',
    ghost:
      'bg-transparent hover:bg-fuchsia-600/30 text-fuchsia-600 hover:text-white dark:hover:bg-fuchsia-500/30 dark:text-fuchsia-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500',
    link: 'text-fuchsia-600 hover:underline dark:text-fuchsia-400',
  },
  pink: {
    primary:
      'bg-pink-600 hover:bg-pink-700 text-white dark:bg-pink-500 dark:hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500',
    secondary:
      'bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-900 dark:hover:bg-pink-800 dark:text-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-pink-600 text-pink-600 hover:bg-pink-100 dark:ring-pink-400 dark:text-pink-400 dark:hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500',
    ghost:
      'bg-transparent hover:bg-pink-600/30 text-pink-600 hover:text-white dark:hover:bg-pink-500/30 dark:text-pink-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500',
    link: 'text-pink-600 hover:underline dark:text-pink-400',
  },
  rose: {
    primary:
      'bg-rose-600 hover:bg-rose-700 text-white dark:bg-rose-500 dark:hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500',
    secondary:
      'bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-900 dark:hover:bg-rose-800 dark:text-rose-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-rose-600 text-rose-600 hover:bg-rose-100 dark:ring-rose-400 dark:text-rose-400 dark:hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500',
    ghost:
      'bg-transparent hover:bg-rose-600/30 text-rose-600 hover:text-white dark:hover:bg-rose-500/30 dark:text-rose-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500',
    link: 'text-rose-600 hover:underline dark:text-rose-400',
  },
  slate: {
    primary:
      'bg-slate-600 hover:bg-slate-700 text-white dark:bg-slate-500 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-slate-600 text-slate-600 hover:bg-slate-100 dark:ring-slate-400 dark:text-slate-400 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500',
    ghost:
      'bg-transparent hover:bg-slate-600/30 text-slate-600 hover:text-white dark:hover:bg-slate-500/30 dark:text-slate-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500',
    link: 'text-slate-600 hover:underline dark:text-slate-400',
  },
  gray: {
    primary:
      'bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-500 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    secondary:
      'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-gray-600 text-gray-600 hover:bg-gray-100 dark:ring-gray-400 dark:text-gray-400 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    ghost:
      'bg-transparent hover:bg-gray-600/30 text-gray-600 hover:text-white dark:hover:bg-gray-500/30 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    link: 'text-gray-600 hover:underline dark:text-gray-400',
  },
  zinc: {
    primary:
      'bg-zinc-600 hover:bg-zinc-700 text-white dark:bg-zinc-500 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500',
    secondary:
      'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-zinc-600 text-zinc-600 hover:bg-zinc-100 dark:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500',
    ghost:
      'bg-transparent hover:bg-zinc-600/30 text-zinc-600 hover:text-white dark:hover:bg-zinc-500/30 dark:text-zinc-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500',
    link: 'text-zinc-600 hover:underline dark:text-zinc-400',
  },
  neutral: {
    primary:
      'bg-neutral-600 hover:bg-neutral-700 text-white dark:bg-neutral-500 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500',
    secondary:
      'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-neutral-600 text-neutral-600 hover:bg-neutral-100 dark:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500',
    ghost:
      'bg-transparent hover:bg-neutral-600/30 text-neutral-600 hover:text-white dark:hover:bg-neutral-500/30 dark:text-neutral-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500',
    link: 'text-neutral-600 hover:underline dark:text-neutral-400',
  },
  stone: {
    primary:
      'bg-stone-600 hover:bg-stone-700 text-white dark:bg-stone-500 dark:hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500',
    secondary:
      'bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500',
    outline:
      'bg-transparent ring-2 ring-inset ring-stone-600 text-stone-600 hover:bg-stone-100 dark:ring-stone-400 dark:text-stone-400 dark:hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500',
    ghost:
      'bg-transparent hover:bg-stone-600/30 text-stone-600 hover:text-white dark:hover:bg-stone-500/30 dark:text-stone-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500',
    link: 'text-stone-600 hover:underline dark:text-stone-400',
  },
}

const simpleStyles =
  'bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-white/60 text-white dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white'

const neutralStyles =
  'bg-gray-500 dark:bg-gray-500/40 hover:bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-700'

const disabledStyles = 'cursor-not-allowed opacity-50'

const shapeStyles: Record<ButtonShape, string> = {
  square: 'rounded-none',
  squircle: 'rounded-xl',
  circle: 'rounded-full',
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      shape = 'squircle',
      loading = false,
      disabled,
      icon,
      iconPosition = 'left',
      color = 'blue',
      children,
      className = '',
      onClick,
      href,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading
    let variantClass = ''

    if (isDisabled) {
      variantClass = disabledStyles
    } else if (variant === 'simple') {
      variantClass = simpleStyles
    } else if (variant === 'neutral') {
      variantClass = neutralStyles
    } else {
      variantClass =
        tailwindColorMap[color][
          variant as Exclude<ButtonVariant, 'simple' | 'neutral' | 'disabled'>
        ]
    }

    const finalClassName = cn(
      baseStyles,
      variantClass,
      shapeStyles[shape],
      className,
      isDisabled && disabledStyles,
    )

    const renderIcon = () => {
      if (!icon) return null

      if (typeof icon === 'string') {
        return <img src={icon} alt="" className="h-5 w-5" />
      }

      return <span className="h-5 w-5">{icon}</span>
    }

    const renderContent = () => {
      if (loading) {
        return (
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
        )
      }

      const iconElement = renderIcon()

      if (iconElement && iconPosition === 'right') {
        return (
          <>
            {children}
            {iconElement}
          </>
        )
      }

      return (
        <>
          {iconElement}
          {children}
        </>
      )
    }

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={finalClassName}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {renderContent()}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={finalClassName}
        disabled={isDisabled}
        onClick={onClick}
        {...props}
      >
        {renderContent()}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
