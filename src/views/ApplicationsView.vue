<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const urlRef = ref('http://localhost:9090/application?page=0&size=100');
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
  performRequest();
});

const updateApplicationStatus = (applicationId, approved) => {
  // Perform logic to update the "approved" status for the application with the given ID
  // You might want to make an API call to update the status on the server
  const updateUrl = `http://localhost:9090/application/${applicationId}`;

  // Make a PATCH request to update the status
  fetch(updateUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers as needed, including authentication headers
    },
    body: JSON.stringify({
      approved: approved,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // If the request was successful, you might want to update the local state or perform additional actions
      console.log(`Application with ID ${applicationId} status updated successfully.`);
    })
    .catch(error => {
      console.error('Error updating application status:', error);
    });
};

const approveApplication = (applicationId) => {
  updateApplicationStatus(applicationId, true);
};

const rejectApplication = (applicationId) => {
  updateApplicationStatus(applicationId, false);
};
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
                <th>Applications</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody v-if="data">
              <tr v-for="application in data._embedded.applications">
                <td>{{ application.firstName }}</td>
                <td>{{ application.lastName }}</td>
                <td>
                  <RouterLink :to="{ name: 'application-details', params: { id: application.id }}">Display</RouterLink>
                  <RouterLink :to="{ name: 'application-delete', params: { id: application.id }}">Delete</RouterLink>
                  <button @click="approveApplication(application.id)">Approve</button>
                  <button @click="rejectApplication(application.id)">Reject</button>
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