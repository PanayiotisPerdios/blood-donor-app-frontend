<script setup>
import { computed, ref,onMounted } from 'vue'
import { useRemoteData } from "@/composables/useRemoteData.js";
import { useApplicationStore } from '@/stores/application.js';
import { useRoute } from 'vue-router'

const applicationStore = useApplicationStore();
const route = useRoute();


const formDataRef = ref({
  area: '',
  firstName: '',
  lastName: '',
  bloodType: '',
  age: null,
  bloodTest: {
    id: null,
    height: null,
    weight: null,
    rhesusFactor: null,
    bloodPressure: null,
    whiteBloodCellCount: null,
    redBloodCellCount: null,
    dateOfTest: '',
    hospitalName: ''
  }
});



const urlRef = computed(() => {

  const userId = applicationStore.getUserId();
  return `http://localhost:9090/api/application/new/${userId}`;
});

const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef, );

const onSubmit = () => {

  performRequest();
};

onMounted(() => {

});

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
        <div class="mb-2">
          <label for="height">Height</label>
          <input v-model="formDataRef.bloodTest.height" type="number" class="form-control" id="height" />
        </div>
        <div class="mb-2">
          <label for="weight">Weight</label>
          <input v-model="formDataRef.bloodTest.weight" type="number" class="form-control" id="weight" />
        </div>
        <div class="mb-2">
          <label for="rhesusFactor">Rhesus Factor</label>
          <input v-model="formDataRef.bloodTest.rhesusFactor" type="number" class="form-control" id="rhesusFactor" />
        </div>
        <div class="mb-2">
          <label for="bloodPressure">Blood Pressure</label>
          <input v-model="formDataRef.bloodTest.bloodPressure" type="number" class="form-control" id="bloodPressure" />
        </div>
        <div class="mb-2">
          <label for="whiteBloodCellCount">White Blood Cell Count</label>
          <input v-model="formDataRef.bloodTest.whiteBloodCellCount" type="number" class="form-select" id="whiteBloodCellCount"/>
        </div>
        <div class="mb-2">
          <label for="redBloodCellCount">Red Blood Cell Count</label>
          <input v-model="formDataRef.bloodTest.redBloodCellCount" type="number" class="form-control" id="redBloodCellCount" />
        </div>
        <div class="mb-2">
          <label for="dateOfTest">Date Of Test</label>
          <input v-model="formDataRef.bloodTest.dateOfTest" type="date" class="form-control" format="yyyy-MM-dd" id="dateOfTest" />
        </div>
        <div class="mb-2">
          <label for="hospitalName">Hospital Name</label>
          <input v-model="formDataRef.bloodTest.hospitalName" type="text" class="form-control" id="hospitalName" />
        </div>



    <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
  </div>>
  <div v-if="data">
    <p>Application has been successfully created</p>
  </div>
</template>

<style scoped>

</style>