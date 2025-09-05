<!--
https://eugenkiss.github.io/7guis/tasks/#crud
-->

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const names = reactive(['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman'])
const selected = ref('')
const prefix = ref('')
const first = ref('')
const last = ref('')

const filteredNames = computed(() =>
  names.filter((n) =>
    n.toLowerCase().startsWith(prefix.value.toLowerCase())
  )
)

// selected の値が変化した場合、その値を「, 」で分割して last と first に代入
watch(selected, (name) => {
  [last.value, first.value] = name.split(', ')
})

// 新しい要素を name に追加
// first と last の初期化
function create() {
  if (hasValidInput()) {
    const fullName = `${last.value}, ${first.value}`
    if (!names.includes(fullName)) {  // names の各要素と fullName の値を比較し、同じ要素がなければ処理を実行
      names.push(fullName)
      first.value = last.value = ''
    }
  }
}

// 添え字 i の要素の値を更新
function update() {
  if (hasValidInput() && selected.value) {
    const i = names.indexOf(selected.value)
    names[i] = selected.value = `${last.value}, ${first.value}`
  }
}

// names の要素削除と selected の初期化
function del() {
  if (selected.value) {
    const i = names.indexOf(selected.value)         // 選択された要素の添え字が入る
    names.splice(i, 1).                             // リアクティブ変数 names の添え字 i の要素を削除
    selected.value = first.value = last.value = ''  // リアクティブ変数 selected の初期化
  }
}

// first と last の値の両端のスペースを除去
function hasValidInput() {
  return first.value.trim() && last.value.trim()
}
</script>

<template>
  <div><input v-model="prefix" placeholder="Filter prefix"></div>

  <select size="5" v-model="selected">
    <option v-for="name in filteredNames" :key="name">{{ name }}</option>
  </select>

  <label>Name: <input v-model="first"></label>
  <label>Surname: <input v-model="last"></label>

  <div class="buttons">
    <button @click="create">Create</button>
    <button @click="update">Update</button>
    <button @click="del">Delete</button>
  </div>
</template>

<style>
* {
  font-size: inherit;
}

input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>