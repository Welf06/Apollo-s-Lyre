<template>
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
const results = ref([]);

// Methods

</script>

<style>
</style>
