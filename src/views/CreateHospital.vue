<script setup>
import { ref } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";


const formDataRef = ref({
  name: ''
});

const urlRef = ref("http://localhost:9090/hospital");
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
  performRequest();
};

</script>

<template>
  <div class="container mb-4">
    <h1>New Application</h1>
  </div>
  <div>
  </div>
  <div class="container mb-4">
    <div class="mb-2">
      <label for="name">Hospital Name</label>
      <input v-model="formDataRef.name" type="text" class="form-control" id="name" />
    </div>
    <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
  </div>
</template>

<style scoped>

</style>