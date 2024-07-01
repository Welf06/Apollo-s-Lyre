<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold mb-6">Background Music Playlist Generator</h1>
    <input type="file" @change="handleFileUpload" class="mb-4" />
    <button @click="submitFile" class="px-6 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import { useToastStore } from '@/stores/toastStore';

// Stores
const toastStore = useToastStore();

// States
const file = ref<File | null>(null)

// Methods
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}

const submitFile = async () => {
  if (!file.value) {
    toastStore.message('error','Please select a file to upload');
    return
  }

  const formData = new FormData()
  formData.append('file', file.value)

  try {
    const response = await axios.post('YOUR_API_ENDPOINT', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('File uploaded successfully', response.data)
  } catch (error) {
    console.error('Error uploading file', error)
  }
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
