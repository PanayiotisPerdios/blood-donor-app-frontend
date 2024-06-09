<script setup>

import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/user.js';
import router from '@/router/index.js'

const userIdRef = ref(null);


const applicationStore = useApplicationStore();
const submittedMessage = ref(null);

const route = useRoute();
const backendEnvVar = import.meta.env.VITE_BACKEND;


const formDataRef = ref({
  username: '',
  email: '',
  phoneNumber: ''
});

const methodRef = ref("PATCH");
const urlRef = computed(() => {
  return `${backendUrl}/api/user/edit/${userIdRef.value}`;
});

const authRef = ref(true);

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {

  performRequest();
  submittedMessage.value = "Personal info has been updated successfully!";
  console.log(formDataRef)
  setTimeout(() => {
    location.reload();
  }, 1000);
};

onMounted(() => {
  userIdRef.value = route.params.id;
  performRequest();
});
</script>

<template>
  <div class="container mb-4">
    <h1>Edit Credentials</h1>
  </div>
  <div>
  </div>
  <div class="container mb-4">
    <div class="mb-2">
      <label for="phonenumber">Update or Add your Phone Number</label>
      <input v-model="formDataRef.phoneNumber" type="number" class="form-control" id="phonenumber" />
    </div>
    <div class="mb-2">
      <label for="username">Username</label>
      <input v-model="formDataRef.username" type="text" class="form-control" id="username" />
    </div>
    <div class="mb-2">
      <label for="email">Email</label>
      <input v-model="formDataRef.email" type="email" class="form-control" id="email" />
    </div>

    <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
  </div>
  <div v-if="submittedMessage">
    <p>{{ submittedMessage }}</p>
  </div>
</template>

<style scoped>

</style>