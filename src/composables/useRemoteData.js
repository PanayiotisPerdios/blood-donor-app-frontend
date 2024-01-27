import { ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js';

const store = useApplicationStore();

export function useRemoteData(urlRef, authRef, methodRef = ref("GET"), bodyRef = ref(null)) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const performRequest = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (authRef.value === true) {
        // Ensure the access token is refreshed if needed
        await refreshAccessTokenIfNeeded();

        headers['Authorization'] = 'Bearer ' + store.userData.accessToken;
      }

      const config = {
        method: methodRef.value,
        headers: headers,
      };

      if (bodyRef.value !== null) {
        config.body = JSON.stringify(bodyRef.value);
      }

      const response = await fetch(urlRef.value, config);

      if (response.ok) {
        const responseData = await response.json();
        data.value = responseData;
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  // Function to update user data
  const updateUser = async (userId, userData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (authRef.value === true) {
        // Ensure the access token is refreshed if needed
        await refreshAccessTokenIfNeeded();

        headers['Authorization'] = 'Bearer ' + store.userData.accessToken;
      }

      const config = {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(userData),
      };

      const response = await fetch(urlRef, config);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; // Rethrow the error for handling in the component
    }
  };

  // Function to refresh the access token if needed
  const refreshAccessTokenIfNeeded = async () => {
    // Add your logic to check if the access token needs refreshing
    // For example, check the expiration time or handle refresh token
    // You may need to adapt this based on your authentication mechanism
    // If the token needs refreshing, make the necessary API call to refresh it
  };

  return { data, error, loading, performRequest, updateUser };
}