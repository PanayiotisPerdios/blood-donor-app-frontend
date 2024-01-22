<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const courseIdRef = ref(null);

onMounted(() => {
  courseIdRef.value = route.params.id;
});
</script>

<template>

</template>

<style scoped>

</style>