<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const router = useRouter();
const route = useRoute();
const backendEnvVar = import.meta.env.VITE_BACKEND;

const userIdRef = ref(null);
const urlRef = computed(() => {
  return `${backendEnvVar}/api/user/${userIdRef.value}`;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
  userIdRef.value = route.params.id;
  performRequest();
});
</script>
<template>
  <div>
    <table class="table">
      <tbody v-if="loading">
      <tr>
        <td colspan="2">Loading...</td>
      </tr>
      </tbody>
      <tbody v-if="data">
      <tr>
        <th>ID:</th>
        <td>{{ data.id }}</td>
      </tr>
      <tr>
        <th>Username:</th>
        <td>{{ data.username }}</td>
      </tr>
      <tr>
        <th>email:</th>
        <td>{{ data.email }}</td>
      </tr>
      <tr>
        <th>Last Blood Donation:</th>
        <td>{{ data.lastBloodDonation }}</td>
      </tr>
      <tr>
        <th>Phone Number:</th>
        <td v-if="data.phoneNumber">{{ data.phoneNumber }}</td>
        <td v-else>No phone number</td>
      </tr>
      <tr>
        <th>Roles:</th>
        <td>
            <td v-for="role in data.roles" :key="role.id">{{ role.name }}</td>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>