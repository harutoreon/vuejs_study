import { ref, onMounted, onUnmounted} from "vue"

export function useMouse() {
  // コンポーザブルによってカプセル化および管理される状態
  const x = ref(0)
  const y = ref(0)

  // コンポーザブルは管理している状態を時間の経過とともに更新できる
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // コンポーザブルは所有コンポーネントのライフサイクルにフックして
  // 副作用のセットアップや破棄することもできる
  onMounted(() => window.addEventListener("mousemove", update))
  onUnmounted(() => window.removeEventListener("mousemove", update))

  // 管理された状態を戻り値として公開
  return { x, y }
}
