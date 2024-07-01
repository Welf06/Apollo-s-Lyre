import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('utils', () => {
    const showAlert = ref<boolean>(false);
    const alertColor = ref<string>('');
    const alertText = ref<string>('');
    const alertTextColor = ref<string>('');
    const alertIcon = ref<string>('');
    const hideCloseButton = ref<boolean>(false);
    const loading = ref<boolean>(false);

    function message(type: string, text: string) {
        alertText.value = text;
        showAlert.value = true;

        switch (type) {
            case 'success':
                alertColor.value = '#C4ECCF';
                alertTextColor.value = '#42664F';
                alertIcon.value = 'mdi-check-circle';
                return;
            case 'info':
                alertColor.value = '#BBE2FF';
                alertTextColor.value = '#078FDC';
                alertIcon.value = 'mdi-information-outline';
                return;
            case 'warn':
                alertColor.value = '#FFD8AB';
                alertTextColor.value = '#AF640C';
                alertIcon.value = 'mdi-alert-outline';
                return;
            case 'error':
                alertColor.value = '#FFB4AB';
                alertTextColor.value = '#BA1A1A';
                alertIcon.value = 'mdi-information-outline';
                return;
            default:
                return;
        }
    }

    return {
        showAlert,
        hideCloseButton,
        alertText,
        alertColor,
        alertTextColor,
        alertIcon,
        loading,
        message,
    };
});
