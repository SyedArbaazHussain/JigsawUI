import { Link, useLocation } from '@tanstack/react-router'
import { z } from 'zod'

interface BreadCrumbsProps {
   path?: string
  separator?: string
  labelFormat?: 'capitalize' | 'titleCase'
}

export default function BreadCrumbs({
  path,
  separator = '/',
  labelFormat = 'capitalize',
}: BreadCrumbsProps) {
  const location = useLocation()
  const currentPath = path ?? location.pathname

  const separatorSchema = z.string().length(1)
  const safeSeparator = separatorSchema.safeParse(separator).success
    ? separator
    : '/'

  const segmentSchema = z
    .string()
    .regex(/^[a-zA-Z0-9-_]+$/, 'Invalid segment')
    .transform((val) => val.replace(/[-_]/g, ' '))

  const formatLabel = (label: string) => {
    if (labelFormat === 'titleCase') {
      return label
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
    if (labelFormat === 'capitalize') {
      return label.charAt(0).toUpperCase() + label.slice(1)
    }
    return label
  }

  const segments = currentPath.split('/').filter(Boolean)
  const breadcrumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/')
    const rawLabel = segmentSchema.safeParse(segment).success
      ? segmentSchema.parse(segment)
      : segment
    const label = formatLabel(rawLabel)
    return { path, label }
  })

  return (
    <nav className="sticky top-0 text-sm px-4 py-2 shadow-md z-50">
      <ol className="flex items-center flex-wrap text-slate-600 dark:text-slate-300">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbs.map(({ path, label }, index) => (
          <li key={path} className="flex items-center">
            <span className="mx-2">{safeSeparator}</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="font-bold text-slate-800 dark:text-white">{label}</span>
            ) : (
              <Link to={path} className="hover:underline">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
