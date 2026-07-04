import { describe, it, expect, vi,beforeEach } from 'vitest'
import AxisLabel from '@/svg-graph/AxisLabel.vue'
import { valueToPoint } from '@/svg-graph/util.js'
import { mount } from '@vue/test-utils'

vi.mock('@/svg-graph/util.js', () => {
  return {
    valueToPoint: vi.fn()
  }
})

describe('AxisLabel.vue', () => {
  beforeEach(() => {
    vi.mocked(valueToPoint).mockReset()
    vi.mocked(valueToPoint).mockReturnValue({ x: 42, y: 24 })
  })

  it('stat.value に +10 したオフセット値・index・total を渡して valueToPoint を呼び出す', () => {
    mount(AxisLabel, {
      props: {
        stat: { value: 50, label: 'A' },
        index: 0,
        total: 1
      }
    })

    expect(valueToPoint).toHaveBeenCalledWith(60, 0, 1)
  })

  it('stat.value が文字列でも数値に変換してから +10 する', () => {
    mount(AxisLabel, {
      props: {
        stat: { value: '30', label: 'B' },
        index: 0,
        total: 5
      }
    })

    expect(valueToPoint).toHaveBeenCalledWith(40, 0, 5)
  })

  it('valueToPoint が返した座標を text 要素の x, y 属性に反映する', () => {
    vi.mocked(valueToPoint).mockReturnValue({ x: 123, y: 456 })

    const wrapper = mount(AxisLabel, {
      props: {
        stat: { value: 10, label: 'C' },
        index: 1,
        total: 4
      }
    })

    const text = wrapper.find('text')
    expect(text.attributes('x')).toBe('123')
    expect(text.attributes('y')).toBe('456')
  })

  it('stat.labelをテキストとして描画する', () => {
    const wrapper = mount(AxisLabel, {
      props: {
        stat: { value: 10, label: 'D' },
        index: 0,
        total: 3
      }
    })

    expect(wrapper.find('text').text()).toBe('D')
  })

  it('props が変わると point が再計算される', async () => {
    vi.mocked(valueToPoint)
      .mockReturnValueOnce({ x: 1, y: 1 })
      .mockReturnValueOnce({ x: 99, y: 99 })

    const wrapper = mount(AxisLabel, {
      props: {
        stat: { value: 10, label: 'A' },
        index: 0,
        total: 3
      }
    })

    expect(wrapper.find('text').attributes('x')).toBe('1')
    expect(wrapper.find('text').attributes('y')).toBe('1')

    await wrapper.setProps({ stat: { value: 20, label: 'B' } })

    expect(valueToPoint).toHaveBeenLastCalledWith(30, 0, 3)
    expect(wrapper.find('text').attributes('x')).toBe('99')
    expect(wrapper.find('text').attributes('y')).toBe('99')
    expect(wrapper.find('text').text()).toBe('B')
  })
})
