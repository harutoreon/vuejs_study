<script setup>
import { ref, nextTick } from 'vue'

const isEditing = ref(false)
const inputEl = ref(null)

async function startEdit() {
  isEditing.value = true
  await nextTick()          // input が DOM に追加されるのを待つ
  inputEl.value.focus()     // ここで初めて ref が有効になる
}
</script>

<template>
  <button v-if="!isEditing" @click="startEdit">編集</button>
  <input v-else ref="inputEl" />
</template>