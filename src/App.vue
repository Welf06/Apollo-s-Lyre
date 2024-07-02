<template>
    <v-app class="bg-gray-200">
        <router-view></router-view>
        <v-snackbar id="alert-snackbar" v-model="toastStore.showAlert" :color="toastStore.alertColor" :timeout="3000"
            variant="flat">
            <div class="flex align-center">
                <v-icon :color="toastStore.alertTextColor">
                    {{ toastStore.alertIcon }}
                </v-icon>
                <span :style="`color: ${toastStore.alertTextColor}`" class="capitalize ml-3 text-base">
                    {{ toastStore.alertText }}
                </span>
            </div>

            <template v-if="!toastStore.hideCloseButton" v-slot:actions>
                <v-btn :color="toastStore.alertTextColor" @click="toastStore.showAlert = false">
                    <span class="text-base">Close</span>
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useToastStore } from '@/stores/toastStore';

// Stores
const toastStore = useToastStore()

</script>

<style scoped></style>
