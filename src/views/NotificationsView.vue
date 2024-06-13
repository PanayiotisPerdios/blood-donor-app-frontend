<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/user.js';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

const router = useRouter();
const route = useRoute();


const applicationStore = useApplicationStore();
const backendEnvVar = import.meta.env.VITE_BACKEND;



const urlRef = computed(() => {
  const userId = applicationStore.getUserId();
  return `/api/notifications/${userId}`;
});

const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
  performRequest();
});
</script>


<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3">Notifications</h1>
          </div>
          <div>
            <table class="table">
              <thead>
              <tr>
                <th>Type</th>
                <th>Hospital name</th>
              </tr>
              </thead>
              <tbody v-if="data">
              <tr v-for="notification in data" :key="notification.id">
                <td>{{ notification.type }}</td>
                <td>{{notification.hospitalName}}</td>
                <td><RouterLink :to="{ name: 'notification-delete', params: { id: notification.id }}">Delete</RouterLink></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>