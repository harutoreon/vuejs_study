import { describe, it, expect } from 'vitest'
import { valueToPoint } from '@/svg-graph/util.js'

describe('valueToPoint', () => {
  describe('戻り値の型', () => {
    it('x と y プロパティを持つオブジェクトを返す', () => {
      const result = valueToPoint(50, 0, 4)

      expect(result).toHaveProperty('x')
      expect(result).toHaveProperty('y')
      expect(typeof result.x).toBe('number')
      expect(typeof result.y).toBe('number')
    })
  })
})
