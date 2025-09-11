import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './routes/__root.tsx'

describe('App', () => {
  test('renders', () => {
    render(<App />)
    expect(screen.getByText('Learn React')).toBeDefined()
  })
})
