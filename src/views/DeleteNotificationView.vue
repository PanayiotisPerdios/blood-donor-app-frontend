  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRemoteData } from '@/composables/useRemoteData.js';
  import { RouterLink, useRoute } from 'vue-router';

  const notificationIdRef = ref(null);
  const route = useRoute();

  const urlRef = ref('');
  const authRef = ref(true);
  const methodRef = ref("DELETE");


  const { loading, performRequest } = useRemoteData(urlRef, authRef, methodRef);

  const deleteNotification = () => {
    urlRef.value = `http://localhost:9090/api/notifications/${notificationIdRef.value}`;
    performRequest()
  };

  onMounted(() => {
    // Extract notification ID from the route parameters
    notificationIdRef.value = route.params.id;
  });
  </script>

  <template>
    <div>
      <button @click="deleteNotification">Delete Notification</button>
    </div>
  </template>

  <style scoped>

  </style>