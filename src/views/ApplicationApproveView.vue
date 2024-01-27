<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const applicationIdRef = ref(null);
const urlRef = computed(() => {
  return 'http://localhost:9090/api/application/approve' + applicationIdRef.value
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
  applicationIdRef.value = route.params.id;
  performRequest();
});


</script>
<template>
  Approve
</template>

<style scoped>

</style>