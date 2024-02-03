<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();


const loading = ref(false);
const credentials = ref({
  username: '',
  email: '',
  password: '',
});
const signupFailed = ref(false);

const onFormSubmit = () => {
  loading.value = true;
  signupFailed.value = false;

  fetch('http://localhost:9090/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials.value)
  })
    .then((response) => {
      if (response.ok) {
        response.json().then(() => {
          router.push({ name: 'signin' });
        });
      } else {
        signupFailed.value = true;
      }
    })
    .catch((err) => {
      console.warn(err);
      signupFailed.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};

</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-4">
          <div class="mb-4">
            <h1 class="fs-3">Signup</h1>
          </div>
          <div class="spinner-border" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
          </div>
          <form v-else>
            <div class="mb-2" v-if="signupFailed">
              <div class="alert alert-danger" role="alert">
                Signup failed!
              </div>
            </div>
            <div class="mb-2">
              <label for="usernameFormControl" class="form-label mb-1">Username</label>
              <input v-model="credentials.username" type="text" class="form-control" id="usernameFormControl" />
            </div>
            <div class="mb-2">
              <label for="emailFormControl" class="form-label mb-1">Email</label>
              <input v-model="credentials.email" type="email" class="form-control" id="emailFormControl" />
            </div>
            <div class="mb-2">
              <label for="passwordFormControl" class="form-label mb-1">Password</label>
              <input v-model="credentials.password" type="password" class="form-control" id="passwordFormControl" />
            </div>
            <button @click="onFormSubmit" type="submit" class="btn btn-primary">
              Signup
              <span class="fst-italic" v-if="credentials.username">as {{ credentials.username }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>