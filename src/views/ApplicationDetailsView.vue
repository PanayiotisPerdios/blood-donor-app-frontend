<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();
const backendEnvVar = import.meta.env.VITE_BACKEND;


const applicationIdRef = ref(null);
const urlRef = computed(() => {
  return `${backendEnvVar}/api/application/` + applicationIdRef.value;
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
    <div v-if="data">
      <h1 v-if="data.approved && !data.rejected">Approved</h1>
      <h1 v-if="!data.approved && data.rejected">Rejected</h1>
      <h1 v-if="!data.approved && !data.rejected">Pending...</h1>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Field Name</th>
        <th>Field Value</th>
      </tr>
      </thead>
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
        <th>Height:</th>
        <td>{{ data.bloodTest.height }}</td>
      </tr>
      <tr>
        <th>Weight:</th>
        <td>{{ data.bloodTest.weight }}</td>
      </tr>
      <tr>
        <th>Rhesus Factor:</th>
        <td>{{ data.bloodTest.rhesusFactor }}</td>
      </tr>
      <tr>
        <th>Blood Pressure:</th>
        <td>{{ data.bloodTest.bloodPressure }}</td>
      </tr>
      <tr>
        <th>White Blood Cell Count:</th>
        <td>{{ data.bloodTest.whiteBloodCellCount }}</td>
      </tr>
      <tr>
        <th>Red Blood Cell Count:</th>
        <td>{{ data.bloodTest.redBloodCellCount }}</td>
      </tr>
      <tr>
        <th>Date of Test:</th>
        <td>{{ data.bloodTest.dateOfTest }}</td>
      </tr>
      <tr>
        <th>Hospital Name:</th>
        <td>{{ data.bloodTest.hospitalName }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>