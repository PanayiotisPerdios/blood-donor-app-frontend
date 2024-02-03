<script setup>

import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/user.js';

const applicationStore = useApplicationStore();
const submittedMessage = ref(null);

const route = useRoute();

const formDataRef = ref();

const methodRef = ref("PATCH");
const urlRef = computed(() => {
  const userId = applicationStore.getUserId();
  return `http://localhost:9090/api/user/phonenumber/${userId}`;
});

const authRef = ref(true);

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {

  performRequest();
  submittedMessage.value = "Phone number submitted successfully!";
  console.log(formDataRef)
};

</script>

<template>
  <div class="container mb-4">
    <h1>Add phone number</h1>
  </div>
  <div>
  </div>
  <div class="container mb-4">
    <div class="mb-2">
      <input v-model="formDataRef" type="number" class="form-control" id="name" />
    </div>
    <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
  </div>
  <div v-if="submittedMessage">
    <p>{{ submittedMessage }}</p>
  </div>
</template>

<style scoped>

</style>