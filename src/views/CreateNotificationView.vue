<script setup>
import { computed, ref } from 'vue'
import { useRemoteData } from "@/composables/useRemoteData.js";


const formDataRef = ref({
  id: '',
  type: '',
  hospitalName: null,
  userid:''
});
const backendEnvVar = import.meta.env.VITE_BACKEND;


const urlRef = computed(() => {
  return `${backendUrl}/api/notifications/new/`+ formDataRef.value.userid;
});

const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
  performRequest();
  setTimeout(() => {
    location.reload();
  }, 1000);
};

</script>

<template>
  <div class="container mb-4">
    <h1>New Notification</h1>
  </div>
  <div class="container mb-4">
    <div class="mb-2">
      <label for="userid">UserId</label>
      <input v-model="formDataRef.userid" type="text" class="form-control" id="userid" />
    </div>
    <div class="mb-2">
      <label for="type">Type</label>
      <input v-model="formDataRef.type" type="text" class="form-control" id="type" />
    </div>
    <div class="mb-2">
      <label for="type">Hospital Name</label>
      <input v-model="formDataRef.hospitalName" type="text" class="form-control" id="type" />
    </div>
    <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
  </div>
  <div v-if="data">
    <p>Notification has successfully been created</p>
  </div>
</template>

<style scoped>


</style>