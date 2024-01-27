<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const urlRef = ref('http://localhost:9090/api/application/all');
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
            <h1 class="fs-3">Applications</h1>
          </div>
          <div>
            <table class="table">
              <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
              <pre></pre>
              </thead>
              <tbody v-if="data">
              <tr v-for="application in data">
                <td>{{ application.firstName }}</td>
                <td>{{ application.lastName }}</td>
                <td>
                  <tr><RouterLink :to="{ name: 'application-details', params: { id: application.id }}">Details</RouterLink></tr>
                  <tr><RouterLink :to="{ name: 'application-delete', params: { id: application.id }}">Delete</RouterLink></tr>
                </td>
                <td>
                  <RouterLink :to="{ name: 'application-approve', params: { id: application.id }}" custom v-slot="{ navigate }"> <button @click="navigate" role = "link">Approve</button></RouterLink>
                  <RouterLink :to="{ name: 'application-reject', params: { id: application.id }}" custom v-slot="{ navigate }"> <button @click="navigate" role = "link">Reject</button></RouterLink>
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