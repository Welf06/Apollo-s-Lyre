<template>
    <!-- Landing Page and File Upload -->
    <div class="min-h-screen flex flex-col justify-center items-center gap-4 relative ">
        <span class="text-4xl font-bold mb-6">Background <span class="text-blue">Music</span> Playlist Generator</span>
        <div class="w-1/4">
            <v-file-input 
                v-model="file" 
                label="Add File" 
                variant="underlined"
                accept=".epub"
            </v-file-input>
        </div>
        <button @click="submitFile" class="px-6 py-2 bg-blue text-white rounded-lg">Submit</button>
        <v-icon size="60" class="absolute bottom-0 m-auto text-blue">mdi-arrow-down</v-icon>
    </div>

    <!-- How it works -->
    <div class="mt-8 flex flex-col justify-center items-center">
        <span class="text-3xl font-bold">How It Works</span>

        <ul class="mt-4 flex">
            <li class="text-2xl font-semibold">1. Upload</li>
            <li>2. Analyze</li>
            <li>3. Curate</li>
        </ul>
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
const submitFile = async () => {
    if (!file.value) {
        toastStore.message('error', 'Please select a file to upload');
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
