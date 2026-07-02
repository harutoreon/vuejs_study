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

  describe('角度の割り当て', () => {
    it('total=4 のとき、各 index は 90 度ずつ離れた座標を返す', () => {
      const top = valueToPoint(50, 0, 4)
      const right = valueToPoint(50, 1, 4)
      const bottom = valueToPoint(50, 2, 4)
      const left = valueToPoint(50, 3, 4)

      // 真上: x=100, y<100
      expect(top.x).toBeCloseTo(100)
      expect(top.y).toBeCloseTo(60)

      // 右: x>100, y=100
      expect(right.x).toBeCloseTo(140)
      expect(right.y).toBeCloseTo(100)

      // 真下: x=100, y>100
      expect(bottom.x).toBeCloseTo(100)
      expect(bottom.y).toBeCloseTo(140)

      // 左: x<100, y=100
      expect(left.x).toBeCloseTo(60)
      expect(left.y).toBeCloseTo(100)
    })

    it('total=6のとき、6方向に均等に分散すること', () => {
      const value = 50
      const total = 6
      const points = Array.from({ length: total }, (_, i) =>
        valueToPoint(value, i, total)
      )

      const distances = points.map(p =>
        Math.sqrt((p.x -100) ** 2 + (p.y - 100) ** 2)
      )
      const expected = 50 * 0.8

      distances.forEach(d => {
        expect(d).toBeCloseTo(expected)
      })
    })
  })

  describe('valueのスケーリング', () => {
    it('value が 2 倍になると、中心からの距離も 2 倍になる', () => {
      const p1 = valueToPoint(50, 0, 4)
      const p2 = valueToPoint(100, 0, 4)

      const d1 = Math.abs(p1.y - 100)
      const d2 = Math.abs(p2.y - 100)

      expect(d2).toBeCloseTo(d1 * 2)
    })

    it('value が 0 より大きいとき、中心点から離れた座標を返す', () => {
      const result = valueToPoint(50, 0, 4)
      const distanceFromCenter = Math.sqrt(
        (result.x - 100) ** 2 + (result.y - 100) ** 2
      )

      expect(distanceFromCenter).toBeGreaterThan(0)
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
