<script setup>
import { ref} from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";


const formDataRef = ref({
  area: '',
  firstName: '',
  lastName: '',
  bloodType: '',
  age: null,
  id: null
});

const urlRef = ref("http://localhost:9090/application");
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
  <div class="container mb-4">
    <div class="mb-2">
      <label for="firstName">First Name</label>
      <input v-model="formDataRef.firstName" type="text" class="form-control" id="firstName" />
    </div>
    <div class="mb-2">
      <label for="lastName">Last Name</label>
      <input v-model="formDataRef.lastName" type="text" class="form-control" id="lastName" />
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
  <div v-if="data">
    <p>Application has been successfully created</p>
  </div>
</template>

<style scoped>

</style>