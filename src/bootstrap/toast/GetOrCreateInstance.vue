<script setup>
import { ref } from 'vue'
import { Toast } from 'bootstrap'

const toastEl = ref(null)
const showToast = () => {
 Toast.getOrCreateInstance(toastEl.value, { delay: 3000 }).show()
}
</script>

<template>
  <div ref="toastEl" class="toast" role="alert">
    <div class="toast-body">保存しました</div>
  </div>

  <button @click="showToast">保存</button>
</template>