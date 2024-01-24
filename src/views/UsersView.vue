<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const urlRef = ref('http://localhost:9090/user');
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
              </thead>
              <tbody v-if="data">
              <tr v-for="user in data._embedded.name">
                <td>{{ user.name }}</td>
                <td>
                  <RouterLink :to="{ name: 'user-details', params: { id: user.id }}">User Details</RouterLink>
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