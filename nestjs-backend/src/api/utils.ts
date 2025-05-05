import { Request } from 'express';

export function bearerToken(req: Request) {
  if (!req || !req.session || !req.session.accessToken) {
    throw new Error('No access token found in session for auth header.');
  }

  return { headers: { Authorization: `Bearer ${req.session.accessToken}` } };
}
