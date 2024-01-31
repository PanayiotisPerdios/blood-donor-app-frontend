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

const { loading, performRequest } = useRemoteData(urlRef, authRef, methodRef);


const deleteUser = () => {
  urlRef.value = `http://localhost:9090/api/user/delete/${userIdRef.value}`;
  performRequest();
};

onMounted(() => {
  // Extract application ID from the route parameters
  userIdRef.value = route.params.id;
});

</script>

<template>
  <div>
    <button @click="deleteUser">Delete User</button>
  </div>
</template>

<style scoped>

</style>