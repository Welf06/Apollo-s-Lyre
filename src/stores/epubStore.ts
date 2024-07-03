import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { useToastStore } from '@/stores/toastStore';

export const useEpubStore = defineStore('epub', () => {
    // Stores
    const toastStore = useToastStore();

    // States

    // Methods
    async function uploadEpubFile(file: File) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { data, status } = await axios.post(
                `${import.meta.env.API_URL}/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (status !== 200) {
                toastStore.message(
                    'error',
                    'Error uploading EPUB file, Please Try Again'
                );
                return null;
            }

            return data; // This will contain { task_id, unique_filename }
        } catch (error) {
            console.error(error);
            toastStore.message(
                'error',
                'Error Sending Request to the Server, Please Try Again Later'
            );
            return null;
        }
    }
  
    return { 
        uploadEpubFile,
    }
  })