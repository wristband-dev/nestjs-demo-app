import { env } from 'node:process';

export function getEnvFilePath() {
  switch (env.NODE_ENV) {
    case 'preview':
      return '.env.preview';
    case 'development':
    default:
      return '.env';
  }
}

// Auth scopes should be a comma-separated string value in your .env file.
const SCOPES_FORMAT_PATTERN =
  /^\s*([a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*)\s*(,\s*[a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*\s*)*$/;
const DEFAULT_SCOPES = [
  'openid',
  'offline_access',
  'email',
  'profile',
  'roles',
];
export function resolveScopesEnvVar(envScopes: string): string[] {
  if (!envScopes || !SCOPES_FORMAT_PATTERN.test(envScopes)) {
    return DEFAULT_SCOPES;
  }

  return envScopes.split(',');
}
