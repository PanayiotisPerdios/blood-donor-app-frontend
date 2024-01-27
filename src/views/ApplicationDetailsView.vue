<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';


const route = useRoute();

const applicationIdRef = ref(null);
const urlRef = computed(() => {
  return 'http://localhost:9090/application/' + applicationIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
  applicationIdRef.value = route.params.id;
  performRequest();
});
</script>
<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Field Name</th>
        <th>Field Value</th>
      </tr>
      </thead>
      <tbody v-if="loading">
      <tr>
        <td colspan="2">Loading...</td>
      </tr>
      </tbody>
      <tbody v-if="data">
      <tr>
        <th>First Name:</th>
        <td>{{ data.firstName }}</td>
      </tr>
      <tr>
        <th>Last Name:</th>
        <td>{{ data.lastName }}</td>
      </tr>
      <tr>
        <th>Blood Type:</th>
        <td>{{ data.bloodType }}</td>
      </tr>
      <tr>
        <th>Area</th>
        <td>{{ data.area }}</td>
      </tr>
      <tr>
        <th>Approval:</th>
        <td>{{ data.approved }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>