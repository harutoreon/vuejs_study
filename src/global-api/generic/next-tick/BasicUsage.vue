<script setup>
import { ref, nextTick } from 'vue'

const message = ref('Hello')
const messageEl = ref(null)

async function update() {
  message.value = 'Updated'

  // テンプレート参照で捕まえた <p> 要素の、現在表示されているテキストを取得する
  console.log(messageEl.value.textContent)  // 'Hello'・・・まだ古い

  await nextTick()

  console.log(messageEl.value.textContent)  // 'Updated'・・・反映済み
}
</script>

<template>
  <p ref="messageEl">{{ message }}</p>
  <button @click="update">更新</button>
</template>