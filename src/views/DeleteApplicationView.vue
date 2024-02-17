<script setup>
import { ref,onMounted} from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRoute } from 'vue-router';
import router from '@/router/index.js'

const applicationIdRef = ref(null);
const route = useRoute();

const urlRef = ref('');

const authRef = ref(true);
const methodRef = ref("DELETE");
const loading = ref(false);

const { performRequest } = useRemoteData(urlRef, authRef, methodRef);


const deleteApplication = () => {
  loading.value = true;
  urlRef.value = `http://localhost:9090/api/application/delete/${applicationIdRef.value}`;
  performRequest();
  setTimeout(() => {
    router.push({ name: 'applications' });
  }, 900);
};

onMounted(() => {
  applicationIdRef.value = route.params.id;
  deleteApplication()
});

</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-4">
          <div class="mb-4">
            <h1 class="fs-3">Deleting Application</h1>
          </div>
          <div class="spinner-border" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>