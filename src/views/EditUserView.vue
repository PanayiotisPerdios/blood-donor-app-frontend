<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const router = useRouter();
const route = useRoute();

const userIdRef = ref(null);
const urlRef = ref(null);
const authRef = ref(true);
const methodRef = ref('PATCH');

const bodyRef = ref({
  id: null,
  username: '',
  email: '',
  password: '',
});

const { loading, performRequest, updateUser } = useRemoteData(urlRef, authRef, methodRef, bodyRef);

onMounted(() => {
  userIdRef.value = route.params.id;
  urlRef.value = 'http://localhost:9090/user/' + userIdRef.value;
  performRequest();
});

const updateUserHandler = async () => {
  try {
    await updateUser(userIdRef.value, bodyRef.value);
    // Redirect to user details view after successful update
    router.push({ name: 'user-details', params: { id: userIdRef.value } });
  } catch (error) {
    // Handle error (e.g., show error message to the user)
    console.error('Error updating user:', error);
  }
};
</script>

<template>
  <div>
    <h1 class="fs-3">Edit User #{{ userIdRef }}</h1>
    <form @submit.prevent="updateUserHandler">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="bodyRef.username" type="text" class="form-control" id="username">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="bodyRef.email" type="email" class="form-control" id="email">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="bodyRef.password" type="password" class="form-control" id="password">
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
      <RouterLink class="btn btn-secondary" :to="{ name: 'user-details', params: { id: userIdRef } }">Cancel
      </RouterLink>
    </form>
  </div>
</template>