<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRoute } from 'vue-router';
import { useApplicationStore } from '@/stores/user.js';
import router from '@/router/index.js'
const applicationStore = useApplicationStore();
const backendEnvVar = import.meta.env.VITE_BACKEND;


const route = useRoute();

const urlRef = ref(`/api/application/all`);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);


const updateApprovalStatus = (applicationId, approved) => {
  const approvalEndpoint = approved
    ? `${backendEnvVar}/api/application/approve/${applicationId}`
    : `${backendEnvVar}/api/application/reject/${applicationId}`;

  useRemoteData(ref(approvalEndpoint), authRef, ref('POST')).performRequest();
  setTimeout(() => {
    location.reload();
  }, 700);

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
                  <button v-if="!applicationStore.userData.roles.includes('ROLE_ADMIN') && !application.approved && !application.rejected" @click="() => updateApprovalStatus(application.id, true)" role="link">Approve</button>
                  <button v-if="!applicationStore.userData.roles.includes('ROLE_ADMIN') && !application.approved && !application.rejected" @click="() => updateApprovalStatus(application.id, false)" role="link">Reject</button>
                  <b v-if="!applicationStore.userData.roles.includes('ROLE_ADMIN') && application.approved && !application.rejected">Application Approved</b>
                  <b v-if="!applicationStore.userData.roles.includes('ROLE_ADMIN') && !application.approved && application.rejected">Application Rejected</b>
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