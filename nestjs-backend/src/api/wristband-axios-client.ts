import axios from 'axios';
import { env } from 'node:process';

export const wristbandApiClient = axios.create({
  baseURL: `https://${env.APPLICATION_VANITY_DOMAIN}/api/v1`,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
