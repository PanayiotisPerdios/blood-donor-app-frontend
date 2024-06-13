<script setup>
import { ref,onMounted} from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRoute,useRouter } from 'vue-router';

const userIdRef = ref(null);
const route = useRoute();
const router = useRouter();

const urlRef = ref('');

const authRef = ref(true);
const methodRef = ref("DELETE");
const loading = ref(false);
const backendEnvVar = import.meta.env.VITE_BACKEND;



const { performRequest } = useRemoteData(urlRef, authRef, methodRef);


const deleteUser = () => {
  loading.value = true;
  urlRef.value = `/api/user/delete/${userIdRef.value}`;
  performRequest();
  setTimeout(() => {
    router.push({ name: 'users' });
  }, 900);
};

onMounted(() => {
  userIdRef.value = route.params.id;
  deleteUser()
});

</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-4">
          <div class="mb-4">
            <h1 class="fs-3">Deleting User</h1>
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