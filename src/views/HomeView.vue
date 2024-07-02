<template>
    <!-- Landing Page and File Upload -->
    <div class="min-h-screen flex flex-col justify-center items-center gap-4 relative ">
        <span class="text-4xl font-bold mb-6">Background <span class="text-blue">Music</span> Playlist Generator</span>
        <div class="w-1/4">
            <v-file-input 
                v-model="file" 
                label="Add an ePub" 
                variant="underlined"
                accept=".epub"
            </v-file-input>
        </div>
        <button @click="submitFile" class="px-6 py-2 bg-blue text-white rounded-lg">Submit</button>
        <v-icon size="60" class="absolute bottom-10 m-auto text-blue">mdi-arrow-down</v-icon>
    </div>
 
    <!-- How it works -->
    <div class="min-h-[50vh] flex flex-col justify-center items-center">
        <span class="text-3xl font-bold">How It Works</span>

        <ul class="mt-16 flex gap-16">
            <li class="w-50 flex flex-col  gap-4 justify-top items-center">
                <v-icon size="60" class="text-blue">mdi-upload</v-icon>
                <span class="text-2xl font-semibold">
                    1. Upload
                </span>
                <span class="text-center">
                    Select and upload your ePub file
                </span>
            </li>
            <li class="w-50 flex flex-col gap-4 justify-top items-center">
                <v-icon size="60" class="text-blue">mdi-chart-areaspline</v-icon>
                <span class="text-2xl font-semibold">
                    2. Analyze
                </span>
                <span class="text-center">
                    We analyze your book's content
                </span>
            </li>
            <li class="w-50 flex flex-col gap-4 justify-top items-center">
                <v-icon size="60" class="text-blue">mdi-playlist-music</v-icon>
                <span class="text-2xl font-semibold">
                    3. Curate
                </span>
                <span class="text-center">
                    Get personalized playlists for each chapter
                </span>
            </li>
        </ul>
    </div>

    <!-- Copyright -->
    <footer class="mt-24 mb-2 flex justify-center items-center gap-2">
        <v-icon size="24" class="text-blue">mdi-copyright</v-icon>
        <span class="">Apollo's Lyre</span>
    </footer>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { useToastStore } from '@/stores/toastStore';

const router = useRouter();
const route = useRoute();

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

    router.push('/results/:id');

    // const formData = new FormData()
    // formData.append('file', file.value)

    // try {
    //     const response = await axios.post('YOUR_API_ENDPOINT', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //     console.log('File uploaded successfully', response.data)
    // } catch (error) {
    //     console.error('Error uploading file', error)
    // }
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
