<!--
課題の趣旨
・ウィジェット間の制約をモデル化する
・ウィジェット内の制約をモデル化する
-->

<!--
構築するフレーム
・片道航空券と往復航空券の2つのオプションを含むコンボボックスC
・出発日と帰着日の2つのテキストフィールドT1とT2
・選択した航空券を送信するためのボタンB
-->

<!--
各コンポーネントの動作
・T2は、Cの値が「往復航空券」である場合に限り有効となる。
・Cの値が「往復便」で、かつT2の日付がT1の日付より厳密に早い場合、Bは無効化される。
・無効化されていないテキストフィールドTに不正な形式の日付が入力されている場合、Tは赤色で表示され、Bは無効化される。
・Bをクリックすると、選択内容を確認するメッセージが表示される（例：「2014年4月4日の片道便を予約しました」）。
・初期状態では、Cの値は「片道航空券」であり、T1とT2は同じ（任意の）日付を持つ（T2が無効化されていることが暗黙的に示される）。
-->

<script setup>
import { ref, computed } from 'vue'

const flightType = ref('one-way flight')
const departureDate = ref(dateToString(new Date()))
const returnDate = ref(departureDate.value)

const isReturn = computed(() => flightType.value === 'return flight')

const canBook = computed(
  () =>
    !isReturn.value ||
    stringToDate(returnDate.value) > stringToDate(departureDate.value)
)

function book() {
  alert(
    isReturn.value
      ? `You have booked a return flight leaving on ${departureDate.value} and returning on ${returnDate.value}.`
      : `You have booked a one-way flight leaving on ${departureDate.value}.`
  )
}

function stringToDate(str) {
  const [y, m, d] = str.split('-')
  return new Date(+y, m - 1, +d)
}

function dateToString(date) {
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate())
  )
}

function pad(n, s = String(n)) {
  return s.length < 2 ? `0${s}` : s
}
</script>

<template>
  <select v-model="flightType">
    <option value="one-way flight">One-way Flight</option>
    <option value="return flight">Return Flight</option>
  </select>

  <input type="date" v-model="departureDate">
  <input type="date" v-model="returnDate" :disabled="!isReturn">

  <button :disabled="!canBook" @click="book">Book</button>

  <p>{{ canBook ? '' : 'Return date must be after departure date.' }}</p>
</template>

<style>
select,
input,
button {
  display: block;
  margin: 0.5em 0;
  font-size: 15px;
}

input[disabled] {
  color: #999;
}

p {
  color: red;
}
</style>