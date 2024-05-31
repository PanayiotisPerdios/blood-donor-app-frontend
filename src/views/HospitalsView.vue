<script setup>
import { onMounted, ref,computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;

const urlRef = ref(`/api/hospital/all`);
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
                <th>Hospital Name</th>
              </tr>
              </thead>
              <tbody v-if="data">
              <tr v-for="hospital in data">
                <td>{{ hospital.name }}</td>
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