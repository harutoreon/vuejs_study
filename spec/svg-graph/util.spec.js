import { describe, it, expect } from 'vitest'
import { valueToPoint } from '@/svg-graph/util.js'

describe('valueToPoint', () => {
  describe('座標変換の基本動作', () => {
    it('value=0 のとき、中心点 (100, 100) を返す', () => {
      const result = valueToPoint(0, 0, 4)

      expect(result.x).toBeCloseTo(100)
      expect(result.y).toBeCloseTo(100)
    })

    it('index=0 のとき、真上方向（y が小さい方向）に座標が移動する', () => {
      const result = valueToPoint(50, 0, 4)

      expect(result.x).toBeCloseTo(100)
      expect(result.y).toBeCloseTo(100 - 50 * 0.8)
    })
  })

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
