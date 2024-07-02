<template>
    <Navbar
        :menus="menus"
        :profileURL="'#'"
        bgColor="#e5e7eb"
        brandLogo="/public/assets/logo.png"
    ></Navbar>

    <v-progress-linear
        v-if="toastStore.loading"
        :value="50"
        class="z-[1005]"
        color="primary"
        height="20"
        indeterminate
    ></v-progress-linear>

    <v-main>
        <router-view />
    </v-main>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import Navbar from '@/components/layout/Navbar.vue';

import { useToastStore } from '@/stores/toastStore';

// Stores
const toastStore = useToastStore();

const menus: { id: string; label: string; url: string; }[] = [
    // {
    //     id: 'insights',
    //     label: 'Insights',
    //     url: '/insights',
    // }
];

</script>

<style>
#alert-snackbar > div {
    bottom: 65px !important;
}
</style>
