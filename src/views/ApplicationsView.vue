<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRoute } from 'vue-router';

const route = useRoute();

const urlRef = ref('http://localhost:9090/api/application/all');
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);


const updateApprovalStatus = (applicationId, approved) => {
  const approvalEndpoint = approved
    ? `http://localhost:9090/api/application/approve/${applicationId}`
    : `http://localhost:9090/api/application/reject/${applicationId}`;

  useRemoteData(ref(approvalEndpoint), authRef, ref('POST')).performRequest();
  // You may want to update the data after performing the request, depending on your API response.
  performRequest();
};

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
                  <button @click="() => updateApprovalStatus(application.id, true)" role="link">Approve</button>
                  <button @click="() => updateApprovalStatus(application.id, false)" role="link">Reject</button>
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