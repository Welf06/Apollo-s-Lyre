<template>
    <!-- Desktop VIew -->
    <v-app-bar :color="bgColor" height="50" :elevation="0">
        <div
            class="flex justify-between items-center w-full h-full px-[50px] z-50"
        >
            <!-- Brand Logo -->
            <div class="w-full flex flex-row cursor-pointer" @click="gotoHome()">

                <span class="text-lg font-semibold">
                    Apollo's Lyre
                </span>
            </div>

            <!-- Menu Items -->
            <div class="flex justify-evenly w-full h-full z-50">
                <div
                    v-for="(menu, index) of menus"
                    :key="index"
                    :class="`font-bold text-2xl uppercase cursor-pointer h-full flex items-center px-6 ${
                        selectedMenu === menu.id
                            ? 'border-white border-b-4'
                            : ''
                    }`"
                    :style="{ color: textColor }"
                    @click="changeSelectedMenu(menu.url, menu.id)"
                >
                    {{ menu.id }}
                </div>
            </div>

        </div>
    </v-app-bar>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Props
const props = withDefaults(
    defineProps<{
        bgColor?: string;
        brandLogo: string;
        menus: Array<{
            id: string;
            label: string;
            url: string;
        }>;
        profileURL: string;
        textColor?: string;
    }>(),
    {
        bgColor: '#2E333B',
        textColor: '#ffffff',
    }
);

// States
const selectedMenu = ref(route.path);

/**
 * Function to change and emit selected menu items
 * @param menu Selected Menu
 * @param id Selected Menu ID
 */
 function changeSelectedMenu(menu: string, id: string): void {
    selectedMenu.value = id;
    router.push(menu);

    return;
}

/**
 * Go to home
 */
function gotoHome(): void {
    router.push(`/home`);
}

</script>

<style scoped>
</style>
