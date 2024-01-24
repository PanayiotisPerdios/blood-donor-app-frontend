<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const hospitalIdRef = ref(null);

onMounted(() => {
  hospitalIdRef.value = route.params.id;
});
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <RouterLink class="small" :to="{ name: 'hospital' }"
            >Back to Hospitals</RouterLink
            >
            <h1 class="fs-3">Hospital #{{ hospitalIdRef }}</h1>
          </div>
          <div class="mb-4">
            <ul class="nav border">
              <li class="nav-item">
                <RouterLink class="nav-link" :to="{ name: 'hospital-details', params: { id: hospitalIdRef } }">Details</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink
                  class="nav-link"
                  :to="{ name: 'course-students', params: { id: hospitalIdRef } }"
                >Students</RouterLink
                >
              </li>
            </ul>
          </div>
          <div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>