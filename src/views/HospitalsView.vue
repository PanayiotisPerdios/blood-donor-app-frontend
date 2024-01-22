<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const urlRef = ref('http://localhost:9090/api/hospital/all');
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
            <h1 class="fs-3">Hospitals</h1>
          </div>
          <div>
            <table class="table">
              <thead>
              <tr>
                <!-- <th>Course ID</th> -->
                <th>Hospital Names</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody v-if="data">
              <tr v-for="hospital in data.Hospitals" :key="hospital.id">
                <td>{{ hospital.name }}</td>
                <td>
                  <!-- TODO course.id -->
                  <RouterLink :to="{ name: 'hospital-details', params: { id: hospital.id } }">
                    Display
                  </RouterLink>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <pre>{{ data }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>