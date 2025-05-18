<script setup>
import { ref } from 'vue'

const name = ref('')
const files = ref([])  // 複数ファイル用

function handleFileChange(event) {
  files.value = Array.from(event.target.files)
}

function handleSubmit() {
  const formData = new FormData()
  formData.append('name', name.value)

  // 複数ファイルをformDataに送信
  for (const file of files.value) {
    formData.append('images[]', file)  // append() を同じキーで何度も使うと、配列的に保持される。
  }
  

  // デバッグ用：送信内容を確認
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  // 通常はここでAPI送信する（モックとしてコメントアウト）
  // await axios.post('/api/upload', formData)

  alert('送信内容をコンソールに出力しました')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>名前：</label>
      <input v-model="name" type="text" name="name" required />
    </div>

    <div>
      <label>画像（複数選択可）：</label>
      <input @change="handleFileChange" type="file" accept="image/*" multiple required />
    </div>

    <button type="submit">送信</button>
  </form>
</template>
