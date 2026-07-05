import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PolyGraph from '@/svg-graph/PolyGraph.vue'

const { valueToPointMock } = vi.hoisted(() => {
  return {
    valueToPointMock: vi.fn()
  }
})

vi.mock('@/svg-graph/util.js', () => {
  return {
    valueToPoint: valueToPointMock
  }
})

describe('PolyGraph', () => {
  const stats = [
    { label: 'A', value: 100 },
    { label: 'B', value: 100 },
    { label: 'C', value: 100 }
  ]

  beforeEach(() => {
    valueToPointMock.mockReset()
    valueToPointMock.mockImplementation((value, index, total) => {
      return {
        x: index * 10,
        y: value
      }
    })
  })

  it('valueToPoint を stats の各要素に対して正しい引数で呼び出す', () => {
    mount(PolyGraph, {
      props: {
        stats
      },
      global: {
        stubs: {
          AxisLabel: true
        }
      }
    })

    expect(valueToPointMock).toHaveBeenCalledTimes(3)
    expect(valueToPointMock).toHaveBeenNthCalledWith(1, 100, 0, 3)
    expect(valueToPointMock).toHaveBeenNthCalledWith(2, 100, 1, 3)
    expect(valueToPointMock).toHaveBeenNthCalledWith(3, 100, 2, 3)
  })

  it('valueToPoint の戻り値から polygon の points 属性を正しく組み立てる', () => {
    const wrapper = mount(PolyGraph, {
      props: {
        stats
      },
      global: {
        stubs: {
          AxisLabel: true
        }
      }
    })

    const polygon = wrapper.find('polygon')
    expect(polygon.attributes('points')).toBe('0,100 10,100 20,100')
  })

  it('stats の数だけ AxisLabel を描画し、index と total を正しく渡す', () => {
    const wrapper = mount(PolyGraph, {
      props: { stats },
      global: { stubs: { AxisLabel: true } }
    })

    const labels = wrapper.findAllComponents({ name: 'AxisLabel' })
    expect(labels).toHaveLength(3)

    // index=0 の場合
    expect(labels[0].attributes('index')).toBe('0')
    expect(labels[0].attributes('total')).toBe('3')

    // index=1 の場合
    expect(labels[1].attributes('index')).toBe('1')
    expect(labels[1].attributes('total')).toBe('3')

    // index=2 の場合
    expect(labels[2].attributes('index')).toBe('2')
    expect(labels[2].attributes('total')).toBe('3')
  })

  it('stats が空の配列の場合、polygon の points は空文字になる', () => {
    const wrapper = mount(PolyGraph, {
      props: {
        stats: []
      },
      global: {
        stubs: {
          AxisLabel: true
        }
      }
    })

    expect(valueToPointMock).not.toHaveBeenCalled()
    expect(wrapper.find('polygon').attributes('points')).toBe('' )
  })
})