<script setup>
import { computed } from 'vue'
import { valueToPoint } from '@/svg-graph/util.js'

// 親は PolyGraph.vue
const props = defineProps({
  stat: Object,   // ラベル化したい統計データ
  index: Number,  // 項目の番号（0 始まり）
  total: Number   // 軸の総数
})

// stat.label を表示する座標の計算
// レーダーチャートのデータ点とラベルの重なりを防ぐため、実際の値より少し外側（半径方向に +10）オフセットを入れる
const point = computed(() =>
  valueToPoint(+props.stat.value + 10, props.index, props.total)
)
</script>

<template>
  <!-- レーダーチャート上に統計項目のラベルテキストを配置するためのコンポーネント -->

  <!-- 計算した座標に、SVG の <text> 要素で stat.label を描画する -->
  <text :x="point.x" :y="point.y">{{stat.label}}</text>
</template>