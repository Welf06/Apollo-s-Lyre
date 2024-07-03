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
        </div>
    </div>
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

// Methods
function redirectToPlaylist(playlist: string) {
    const url = playlist.replace('spotify:playlist:', 'https://open.spotify.com/playlist/');
    window.open(url, '_blank');
}

function getEmbedUrl(playlist: string) {
    const playlistId = playlist.split(':')[2].split('?')[0];
    return `https://open.spotify.com/embed/playlist/${playlistId}`;
}
</script>

<style></style>