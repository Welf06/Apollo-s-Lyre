<template>
    <div class="mb-20">
        <div v-if="loading" class="mt-60 flex flex-col align-center">
            <v-progress-circular class="mb-2" indeterminate></v-progress-circular>
            <span class="capitalize">Loading Results ...</span>
        </div>
        <!-- Result Not Found -->
        <div v-else-if="results.length < 1">
            <div class="mt-60 flex flex-col align-center">
                <v-icon size="100" class="text-blue">mdi-book-remove-multiple</v-icon>
                <span class="text-2xl font-semibold mt-2">No Results Found</span>
                <span class="text-center mt-2">Please check the
                    <span class="text-blue">
                        result id
                    </span>
                    , and try again
                </span>
            </div>
        </div>
        <div v-else>
            <template v-if="state === 'STARTED' || state === 'PENDING'">
                <div class="mt-60 flex flex-col align-center">
                    <v-icon size="100" class="text-blue mb-4">
                        {{ state === 'STARTED' ? 'mdi-clock-start' : 'mdi-clock-outline' }}
                    </v-icon>
                    <span class="text-2xl font-semibold mb-2">
                        {{ state === 'STARTED' ? 'Job Started' : 'Processing' }}
                    </span>
                    <span class="text-center mb-4">
                        {{ state === 'STARTED' ? 'Hang tight, we\'re preparing your results' : 'Your job is being processed, please wait' }}
                    </span>
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </template>
            <template v-else-if="state === 'FAILURE'">
                <div class="mt-60 flex flex-col align-center">
                    <v-icon size="100" class="text-red">mdi-alert-circle</v-icon>
                    <span class="text-2xl font-semibold mt-2">Failed to Process Results</span>
                    <span class="text-center mt-2">Please try again later</span>
                </div>
            </template>
            <template v-else-if="state === 'SUCCESS'">
                <div class="mt-20 flex flex-col align-center">
                    <v-icon size="100" class="text-blue">mdi-book-multiple</v-icon>
                    <span class="text-2xl font-semibold mt-2">Results</span>
                    <span class="text-center mt-2">Here are the results for the book</span>
                    <div v-for="(result, id) in results" :key="id" class="mt-8 flex flex-col gap-4 w-full max-w-2xl">
                        <span class="text-lg font-semibold">{{ result.name }}</span>
                        <iframe :src="getEmbedUrl(result.playlist)" width="100%" height="380" frameborder="0"
                            allowtransparency="true" allow="encrypted-media"></iframe>
                        <v-btn color="primary" @click="redirectToPlaylist(result.playlist)">
                            Open in Spotify
                        </v-btn>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { useToastStore } from '@/stores/toastStore';
import { useEpubStore } from '@/stores/epubStore';

const router = useRouter();
const route = useRoute();

// Stores
const toastStore = useToastStore();
const epubStore = useEpubStore();

// States
const loading = ref(false);
const results = ref([
    {
        name: "Chapter 1 - Fyodor Pavlovich Karamazov",
        playlist: "spotify:playlist:4p3D834U8NjfUozgjjRZmc?si=65c3f11053ab4161"
    },
    {
        name: "Chapter 2 - Alexei Fyodorovich Karamazov",
        playlist: "spotify:playlist:4p3D834U8NjfUozgjjRZmc?si=65c3f11053ab4161"
    },
    {
        name: "Chapter 3 - Ivan Fyodorovich Karamazov",
        playlist: "spotify:playlist:4p3D834U8NjfUozgjjRZmc?si=65c3f11053ab4161"
    },
    {
        name: "Chapter 4 - Dmitri Fyodorovich Karamazov",
        playlist: "spotify:playlist:4p3D834U8NjfUozgjjRZmc?si=65c3f11053ab4161"
    }
]);
const pollingInterval = ref<any>(null);
const state = ref<string>('');

// Lifecycle Hooks
onMounted(async () => {
    loading.value = true;
    refreshJobDetails();
    pollingInterval.value = setInterval(refreshJobDetails, 5000); // Poll every 5 seconds
    loading.value = false;

    // dummmy changes, remove later
    setTimeout(() => {
        state.value = 'PENDING';
    }, 5000);

    setTimeout(() => {
        state.value = 'SUCCESS';
        clearInterval(pollingInterval.value);
    }, 10000);
});

onUnmounted(() => {
    clearInterval(pollingInterval.value);
});

// Methods
function redirectToPlaylist(playlist: string) {
    const url = playlist.replace('spotify:playlist:', 'https://open.spotify.com/playlist/');
    window.open(url, '_blank');
}

function getEmbedUrl(playlist: string) {
    const playlistId = playlist.split(':')[2].split('?')[0];
    return `https://open.spotify.com/embed/playlist/${playlistId}`;
}

function refreshJobDetails() {
    // cosnt res = await epubStore.getJobDetails(route.params.id);

    const res = {
        state: 'STARTED'
    };
    
    if (res.state) {
        if (res.state === 'STARTED') {
            state.value = 'STARTED';
        }
        if (res.state === 'PENDING') {
            state.value = 'PENDING';
        }
        if (res.state === 'SUCCESS') {
            clearInterval(pollingInterval.value);
            state.value = 'SUCCESS';

            // API call: Get Results
        }
        if (res.state === 'FAILURE') {
            clearInterval(pollingInterval.value);
            state.value = 'FAILURE';
        }
    }
}
</script>

<style scoped>
.loading-dots {
    display: inline-block;
}

.loading-dots span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #2196F3;
    margin: 0 5px;
    animation: dots 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
    animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes dots {
    0%, 80%, 100% { 
        transform: scale(0);
    } 
    40% { 
        transform: scale(1.0);
    }
}
</style>