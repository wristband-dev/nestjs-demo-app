import { ref, onUnmounted } from 'vue';
import { apiClient } from '../api/axios-client';

const TOKEN_REFRESH_BUFFER_MS = 60000; // 1 minute buffer before expiry

export function useWristbandToken() {
  const accessToken = ref(null);
  const expiresAt = ref(null);
  const error = ref(null);
  const isLoading = ref(false);
  let fetchPromise = null; // Prevent duplicate fetches

  const isTokenValid = () => {
    if (!accessToken.value || !expiresAt.value) {
      return false;
    }
    const now = Date.now();
    const timeUntilExpiry = expiresAt.value - now;
    return timeUntilExpiry > TOKEN_REFRESH_BUFFER_MS;
  };

  const fetchToken = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await apiClient.get('/auth/token');
      
      if (response.status === 200 && response.data) {
        accessToken.value = response.data.accessToken;
        expiresAt.value = response.data.expiresAt;
        
        return response.data.accessToken;
      } else {
        throw new Error('Failed to fetch access token');
      }
    } catch (err) {
      console.error('Error fetching access token:', err);
      error.value = err.message || 'Failed to fetch access token';
      accessToken.value = null;
      expiresAt.value = null;
      throw err;
    } finally {
      isLoading.value = false;
      fetchPromise = null;
    }
  };

  // Main function - returns cached token if valid, fetches new one if expired
  const getToken = async () => {
    // If token is still valid, return it immediately
    if (isTokenValid()) {
      return accessToken.value;
    }

    // If already fetching, wait for that promise
    if (fetchPromise) {
      return fetchPromise;
    }

    // Fetch new token
    fetchPromise = fetchToken();
    return fetchPromise;
  };

  // Cleanup on unmount (just in case there's a pending fetch)
  onUnmounted(() => {
    fetchPromise = null;
  });

  return {
    accessToken,
    expiresAt,
    error,
    isLoading,
    getToken, // Main function to use - handles caching and expiry
  };
}
