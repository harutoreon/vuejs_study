// props
// stub 化した PolyGraph が App.vue から受け取った props（stats）を検証する
// add/remove 後に props が更新されて渡っているか

// スライダーの操作
// スライダー操作後に stat.value の型が文字列ではなく数値になること
// 1. 初期状態で stat.value の型が文字列であることを検証（pass）
// 2. スライダーを操作（stat.value を変更）する
// 3. stat.value の型が数値であることを検証（fail）
// 4. v-model に .number 修飾子（v-model.number="stat.value" ）をつける
// 5. テストを再実行して、3. が pass することを確認

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/svg-graph/App.vue'

describe('App', () => {
  describe('初期値の検証', () => {
    it('newLabel の初期値が空文字であること', () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })
      const input = wrapper.find('#add input')

      expect(input.element.value).toBe('')
    })

    it('stats の初期値が label と value を持つオブジェクのリストであること', () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })
      const labels = wrapper.findAll('label')
      const inputRanges = wrapper.findAll('input[type="range"]')
      const stats = [
        { label: 'A', value: 100 },
        { label: 'B', value: 100 },
        { label: 'C', value: 100 },
        { label: 'D', value: 100 },
        { label: 'E', value: 100 },
        { label: 'F', value: 100 }
      ]

      stats.forEach((stat, index) => {
        expect(stat.label).toBe(labels[index].text())
        expect(stat.value).toBe(Number(inputRanges[index].element.value))
      })
    })
  })

  describe('add', () => {
    it('newLabel が有効な場合、stats にオブジェクトが追加されて newLabel がリセットされる', async () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })
      const input = wrapper.find('#add input')
      expect(input.element.value).toBe('')

      await input.setValue('G')
      expect(input.element.value).toBe('G')

      const button = wrapper.find('#add button')
      await button.trigger('click')

      const labels = wrapper.findAll('label')
      const inputRanges = wrapper.findAll('input[type="range"]')
      const pre = wrapper.find('#raw')

      expect(labels.at(-1).text()).toBe('G')
      expect(inputRanges.at(-1).attributes('max')).toBe('100')
      expect(input.element.value).toBe('')
      expect(pre.text()).toContain('"label": "G"')
    })

    it('newLabel が無効な場合、stats にオブジェクトが追加されない', async () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const labels = wrapper.findAll('label')
      const input = wrapper.find('#add input')
      const beforePre = wrapper.find('#raw')

      expect(labels.at(-1).text()).toBe('F')
      expect(input.element.value).toBe('')

      const button = wrapper.find('#add button')
      await button.trigger('click')

      const afterPre = wrapper.find('#raw')

      expect(labels.at(-1).text()).toBe('F')
      expect(input.element.value).toBe('')
      expect(beforePre.text() === afterPre.text()).toBe(true)
    })

    it('preventDefault が呼ばれること', () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const addButton = wrapper.find('#add button').element
      const event = new Event('click', { cancelable: true })
      addButton.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(true)
    })
  })

  describe('remove', () => {
    it('x ボタンを押すと、指定したコントローラが削除され、整形済みテキストが更新される', async () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const beforeDiv = wrapper.findAll('div')
      const removeButtonF = beforeDiv.at(-1).find('button')
      const beforePre = wrapper.find('#raw')
      expect(beforePre.text()).toContain('F')

      await removeButtonF.trigger('click')

      const afterDiv = wrapper.findAll('div')
      const afterPre = wrapper.find('#raw')
      expect(afterPre.text()).not.toContain('F')
    })
  })
})
