<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const route = useRoute();

const urlRef = computed(() => {
  return 'http://localhost:9090/api/application/' + applicationIdRef.value;
});

const applicationIdRef = ref(null);

onMounted(() => {
  applicationIdRef.value = route.params.id;
});
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <RouterLink class="small" :to="{ name: 'applications' }">Back to Application List</RouterLink>
            <h1 class="fs-3">Application #{{ applicationIdRef }}</h1>
          </div>
          <div class="mb-4">
            <ul class="nav border">
              <li class="nav-item">
                <RouterLink class="nav-link" :to="{ name: 'application-details', params: { id: applicationIdRef } }">Details</RouterLink>
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