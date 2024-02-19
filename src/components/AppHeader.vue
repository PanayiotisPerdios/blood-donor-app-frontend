<script setup>
import { RouterLink} from 'vue-router'
import { useApplicationStore } from '@/stores/user.js';
const applicationStore = useApplicationStore();





</script>

<template>
  <header class="text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-center py-2 px-3">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"></a>
        <ul class="nav nav-pills">
          <li class="nav-item" v-if="applicationStore.isAuthenticated === false">
            <router-link :to="{ name: 'signup' }" class="nav-link text-white">Signup</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === false">
            <router-link :to="{ name: 'signin' }" class="nav-link text-white">Signin</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'signout' }" class="nav-link text-white">Signout</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'profile' }" class="nav-link text-white">Profile</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && (!applicationStore.userData.roles.includes('ROLE_SECRETARY') && !applicationStore.userData.roles.includes('ROLE_ADMIN'))">
            <router-link :to="{ name: 'user-application',params: { id: applicationStore.userData.id } }" class="nav-link text-white">User Application</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'edit' }" class="nav-link text-white">Edit Personal Info</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'home' }" class="nav-link text-white">Home</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'hospitals' }" class="nav-link text-white">Hospitals</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && (applicationStore.userData.roles.includes('ROLE_SECRETARY') || applicationStore.userData.roles.includes('ROLE_ADMIN'))">
            <router-link :to="{ name: 'applications' }" class="nav-link text-white">Applications</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true ">
            <router-link :to="{ name: 'notifications' }" class="nav-link text-white">Notifications</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && (applicationStore.userData.roles.includes('ROLE_SECRETARY') || applicationStore.userData.roles.includes('ROLE_ADMIN'))">
            <router-link :to="{ name: 'users' }" class="nav-link text-white">Users</router-link>
          </li>

          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && !applicationStore.userData.roles.includes('ROLE_ADMIN') && !applicationStore.userData.roles.includes('ROLE_SECRETARY')">
            <router-link :to="{ name: 'application-new' }" class="nav-link text-white">Create Application</router-link>
          </li>

          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && applicationStore.userData.roles.includes('ROLE_ADMIN')">
            <router-link :to="{ name: 'hospital-new' }" class="nav-link text-white">Create Hospital</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true && (applicationStore.userData.roles.includes('ROLE_SECRETARY') || applicationStore.userData.roles.includes('ROLE_ADMIN'))">
            <router-link :to="{ name: 'notifications-new' }" class="nav-link text-white">Create Notifications</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>