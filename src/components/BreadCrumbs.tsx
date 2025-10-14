import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from 'react'

type LabelFormat = 'capitalize' | 'titleCase'

interface BreadCrumbsProps {
  home?: string
  separator?: string
  labelFormat?: LabelFormat
  routeMap?: Record<string, string>
  translate?: (label: string) => string
}
interface BreadcrumbItem {
  fullPath: string
  label: string
}

interface BreadcrumbState {
  path: string
  setPath: (path: string) => void
}

const BreadcrumbContext = createContext<BreadcrumbState | undefined>(undefined)

const BreadcrumbProvider: React.FC<{
  children: React.ReactNode
  routeMap?: Record<string, string>
}> = ({ children, routeMap }) => {
  const isStatic = routeMap && Object.keys(routeMap).length > 0
  const initialPathRef = useRef<string>(window.location.pathname)
  const [path, setPath] = useState<string>(initialPathRef.current)

  useEffect(() => {
    if (isStatic) return

    const updatePath = () => setPath(window.location.pathname)

    const patchHistoryMethod = (method: 'pushState' | 'replaceState') => {
      const original = window.history[method]
      window.history[method] = function (...args) {
        const result = original.apply(this, args)
        window.dispatchEvent(new Event('breadcrumbchange'))
        return result
      }
    }

    patchHistoryMethod('pushState')
    patchHistoryMethod('replaceState')

    window.addEventListener('popstate', updatePath)
    window.addEventListener('breadcrumbchange', updatePath)

    return () => {
      window.removeEventListener('popstate', updatePath)
      window.removeEventListener('breadcrumbchange', updatePath)
    }
  }, [isStatic])

  return (
    <BreadcrumbContext.Provider value={{ path, setPath }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

const useBreadcrumb = (): BreadcrumbState => {
  const context = useContext(BreadcrumbContext)
  if (!context)
    throw new Error('useBreadcrumb must be used within BreadcrumbProvider')
  return context
}

export const BreadCrumbsWithoutProvider: React.FC<BreadCrumbsProps> = ({
  home,
  separator = '/',
  labelFormat = 'capitalize',
  routeMap = {},
  translate,
}) => {
  const { path } = useBreadcrumb()

  const safeSeparator =
    typeof separator === 'string' && separator.length === 1 ? separator : '/'

  const normalizePath = (raw: string): string => {
    const cleaned = raw.replace(/\/+$/, '').split('?')[0].split('#')[0]
    return cleaned === '' ? '/' : cleaned
  }

  const formatLabel = (label: string): string => {
    const cleaned = label.replace(/[-_]/g, ' ')
    let formatted = cleaned

    if (labelFormat === 'titleCase') {
      formatted = cleaned
        .split(' ')
        .map((word) =>
          word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : '',
        )
        .join(' ')
    } else {
      formatted =
        cleaned.length > 0
          ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
          : ''
    }

    return translate ? translate(formatted) : formatted
  }

  const isStatic = Object.keys(routeMap).length > 0

  const breadcrumbs: BreadcrumbItem[] = isStatic
    ? Object.entries(routeMap).map(([fullPath, label]) => ({
        fullPath,
        label: formatLabel(label),
      }))
    : path
        .split('/')
        .filter(Boolean)
        .map((_, index, segments) => {
          const rawPath = '/' + segments.slice(0, index + 1).join('/')
          const fullPath = normalizePath(rawPath)
          const label = formatLabel(routeMap[fullPath] ?? segments[index])
          return { fullPath, label }
        })

  const homeLabel = translate
    ? translate(routeMap['/'] ?? home ?? '')
    : (routeMap['/'] ?? home ?? 'Home')

  const navigate = (url: string) => {
    window.history.pushState({}, '', url)
    window.dispatchEvent(new Event('breadcrumbchange'))
  }

  return (
    <div className="top-0 w-fit text-sm mx-2 my-7 bg-gray-200/70 dark:bg-gray-700/50 py-2 px-5 rounded-4xl">
      <ol className="flex items-center flex-wrap text-slate-600 dark:text-slate-300">
        {!isStatic && (
          <li>
            <button
              onClick={() => navigate('/')}
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              {homeLabel}
            </button>
          </li>
        )}
        {breadcrumbs.map(({ fullPath, label }, index) => (
          <li key={fullPath} className="flex items-center">
            <span className="mx-2">{safeSeparator}</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="font-bold text-slate-800 dark:text-white">
                {label}
              </span>
            ) : (
              <button
                onClick={() => navigate(fullPath)}
                className="hover:underline text-blue-600 dark:text-blue-400"
              >
                {label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = (props) => (
  <BreadcrumbProvider routeMap={props.routeMap}>
    <BreadCrumbsWithoutProvider {...props} />
  </BreadcrumbProvider>
)
