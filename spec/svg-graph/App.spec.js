import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/svg-graph/App.vue'
import PolyGraph from '@/svg-graph/PolyGraph.vue'

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
        expect(labels[index].text()).toBe(stat.label)
        expect(Number(inputRanges[index].element.value)).toBe(stat.value)
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
      const beforeText = wrapper.find('#raw').text()

      expect(labels.at(-1).text()).toBe('F')
      expect(input.element.value).toBe('')

      const button = wrapper.find('#add button')
      await button.trigger('click')

      const afterText = wrapper.find('#raw').text()

      expect(labels.at(-1).text()).toBe('F')
      expect(input.element.value).toBe('')
      expect(beforeText).toBe(afterText)
    })

    it('preventDefault が呼ばれること', () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const addButton = wrapper.find('#add button').element
      const event = new Event('click', { cancelable: true })

      // trigger() は非同期なため、同期的に defaultPrevented を検証するには
      // dispatchEvent を直接使う必要がある
      addButton.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(true)
    })
  })

  describe('remove', () => {
    it('x ボタンを押すと、指定したコントローラが削除され、整形済みテキストが更新される', async () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const div = wrapper.find('div')

      const beforeLabelText = div.find('label').text()
      const beforePreText = wrapper.find('#raw').text()

      const removeButton = div.find('button[class="remove"]')
      await removeButton.trigger('click')

      const afterLabelText = div.find('label').text()
      const afterPreText = wrapper.find('#raw').text()

      expect(beforeLabelText).not.toBe(afterLabelText)
      expect(beforePreText).not.toBe(afterPreText)
    })
  })

  describe('PolyGraph への props 受け渡し', () => {
    it('初期状態で stats が正しく PolyGraph に渡されること', () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const polyGraph = wrapper.findComponent(PolyGraph)

      expect(polyGraph.exists()).toBe(true)
      expect(polyGraph.props('stats')).toEqual(
        [
          { label: 'A', value: 100 },
          { label: 'B', value: 100 },
          { label: 'C', value: 100 },
          { label: 'D', value: 100 },
          { label: 'E', value: 100 },
          { label: 'F', value: 100 }
        ]
      )
    })

    it('コントローラの値を変更すると、PolyGraph に渡される stats も更新されること', async () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const inputRanges = wrapper.findAll('input[type="range"]')
      await inputRanges[0].setValue(50)

      const polyGraph = wrapper.findComponent(PolyGraph)
      const stats = polyGraph.props('stats')

      expect(stats[0]).toEqual({ label: 'A', value: 50 })
    })

    it('add で新しいコントローラを追加すると、PolyGraph の stats にも反映されること', async () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const input = wrapper.find('#add input')
      await input.setValue('G')

      const button = wrapper.find('#add button')
      await button.trigger('click')

      const polyGraph = wrapper.findComponent(PolyGraph)
      const stats = polyGraph.props('stats')

      expect(stats.at(-1)).toEqual({ label: 'G', value: 100 })
    })

    it('remove でコントローラを削除すると、PolyGraph の stats にも反映されること', async () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      const divs = wrapper.findAll('div')
      const removeButtonF = divs.at(-1).find('button')

      await removeButtonF.trigger('click')

      const polyGraph = wrapper.findComponent(PolyGraph)
      const stats = polyGraph.props('stats')

      expect(stats.some(stat => stat.label === 'F')).toBe(false)
    })
  })

  describe('スライダーの動作検証', () => {
    it('スライダー操作後に stat.value の型が数値になること', async () => {
      const wrapper = mount(App, {
        global: { stubs: { PolyGraph: true } }
      })

      expect(wrapper.vm.stats[0].value).toBe(100)
      expect(typeof wrapper.vm.stats[0].value).toBe('number')

      const inputRanges = wrapper.findAll('input[type="range"]')[0]
      await inputRanges.setValue(50)

      expect(wrapper.vm.stats[0].value).toBe(50)
      expect(typeof wrapper.vm.stats[0].value).toBe('number')
    })
  })
})
