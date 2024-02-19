<script setup>

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/user.js';

const router = useRouter();
const { clearUserData } = useApplicationStore();

const loading = ref(false);

const performSignOut = () => {
  loading.value = true;
  clearUserData();
  setTimeout(() => {
    router.push({ name: 'signin' });
  }, 800);
};

onMounted(() => {
  performSignOut();
});
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-4">
          <div class="mb-4">
            <h1 class="fs-3">Signout</h1>
          </div>
          <div class="spinner-border" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>