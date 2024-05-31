  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRemoteData } from '@/composables/useRemoteData.js';
  import { RouterLink, useRoute } from 'vue-router';
  import router from '@/router/index.js'

  const notificationIdRef = ref(null);
  const route = useRoute();

  const urlRef = ref('');
  const authRef = ref(true);
  const methodRef = ref("DELETE");
  const loading = ref(false);
  const backendEnvVar = import.meta.env.VITE_BACKEND;



  const { performRequest } = useRemoteData(urlRef, authRef, methodRef);

  const deleteNotification = () => {
    loading.value = true;
    urlRef.value = `/api/notifications/${notificationIdRef.value}`;
    performRequest()
    setTimeout(() => {
      router.push({ name: 'notifications' });
    }, 500);
  };

  onMounted(() => {
    notificationIdRef.value = route.params.id;
    deleteNotification()
  });
  </script>

  <template>
    <div class="bg-body-tertiary">
      <div class="container">
        <div class="row py-4 px-3">
          <div class="col-4">
            <div class="mb-4">
              <h1 class="fs-3">Deleting Notification</h1>
            </div>
            <div class="spinner-border" role="status" v-if="loading">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <style scoped>

  </style>