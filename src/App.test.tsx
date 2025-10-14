import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Route } from './routes/__root.tsx'

const DefaultComponent = () => <div>Component Not Found</div>
const { component: RootComponent = DefaultComponent } = Route.options

describe('Root', () => {
  test('renders', () => {
    render(<RootComponent />)
    expect(screen.getByText('Learn React')).toBeDefined()
  })
})
