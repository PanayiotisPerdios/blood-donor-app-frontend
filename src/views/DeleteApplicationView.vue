<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const applicationIdRef = ref(null);
const deleteResource = async () => {
  try {
    const response = await fetch('https://localhost:9090/application' + applicationIdRef.value, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Resource deleted successfully');
    } else {
      console.error('Failed to delete resource');
    }
  } catch (error) {
    console.error('An error occurred during the deletion:', error);
  }
};
</script>

<template>
  <div>
    <button @click="deleteResource">Delete Resource</button>
  </div>
</template>

<style scoped>

</style>