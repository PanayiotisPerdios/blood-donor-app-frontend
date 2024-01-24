<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const router = useRouter();
const route = useRoute();

const userIdRef = ref(null);
const urlRef = computed(() => {
  return 'http://localhost:9090/user/' + userIdRef.value;
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
        <th>Roles:</th>
        <td>{{ data.roles }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>