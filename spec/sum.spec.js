import { it, expect } from 'vitest'
import { sum } from './sum.js'

it('sum', () => {
  expect(sum(1, 2)).toBe(3)
})
