<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRemoteData } from "@/composables/useRemoteData.js";
import { useRoute, useRouter } from 'vue-router'


const formDataRef = ref({
  height: null,
  weight: null,
  rhesusFactor: null,
  bloodPressure: null,
  whiteBloodCellCount: null,
  redBloodCellCount: null,
  dateOfTest: '',
  hospitalName: ''
});

const router = useRouter();
const route = useRoute();

const applicationIdRef = ref(null);

const urlRef = computed(() => {
  return 'http://localhost:9090/application/' + applicationIdRef.value +'/bloodTest';
});
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

onMounted(() => {
  applicationIdRef.value = route.params.id;
  performRequest();
});

</script>

<template>
  <div class="container mb-4">
    <h1>New Application</h1>
  </div>
  <div>
    <pre>{{ data }}</pre>
  </div>
  <div class="container mb-4">
    <div class="mb-2">
      <label for="firstName">First Name</label>
      <input v-model="formDataRef.height" type="range" min="1" max="100" value="50" class="form-control" id="height" />
    </div>
    <div class="mb-2">
      <label for="lastName">Last Name</label>
      <input v-model="formDataRef.weight" type="range" min="1" max="2" value="0,1" class="form-control" id="weight" />
    </div>
    <div class="mb-2">
      <label for="age">Age</label>
      <input v-model="formDataRef.age" type="number" class="form-control" id="age" />
    </div>
    <div class="mb-2">
      <label for="area">Area</label>
      <input v-model="formDataRef.area" type="text" class="form-control" id="area" />
    </div>
    <div class="mb-2">
      <label for="bloodType">Blood Type</label>
      <select v-model="formDataRef.bloodType" class="form-select" id="bloodType">
        <option value="O+">O+</option>
        <option value="A+">A+</option>
        <option value="B+">B+</option>
      </select>
    </div>
    <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
  </div>>
</template>

<style scoped>

</style>