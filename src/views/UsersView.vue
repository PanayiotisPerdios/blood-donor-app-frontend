<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/user.js';
const applicationStore = useApplicationStore();
const backendEnvVar = import.meta.env.VITE_BACKEND;

const urlRef = ref(`/api/user/all`);
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
            <h1 class="fs-3">Users</h1>
          </div>
          <div>
            <table class="table">
              <thead>
              <tr>
                <th>Users Name</th>
              </tr>
              <pre></pre>
              </thead>
              <tbody v-if="data">
              <tr v-for="user in data" :key="user.id">
                <td>{{ user.username }}</td>
                <td>
                  <tr><RouterLink :to="{ name: 'user-details', params: { id: user.id }}">Details</RouterLink></tr>
                  <tr v-if="applicationStore.userData.roles.includes('ROLE_ADMIN')"><RouterLink :to="{ name: 'user-delete', params: { id: user.id }}">Delete</RouterLink></tr>
                  <tr v-if="applicationStore.userData.roles.includes('ROLE_ADMIN')"><RouterLink :to="{ name: 'user-edit', params: { id: user.id }}">Edit</RouterLink></tr>
                </td>
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