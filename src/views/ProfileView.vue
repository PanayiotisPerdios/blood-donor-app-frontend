<script setup>
import { useApplicationStore } from '@/stores/application.js';
const { userData } = useApplicationStore();
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3">Profile</h1>
          </div>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Roles</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td><pre>{{ userData.username }}</pre></td>
                    <td><pre>{{ userData.id }}</pre></td>
                    <td><pre>{{ userData.email}}</pre></td>
                    <td><pre>{{ userData.roles}}</pre></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>