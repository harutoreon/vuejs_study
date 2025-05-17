<script setup>
import { ref } from 'vue'

const name = ref('')
const file = ref(null)

function handleFileChange(event) {
  file.value = event.target.files[0]
}

function handleSubmit() {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('image', file.value)

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
      <label>画像：</label>
      <input @change="handleFileChange" type="file" accept="image/*" required />
    </div>
    
    <button type="submit">送信</button>
  </form>
</template>
