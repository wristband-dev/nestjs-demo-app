import { env } from 'node:process';

export const CSRF_TOKEN_COOKIE_NAME: string = 'CSRF-TOKEN';
export const CSRF_TOKEN_HEADER_NAME: string = 'x-csrf-token';
export const DEMO_APP_HOST = 'localhost:6001';
export const POST_CALLBACK_URL = 'http://localhost:6001/hello-world';
export const SESSION_COOKIE_NAME: string = 'session';
export const SIGNUP_URL: string = `https://${env.APPLICATION_VANITY_DOMAIN}/signup`;
