import { apiClientWithJwt } from "../api/axios-client";

const bearerToken = (accessToken) => {
  if (!accessToken) {
    throw new Error('A valid access token must be provided');
  }

  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

export const fetchToken = async function (accessToken) {
  const response = await apiClientWithJwt.get(`/v1/token`, bearerToken(accessToken));
  return response.data;
};
