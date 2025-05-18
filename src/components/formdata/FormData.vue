<script setup>
import { ref } from 'vue'

const name = ref('')
const files = ref([])
const previews = ref([])

function handleFileChange(event) {
  const selectedFiles = Array.from(event.target.files)
  files.value = selectedFiles

  // 古いプレビューURLを解放（メモリリーク防止）
  previews.value.forEach(url => URL.revokeObjectURL(url))

  // 新しいプレビューを生成
  previews.value = selectedFiles.map(file => URL.createObjectURL(file))
}

function handleSubmit() {
  const formData = new FormData()
  formData.append('name', name.value)

  for (const file of files.value) {
    formData.append('images[]', file)
  }

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  alert('送信内容（プレビュー付き）をコンソールに出力しました')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>名前：</label>
      <input v-model="name" type="text" required />
    </div>

    <div>
      <label>画像（複数可）：</label>
      <input @change="handleFileChange" type="file" accept="image/*" multiple required />
    </div>

    <div v-if="previews.length > 0" style="margin-top: 1em;">
      <p>画像プレビュー：</p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <img
          v-for="(url, index) in previews"
          :key="index"
          :src="url"
          alt="プレビュー"
          style="width: 120px; height: auto; object-fit: cover; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>
    </div>

    <button type="submit" style="margin-top: 1em;">送信</button>
  </form>
</template>
