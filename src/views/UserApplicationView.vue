<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/user.js'
const applicationStore = useApplicationStore();


const urlRef = computed(() => {
  const userId = applicationStore.getUserId()
  return `http://localhost:9090/api/application/user/${userId}`;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
  performRequest();
})

</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3">User Application</h1>
          </div>
          <div v-if="data">
            <table class="table">
              <thead>
              Application
              <tr>
                <th>Age</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Blood Type</th>
                <th>Area</th>
                <th>Approval</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><pre>{{data.age}}</pre></td>
                <td><pre>{{data.firstName}}</pre></td>
                <td><pre>{{data.lastName}}</pre></td>
                <td><pre>{{data.bloodType}}</pre></td>
                <td><pre>{{data.area}}</pre></td>
                <td><pre>{{data.approved}}</pre></td>
              </tr>
              </tbody>
              <thead>
              Blood Test
              <tr>
                <th>Height</th>
                <th>Weight</th>
                <th>Rhesus Factor</th>
                <th>Blood Pressure</th>
                <th>White Blood Cell Count</th>
                <th>Red Blood Cell Count</th>
                <th>Date of Test</th>
                <th>Hospital Name</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><pre>{{data.bloodTest.height}}</pre></td>
                <td><pre>{{data.bloodTest.weight}}</pre></td>
                <td><pre>{{data.bloodTest.rhesusFactor}}</pre></td>
                <td><pre>{{data.bloodTest.bloodPressure}}</pre></td>
                <td><pre>{{data.bloodTest.whiteBloodCellCount}}</pre></td>
                <td><pre>{{data.bloodTest.redBloodCellCount}}</pre></td>
                <td><pre>{{data.bloodTest.dateOfTest}}</pre></td>
                <td><pre>{{data.bloodTest.hospitalName}}</pre></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>No application</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>