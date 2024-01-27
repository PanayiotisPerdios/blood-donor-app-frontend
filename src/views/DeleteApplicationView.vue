<script setup>
import { ref,onMounted} from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRoute } from 'vue-router';

const applicationIdRef = ref(null);
const route = useRoute();

const urlRef = ref('');

const authRef = ref(true);
const methodRef = ref("DELETE");

const { loading, performRequest } = useRemoteData(urlRef, authRef, methodRef);


const deleteApplication = () => {
  urlRef.value = `https://localhost:9090/api/application/delete/${applicationIdRef.value}`;
  performRequest();
};

onMounted(() => {
  // Extract application ID from the route parameters
  applicationIdRef.value = route.params.id;
});

</script>

<template>
  <div>
    <button @click="deleteApplication">Delete Application</button>
  </div>
</template>

<style scoped>

</style>