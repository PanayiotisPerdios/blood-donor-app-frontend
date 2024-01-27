<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const userIdRef = ref(null);
const deleteUser = async () => {
  try {
    const response = await fetch('https://localhost:9090/user' + userIdRef.value, {
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
    <button @click="deleteUser">Delete User</button>
  </div>
</template>

<style scoped>

</style>